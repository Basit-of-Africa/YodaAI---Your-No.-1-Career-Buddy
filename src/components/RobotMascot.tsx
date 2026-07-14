/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface RobotMascotProps {
  className?: string;
  size?: number;
  withGradientBg?: boolean;
}

export const RobotMascot: React.FC<RobotMascotProps> = ({
  className = '',
  size = 40,
  withGradientBg = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform duration-300 hover:scale-105`}
      id="yoda-mascot-svg"
    >
      <defs>
        {/* Defined Brand Accent Gradient */}
        <linearGradient id="robotGradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2ECC71" />
          <stop offset="100%" stopColor="#2E86FF" />
        </linearGradient>
        
        {/* Dark Navy Base */}
        <linearGradient id="navyGradient" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0B1120" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>

        {/* Soft shadow */}
        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#2E86FF" floodOpacity="0.15" />
        </filter>
      </defs>

      {withGradientBg && (
        <circle cx="100" cy="100" r="95" fill="url(#robotGradient)" opacity="0.1" />
      )}

      {/* Robot Speech Bubble Body */}
      <g filter="url(#softShadow)">
        {/* Main bubble body: Rounded rectangle with a chat pointer at bottom-left */}
        <path
          d="M40 40H160C171.046 40 180 48.9543 180 60V140C180 151.046 171.046 160 160 160H80L45 185V160C33.9543 160 25 151.046 25 140V60C25 48.9543 33.9543 40 40 40Z"
          fill="url(#navyGradient)"
          stroke="url(#robotGradient)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </g>

      {/* Decorative Antenna */}
      <path
        d="M100 40V22"
        stroke="url(#robotGradient)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="100" cy="18" r="8" fill="url(#robotGradient)" />

      {/* Side Ears/Transceivers */}
      <rect x="15" y="85" width="10" height="30" rx="5" fill="url(#robotGradient)" />
      <rect x="175" y="85" width="10" height="30" rx="5" fill="url(#robotGradient)" />

      {/* Robot Eye Screen Grid */}
      <rect x="50" y="70" width="100" height="50" rx="10" fill="#070C18" />

      {/* Interactive/Friendly Glowing Eyes (incorporating green-blue gradient) */}
      <circle cx="75" cy="95" r="12" fill="#2ECC71" />
      <circle cx="75" cy="95" r="4" fill="#FFFFFF" />
      
      <circle cx="125" cy="95" r="12" fill="#2E86FF" />
      <circle cx="125" cy="95" r="4" fill="#FFFFFF" />

      {/* Digital Smile Waveform */}
      <path
        d="M85 135C90 142 110 142 115 135"
        stroke="url(#robotGradient)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Sparkle Accent Dot (AI/Intelligent feel) */}
      <path
        d="M145 55L148 61L154 64L148 67L145 73L142 67L136 64L142 61L145 55Z"
        fill="#2ECC71"
      />
    </svg>
  );
};
