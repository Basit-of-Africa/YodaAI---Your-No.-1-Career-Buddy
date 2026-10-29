/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Wrench, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  Mail, 
  ArrowRight, 
  RefreshCw 
} from 'lucide-react';
import { RobotMascot } from './RobotMascot';

interface MaintenancePageProps {
  onBypass?: () => void;
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

          {/* Status Pill */}
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-3.5 py-1.5 rounded-full text-xs font-medium text-amber-800 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span className="hidden sm:inline font-semibold">Active Maintenance</span>
              <span className="sm:hidden font-semibold">Maintenance</span>
            </div>
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
