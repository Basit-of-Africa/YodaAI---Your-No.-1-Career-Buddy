/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FaqItem } from '../types';

export const FAQAccordion: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'Who is YodaAI designed for?',
      answer: 'YodaAI is built for job seekers at various stages: secondary school graduates, university and polytechnic students, fresh graduates, internship applicants, entry-level workers, and mid-career professionals looking to transition. If you are preparing to join the workforce or seeking career growth, YodaAI is your perfect buddy.',
    },
    {
      id: 'faq-2',
      question: 'Is YodaAI free to use?',
      answer: 'Yes! YodaAI is designed to be highly accessible. We provide robust free features—including instant CV review, checklist generation, and readiness assessments—to empower young Nigerians and Africans, aligning with iLEAD AFRICA\'s core belief that career guidance should not be locked behind a paywall.',
    },
    {
      id: 'faq-3',
      question: 'Does YodaAI guarantee that I will get a job?',
      answer: 'No, YodaAI is a career preparation and readiness platform. It does not directly provide job placement or guarantee employment. Instead, it acts as an intelligent coach—helping you craft a competitive, impact-focused CV, optimizing your professional brand, and preparing you to excel in interviews.',
    },
    {
      id: 'faq-4',
      question: 'How does YodaAI review and rewrite my CV?',
      answer: 'YodaAI analyzes your CV against standard industry matrices, identifying gaps in metrics, layout, structure, and readability. It then offers precise feedback (such as turning generic tasks into quantifiable achievements) and guides you on rewriting sections effectively.',
    },
    {
      id: 'faq-5',
      question: 'What is iLEAD AFRICA\'s involvement in YodaAI?',
      answer: 'YodaAI was designed and prepared for iLEAD AFRICA. iLEAD AFRICA is a registered youth-focused organization championing leadership education, career development, and structural capacity building for young Africans. YodaAI serves as the technology-driven carrier for iLEAD\'s career-readiness mandate.',
    },
  ];

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-20 bg-[#FAFBFC]" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-brand-blue uppercase bg-brand-blue/5 px-3 py-1.5 rounded-full inline-block mb-3">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-navy tracking-tight">
            Frequently Asked <span className="text-accent-gradient">Questions</span>
          </h2>
          <p className="mt-3 text-base text-gray-500 font-sans">
            Everything you need to know about YodaAI, your No. 1 career buddy.
          </p>
        </div>

        <div className="space-y-4" id="faq-list">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-brand-blue shadow-md shadow-brand-blue/5'
                    : 'border-gray-100 hover:border-gray-200 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <HelpCircle
                      className={`flex-shrink-0 transition-colors ${
                        isOpen ? 'text-brand-blue' : 'text-gray-400'
                      }`}
                      size={20}
                    />
                    <span className="font-heading font-bold text-base md:text-lg text-brand-navy">
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="text-brand-blue" size={20} />
                    ) : (
                      <ChevronDown className="text-gray-400 hover:text-brand-blue" size={20} />
                    )}
                  </div>
                </button>

                {/* Answer Area */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-gray-50' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-sm md:text-base text-gray-500 leading-relaxed font-sans bg-gray-50/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
