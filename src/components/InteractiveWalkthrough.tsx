/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UploadCloud, 
  FileText, 
  TrendingUp, 
  Sparkles, 
  CheckSquare, 
  Play, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  MessageSquareQuote,
  RefreshCw
} from 'lucide-react';
import { RobotMascot } from './RobotMascot';

interface WalkthroughStep {
  id: string;
  number: string;
  title: string;
  shortDesc: string;
  icon: React.ReactNode;
}

export const InteractiveWalkthrough: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>('upload');
  
  // Step 1: Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  // Step 2: Assessment state
  const [showMetrics, setShowMetrics] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  // Step 3: Recommendation state
  const [isRewriting, setIsRewriting] = useState(false);
  const [bulletPointState, setBulletPointState] = useState<'original' | 'rewritten'>('original');

  // Step 4: Prep state
  const [checklist, setChecklist] = useState([
    { id: '1', text: 'Analyze job description & align transferable keywords', checked: false },
    { id: '2', text: 'Format 3 professional stories using the STAR method', checked: false },
    { id: '3', text: 'Draft 3 smart questions regarding iLEAD AFRICA mission', checked: false },
    { id: '4', text: 'Practice vocal pacing & body language with YodaAI audio', checked: false },
  ]);
  const [drillCompleted, setDrillCompleted] = useState(false);
  const [drillAnswer, setDrillAnswer] = useState('');
  const [drillFeedback, setDrillFeedback] = useState<string | null>(null);

  const steps: WalkthroughStep[] = [
    {
      id: 'upload',
      number: '01',
      title: 'CV Upload',
      shortDesc: 'Paste text or drag-and-drop secure resume files.',
      icon: <UploadCloud size={18} />,
    },
    {
      id: 'assessment',
      number: '02',
      title: 'AI Assessment',
      shortDesc: 'Instant alignment grades & metrics gap screening.',
      icon: <FileText size={18} />,
    },
    {
      id: 'rewrite',
      number: '03',
      title: 'Apply Edits',
      shortDesc: 'Transform task lists into metrics-focused achievements.',
      icon: <Sparkles size={18} />,
    },
    {
      id: 'prep',
      number: '04',
      title: 'Interview Drill',
      shortDesc: 'Simulate behavioral prep with STAR checklists.',
      icon: <CheckSquare size={18} />,
    },
  ];

  // Simulated CV Upload Action
  const handleSimulatedUpload = () => {
    if (isUploading) return;
    setIsUploading(true);
    setUploadProgress(0);
    setUploadedFile(null);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFile('Adewale_Okonjo_Resume.pdf');
          // Auto advance to assessment step after a brief pause
          setTimeout(() => {
            setActiveStep('assessment');
            handleStartAnalysis();
          }, 1200);
          return 100;
        }
        return prev + 10;
      });
    }, 120);
  };

  // Simulated AI Analysis Action
  const handleStartAnalysis = () => {
    setAnalyzing(true);
    setShowMetrics(false);
    setTimeout(() => {
      setAnalyzing(false);
      setShowMetrics(true);
    }, 1800);
  };

  // Simulated Rewrite Action
  const handleRewriteAction = () => {
    if (isRewriting) return;
    setIsRewriting(true);
    setTimeout(() => {
      setIsRewriting(false);
      setBulletPointState('rewritten');
    }, 1600);
  };

  // Toggle Checklist
  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  // Mock STAR Interview Drill Submit
  const handleDrillSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!drillAnswer.trim()) return;
    setDrillFeedback("Analyzing your story's STAR structure...");
    setTimeout(() => {
      setDrillFeedback(
        "Great work! Your answer covers 'Situation' and 'Action' well, but misses a clear 'Result' metric. Try adding: '...which ultimately increased our student workshop registration by 45%.' This makes it 10x more impactful!"
      );
      setDrillCompleted(true);
    }, 1500);
  };

  const resetAllSimulations = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setShowMetrics(false);
    setAnalyzing(false);
    setBulletPointState('original');
    setIsRewriting(false);
    setChecklist([
      { id: '1', text: 'Analyze job description & align transferable keywords', checked: false },
      { id: '2', text: 'Format 3 professional stories using the STAR method', checked: false },
      { id: '3', text: 'Draft 3 smart questions regarding iLEAD AFRICA mission', checked: false },
      { id: '4', text: 'Practice vocal pacing & body language with YodaAI audio', checked: false },
    ]);
    setDrillCompleted(false);
    setDrillAnswer('');
    setDrillFeedback(null);
    setActiveStep('upload');
  };

  return (
    <section className="py-20 bg-[#FAFBFC] border-y border-gray-100" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="pill text-xs font-bold tracking-widest text-brand-blue uppercase bg-brand-blue/5 px-3 py-1.5 mb-3 inline-block">
            Step-By-Step Walkthrough
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-navy tracking-tight">
            How YodaAI <span className="text-accent-gradient">Works</span>
          </h2>
          <p className="mt-4 text-base text-gray-500 font-sans">
            Follow this interactive walkthrough to see exactly how our platform polishes your career trajectory from draft to offer.
          </p>
        </div>

        {/* Step Tabs Indicator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10" id="walkthrough-tabs">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`text-left p-4 rounded-xl border font-sans transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isActive
                    ? 'border-brand-blue bg-white shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent-gradient"></div>
                )}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold tracking-widest uppercase ${
                    isActive ? 'text-brand-blue' : 'text-gray-400'
                  }`}>
                    Step {step.number}
                  </span>
                  <div className={`p-1 rounded-md ${
                    isActive ? 'bg-brand-blue/10 text-brand-blue' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-heading font-extrabold text-sm text-brand-navy mt-3">
                  {step.title}
                </h3>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-1 group-hover:text-gray-500 transition-colors">
                  {step.shortDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Interactive Workspace Area */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden min-h-[460px] grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left panel: Explanation & Steps (5 columns) */}
          <div className="lg:col-span-5 p-8 sm:p-10 bg-slate-900 text-slate-100 flex flex-col justify-between">
            <div className="space-y-6">
              
              <AnimatePresence mode="wait">
                {activeStep === 'upload' && (
                  <motion.div
                    key="desc-upload"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-4"
                  >
                    <div className="w-10 h-10 bg-brand-green/20 text-brand-green rounded-xl flex items-center justify-center">
                      <UploadCloud size={20} />
                    </div>
                    <h3 className="text-2xl font-heading font-extrabold text-white">01. Smart CV Extraction</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-sans">
                      Start your journey by uploading your current resume. YodaAI parses text, tags coordinates, and screens your structure directly against localized criteria requested by modern employers.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-brand-green flex-shrink-0" /> Supported file formats: PDF, DOCX, TXT.
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-brand-green flex-shrink-0" /> Zero-friction data stripping with SSL.
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-brand-green flex-shrink-0" /> Highly readable structural mapping.
                      </li>
                    </ul>
                  </motion.div>
                )}

                {activeStep === 'assessment' && (
                  <motion.div
                    key="desc-assessment"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-4"
                  >
                    <div className="w-10 h-10 bg-brand-blue/20 text-brand-blue rounded-xl flex items-center justify-center">
                      <FileText size={20} />
                    </div>
                    <h3 className="text-2xl font-heading font-extrabold text-white">02. Instant Assessment & Grading</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-sans">
                      Our system grades your CV summary, layout format, grammar clarity, and metrics distribution. YodaAI pinpoints exactly which areas need attention, giving you a detailed breakdown of what stands out.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-brand-blue flex-shrink-0" /> Metric distribution scoring.
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-brand-blue flex-shrink-0" /> Targeted keyword alignment match.
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-brand-blue flex-shrink-0" /> Real-time checklist generation.
                      </li>
                    </ul>
                  </motion.div>
                )}

                {activeStep === 'rewrite' && (
                  <motion.div
                    key="desc-rewrite"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-4"
                  >
                    <div className="w-10 h-10 bg-brand-green/20 text-brand-green rounded-xl flex items-center justify-center">
                      <Sparkles size={20} />
                    </div>
                    <h3 className="text-2xl font-heading font-extrabold text-white">03. Professional Bullet Edits</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-sans">
                      Passive wording weakens your CV. YodaAI transforms simple task statements (like "responsible for scheduling") into active, metrics-backed professional outcomes that demonstrate ownership.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-brand-green flex-shrink-0" /> Eliminates passive language cliché keywords.
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-brand-green flex-shrink-0" /> Adds measurable achievement values.
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-brand-green flex-shrink-0" /> Enhances structural presentation.
                      </li>
                    </ul>
                  </motion.div>
                )}

                {activeStep === 'prep' && (
                  <motion.div
                    key="desc-prep"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    className="space-y-4"
                  >
                    <div className="w-10 h-10 bg-brand-blue/20 text-brand-blue rounded-xl flex items-center justify-center">
                      <CheckSquare size={20} />
                    </div>
                    <h3 className="text-2xl font-heading font-extrabold text-white">04. Sector Interview Preparation</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-sans">
                      Finally, YodaAI generates mock interview questions specifically tailored to your target industry and experience. Run active drills based on STAR formulas to confidently tackle tough questions.
                    </p>
                    <ul className="space-y-2.5 text-xs text-slate-300 font-sans">
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-brand-blue flex-shrink-0" /> Tailored industry behavioral questions.
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-brand-blue flex-shrink-0" /> Structural STAR alignment feedback.
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle size={14} className="text-brand-blue flex-shrink-0" /> Personalized preparation checklists.
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Step navigation utilities */}
            <div className="pt-8 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={resetAllSimulations}
                className="text-xs font-sans font-bold text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                id="reset-simulation-btn"
              >
                <RefreshCw size={12} /> Restart Walkthrough
              </button>
              
              <div className="flex gap-2">
                <button
                  disabled={activeStep === 'upload'}
                  onClick={() => {
                    if (activeStep === 'assessment') setActiveStep('upload');
                    if (activeStep === 'rewrite') setActiveStep('assessment');
                    if (activeStep === 'prep') setActiveStep('rewrite');
                  }}
                  className="px-3 py-1.5 rounded bg-slate-800 text-xs font-bold text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Prev
                </button>
                <button
                  disabled={activeStep === 'prep'}
                  onClick={() => {
                    if (activeStep === 'upload') setActiveStep('assessment');
                    if (activeStep === 'assessment') setActiveStep('rewrite');
                    if (activeStep === 'rewrite') setActiveStep('prep');
                  }}
                  className="px-3 py-1.5 rounded bg-brand-blue text-xs font-bold text-white hover:bg-brand-blue/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>

          </div>

          {/* Right panel: Active Interactive Simulation Playground (7 columns) */}
          <div className="lg:col-span-7 p-6 sm:p-10 bg-gray-50 flex items-center justify-center">
            
            <AnimatePresence mode="wait">
              
              {/* Step 1: Upload Simulator */}
              {activeStep === 'upload' && (
                <motion.div
                  key="sim-upload"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center space-y-6"
                >
                  <div className="border-2 border-dashed border-gray-200 hover:border-brand-blue rounded-xl p-8 transition-colors relative group">
                    <input type="file" className="hidden" id="walkthrough-file" disabled />
                    
                    {!isUploading && !uploadedFile ? (
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-full bg-brand-blue/5 text-brand-blue flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                          <UploadCloud size={24} />
                        </div>
                        <div>
                          <p className="font-heading font-extrabold text-sm text-brand-navy">Drag & Drop Your CV Here</p>
                          <p className="text-xs text-gray-400 mt-1 font-sans">Supported formats: PDF, DOCX, TXT</p>
                        </div>
                        <button
                          onClick={handleSimulatedUpload}
                          className="px-5 py-2.5 rounded-lg bg-accent-gradient text-white text-xs font-bold hover:opacity-90 hover:scale-102 transition-all cursor-pointer inline-block"
                        >
                          Simulate CV Upload
                        </button>
                      </div>
                    ) : isUploading ? (
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-full bg-brand-blue/5 text-brand-blue flex items-center justify-center mx-auto animate-bounce">
                          <UploadCloud size={24} />
                        </div>
                        <div className="space-y-2">
                          <p className="font-heading font-bold text-xs text-brand-navy">Uploading resume file...</p>
                          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-accent-gradient h-full rounded-full transition-all duration-150"
                              style={{ width: `${uploadProgress}%` }}
                            ></div>
                          </div>
                          <span className="text-[10px] text-gray-400 font-semibold">{uploadProgress}%</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-12 h-12 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center mx-auto">
                          <CheckCircle size={24} />
                        </div>
                        <div>
                          <p className="font-heading font-bold text-sm text-brand-navy">{uploadedFile}</p>
                          <p className="text-xs text-brand-green mt-1 font-sans font-semibold">Upload completed securely!</p>
                        </div>
                        <p className="text-[10px] text-gray-400">Loading analysis workspace...</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
                    <ShieldCheck size={12} className="text-brand-green" /> SSL standard formatting protocol protection active
                  </div>
                </motion.div>
              )}

              {/* Step 2: Assessment Simulator */}
              {activeStep === 'assessment' && (
                <motion.div
                  key="sim-assessment"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                >
                  {/* CV Header Mockup */}
                  <div className="bg-slate-900 px-5 py-4 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-brand-blue" />
                      <span className="font-heading font-bold text-xs text-white">Adewale_Okonjo_Resume.pdf</span>
                    </div>
                    <span className="bg-brand-blue/20 text-brand-blue text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Parsed Draft
                    </span>
                  </div>

                  {/* Body area */}
                  <div className="p-5 space-y-4 min-h-[250px] flex flex-col justify-center">
                    
                    {analyzing && (
                      <div className="text-center space-y-4">
                        <RobotMascot size={50} className="mx-auto animate-pulse" />
                        <div className="space-y-1">
                          <p className="text-xs font-heading font-bold text-brand-navy">Scrutinizing text metrics...</p>
                          <p className="text-[10px] text-gray-400 font-sans">Matching with Nigerian corporate CV models</p>
                        </div>
                      </div>
                    )}

                    {!analyzing && !showMetrics && (
                      <div className="text-center space-y-4">
                        <p className="text-xs text-gray-400 font-sans">Click below to trigger YodaAI's instant structural screen analysis.</p>
                        <button
                          onClick={handleStartAnalysis}
                          className="px-5 py-2.5 rounded-lg bg-brand-blue text-white text-xs font-bold hover:bg-brand-blue/90 transition-all cursor-pointer"
                        >
                          Run Smart CV Assessment
                        </button>
                      </div>
                    )}

                    {!analyzing && showMetrics && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                      >
                        {/* Overall Score */}
                        <div className="flex items-center justify-between p-3.5 bg-red-50 border border-red-100 rounded-xl">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="text-red-500" size={18} />
                            <div>
                              <div className="text-xs font-heading font-extrabold text-brand-navy">YodaAI Structural Rating</div>
                              <div className="text-[10px] text-red-500 font-semibold font-sans">Needs measurable metrics & action verbs</div>
                            </div>
                          </div>
                          <span className="text-lg font-heading font-black text-red-500 bg-white px-2.5 py-1 rounded-lg shadow-sm">
                            C-
                          </span>
                        </div>

                        {/* Metrics bar breakdowns */}
                        <div className="space-y-2.5">
                          <div>
                            <div className="flex justify-between text-[10px] font-sans font-bold text-gray-600 mb-1">
                              <span>Action Words / Impact Phrases</span>
                              <span>40%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-red-400 h-full rounded-full" style={{ width: '40%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[10px] font-sans font-bold text-gray-600 mb-1">
                              <span>Quantifiable Metrics & Data</span>
                              <span>20%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-red-500 h-full rounded-full" style={{ width: '20%' }}></div>
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-[10px] font-sans font-bold text-gray-600 mb-1">
                              <span>Industry Keyword Alignment</span>
                              <span>75%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-brand-green h-full rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                        </div>

                        {/* Action feedback snippet */}
                        <div className="text-[11px] text-gray-500 italic font-sans border-t pt-2.5 flex items-start gap-1.5">
                          <RobotMascot size={16} className="mt-0.5" />
                          <span>"Your technical skills align well, but we need to convert passive task descriptions in Step 3!"</span>
                        </div>
                      </motion.div>
                    )}

                  </div>
                </motion.div>
              )}

              {/* Step 3: Rewrite Application Simulator */}
              {activeStep === 'rewrite' && (
                <motion.div
                  key="sim-rewrite"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-md bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4"
                >
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">
                    Statement Editor Panel
                  </div>

                  {/* Bullet comparison container */}
                  <div className="space-y-3">
                    
                    {/* Original state */}
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500 relative">
                      <span className="absolute top-2.5 right-3 bg-gray-200 text-gray-600 font-sans text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                        Original Bullet (Passive)
                      </span>
                      <p className="mt-1 font-sans">
                        "Responsible for managing customer service queries and scheduling meeting calendars."
                      </p>
                    </div>

                    {/* Rewritten state */}
                    <div className="p-4 bg-brand-blue/5 rounded-xl border border-brand-blue/10 text-xs text-brand-navy relative min-h-[60px] flex items-center">
                      <span className="absolute top-2.5 right-3 bg-brand-blue text-white font-sans text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                        YodaAI Polished (Active)
                      </span>
                      
                      {isRewriting ? (
                        <div className="flex items-center gap-1.5 text-gray-400">
                          <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          <span className="text-[10px] ml-1">Applying active verbs...</span>
                        </div>
                      ) : bulletPointState === 'rewritten' ? (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-1 font-sans font-semibold leading-relaxed"
                        >
                          "Resolved <span className="text-brand-green font-bold">95%+</span> of complex customer inquiries within <span className="text-brand-blue font-bold">4 hours</span>, and streamlined internal team schedules to boost administrative efficiency by <span className="text-brand-blue font-bold">20%</span>."
                        </motion.p>
                      ) : (
                        <p className="text-[10px] text-gray-400 italic">
                          Click below to watch YodaAI rewrite this statement using metrics & impact formulas.
                        </p>
                      )}
                    </div>

                  </div>

                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={handleRewriteAction}
                      disabled={isRewriting || bulletPointState === 'rewritten'}
                      className="px-5 py-2.5 rounded-lg bg-accent-gradient text-white text-xs font-bold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles size={12} /> Rewrite with YodaAI
                    </button>
                    {bulletPointState === 'rewritten' && (
                      <button
                        onClick={() => setBulletPointState('original')}
                        className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        Reset Statement
                      </button>
                    )}
                  </div>

                </motion.div>
              )}

              {/* Step 4: Interview Preparation Simulator */}
              {activeStep === 'prep' && (
                <motion.div
                  key="sim-prep"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-md bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5"
                >
                  <div className="border-b pb-3 border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">
                      STAR Prep & Mock Drill
                    </span>
                    <span className="bg-brand-green/15 text-brand-green text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Active Coaching
                    </span>
                  </div>

                  {/* Checklist mock */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-heading font-extrabold text-brand-navy mb-1.5">Sector Readiness Checklist:</p>
                    {checklist.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => toggleChecklistItem(item.id)}
                        className="w-full text-left flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors text-xs font-sans text-gray-600 cursor-pointer"
                      >
                        <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                          item.checked 
                            ? 'bg-brand-green border-brand-green text-white' 
                            : 'border-gray-300 bg-white'
                        }`}>
                          {item.checked && '✓'}
                        </span>
                        <span className={item.checked ? 'line-through text-gray-400 font-medium' : 'font-medium'}>
                          {item.text}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Tiny Text Input for interview drill */}
                  <div className="border-t pt-4 border-gray-100 space-y-3">
                    <p className="text-[11px] font-heading font-extrabold text-brand-navy">
                      🎤 Interactive Mock Question:
                    </p>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white leading-relaxed flex items-start gap-2">
                      <RobotMascot size={18} className="flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-brand-blue">YodaAI:</span> "Tell me about a time you handled a difficult project under a tight deadline."
                      </div>
                    </div>

                    {!drillCompleted ? (
                      <form onSubmit={handleDrillSubmit} className="space-y-2">
                        <textarea
                          placeholder="Type or simulate your structural response here..."
                          rows={2}
                          value={drillAnswer}
                          onChange={(e) => setDrillAnswer(e.target.value)}
                          className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-brand-blue text-brand-navy"
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={!drillAnswer.trim()}
                            className="px-4 py-2 bg-brand-blue text-white text-xs font-bold rounded-lg hover:bg-brand-blue/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          >
                            Submit Answer Drill
                          </button>
                          <button
                            type="button"
                            onClick={() => setDrillAnswer("In my last student project, our team leader fell sick 3 days before our presentation. I scheduled emergency sprints, distributed assignments, and we scored an A.")}
                            className="px-3 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            Fill Sample Answer
                          </button>
                        </div>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-900 font-sans leading-relaxed space-y-2"
                      >
                        <p className="font-semibold text-amber-800 flex items-center gap-1">
                          💡 YodaAI STAR Coaching Feedback:
                        </p>
                        <p>{drillFeedback}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setDrillCompleted(false);
                            setDrillAnswer('');
                            setDrillFeedback(null);
                          }}
                          className="text-[10px] font-bold text-brand-blue hover:underline focus:outline-none cursor-pointer"
                        >
                          Try another drill
                        </button>
                      </motion.div>
                    )}
                  </div>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
