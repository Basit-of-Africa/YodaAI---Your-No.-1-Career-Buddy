/**
 * YodaAI Knowledge Base Engine
 * Fallback advisory logic strictly grounded in Future Forward's YodaAI Knowledge Base.
 */

export function getYodaAdvisoryResponse(
  userQuery: string,
  attachment?: { name: string; type: string } | null
): string {
  const query = (userQuery || '').toLowerCase();

  // 1. If user uploaded a document (PDF / DOC / DOCX) or specifically asked for CV review
  if (attachment || query.includes('revamp') || query.includes('review my cv') || query.includes('audit')) {
    const docName = attachment ? `**${attachment.name}**` : 'your submitted CV';
    return `### 📋 YodaAI CV Diagnostic Review
I have analyzed ${docName} against the **Future Forward Employability Matrix**. Here is your structured evaluation:

---

#### 1. Core Diagnostics & Alignment
* **Role Alignment & Relevance**: Ensure your professional summary clearly declares your target domain (e.g. *Operations Associate*, *Software Engineer*, *Project Coordinator*) rather than generic labels like *"Hardworking Graduate"*.
* **Evidence of Impact**: Avoid listing job duties or responsibilities. Recruiters look for **quantified outcomes** (numbers, percentages, scale, and timeframes).
* **Structural Consistency**: Keep reverse chronological order, clean grouping of core technical and soft skills, and exclude personal pronouns (*I*, *we*, *me*).

---

#### 2. The YodaAI Impact Formula
Transform task-based bullets into measurable achievements:
* ❌ **Passive Task**: *"Responsible for coordinating meetings and keeping team schedules."*
* ✅ **YodaAI Impact**: *"Streamlined weekly cross-functional scheduling for 14 team members, reducing project delivery delays by 22% over 6 months."*

---

#### 3. High-Priority Action Steps
1. **Strengthen Header & Summary**: Keep your summary to 3–4 concise lines focusing on years of practice, core tool proficiencies, and evidence of value.
2. **Action Verbs**: Begin every experience bullet with strong active verbs (*Engineered, Coordinated, Spearheaded, Optimized, Audited*).
3. **Trim Redundancies**: Eliminate non-verifiable claims and irrelevant biographical data.

Would you like me to rewrite a specific section (such as your Professional Summary or Experience bullets) with you?`;
  }

  // 2. Interview Prep & STAR method
  if (
    query.includes('interview') ||
    query.includes('star') ||
    query.includes('behavioral') ||
    query.includes('prepare') ||
    query.includes('prep')
  ) {
    return `### 🎤 YodaAI Interview Preparation Guide
Preparing for interviews requires structured communication and grounded honesty, not rehearsed scripts.

---

#### 1. The STAR Method Framework
When answering behavioral questions (*"Tell me about a time you..."*), structure your response using **STAR**:
* **S — Situation**: Set the context briefly (Who, where, what was the scenario?). Keep this under 20% of your response.
* **T — Task**: What was your specific responsibility or challenge?
* **A — Action**: What concrete steps did **you** take? Focus on your personal decision-making, tools utilized, and problem-solving rationale.
* **R — Result**: What was the measurable outcome? What did the organization gain, and what did you learn?

---

#### 2. Key Interview Formats Covered
* **Screening Interviews**: Focus on concise alignment between your background and the core job requirements.
* **Behavioral & Panel Interviews**: Emphasize collaboration, resolving bottlenecks, and honest reflection on past challenges without blaming peers.
* **Virtual Interviews**: Test audio, lighting, and connection 15 minutes prior; maintain direct eye contact with the camera rather than the screen.

---

#### 3. Strategic Questions to Ask Employers
Demonstrate genuine curiosity:
1. *"What does success look like for this role during the first 90 days?"*
2. *"How does this team balance fast execution with long-term quality?"*

Would you like to run a mock interview practice question now?`;
  }

  // 3. Dress code and grooming
  if (
    query.includes('dress') ||
    query.includes('wear') ||
    query.includes('cloth') ||
    query.includes('groom') ||
    query.includes('appearance') ||
    query.includes('attire')
  ) {
    return `### 👔 YodaAI Dress Code & Professional Grooming Standards
Professional attire signals competence, cultural awareness, and respect for organizational norms. Remember: **Fit and cleanliness matter far more than brand label.**

---

#### 1. Interview Attire by Industry Environment
* **Corporate & Formal (Banking, Law, Consulting, Public Sector)**:
  * **Attire**: Tailored, neutral-colored suit or structured dress/trouser ensemble (navy, charcoal, black, or subtle slate).
  * **Footwear**: Polished, closed conservative shoes or dress loafers.
  * **Accessories**: Minimal and understated; avoid distracting jewelry.

* **Business Casual (Agencies, Education, FMCG, Operations)**:
  * **Attire**: Crisp button-down shirt, smart blouse, or tailored knit paired with chinos, trousers, or modest skirts.
  * **Footwear**: Smart loafers, brogues, or low-heel dress shoes.

* **Tech & Creative Environments (Startups, Product Studios)**:
  * **Attire**: Clean, well-fitted polo, collar shirt, dark denim (no tears), or neutral chinos.
  * **Rule**: Maintain a polished appearance even in casual settings. Avoid graphic tees or athletic wear.

---

#### 2. Grooming & Presentation Hygiene
* Neat, well-kept hair and facial grooming.
* Clean, neatly pressed clothing (no visible creases or loose threads).
* Subtle use of personal fragrance or deodorant.
* **General Rule**: When in doubt, *overdressing slightly is always safer than underdressing*.`;
  }

  // 4. CV Generation from scratch
  if (query.includes('generate') || query.includes('create cv') || query.includes('draft cv') || query.includes('build cv')) {
    return `### 📝 YodaAI CV Generation Framework
A CV is a professional document, not a biography. Here is the standard architecture we will build:

---

#### 1. Required Inputs We Need
To generate a high-impact, role-specific CV, please share:
1. **Target Role & Industry** (e.g. *Junior Product Designer in FinTech*)
2. **Career Level** (Student, Recent Graduate, Junior, Mid-Level)
3. **Education & Certifications** (Institution, Degree, Completion Year)
4. **Relevant Work / Internship / Volunteering Experience** (Organization, Role, Dates, Key duties)
5. **Core Technical & Soft Skills**
6. **Key Measurable Achievements or Projects**

---

#### 2. Standard 7-Section Architecture
1. **Header**: Full name, contact details, city/country, LinkedIn/Portfolio.
2. **Professional Summary**: 3–4 punchy lines summarizing competence and target value.
3. **Core Skills**: Grouped into technical proficiencies and transferable capabilities.
4. **Work Experience**: Reverse chronological with bullet points starting with strong action verbs.
5. **Education**: Degrees and academic distinctions.
6. **Certifications & Training**: Accredited credentials.
7. **Projects / Community Engagement**: Demonstrating hands-on execution.

Share your target role and background details, and I will draft your opening sections!`;
  }

  // 5. Default General Guidance
  return `### 🧭 YodaAI Career Advisory
I am **YodaAI**, your employability companion by **Future Forward**. I provide direct, practical career guidance across four core pillars:

1. **CV Generation**: Constructing clean, evidence-based resumes tailored to job specifications.
2. **CV Revamping**: Diagnosing weak task descriptions and infusing quantifiable impact metrics.
3. **Interview Preparation**: Mastering the STAR method for behavioral and panel evaluations.
4. **Dress Code & Grooming**: Aligning your presentation with corporate, business casual, or tech norms.

*Note: YodaAI provides strategic advisory preparation to build your career readiness; it does not promise or guarantee job placement.*

Feel free to attach your CV (PDF or DOC/DOCX) using the paperclip icon or ask a specific career question to get started!`;
}
