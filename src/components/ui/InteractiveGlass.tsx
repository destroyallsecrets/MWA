import React, { useRef, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface InteractiveGlassProps {
  children: React.ReactNode;
  className?: string;
}

export const InteractiveGlass: React.FC<InteractiveGlassProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    const width = rect.width || 1;
    const height = rect.height || 1;
    
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    
    const xPct = (mouseXPos / width) - 0.5;
    const yPct = (mouseYPos / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);

    // Set absolute mouse pos for the highlight spot
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const highlightX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const highlightY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`liquid-glass relative group ${className}`}
    >
      {/* Dynamic Highlight Spot */}
      <motion.div 
        style={{
          left: highlightX,
          top: highlightY,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/5 blur-[80px] rounded-full pointer-events-none z-0"
      />
      
      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};