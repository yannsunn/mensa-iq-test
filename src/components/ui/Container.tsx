'use client';

import React from 'react';

interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  children: React.ReactNode;
}

export default function Container({
  size = 'xl',
  className = '',
  children
}: ContainerProps) {
  const sizes = {
    sm: 'container-sm',
    md: 'container-md',
    lg: 'container-lg',
    xl: 'container-xl',
    '2xl': 'container-2xl'
  };

  return (
    <div className={`container ${sizes[size]} ${className}`.trim()}>
      {children}
    </div>
  );
}