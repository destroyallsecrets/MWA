import React, { useState, useEffect, useRef } from 'react';

interface SystemLogProps {
  lines: string[];
  className?: string;
}

export const SystemLog: React.FC<SystemLogProps> = ({ lines, className = '' }) => {
  const [visibleLines, setVisibleLog] = useState<string[]>([]);
  const intervalRef = useRef<any>(null);

  // Stability Check: Only reset if the actual content of lines has changed
  const contentHash = lines.join('|');

  useEffect(() => {
    setVisibleLog([]);
    let currentLine = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (currentLine < lines.length) {
        setVisibleLog(prev => [...prev, lines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(intervalRef.current);
      }
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [contentHash]); // Use hash instead of array reference to prevent infinite loops

  return (
    <div className={`font-mono text-[10px] space-y-1 p-4 bg-black/40 border border-white/5 rounded overflow-hidden ${className}`}>
            {visibleLines.map((line, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-slate-700">[{new Date().toLocaleTimeString()}]</span>        
                <span className={line?.startsWith('!') ? 'text-red-500' : 'text-accent'}>
                  {line?.toUpperCase() || ''}
                </span>
              </div>
            ))}      <div className="w-1 h-3 bg-accent animate-pulse inline-block" />
    </div>
  );
};