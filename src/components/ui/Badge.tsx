'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = 'default',
  size = 'md',
  children,
  className = ''
}: BadgeProps) {
  const variants = {
    default: 'badge',
    primary: 'badge badge-primary',
    accent: 'badge badge-accent',
    success: 'badge bg-green-500/20 text-green-400',
    warning: 'badge bg-amber-500/20 text-amber-400',
    danger: 'badge bg-red-500/20 text-red-400'
  };

  const sizes = {
    sm: 'text-xs px-2 py-1',
    md: ''
  };

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`${variants[variant]} ${sizes[size]} ${className}`.trim()}
    >
      {children}
    </motion.span>
  );
}