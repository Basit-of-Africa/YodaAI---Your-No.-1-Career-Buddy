/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  category: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  authorType: string; // e.g. "[Student testimonial placeholder]"
  institution: string; // e.g. "[University Student, Nigeria]"
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'yoda';
  text: string;
  timestamp: string;
}

export interface ChatPrompt {
  id: string;
  label: string;
  userMessage: string;
  yodaResponse: string;
}
