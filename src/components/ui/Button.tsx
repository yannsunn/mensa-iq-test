'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'size'> {
  variant?: 'primary' | 'secondary' | 'cta' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = React.memo(function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  loading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    cta: 'btn-cta',
    ghost: 'btn-ghost',
    danger: 'btn-danger'
  };

  const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  };

  const buttonClasses = `
    btn 
    ${variants[variant]} 
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${loading ? 'btn-loading' : ''}
    ${className}
  `.trim();

  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.99 }}
      transition={{ duration: 0.1 }}
      {...props}
    >
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className="w-4 h-4 mr-2 flex-shrink-0" />
      )}
      <span className={loading ? 'opacity-0' : ''}>
        {children}
      </span>
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className="w-4 h-4 ml-2 flex-shrink-0" />
      )}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </motion.button>
  );
});

export default Button;