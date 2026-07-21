import React, { useState } from 'react';
import { MessageSquare, X, RotateCw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RobotMascot } from './RobotMascot';

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" id="yoda-chatbot-widget">
      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-[92vw] sm:w-[400px] h-[550px] bg-[#0b1120] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col mb-4 origin-bottom-right"
            id="yoda-chat-window"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <RobotMascot size={28} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand-green border-2 border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-sm text-white flex items-center gap-1">
                    YodaAI <span className="bg-accent-gradient text-[8px] text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Buddy</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-sans flex items-center gap-1">
                    Online & Ready
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRefresh}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Restart chat conversation"
                  id="chatbot-btn-refresh"
                >
                  <RotateCw size={14} />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Close chat panel"
                  id="chatbot-btn-close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Iframe Body (Completely isolated context) */}
            <div className="flex-1 bg-slate-950 relative">
              <iframe
                key={iframeKey}
                src="/chatbot.html"
                className="w-full h-full border-none"
                title="YodaAI Conversation Context"
                sandbox="allow-scripts allow-same-origin"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer relative group ${
          isOpen
            ? 'bg-slate-800 text-white border border-slate-700'
            : 'bg-accent-gradient hover-accent-glow text-white'
        }`}
        title={isOpen ? "Close Chatbot" : "Chat with YodaAI Career Companion"}
        id="chatbot-fab-trigger"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative flex items-center justify-center"
            >
              {/* Little Mascot inside bubble when closed */}
              <div className="scale-90 transform group-hover:scale-100 transition-transform">
                <RobotMascot size={32} />
              </div>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-green border-2 border-white rounded-full animate-bounce"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
