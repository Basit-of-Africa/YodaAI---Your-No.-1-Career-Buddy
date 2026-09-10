import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import mammoth from 'mammoth';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

// Support larger payloads for document attachments (PDF, DOCX)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// CORS & Preflight middleware for seamless cross-context requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// YodaAI Knowledge Base System Instruction
const YODAAI_SYSTEM_INSTRUCTION = `You are YodaAI, an AI career support agent by Future Forward.
Your role is focused strictly on employability and professional readiness, not job guarantees. You guide users in presenting their skills, experience, and professional identity clearly and credibly across key hiring touchpoints.

Core Focus Areas:
1. CV Generation
2. CV Revamping
3. Interview Preparation & Tips
4. Proper Work & Interview Dress Code

Guiding Knowledge Base Principles:
1. CV Generation:
- A CV is a professional document, not a biography.
- Content must be role-specific, evidence-based, and quantified (outputs, metrics, measurable impact).
- Clarity and structure take priority over design embellishments.
- Standard CV structure: Header, Professional Summary (3-4 lines), Core Skills (grouped logically), Work Experience (reverse chronological, strong action verbs, no personal pronouns), Education, Certifications/Training, Projects/Volunteering.
- Request or infer: Target role/industry, career level, work experience, education, core skills, key achievements, location context.

2. CV Revamping (Diagnostics & Evaluation):
- Evaluate based on: Role alignment, content relevance, clarity/readability, evidence of impact, structural consistency, and language quality.
- Address generic summaries, task-based descriptions instead of impact-based statements, poor formatting, irrelevant experience, and skill inflation.
- Reframe duties into quantifiable outcomes.
- Ethical constraint: Never fabricate experience or qualifications, nor exaggerate responsibilities beyond reasonable interpretation.

3. Interview Tips & Preparation:
- Cover: Screening, technical/skills-based, behavioural, panel, and virtual interviews.
- Use the STAR method (Situation, Task, Action, Result) for behavioural questions.
- Focus on decision-making, honesty about challenges and learnings, and avoiding blaming teams.
- Encourage structured, concise answers and asking informed questions about the role or organization.
- Virtual interview hygiene: quiet neutral background, connection/audio check, eye contact with camera.

4. Proper Work & Interview Dress Code:
- Dress codes signal professionalism and cultural awareness. Fit and cleanliness matter more than brand. Overdressing is safer than underdressing.
- Corporate/Formal: Neutral tailored suits/outfits, conservative shoes, minimal accessories.
- Business Casual: Button-down shirts or blouses, trousers or skirts of appropriate length, smart closed shoes or loafers.
- Creative/Tech: Clean, simple outfits, no flashy or distracting clothing, polished appearance.
- Grooming: Neat hair and facial grooming, clean pressed clothing, subtle scents.

Tone & Decision Rules:
- Professional, direct, respectful, and supportive (practical rather than shallow motivational cheerleading).
- Clear explanations without unnecessary jargon.
- Sensitive to diverse career stages (secondary school grads, university/polytechnic students, fresh grads, transitioners) and local/African labour market realities.
- Emphasize that YodaAI provides advisory guidance and does not guarantee job outcomes or replace human recruiters.

When reviewing attached documents (PDF or DOC/DOCX):
- Thoroughly analyze the text/layout content provided.
- Provide a structured diagnostic: Strengths, Areas for Improvement, Line-by-Line / Section Rewrites with measurable metrics, and a Readiness Rating.`;

