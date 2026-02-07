import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative p-8 md:p-12 border border-white/5 bg-slate-900/20 backdrop-blur-sm transition-colors duration-500 hover:bg-slate-900/40 group ${className}`}>
      {/* Top Border Gradient Animation */}
      <div 
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"
      />
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`text-3xl md:text-5xl font-bold text-white tracking-tight group-hover:text-cyan-200 transition-colors ${className}`}>
    {children}
  </h3>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`text-xl text-slate-300 leading-relaxed font-light ${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mt-8 flex justify-end ${className}`}>
    {children}
  </div>
);
