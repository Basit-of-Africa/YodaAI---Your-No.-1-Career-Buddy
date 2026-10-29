/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Mail, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  FileText, 
  RefreshCw,
  Eye,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { RobotMascot } from './RobotMascot';

interface MaintenancePageProps {
  onBypass: () => void;
  onToggleMaintenance?: (active: boolean) => void;
  isMaintenanceActive?: boolean;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({ 
  onBypass, 
  onToggleMaintenance,
  isMaintenanceActive = true 
}) => {
  // Live Countdown state (Targeting ~3 hours and 45 minutes from now)
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 42,
    seconds: 15
  });

  // Notification form state
  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState('Fresh Graduate');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showAdminDetails, setShowAdminDetails] = useState(false);

  // Live timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update document title for maintenance
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "🔧 Scheduled Maintenance | YodaAI by Future Forward";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubmitting(true);
    try {
      // Persist in localStorage and send to API if available
      const existing = JSON.parse(localStorage.getItem('yodaai_maintenance_subscribers') || '[]');
      existing.push({ email, role: userRole, timestamp: new Date().toISOString() });
      localStorage.setItem('yodaai_maintenance_subscribers', JSON.stringify(existing));

      // Attempt backend notify-subscriber sync (silent failover)
      try {
        await fetch('/api/notify-subscriber', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, role: userRole })
        });
      } catch {
        // Local persistence succeeded
      }

      setTimeout(() => {
        setSubmitting(false);
        setIsSubscribed(true);
      }, 600);
    } catch {
      setSubmitting(false);
      setIsSubscribed(true);
    }
  };

  const copyContactEmail = () => {
    navigator.clipboard.writeText('support@futureforward.org');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDownloadOfflineGuide = () => {
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 595.275 841.889] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 1200 >>
stream
BT
/F1 20 Tf
50 780 Td
(YODA-AI CAREER READINESS GUIDE) Tj
/F1 12 Tf
0 -30 Td
(Prepared by FUTURE FORWARD & YodaAI) Tj
0 -30 Td
(Your No. 1 Career Companion for offline success.) Tj
0 -40 Td
(1. CV & RESUME ASSESSMENT CHECKLIST) Tj
0 -25 Td
(- Metrics-Driven: Quantify your results (e.g. 'Increased sales by 15%').) Tj
0 -20 Td
(- Key-Words: Align resume terms with modern job listings.) Tj
0 -20 Td
(- Layout: Clean, un-cluttered, standard Helvetica, 1-2 pages maximum.) Tj
0 -20 Td
(- No Typos: Proof-read every single line before submitting.) Tj
0 -40 Td
(2. INTERVIEW PREPARATION MILESTONES) Tj
0 -25 Td
(- Sector Research: Study the company's core services and challenges.) Tj
0 -20 Td
(- STAR Method: Situation, Task, Action, Result for your stories.) Tj
0 -20 Td
(- Body Language: Confident posture, strong eye contact, clear tone.) Tj
0 -20 Td
(- Follow-up: Send a polite thank-you email within 24 hours.) Tj
0 -40 Td
(3. LINKEDIN & PERSONAL BRANDING STRATEGY) Tj
0 -25 Td
(- Headline: Craft a clear, keyword-rich headline showing your value.) Tj
0 -20 Td
(- Summary: Tell your professional story in the first person.) Tj
0 -20 Td
(- Network: Connect with industry peers and share relevant insights.) Tj
0 -40 Td
(For live AI CV review and interactive mock interviews, visit:) Tj
0 -20 Td
(https://yodaai-career-buddy.web.app) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000235 00000 n 
0000000302 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
1100
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'YodaAI_Career_Readiness_Guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const systems = [
    {
      name: "Gemini 2.5 Flash Career Intelligence Engine",
      description: "Upgrading to next-generation low-latency context window for deeper CV evaluations.",
      status: "completed",
      badge: "Completed",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      name: "ATS Resume Diagnostic Rubric (2026 Edition)",
      description: "Recalibrating high-impact action verbs and sector-specific metric benchmarks.",
      status: "in-progress",
      badge: "88% Finalizing",
      badgeClass: "bg-amber-50 text-amber-700 border-amber-200 animate-pulse"
    },
    {
      name: "STAR Behavioral Interview Simulator",
      description: "Optimizing situational scenario libraries for technical and panel evaluations.",
      status: "in-progress",
      badge: "In Progress",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      name: "Knowledge Vault & Candidate Privacy Sandbox",
      description: "Ensuring zero document retention and end-to-end encrypted session memory.",
      status: "completed",
      badge: "Secured",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAFBFC] text-slate-800 flex flex-col justify-between selection:bg-brand-blue/20 selection:text-brand-navy">
      {/* Top Header */}
      <header className="border-b border-gray-200/80 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <RobotMascot size={38} />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center">
                <Wrench size={9} className="text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-2xl tracking-tight text-brand-navy flex items-center">
                Yoda<span className="text-accent-gradient">AI</span>
              </span>
              <span className="text-[10px] font-sans font-semibold text-gray-500 uppercase tracking-widest leading-none">
                BY FUTURE FORWARD
              </span>
            </div>
          </div>

          {/* Status Pill & Bypass / Admin Controls */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-full text-xs font-medium text-amber-800">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span className="hidden sm:inline font-semibold">Active Maintenance</span>
              <span className="sm:hidden font-semibold">Maintenance</span>
            </div>

            {/* Admin Preview Mode Bypass */}
            <button
              onClick={onBypass}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm hover:shadow transition-all group"
              title="Preview the live website as an administrator/tester"
            >
              <Eye size={13} className="text-brand-green group-hover:scale-110 transition-transform" />
              <span>Preview Live Site</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Maintenance Body */}
      <main className="flex-grow py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Banner Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl border border-gray-200/90 shadow-xl shadow-slate-100/70 p-6 sm:p-10 lg:p-12 text-center relative overflow-hidden"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-[#2ECC71] to-[#2E86FF]"></div>

            {/* Central Icon Illustration */}
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto shadow-inner">
                <Wrench className="w-10 h-10 sm:w-12 sm:h-12 text-amber-600 animate-[spin_10s_linear_infinite]" />
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 bg-brand-blue rounded-full flex items-center justify-center text-white shadow-md">
                <Sparkles size={14} />
              </div>
            </div>

            {/* Headline */}
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 border border-amber-200 px-3.5 py-1 rounded-full text-xs font-semibold mb-4 tracking-wide">
              <span>SYSTEM UPGRADE IN PROGRESS</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-brand-navy tracking-tight max-w-2xl mx-auto leading-[1.15]">
              We're Fine-Tuning Yoda<span className="text-accent-gradient">AI</span> For Peak Performance
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed">
              <strong>Future Forward</strong> is performing scheduled infrastructure upgrades, model accuracy enhancements, and database calibrations to elevate your employability advisory experience.
            </p>

            {/* Live Progress Bar & Status */}
            <div className="mt-8 max-w-lg mx-auto bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
                <span className="flex items-center gap-1.5">
                  <RefreshCw size={13} className="text-brand-blue animate-spin" />
                  Overall Upgrade Progress
                </span>
                <span className="text-brand-blue font-bold">88% Completed</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-accent-gradient h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: '88%' }}
                ></div>
              </div>
              <p className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                <Clock size={11} className="text-slate-400" />
                Current stage: Stress testing conversational throughput & ATS scoring models.
              </p>
            </div>

            {/* Estimated Completion Live Countdown */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-3">
                Estimated Service Restoration Countdown
              </span>
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="bg-slate-900 text-white rounded-2xl px-4 py-3 min-w-[76px] shadow-sm">
                  <span className="text-2xl sm:text-3xl font-heading font-black text-brand-green">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] uppercase font-sans text-slate-400 font-semibold tracking-wider">Hours</span>
                </div>
                <span className="text-2xl font-bold text-slate-300">:</span>
                <div className="bg-slate-900 text-white rounded-2xl px-4 py-3 min-w-[76px] shadow-sm">
                  <span className="text-2xl sm:text-3xl font-heading font-black text-brand-blue">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] uppercase font-sans text-slate-400 font-semibold tracking-wider">Minutes</span>
                </div>
                <span className="text-2xl font-bold text-slate-300">:</span>
                <div className="bg-slate-900 text-white rounded-2xl px-4 py-3 min-w-[76px] shadow-sm">
                  <span className="text-2xl sm:text-3xl font-heading font-black text-amber-400">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="block text-[10px] uppercase font-sans text-slate-400 font-semibold tracking-wider">Seconds</span>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Notification Form Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 bg-gradient-to-br from-slate-900 to-[#0B1120] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-2xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-white/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                <Mail size={13} />
                Priority Reopening Alerts
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight">
                Get Notified The Instant We're Back
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Drop your email below and we'll dispatch an instant alert as soon as the YodaAI career sandbox is live.
              </p>

              {isSubscribed ? (
                <div className="mt-6 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4 text-emerald-300 text-sm flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                  <span>You're on the VIP list! We will ping you the moment YodaAI reopens.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your professional email address..."
                      required
                      className="flex-grow px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/60"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-accent-gradient hover:opacity-95 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
                    >
                      {submitting ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <span>Notify Me</span>
                          <ArrowRight size={14} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Role Tags Selection */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400">
                    <span className="text-slate-500">I am a:</span>
                    {['Fresh Graduate', 'University Student', 'Mid-Career Switcher', 'Job Seeker'].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setUserRole(role)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                          userRole === role
                            ? 'bg-brand-blue text-white font-semibold shadow-sm'
                            : 'bg-white/5 hover:bg-white/10 text-slate-300'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Two Columns: Systems Upgrade Status & Immediate Offline Value */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7 Columns: System Upgrades Checklist */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-7 shadow-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <Cpu className="text-brand-blue" size={20} />
                  <h3 className="font-heading font-bold text-lg text-brand-navy">
                    Platform Upgrade Checklist
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Live Diagnostics
                </span>
              </div>

              <div className="space-y-3.5">
                {systems.map((sys, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-2xl border border-gray-100 hover:border-gray-200 bg-slate-50/60 transition-all flex items-start gap-3"
                  >
                    <div className="mt-0.5 shrink-0">
                      {sys.status === 'completed' ? (
                        <CheckCircle2 size={18} className="text-emerald-500" />
                      ) : (
                        <RefreshCw size={18} className="text-amber-500 animate-spin" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-brand-navy">
                          {sys.name}
                        </h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sys.badgeClass}`}>
                          {sys.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {sys.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right 5 Columns: Immediate Offline Resource & Emergency Support */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Offline Career Guide Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/40 border border-emerald-200/80 rounded-3xl p-6">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                  <FileText className="text-emerald-600" size={20} />
                </div>
                <h4 className="font-heading font-bold text-base text-emerald-950">
                  Don't Let Maintenance Pause You
                </h4>
                <p className="text-xs text-emerald-800/80 mt-1 leading-relaxed">
                  Download our official offline <strong>Career Readiness & CV Assessment Checklist</strong> (PDF) for immediate self-study.
                </p>
                <button
                  onClick={handleDownloadOfflineGuide}
                  className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Download Free Readiness Guide</span>
                </button>
              </div>

              {/* Direct Support Card */}
              <div className="bg-white border border-gray-200/90 rounded-3xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="text-brand-blue" size={18} />
                  <h4 className="font-heading font-bold text-sm text-brand-navy">
                    Need Urgent Assistance?
                  </h4>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Our career advisory specialists at Future Forward remain available for urgent inquiries and interview advice.
                </p>

                <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-700">
                  <span className="font-mono text-[11px] truncate select-all">
                    support@futureforward.org
                  </span>
                  <button
                    onClick={copyContactEmail}
                    className="p-1.5 text-slate-500 hover:text-brand-blue transition-colors ml-2 shrink-0 rounded hover:bg-slate-200/60"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>

            </motion.div>

          </div>

          {/* Admin Control Bar for User/Reviewer Testing */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Maintenance Mode is <strong>ACTIVE</strong> for all incoming homepage links.</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAdminDetails(!showAdminDetails)}
                className="hover:text-slate-800 underline underline-offset-2 flex items-center gap-1"
              >
                <Sliders size={12} />
                <span>{showAdminDetails ? 'Hide Switch' : 'Maintenance Switch'}</span>
              </button>

              <button
                onClick={onBypass}
                className="text-brand-blue hover:text-blue-700 font-semibold underline underline-offset-2 flex items-center gap-1"
              >
                <span>Enter Live Homepage</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Admin Quick Switch Drawer */}
          <AnimatePresence>
            {showAdminDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-700 space-y-3"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold text-slate-900">Developer & Admin Maintenance State</p>
                    <p className="text-slate-500 text-[11px]">Toggle between the active Maintenance Page and the live application.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleMaintenance && onToggleMaintenance(!isMaintenanceActive)}
                      className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                        isMaintenanceActive 
                          ? 'bg-amber-500 text-white shadow-sm'
                          : 'bg-emerald-600 text-white shadow-sm'
                      }`}
                    >
                      {isMaintenanceActive ? 'Deactivate Maintenance (Go Live)' : 'Reactivate Maintenance Mode'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/80 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Future Forward. All rights reserved. YodaAI career advisory system.</p>
          <div className="flex items-center gap-4">
            <span>Server Status: Operational</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>Security: 256-bit TLS</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
