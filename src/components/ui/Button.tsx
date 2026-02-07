import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'neo';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-white text-primary hover:bg-accent hover:text-primary",
    outline: "border border-white/20 text-white hover:border-accent hover:text-accent bg-transparent",
    ghost: "text-slate-500 hover:text-accent bg-transparent",
    neo: "border border-accent/50 text-accent hover:bg-accent hover:text-slate-950 bg-accent/5 px-12 relative overflow-hidden group"
  };

  const sizes = {
    sm: "h-8 px-4 text-[10px]",
    md: "h-12 px-8 text-xs",
    lg: "h-16 px-10 text-sm"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
