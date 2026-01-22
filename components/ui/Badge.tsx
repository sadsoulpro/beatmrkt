import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'neon';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const baseStyle = "px-2.5 py-0.5 rounded-full text-xs font-medium font-mono backdrop-blur-md";
  
  const variants = {
    default: "bg-white/5 text-gray-300 border border-white/10 shadow-sm",
    outline: "border border-white/20 text-gray-400 bg-transparent",
    neon: "border border-neon/50 text-neon bg-neon/10 shadow-[0_0_10px_rgba(118,100,221,0.2)]",
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};