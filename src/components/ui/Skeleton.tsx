'use client';

import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

const Skeleton = React.memo(function Skeleton({
  variant = 'text',
  width,
  height,
  className = ''
}: SkeletonProps) {
  const baseClasses = 'skeleton animate-pulse';

  const variantClasses = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg'
  };

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  if (variant === 'circular' && !height && width) {
    style.height = style.width;
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`.trim()}
      style={style}
    />
  );
});

export default Skeleton;