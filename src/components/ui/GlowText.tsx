'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlowTextProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'rainbow';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export default function GlowText({
  children,
  variant = 'primary',
  size = 'md',
  className = ''
}: GlowTextProps) {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  const variants = {
    primary: 'text-gradient',
    accent: 'text-gradient-accent',
    rainbow: 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'
  };

  const glowStyles = {
    primary: { textShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
    accent: { textShadow: '0 0 20px rgba(16, 249, 163, 0.5)' },
    rainbow: { textShadow: '0 0 20px rgba(147, 51, 234, 0.5)' }
  };

  return (
    <motion.span
      className={`inline-block font-bold ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      style={glowStyles[variant]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.span>
  );
}