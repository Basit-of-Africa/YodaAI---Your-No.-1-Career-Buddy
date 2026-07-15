/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { RobotMascot } from './RobotMascot';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Add shadow and track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial call to set status in case page starts scrolled
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-[#FAFBFC]/90 backdrop-blur-sm'
      }`}
    >
      {/* Slim Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100/50 z-50" id="scroll-progress-container">
        <div
          className="h-full bg-accent-gradient transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
          id="scroll-progress-bar"
        ></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <a href="#home" className="flex items-center gap-2 group" id="logo-link">
            <RobotMascot size={36} />
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-2xl tracking-tight text-brand-navy flex items-center">
                Yoda<span className="text-accent-gradient">AI</span>
              </span>
              <span className="text-[10px] font-sans font-semibold text-gray-500 uppercase tracking-widest leading-none">
                By iLEAD AFRICA
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans font-medium text-gray-600 hover:text-brand-blue transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Button */}
          <div className="hidden md:flex items-center" id="desktop-cta-wrapper">
            <a
              href="#contact"
              className="bg-accent-gradient hover-accent-glow text-white font-sans font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
              id="get-started-cta-desktop"
            >
              Get Started <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-brand-blue focus:outline-none p-2"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-fadeIn" id="mobile-nav-panel">
          <div className="px-4 pt-2 pb-6 space-y-3 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-blue transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 px-3">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-accent-gradient text-white font-sans font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm"
                id="get-started-cta-mobile"
              >
                Get Started <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