let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not configured.');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Chat & Document Analysis API Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, attachment } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        error: 'Gemini API key is not configured in the environment. Please add GEMINI_API_KEY in settings.',
        fallback: true
      });
    }

    const ai = getGenAI();

    // Prepare contents array for Gemini 3.8 Flash
    const formattedContents: Array<{
      role: 'user' | 'model';
      parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }>;
    }> = [];

    // Add prior history (up to last 10 messages for context)
    const history = messages.slice(0, -1).slice(-10);
    for (const msg of history) {
      formattedContents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      });
    }

    // Process the latest user message
    const latestUserMsg = messages[messages.length - 1];
    const latestParts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [];

    // Handle document attachment if present
    if (attachment && attachment.data) {
      const mimeType = attachment.type || '';
      const fileName = attachment.name || 'document';
      const cleanBase64 = attachment.data.includes('base64,')
        ? attachment.data.split('base64,')[1]
        : attachment.data;

      // If PDF: pass directly via inlineData
      if (mimeType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf')) {
        latestParts.push({
          inlineData: {
            mimeType: 'application/pdf',
            data: cleanBase64
          }
        });
        latestParts.push({
          text: `[Attached Document: ${fileName} (PDF format)]\nPlease analyze this document according to the YodaAI career and CV diagnostic criteria.`
        });
      } 
      // If Word DOCX: extract text using mammoth
      else if (
        mimeType.includes('wordprocessingml') ||
        mimeType.includes('msword') ||
        fileName.toLowerCase().endsWith('.docx') ||
        fileName.toLowerCase().endsWith('.doc')
      ) {
        try {
          const buffer = Buffer.from(cleanBase64, 'base64');
          const extraction = await mammoth.extractRawText({ buffer });
          const extractedText = extraction.value || '';
          latestParts.push({
            text: `[Attached Resume / CV Document: ${fileName}]\n\n--- EXTRACTED CV CONTENT START ---\n${extractedText}\n--- EXTRACTED CV CONTENT END ---\n\nPlease review this CV in accordance with YodaAI knowledge base standards.`
          });
        } catch (docErr) {
          console.error('Error parsing DOCX with mammoth:', docErr);
          latestParts.push({
            text: `[Attached File: ${fileName}]\n(Note: The document content could not be fully parsed as DOCX text. Please advise the user to provide plain text or PDF if detailed CV line extraction is required.)`
          });
        }
      } 
      // Plain text or markdown
      else if (mimeType.startsWith('text/') || fileName.toLowerCase().endsWith('.txt') || fileName.toLowerCase().endsWith('.md')) {
        try {
          const textDecoded = Buffer.from(cleanBase64, 'base64').toString('utf-8');
          latestParts.push({
            text: `[Attached File: ${fileName}]\n\n${textDecoded}`
          });
        } catch {
          latestParts.push({ text: `[Attached File: ${fileName}]` });
        }
      } 
      // Images (PNG, JPEG, WEBP)
      else if (mimeType.startsWith('image/')) {
        latestParts.push({
          inlineData: {
            mimeType: mimeType,
            data: cleanBase64
          }
        });
      }
    }

    // Add the user's text message
    latestParts.push({
      text: latestUserMsg.content || 'Please review my career inquiry or attached CV.'
    });

    formattedContents.push({
      role: 'user',
      parts: latestParts
    });

    // Call Gemini with high availability models
    const candidateModels = ['gemini-3.6-flash', 'gemini-3.8-flash', 'gemini-flash-latest'];
    let replyText = '';
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: formattedContents,
          config: {
            systemInstruction: YODAAI_SYSTEM_INSTRUCTION,
            temperature: 0.6,
          }
        });

        replyText = response.text || "I have received your inquiry. How can I further assist your career development?";
        if (replyText) break;
      } catch (modelErr: any) {
        lastError = modelErr;
        console.warn(`Model ${model} attempt failed, trying next fallback:`, modelErr?.message || modelErr);
      }
    }

    if (!replyText && lastError) {
      throw lastError;
    }

    res.json({
      reply: replyText || "I have received your inquiry. How can I further assist your career development?"
    });
  } catch (error: any) {
    console.error('Gemini chat error:', error);
    let friendlyMessage = 'An error occurred while communicating with YodaAI.';
    try {
      if (typeof error?.message === 'string') {
        if (error.message.includes('503') || error.message.includes('high demand') || error.message.includes('UNAVAILABLE')) {
          friendlyMessage = 'The AI model is currently experiencing a brief spike in demand. Please try again in a moment.';
        } else if (error.message.startsWith('{') && error.message.endsWith('}')) {
          const parsed = JSON.parse(error.message);
          friendlyMessage = parsed?.error?.message || friendlyMessage;
        } else {
          friendlyMessage = error.message;
        }
      }
    } catch {
      // fallback to generic
    }

    res.status(500).json({
      error: friendlyMessage,
      fallback: false
    });
  }
});

// Explicit JSON error handler for all /api endpoints to prevent HTML error responses
app.use('/api', (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled API error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'An error occurred while processing the API request.'
  });
});

// Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
