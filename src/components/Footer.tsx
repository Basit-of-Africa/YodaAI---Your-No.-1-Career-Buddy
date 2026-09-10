/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, MapPin, Phone, Github } from 'lucide-react';
import { RobotMascot } from './RobotMascot';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-navy border-t border-slate-800 text-slate-300" id="main-footer">
      {/* Top Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info (Col 1: span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#home" className="flex items-center gap-2 group">
              <RobotMascot size={40} />
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                  Yoda<span className="text-accent-gradient">AI</span>
                </span>
                <span className="text-[10px] font-sans font-semibold text-slate-400 uppercase tracking-widest leading-none">
                  BY FUTURE FORWARD
                </span>
              </div>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              YodaAI is Nigeria's No. 1 AI-powered digital career buddy. We support secondary graduates, students, fresh grads, and transitioning professionals with cv grading, mock interviews, and career readiness frameworks.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-green hover:text-brand-green transition-all"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-green hover:text-brand-green transition-all"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-blue hover:text-brand-blue transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-brand-blue hover:text-brand-blue transition-all"
                aria-label="Github"
              >
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links (Col 2: span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-slate-400">
              <li>
                <a href="#home" className="hover:text-brand-green transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-brand-green transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-brand-green transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-brand-green transition-colors">
                  About Future Forward
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-green transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Features (Col 3: span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
              Career Toolkit
            </h4>
            <ul className="space-y-2.5 text-sm font-sans text-slate-400">
              <li>
                <span className="hover:text-brand-blue transition-colors cursor-pointer flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> CV Review & Assessment
                </span>
              </li>
              <li>
                <span className="hover:text-brand-blue transition-colors cursor-pointer flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> Improvement Scoring
                </span>
              </li>
              <li>
                <span className="hover:text-brand-blue transition-colors cursor-pointer flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span> CV Rewriter Assistance
                </span>
              </li>
              <li>
                <span className="hover:text-brand-blue transition-colors cursor-pointer flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span> Interview Checklists
                </span>
              </li>
              <li>
                <span className="hover:text-brand-blue transition-colors cursor-pointer flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span> LinkedIn Profile Branding
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Legal (Col 4: span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
              FUTURE FORWARD
            </h4>
            <ul className="space-y-3.5 text-sm font-sans text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-brand-green mt-0.5 flex-shrink-0" />
                <span>
                  Abuja Office placeholder, Federal Capital Territory, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-brand-blue flex-shrink-0" />
                <a href="mailto:info@futureforward.org" className="hover:text-white transition-colors">
                  info@futureforward.org
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-brand-green flex-shrink-0" />
                <span>+234 (0) Placeholder Phone</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Strip */}
      <div className="border-t border-slate-800 bg-slate-950/40 py-6 text-xs text-center text-slate-500 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} YodaAI. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
          <p className="flex items-center gap-1">
            Built with ❤️ by <span className="text-slate-300 font-semibold">FUTURE FORWARD</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
