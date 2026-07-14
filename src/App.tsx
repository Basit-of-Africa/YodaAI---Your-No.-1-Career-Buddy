/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Award, 
  FileText, 
  CheckSquare, 
  Users, 
  Target, 
  Compass, 
  Send, 
  Info,
  Briefcase,
  ShieldAlert,
  ChevronRight,
  ThumbsUp,
  ExternalLink
} from 'lucide-react';

// Custom Components
import { Header } from './components/Header';
import { ChatWidgetMockup } from './components/ChatWidgetMockup';
import { FAQAccordion } from './components/FAQAccordion';
import { Footer } from './components/Footer';
import { RobotMascot } from './components/RobotMascot';

// Use path of our generated premium hero illustration
const heroIllustration = "/src/assets/images/yodaai_hero_illustration_1784033006039.jpg";

export default function App() {
  // Newsletter signup state
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quick rating/feedback state (for higher interactive fidelity)
  const [rating, setRating] = useState<number | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1000);
  };

  const handleRatingClick = (stars: number) => {
    setRating(stars);
    setFeedbackSent(true);
  };

  // Feature cards data (Strictly 6 cards from the brief)
  const features = [
    {
      id: 'cv-review',
      icon: <FileText className="text-brand-green" size={24} />,
      title: 'CV Review & Assessment',
      description: 'Instant structural analysis that identifies missing high-impact keywords, layout anomalies, and career positioning opportunities.',
    },
    {
      id: 'cv-improve',
      icon: <TrendingUp className="text-brand-blue" size={24} />,
      title: 'Improvement Recommendations',
      description: 'Get deep, actionable insights on how to transform generic task descriptions into metrics-driven achievement statements.',
    },
    {
      id: 'cv-rewrite',
      icon: <Sparkles className="text-brand-green" size={24} />,
      title: 'CV Rewrite Assistance',
      description: 'Guided step-by-step revision tools to help you reconstruct dense bullet points into industry-standard summaries.',
    },
    {
      id: 'interview-prep',
      icon: <Users className="text-brand-blue" size={24} />,
      title: 'Interview Preparation',
      description: 'Simulated behavioral questioning drills tailored to your target sector to build confidence and conversational fluency.',
    },
    {
      id: 'interview-checklist',
      icon: <CheckSquare className="text-brand-green" size={24} />,
      title: 'Interview Prep Checklist',
      description: 'Sector-specific milestones to review before entering the room—ensuring you cover research, posture, and STAR storytelling.',
    },
    {
      id: 'readiness-support',
      icon: <Compass className="text-brand-blue" size={24} />,
      title: 'Career Readiness Support',
      description: 'Holistic resources covering LinkedIn optimization, personal branding strategies, skill planning, and career growth roadmap guidance.',
    },
  ];

  // target audience data
  const targetAudiences = [
    'Secondary School Graduates',
    'University & Polytechnic Students',
    'Fresh Graduates',
    'Internship Applicants',
    'Entry-Level Professionals',
    'Mid-Career Professionals',
    'Career-Transitioners',
  ];

  // 3 Testimonials Placeholders
  const testimonials = [
    {
      id: 't-1',
      quote: '[Student testimonial placeholder: "As a final year student in Enugu, I had no idea how to structure my internships. YodaAI recommended metrics-focused bullet points, which instantly improved my CV callbacks!"]',
      authorType: 'University Undergraduate',
      institution: 'Enugu State University',
    },
    {
      id: 't-2',
      quote: '[Fresh graduate testimonial placeholder: "The mock interview checklists prepared me for the tough behavioral questions in my corporate finance interview. YodaAI kept me sharp and structured!"]',
      authorType: 'First-Class Finance Graduate',
      institution: 'University of Lagos',
    },
    {
      id: 't-3',
      quote: '[Career transitioner testimonial placeholder: "Transitioning from front-desk administration to digital product coordination felt impossible. YodaAI mapped my transferable skills flawlessly into operation metrics."] ',
      authorType: 'Transitioning Administrator',
      institution: 'Lagos Professional Circle',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-offwhite selection:bg-brand-blue/20 selection:text-brand-navy" id="home">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow pt-20">

        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden py-16 lg:py-24" id="hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Hero Copy (Left 7 Columns on Desktop) */}
              <div className="lg:col-span-7 space-y-8 text-left">
                {/* Built by badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 bg-[#0B1120]/5 border border-gray-200 px-3 py-1.5 rounded-full"
                  id="trust-badge-wrapper"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                  <span className="text-xs font-semibold text-gray-600 font-sans tracking-wide">
                    Built by <span className="font-bold text-brand-navy">iLEAD AFRICA</span>
                  </span>
                </motion.div>

                {/* Tagline & Title */}
                <div className="space-y-4">
                  <motion.h1 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-brand-navy leading-none"
                  >
                    Your No. 1 <br className="hidden sm:inline" />
                    <span className="text-accent-gradient">Career Buddy</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg sm:text-xl text-gray-500 font-sans font-normal leading-relaxed max-w-2xl"
                  >
                    AI-powered guidance to sharpen your CV, ace your interviews, and land the right opportunity — wherever you're starting from.
                  </motion.p>
                </div>

                {/* Trust and Credibility Line */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-xs text-gray-400 font-sans font-medium uppercase tracking-wider flex items-center gap-1.5"
                >
                  <CheckCircle size={14} className="text-brand-green" /> Personalized insights aligning with modern employer standards
                </motion.p>

                {/* Call To Actions */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap gap-4 items-center"
                  id="hero-cta-group"
                >
                  <a
                    href="#chat-showcase"
                    className="bg-accent-gradient hover-accent-glow text-white font-sans font-bold text-base px-8 py-4 rounded-xl shadow-md hover:scale-[1.02] transition-all flex items-center gap-2"
                  >
                    Try YodaAI Free <ArrowRight size={18} />
                  </a>
                  <a
                    href="#how-it-works"
                    className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-sans font-semibold text-base px-8 py-4 rounded-xl shadow-sm hover:bg-gray-50/50 transition-colors"
                  >
                    See How It Works
                  </a>
                </motion.div>
              </div>

              {/* Hero Image (Right 5 Columns on Desktop) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="lg:col-span-5 relative"
                id="hero-image-wrapper"
              >
                {/* Background decorative blob */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/10 to-brand-blue/10 rounded-full blur-2xl -z-10 scale-90"></div>
                
                {/* Illustration Frame */}
                <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 overflow-hidden transform hover:rotate-1 transition-transform duration-500">
                  <img
                    src={heroIllustration}
                    alt="YodaAI Career Growth illustration with Robot Mascot annotating a CV"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto rounded-2xl object-cover"
                  />
                  
                  {/* Overlay small mascot badge */}
                  <div className="absolute -bottom-4 -left-4 bg-[#0B1120] border border-slate-800 text-white p-3 rounded-2xl shadow-lg flex items-center gap-2 max-w-[220px]">
                    <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                      <RobotMascot size={24} />
                    </div>
                    <div>
                      <div className="text-[11px] font-heading font-extrabold text-[#2ECC71]">YodaAI Guide</div>
                      <div className="text-[9px] font-sans text-slate-400">10x Your Interview Success</div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>


        {/* 2. CHAT WIDGET SHOWCASE */}
        <ChatWidgetMockup />


        {/* 3. PROBLEM STATEMENT BAND */}
        <section className="py-20 bg-[#FAFBFC] border-b border-gray-100" id="problem-band">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-8 sm:p-12 relative">
              {/* Sparkle decorative */}
              <div className="absolute top-6 right-6 text-brand-green/20">
                <RobotMascot size={80} className="opacity-10" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Stat block */}
                <div className="lg:col-span-4 text-center lg:text-left space-y-2">
                  <div className="text-5xl sm:text-6xl font-heading font-extrabold text-brand-navy tracking-tight">
                    <span className="text-accent-gradient">35%</span>
                  </div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">
                    Unemployment Rate
                  </div>
                  <div className="text-sm font-sans text-gray-500 italic font-medium leading-relaxed mt-2" id="stat-source">
                    "35% of young Nigerians are unemployed and 28% underemployed."
                    <span className="block mt-1 font-semibold text-brand-navy">— Federal Ministry of Youth Development</span>
                  </div>
                </div>

                {/* Discussion */}
                <div className="lg:col-span-8 border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0 lg:pl-8 space-y-4">
                  <h3 className="text-xl font-heading font-bold text-brand-navy">
                    The Career Support Divide in Nigeria
                  </h3>
                  <p className="text-gray-500 font-sans text-sm sm:text-base leading-relaxed">
                    High-quality resume-building, personalized mentoring, and professional interview coaching are often inaccessible due to high fees, location inequality, and lack of guidance. Standard career support remains offline, expensive, or overly generalized.
                  </p>
                  
                  {/* Belief Statement Callout */}
                  <div className="bg-brand-blue/5 border-l-4 border-brand-blue p-4 rounded-r-xl">
                    <p className="text-sm font-sans font-semibold text-brand-navy leading-relaxed">
                      "Everyone deserves access to quality career guidance, regardless of their background, location, or stage of career."
                    </p>
                    <span className="text-[10px] font-sans font-bold text-brand-blue uppercase tracking-widest block mt-1.5">
                      The YodaAI & iLEAD AFRICA Belief Statement
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 4. CORE FEATURES GRID */}
        <section className="py-20 bg-white" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="pill text-xs font-bold tracking-widest text-brand-green uppercase bg-brand-green/5 px-3 py-1.5 mb-3 inline-block">
                Comprehensive Toolkit
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-navy tracking-tight leading-tight">
                6 Pillars of <span className="text-accent-gradient">Career Readiness</span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-gray-500 font-sans">
                Carefully designed modules covering everything you need to stand out from application submission to the final interview.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="features-grid">
              {features.map((feat, index) => (
                <motion.div
                  key={feat.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="feature-card p-6 rounded-2xl transition-all duration-300 flex flex-col items-start group cursor-pointer"
                  id={`feature-card-${feat.id}`}
                >
                  <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-brand-blue/5 transition-colors duration-300 mb-5">
                    {feat.icon}
                  </div>
                  <h3 className="text-lg font-heading font-bold text-brand-navy mb-3 group-hover:text-brand-blue transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans flex-grow">
                    {feat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* 5. HOW IT WORKS */}
        <section className="py-20 bg-[#FAFBFC] border-y border-gray-100" id="how-it-works">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="pill text-xs font-bold tracking-widest text-brand-blue uppercase bg-brand-blue/5 px-3 py-1.5 mb-3 inline-block">
                Simple Roadmap
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-navy tracking-tight">
                Your Path to <span className="text-accent-gradient">Workforce Ready</span>
              </h2>
              <p className="mt-4 text-base text-gray-500 font-sans">
                Four simple phases engineered to boost your employment confidence.
              </p>
            </div>

            {/* Step Roadmap Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative" id="roadmap-steps">
              
              {/* Connector line on desktop */}
              <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gray-200 -z-10"></div>

              {/* Step 1 */}
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-navy text-white font-heading font-extrabold flex items-center justify-center mx-auto shadow-md relative">
                  01
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-green rounded-full flex items-center justify-center border-2 border-white"></span>
                </div>
                <h3 className="font-heading font-bold text-base text-brand-navy">Upload CV</h3>
                <p className="text-xs text-gray-500 font-sans max-w-xs mx-auto leading-relaxed">
                  Simply paste or upload your existing resume profile to YodaAI securely.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-navy text-white font-heading font-extrabold flex items-center justify-center mx-auto shadow-md relative">
                  02
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-green rounded-full flex items-center justify-center border-2 border-white"></span>
                </div>
                <h3 className="font-heading font-bold text-base text-brand-navy">Get Assessment</h3>
                <p className="text-xs text-gray-500 font-sans max-w-xs mx-auto leading-relaxed">
                  Receive instant scoring on metrics, keywords, format layout, and density gaps.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-brand-navy text-white font-heading font-extrabold flex items-center justify-center mx-auto shadow-md relative">
                  03
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-blue rounded-full flex items-center justify-center border-2 border-white"></span>
                </div>
                <h3 className="font-heading font-bold text-base text-brand-navy">Apply Recommendations</h3>
                <p className="text-xs text-gray-500 font-sans max-w-xs mx-auto leading-relaxed">
                  Use guiding prompts to rewrite weak statements and build metric-driven bullet points.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-accent-gradient text-white font-heading font-extrabold flex items-center justify-center mx-auto shadow-lg relative">
                  04
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center border-2 border-brand-navy"></span>
                </div>
                <h3 className="font-heading font-bold text-base text-brand-navy">Prepare & Shine</h3>
                <p className="text-xs text-gray-500 font-sans max-w-xs mx-auto leading-relaxed">
                  Follow step checklists and run interactive drills to guarantee interview composure.
                </p>
              </div>

            </div>
          </div>
        </section>


        {/* 6. WHO IT IS FOR */}
        <section className="py-20 bg-white" id="who-it-is-for">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 text-center space-y-8">
              
              <div className="max-w-2xl mx-auto space-y-3">
                <span className="text-xs font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-3 py-1.5 rounded-full inline-block">
                  Universal Support
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                  Designed for Every Stage of Your Career Journey
                </h2>
                <p className="text-slate-400 font-sans text-sm">
                  Whether you are starting from secondary school or steering a transition, YodaAI adapts to your specific context.
                </p>
              </div>

              {/* Tag Pill List */}
              <div className="flex flex-wrap justify-center gap-3" id="audience-pills">
                {targetAudiences.map((audience) => (
                  <span
                    key={audience}
                    className="px-5 py-3 rounded-full bg-slate-950 border border-slate-800 text-sm font-semibold font-sans text-slate-300 hover:text-white hover:border-brand-blue hover:bg-brand-blue/5 transition-all cursor-default"
                  >
                    {audience}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </section>


        {/* 7. VISION / MISSION NARRATIVE BAND */}
        <section className="py-20 bg-white" id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left narrative content */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-1.5">
                  <RobotMascot size={28} />
                  <span className="text-xs font-bold tracking-widest text-brand-navy uppercase bg-gray-100 px-3 py-1.5 rounded-full">
                    About The Initiative
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-brand-navy tracking-tight">
                  Bridging the Career Guidance Gap in Africa
                </h2>
                <p className="text-gray-500 font-sans text-sm sm:text-base leading-relaxed">
                  iLEAD AFRICA prepared YodaAI as a strategic initiative to deploy cutting-edge digital literacy and operational support for career progression across youth demographics.
                </p>
                <p className="text-gray-500 font-sans text-sm sm:text-base leading-relaxed">
                  We believe technology should catalyze social and economic mobility. YodaAI acts as a personalized career buddy, bypassing standard systemic bottlenecks to deliver high-quality, instant curriculum review.
                </p>
              </div>

              {/* Right Vision / Mission Cards */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Vision Box */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-[#FAFBFC] border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 opacity-5">
                    <Target size={120} />
                  </div>
                  <h3 className="text-lg font-heading font-extrabold text-brand-navy mb-3 flex items-center gap-2">
                    <span className="p-2 bg-brand-green/10 rounded-lg text-brand-green"><Target size={18} /></span>
                    Our Vision
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans">
                    To become the most trusted digital career companion for students, graduates, young professionals, and job seekers by providing accessible, practical, and intelligent career support.
                  </p>
                </div>

                {/* Mission Box */}
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white to-[#FAFBFC] border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 opacity-5">
                    <Award size={120} />
                  </div>
                  <h3 className="text-lg font-heading font-extrabold text-brand-navy mb-3 flex items-center gap-2">
                    <span className="p-2 bg-brand-blue/10 rounded-lg text-brand-blue"><Award size={18} /></span>
                    Our Mission
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-sans">
                    To bridge the career guidance gap and empower young Africans with high-quality, instant, and personalized career-readiness tools to succeed in the modern workforce.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>


        {/* 8. TESTIMONIALS PLACEHOLDERS SECTION */}
        <section className="py-20 bg-[#FAFBFC]" id="testimonials">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-widest text-brand-blue uppercase bg-brand-blue/5 px-3 py-1.5 rounded-full inline-block mb-3">
                Early Praise
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-navy tracking-tight">
                Authentic Student & User <span className="text-accent-gradient">Feedback</span>
              </h2>
              <p className="mt-4 text-base text-gray-500 font-sans">
                Read how the YodaAI career readiness framework helps young Nigerians transform their profiles.
              </p>
            </div>

            {/* Testimonials Card Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-row">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <p className="text-xs font-sans text-gray-400 italic mb-6 leading-relaxed select-all">
                    {t.quote}
                  </p>
                  <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
                    <div>
                      <div className="font-heading font-bold text-xs text-brand-navy">
                        {t.authorType}
                      </div>
                      <div className="font-sans text-[10px] text-gray-400">
                        {t.institution}
                      </div>
                    </div>
                    {/* Tiny Mascot Motif Badge */}
                    <div className="bg-gray-50 p-1.5 rounded-lg border border-gray-100">
                      <RobotMascot size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Live feedback collector tool (For amazing UX craftsmanship) */}
            <div className="mt-16 max-w-xl mx-auto bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center space-y-4">
              <h3 className="font-heading font-bold text-sm text-brand-navy">
                Are you an iLEAD Scholar or student? Let us know what you think:
              </h3>
              
              {!feedbackSent ? (
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRatingClick(star)}
                      className="text-2xl hover:scale-125 transition-transform p-1 focus:outline-none cursor-pointer"
                      title={`Rate ${star} Stars`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-xs text-brand-green font-sans font-bold flex items-center justify-center gap-1.5"
                >
                  <CheckCircle size={14} /> Thank you! Your {rating}-star score helps our training optimization team.
                </motion.div>
              )}
            </div>

          </div>
        </section>


        {/* 9. FAQ ACCORDION */}
        <FAQAccordion />


        {/* 10. CTA / NEWSLETTER STRIP */}
        <section className="py-20 bg-brand-navy text-white relative overflow-hidden" id="contact">
          {/* Subtle background graphics */}
          <div className="absolute right-0 top-0 opacity-5 pointer-events-none translate-x-20 -translate-y-20">
            <RobotMascot size={400} />
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-8">
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="text-xs font-bold text-brand-green uppercase tracking-widest bg-brand-green/10 px-3.5 py-1.5 rounded-full inline-block">
                Get Onboarded Today
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight">
                Start Building a Stronger <span className="text-accent-gradient">Career Profile</span> Today
              </h2>
              <p className="text-sm sm:text-base text-slate-400 font-sans">
                Sign up for exclusive iLEAD Africa career workshops, direct recruitment alerts, and immediate alpha access when YodaAI rolls out locally.
              </p>
            </div>

            {/* Newsletter form with beautiful response state */}
            {!isSubmitted ? (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3" id="newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Enter your active email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 text-white text-sm px-5 py-4 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-blue placeholder-slate-500 font-sans"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent-gradient hover-accent-glow text-white font-sans font-bold text-sm px-6 py-4 rounded-xl cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  {isSubmitting ? 'Onboarding...' : 'Join YodaAI Free'} <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2"
                id="newsletter-success"
              >
                <div className="w-12 h-12 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={24} />
                </div>
                <h3 className="font-heading font-bold text-base text-white">Welcome to the Career Squad!</h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  We've logged your email successfully. You are now placed on our exclusive prioritization list for workshop invitations and platform alpha access.
                </p>
              </motion.div>
            )}

            {/* Extra trust details */}
            <p className="text-[10px] text-slate-500 font-sans">
              🔒 YodaAI values your privacy. We never share your data. Supported by iLEAD AFRICA.
            </p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
