/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, User, ArrowRight, Laptop, RefreshCw } from 'lucide-react';
import { RobotMascot } from './RobotMascot';
import { ChatMessage, ChatPrompt } from '../types';

export const ChatWidgetMockup: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'yoda',
      text: "Hello! I'm Yoda, your No. 1 Career Buddy. 👋 I'm here to help you review your CV, prep for interviews, or build your personal brand. What can I do for you today?",
      timestamp: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [activePromptId, setActivePromptId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const prompts: ChatPrompt[] = [
    {
      id: 'cv-review',
      label: '📄 Review My CV Summary',
      userMessage: 'Can you review my CV summary? It feels a bit generic.',
      yodaResponse: 'Your current summary is clear, but it lacks measurable results. Instead of "Responsible for managing local events", try this formula: "Coordinated 4 major youth forums for iLEAD AFRICA, hosting over 500+ attendees and boosting post-event engagement by 35%." Numbers prove your competence instantly! 🚀',
    },
    {
      id: 'interview-prep',
      label: '🎤 Prep for a Job Interview',
      userMessage: 'I have a project coordinator interview tomorrow. How should I prepare?',
      yodaResponse: "Awesome! Let's focus on structural preparation. Practice the STAR method (Situation, Task, Action, Result) for behavioral questions. Expect this query: 'Tell me about a time you resolved a conflict within a team.' I've unlocked a personalized Interview Preparation Checklist for you. Would you like to view it? 📊",
    },
    {
      id: 'linkedin-brand',
      label: '✨ Optimize LinkedIn Profile',
      userMessage: 'How do I write a good headline as an entry-level professional?',
      yodaResponse: 'Avoid generic titles like "Job Seeker" or "Graduate"! Instead, write: "Aspiring Operations Associate | Project Coordinator | Passionate about Youth Leadership & Community Impact | Trained by iLEAD AFRICA." This targets exactly what recruiters search for! 🎯',
    },
    {
      id: 'career-change',
      label: '🔄 Transition My Career',
      userMessage: 'I want to transition from administration into digital marketing. Help!',
      yodaResponse: 'Transitioning is all about highlight mapping! We will translate your administrative scheduling and coordination experience into "campaign management" and "process optimization." Let\'s outline a 3-month action plan to develop your digital marketing portfolio today. 🗺️',
    },
  ];

  const handlePromptClick = (prompt: ChatPrompt) => {
    if (isTyping) return;
    setActivePromptId(prompt.id);

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: prompt.userMessage,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate YodaAI thinking and typing
    setTimeout(() => {
      const yodaMsg: ChatMessage = {
        id: `yoda-${Date.now()}`,
        sender: 'yoda',
        text: prompt.yodaResponse,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, yodaMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'init-1',
        sender: 'yoda',
        text: "Hello! I'm Yoda, your No. 1 Career Buddy. 👋 I'm here to help you review your CV, prep for interviews, or build your personal brand. What can I do for you today?",
        timestamp: 'Just now',
      },
    ]);
    setActivePromptId(null);
    setIsTyping(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <section className="py-16 bg-white border-y border-gray-100" id="chat-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-brand-blue uppercase bg-brand-blue/5 px-3 py-1.5 rounded-full inline-block mb-3">
            Interactive Product Preview
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-navy tracking-tight leading-tight">
            See YodaAI in <span className="text-accent-gradient">Real-Time</span> Action
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 font-sans">
            Click any career scenario below to experience the depth and specificity of YodaAI's career support immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Preset Prompts (Left on Desktop, Top on Mobile) */}
          <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
            <h3 className="text-lg font-heading font-bold text-brand-navy mb-4 flex items-center gap-2">
              <Sparkles className="text-brand-green" size={20} /> Select a Career Scenario:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {prompts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePromptClick(p)}
                  disabled={isTyping}
                  className={`text-left p-4 rounded-xl border font-sans transition-all duration-300 flex flex-col justify-between group ${
                    activePromptId === p.id
                      ? 'border-brand-blue bg-brand-blue/5 shadow-sm ring-1 ring-brand-blue'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 bg-white'
                  } ${isTyping ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="font-semibold text-sm text-brand-navy group-hover:text-brand-blue transition-colors">
                    {p.label}
                  </div>
                  <div className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
                    Try this interactive prompt <ArrowRight size={10} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-500 leading-relaxed">
              <p className="font-semibold text-brand-navy mb-1 flex items-center gap-1.5">
                💡 Did you know?
              </p>
              YodaAI provides personalized advice tailored to iLEAD Africa's career success framework, helping secondary graduates to mid-career transitioners build competitive profiles.
            </div>
          </div>

          {/* Chat Window Frame Mockup (Right on Desktop, Bottom on Mobile) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            {/* Device Mockup Shell */}
            <div className="bg-[#0B1120] rounded-2xl shadow-xl border border-slate-800 overflow-hidden" id="chat-mockup-frame">
              {/* Header bar */}
              <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Status Indicator & Name */}
                  <div className="relative">
                    <RobotMascot size={32} />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand-green border-2 border-slate-900 rounded-full"></span>
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-white flex items-center gap-1.5">
                      YodaAI <span className="bg-accent-gradient text-[9px] text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider scale-90">Mascot</span>
                    </h4>
                    <p className="text-[10px] text-slate-400 font-sans">Active & Ready to Assist</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={resetChat}
                    title="Reset simulated chat"
                    className="text-slate-400 hover:text-white p-1.5 rounded-md hover:bg-slate-800 transition-colors"
                  >
                    <RefreshCw size={14} />
                  </button>
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500 opacity-60"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-60"></span>
                    <span className="w-3 h-3 rounded-full bg-green-500 opacity-60"></span>
                  </div>
                </div>
              </div>

              {/* Chat Message Window Area */}
              <div className="h-[360px] overflow-y-auto p-5 space-y-4 bg-slate-950/80 scrollbar-thin scrollbar-thumb-slate-800 flex flex-col justify-between">
                <div className="space-y-4">
                  {messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex gap-3 max-w-[85%] animate-fadeIn ${
                        m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
                      }`}
                    >
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {m.sender === 'yoda' ? (
                          <div className="bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                            <RobotMascot size={22} />
                          </div>
                        ) : (
                          <div className="bg-brand-blue/10 text-brand-blue p-1.5 rounded-lg border border-brand-blue/20">
                            <User size={22} className="text-[#2E86FF]" />
                          </div>
                        )}
                      </div>

                      {/* Text Bubble */}
                      <div
                        className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                          m.sender === 'user'
                            ? 'bg-brand-blue text-white rounded-tr-none font-sans font-medium'
                            : 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none font-sans'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex gap-3 max-w-[85%] animate-pulse">
                      <div className="flex-shrink-0 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                        <RobotMascot size={22} />
                      </div>
                      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
              </div>

              {/* Message Input Strip */}
              <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Select a career scenario from the left to type..."
                  disabled
                  className="flex-1 bg-slate-950/70 border border-slate-800 text-slate-300 text-xs px-4 py-3 rounded-lg focus:outline-none placeholder-slate-500 font-sans cursor-not-allowed"
                />
                <button
                  disabled
                  className="bg-accent-gradient p-3 rounded-lg text-white opacity-80 cursor-not-allowed"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>

            {/* Showcase Caption */}
            <p className="text-center text-xs text-gray-400 mt-3 font-sans font-medium italic">
              * YodaAI is configured to provide direct interactive help. Actual UI screenshot mockup shown.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
