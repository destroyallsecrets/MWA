import React, { useState, useEffect, useRef } from 'react';
import { Experience3D } from './components/Experience3D';
import { SwissGrid } from './components/SwissGrid';
import { ProjectList } from './components/ProjectList';
import { ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll handler to drive 3D experience
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full bg-[#020617] text-white selection:bg-cyan-500 selection:text-black">
      
      {/* The 3D Background Layer */}
      <Experience3D scrollProgress={scrollProgress} />

      {/* Main Content Overlay */}
      <div ref={containerRef} className="relative z-10 w-full">
        
        {/* Hero Section */}
        <section className="min-h-screen relative">
          <SwissGrid />
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-50">
            <span className="text-[10px] tracking-[0.3em] uppercase">Initialize Descent</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </section>

        {/* Narrative / Philosophy Bridge */}
        <section className="py-32 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-2xl md:text-4xl font-light leading-relaxed tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600">
              "We do not build pages. We engineer gravitational fields for information."
            </h2>
          </div>
          {/* Decorative glowing orb behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none" />
        </section>

        {/* Projects Section */}
        <ProjectList />

        {/* Footer */}
        <footer className="relative py-24 px-6 border-t border-white/5 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end">
            <div>
              <h2 className="text-8xl font-bold tracking-tighter text-white/10 mb-8">
                FUTURE
              </h2>
              <div className="flex gap-8 text-xs uppercase tracking-widest text-slate-500">
                <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Github</a>
              </div>
            </div>
            <div className="mt-12 md:mt-0 text-right">
               <p className="text-sm text-slate-600 font-mono">
                 © 2024 MASTER WEB ARCHITECT<br/>
                 ZURICH / TOKYO / METAVERSE
               </p>
            </div>
          </div>
        </footer>

      </div>

      {/* Sticky Top Bar (Glass) */}
      <div className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none mix-blend-difference">
         <div className="font-bold tracking-tighter text-xl pointer-events-auto cursor-pointer">MWA</div>
         <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest pointer-events-auto">
            <button className="hover:underline">WORK</button>
            <button className="hover:underline">PHILOSOPHY</button>
            <button className="hover:underline">CONTACT</button>
         </div>
      </div>
    </div>
  );
};

export default App;
