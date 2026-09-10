import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  RotateCw, 
  Send, 
  Paperclip, 
  FileText, 
  Copy, 
  Check, 
  AlertCircle,
  Sparkles,
  Bot,
  User,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { RobotMascot } from './RobotMascot';
import { getYodaAdvisoryResponse } from '../lib/yodaKnowledge';

interface ChatAttachment {
  name: string;
  type: string;
  size: number;
  data: string; // base64 data url
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  attachment?: {
    name: string;
    type: string;
    size: number;
  };
  timestamp: string;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'model',
  content: `Hello! I am **YodaAI**, your career readiness buddy by Future Forward.

I can assist you across four key employability areas:
1. **CV Diagnostics & Revamping**: Upload your CV (PDF or DOC/DOCX) for an impact and clarity audit.
2. **CV Generation**: Translate your education and experience into structured, evidence-based bullet points.
3. **Interview Preparation**: Practice behavioral questions using the **STAR method** (Situation, Task, Action, Result).
4. **Workplace & Interview Dress Code**: Guidelines tailored for corporate, business casual, and tech environments.

How can I assist your career progression today?`,
  timestamp: 'Just now'
};

const SUGGESTED_PROMPTS = [
  { label: '📄 Revamp my CV (Upload file)', prompt: 'I want to revamp my CV. What are the key areas you evaluate?' },
  { label: '📝 Draft a role-specific CV', prompt: 'Guide me on generating a new CV tailored for an entry-level Project Coordinator role.' },
  { label: '🎤 STAR Interview Prep', prompt: 'How do I answer "Tell me about a time you handled a difficult project" using the STAR method?' },
  { label: '👔 Interview Dress Code', prompt: 'What is the appropriate dress code and grooming standard for a corporate banking interview?' },
];

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<ChatAttachment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputAreaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputAreaRef.current?.focus();
      }, 300);
    }
  };

  const handleRestart = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: `welcome-${Date.now()}`
      }
    ]);
    setSelectedFile(null);
    setInputText('');
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const processFile = (file: File) => {
    // Validate file type: PDF, DOC, DOCX, TXT
    const validExtensions = ['.pdf', '.doc', '.docx', '.txt'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some(ext => fileName.endsWith(ext)) ||
      file.type === 'application/pdf' ||
      file.type.includes('word') ||
      file.type.startsWith('text/');

    if (!isValid) {
      alert('Please upload a PDF (.pdf) or Word document (.doc, .docx).');
      return;
    }

    // Limit to 12MB
    if (file.size > 12 * 1024 * 1024) {
      alert('File size exceeds 12MB limit. Please upload a smaller document.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedFile({
        name: file.name,
        type: file.type || (fileName.endsWith('.pdf') ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
        size: file.size,
        data: reader.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    // reset input so same file can be re-selected if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : inputText).trim();
    if ((!text && !selectedFile) || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      content: text || (selectedFile ? `Please review my attached CV/Resume: ${selectedFile.name}` : ''),
      attachment: selectedFile ? {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size,
      } : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputText('');
    const currentAttachment = selectedFile;
    setSelectedFile(null);
    setIsLoading(true);

    try {
      // Map messages for backend API
      const apiMessages = updatedMessages.map(m => ({
        role: m.role,
        content: m.content
      }));

      let replyContent = '';

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            messages: apiMessages,
            attachment: currentAttachment ? {
              name: currentAttachment.name,
              type: currentAttachment.type,
              data: currentAttachment.data
            } : undefined
          })
        });

        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (res.ok && data.reply) {
            replyContent = data.reply;
          } else if (data.error) {
            console.warn('API returned notice:', data.error);
            replyContent = getYodaAdvisoryResponse(text, currentAttachment);
          }
        } else {
          // Received non-JSON response (e.g. proxy cookie redirect or 404)
          console.warn('Received non-JSON response from /api/chat:', res.status);
          replyContent = getYodaAdvisoryResponse(text, currentAttachment);
        }
      } catch (fetchErr) {
        console.warn('Backend fetch bypassed or intercepted, using YodaAI knowledge engine:', fetchErr);
        replyContent = getYodaAdvisoryResponse(text, currentAttachment);
      }

      if (!replyContent) {
        replyContent = getYodaAdvisoryResponse(text, currentAttachment);
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'model',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackReply = getYodaAdvisoryResponse(text, currentAttachment);
      const errorMsg: ChatMessage = {
        id: `fallback-${Date.now()}`,
        role: 'model',
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="yoda-chatbot-widget">
      {/* Hidden File Input for PDF and DOC/DOCX */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
        className="hidden"
        id="yoda-file-input"
      />

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: 'spring', damping: 26, stiffness: 240 }}
            className={`w-[94vw] sm:w-[450px] h-[620px] max-h-[calc(100vh-100px)] bg-[#0b1120] rounded-2xl shadow-2xl border border-slate-800 flex flex-col mb-4 origin-bottom-right overflow-hidden ${
              isDragging ? 'ring-2 ring-brand-green ring-offset-2 ring-offset-[#0b1120]' : ''
            }`}
            id="yoda-chat-window"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {/* Header */}
            <div className="px-4 py-3 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center justify-between select-none">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <RobotMascot size={32} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand-green border-2 border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-white flex items-center gap-1.5 leading-tight">
                    YodaAI
                    <span className="bg-accent-gradient text-[9px] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
                      Career Buddy
                    </span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-sans flex items-center gap-1">
                    Powered by Future Forward
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleRestart}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Clear conversation"
                  id="chatbot-btn-refresh"
                >
                  <RotateCw size={15} />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Close chat"
                  id="chatbot-btn-close"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Drag & Drop Visual Overlay */}
            {isDragging && (
              <div className="absolute inset-0 bg-brand-navy/95 z-30 flex flex-col items-center justify-center p-6 text-center border-2 border-dashed border-brand-green rounded-2xl animate-fadeIn">
                <FileCheck size={48} className="text-brand-green mb-3 animate-bounce" />
                <h4 className="text-white font-heading font-bold text-lg mb-1">Drop your CV or Resume here</h4>
                <p className="text-xs text-slate-400">Supports PDF and Word (.doc, .docx) up to 12MB</p>
              </div>
            )}

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-sm bg-slate-950/60" id="chat-messages-container">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1`}
                  >
                    <div className="flex items-end gap-2 max-w-[88%]">
                      {!isUser && (
                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 mb-1">
                          <Bot size={13} className="text-brand-blue" />
                        </div>
                      )}

                      <div
                        className={`rounded-2xl px-4 py-3 leading-relaxed shadow-sm break-words ${
                          isUser
                            ? 'bg-accent-gradient text-white rounded-br-none'
                            : 'bg-slate-900 border border-slate-800/80 text-slate-200 rounded-bl-none'
                        }`}
                      >
                        {/* Render Attached Document Badge if in user message */}
                        {msg.attachment && (
                          <div className="mb-2 p-2 rounded-xl bg-black/25 border border-white/10 flex items-center gap-2 text-xs">
                            <FileText size={16} className="text-brand-green flex-shrink-0" />
                            <div className="truncate flex-1">
                              <p className="font-semibold truncate">{msg.attachment.name}</p>
                              <p className="text-[10px] opacity-75">
                                {(msg.attachment.size / 1024).toFixed(1)} KB • Document Attached
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Markdown / Text Content */}
                        <div className="markdown-body text-xs sm:text-sm space-y-2">
                          <Markdown
                            components={{
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              ul: ({ children }) => <ul className="list-disc pl-4 space-y-1 mb-2">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1 mb-2">{children}</ol>,
                              li: ({ children }) => <li className="leading-snug">{children}</li>,
                              strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                              h1: ({ children }) => <h1 className="font-bold text-base text-white mt-2 mb-1">{children}</h1>,
                              h2: ({ children }) => <h2 className="font-bold text-sm text-white mt-2 mb-1">{children}</h2>,
                              h3: ({ children }) => <h3 className="font-bold text-xs text-white mt-1.5 mb-1">{children}</h3>,
                              blockquote: ({ children }) => (
                                <blockquote className="border-l-2 border-brand-blue pl-2.5 italic text-slate-400 my-1.5">
                                  {children}
                                </blockquote>
                              ),
                              code: ({ children }) => (
                                <code className="bg-black/30 px-1.5 py-0.5 rounded text-[11px] font-mono text-brand-green">
                                  {children}
                                </code>
                              ),
                            }}
                          >
                            {msg.content}
                          </Markdown>
                        </div>

                        {/* Message Action Footer */}
                        {!isUser && (
                          <div className="mt-2.5 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                            <span>{msg.timestamp}</span>
                            <button
                              onClick={() => handleCopy(msg.id, msg.content)}
                              className="hover:text-slate-300 flex items-center gap-1 transition-colors cursor-pointer px-1 py-0.5 rounded"
                              title="Copy response"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check size={11} className="text-brand-green" />
                                  <span className="text-brand-green">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy size={11} />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>

                      {isUser && (
                        <div className="w-6 h-6 rounded-full bg-brand-navy border border-slate-700 flex items-center justify-center flex-shrink-0 mb-1">
                          <User size={13} className="text-brand-green" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Bot Typing Indicator */}
              {isLoading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs py-2 animate-pulse">
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <Bot size={13} className="text-brand-blue" />
                  </div>
                  <div className="bg-slate-900 border border-slate-800 px-3.5 py-2 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-[11px] text-slate-400 ml-1 font-sans">YodaAI is thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips (when only 1 or 2 messages exist) */}
            {messages.length <= 2 && (
              <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-900 flex gap-2 overflow-x-auto no-scrollbar">
                {SUGGESTED_PROMPTS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.prompt)}
                    className="whitespace-nowrap text-[11px] font-sans font-medium px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 hover:border-brand-blue hover:text-white text-slate-400 transition-all cursor-pointer flex-shrink-0"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {/* File Attachment Preview Banner */}
            {selectedFile && (
              <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-brand-green truncate">
                  <FileText size={16} className="flex-shrink-0" />
                  <span className="truncate font-semibold">{selectedFile.name}</span>
                  <span className="text-[10px] text-slate-400">
                    ({(selectedFile.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-slate-400 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                  title="Remove attachment"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 bg-slate-900 border-t border-slate-800">
              <div className="flex items-end gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2 focus-within:border-brand-blue focus-within:ring-1 focus-within:ring-brand-blue transition-all">
                {/* Paperclip Button for PDF/DOCX */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 text-slate-400 hover:text-brand-green hover:bg-slate-900 rounded-lg transition-colors cursor-pointer relative"
                  title="Attach CV/Resume (PDF, DOC, DOCX)"
                  id="chatbot-attach-btn"
                >
                  <Paperclip size={18} />
                  {selectedFile && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-brand-green rounded-full"></span>
                  )}
                </button>

                {/* Textarea */}
                <textarea
                  ref={inputAreaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    selectedFile 
                      ? `Ask questions about ${selectedFile.name} (e.g. Revamp, STAR alignment)...`
                      : "Type a career question or attach your CV (PDF/DOCX)..."
                  }
                  rows={1}
                  className="flex-1 bg-transparent text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none resize-none py-1.5 max-h-24 leading-relaxed font-sans"
                />

                {/* Send Button */}
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  disabled={(!inputText.trim() && !selectedFile) || isLoading}
                  className={`p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer ${
                    (!inputText.trim() && !selectedFile) || isLoading
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-accent-gradient hover-accent-glow text-white shadow-sm hover:scale-105 active:scale-95'
                  }`}
                  title="Send message"
                  id="chatbot-send-btn"
                >
                  <Send size={16} />
                </button>
              </div>

              {/* Disclaimer footer */}
              <div className="flex items-center justify-between text-[9px] text-slate-500 font-sans mt-2 px-1">
                <span>Supports .pdf, .docx, .doc • Max 12MB</span>
                <span>Employability & Readiness Advisor</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer relative group ${
          isOpen
            ? 'bg-slate-800 text-white border border-slate-700'
            : 'bg-accent-gradient hover-accent-glow text-white'
        }`}
        title={isOpen ? "Close Chatbot" : "Chat with YodaAI Native Career Companion"}
        id="chatbot-fab-trigger"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative flex items-center justify-center"
            >
              <div className="scale-90 transform group-hover:scale-100 transition-transform">
                <RobotMascot size={32} />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-green border-2 border-white rounded-full animate-bounce"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
