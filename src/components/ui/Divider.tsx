'use client';

import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'gradient' | 'dashed';
  className?: string;
}

const Divider = React.memo(function Divider({
  orientation = 'horizontal',
  variant = 'default',
  className = ''
}: DividerProps) {
  const baseClasses = orientation === 'horizontal' 
    ? 'w-full h-px my-8' 
    : 'h-full w-px mx-4';

  const variants = {
    default: 'bg-border-default',
    gradient: 'bg-gradient-to-r from-transparent via-border-default to-transparent',
    dashed: 'border-t border-dashed border-border-default bg-transparent'
  };

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${className}`.trim()}
      role="separator"
    />
  );
});

export default Divider;