import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground">
      <div className="w-16 h-16 border-4 border-accent/20 border-t-accent rounded-full animate-spin mb-4" />
      <span className="text-xs font-mono tracking-[0.3em] uppercase animate-pulse">
        Initializing Void
      </span>
    </div>
  );
};
