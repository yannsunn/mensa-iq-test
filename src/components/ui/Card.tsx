'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: 'default' | 'glass' | 'solid' | 'gradient';
  hover?: boolean;
  active?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export default function Card({
  variant = 'default',
  hover = true,
  active = false,
  glow = false,
  children,
  className = '',
  ...props
}: CardProps) {
  const variants = {
    default: 'card',
    glass: 'card card-glass',
    solid: 'card card-solid',
    gradient: 'card card-gradient'
  };

  const cardClasses = `
    ${variants[variant]}
    ${active ? 'card-active' : ''}
    ${glow ? 'glow' : ''}
    ${hover ? 'hover-lift' : ''}
    ${className}
  `.trim();

  return (
    <motion.div
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}