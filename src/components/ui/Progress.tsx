'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'accent' | 'success';
  className?: string;
}

export default function Progress({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  variant = 'primary',
  className = ''
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const variants = {
    primary: 'bg-gradient-primary',
    accent: 'bg-gradient-accent',
    success: 'bg-gradient-to-r from-green-500 to-emerald-500'
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`progress ${sizes[size]}`}>
        <motion.div
          className={`progress-bar ${variants[variant]}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      {showLabel && (
        <div className="mt-2 text-sm text-text-secondary">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
}