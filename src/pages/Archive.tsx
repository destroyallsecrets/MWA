import React from 'react';
import { projects } from '../data/projects';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const Archive: React.FC = () => {
  const archivedProjects = projects.filter(p => p.isArchived);

  return (
    <div className="min-h-screen bg-primary pt-32 pb-24 px-6">
      <SEO title="Archive" description="Historical records and experimental prototypes." />
      
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 border-b border-white/10 pb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:text-accent transition-colors mb-8 text-white">
            <ArrowLeft className="w-4 h-4" /> Return to Nexus
          </Link>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">ARCHIVE</h1>
          <p className="text-slate-500 mt-4 max-w-2xl text-lg font-light italic">
            "We preserve the iterations. Every fragment is a lesson in gravitational architecture."
          </p>
        </header>

        {/* System Reports Section */}
        <section className="mb-32">
          <h2 className="text-[10px] font-bold text-accent mb-8 uppercase tracking-[0.5em] flex items-center gap-4">
            <span className="w-8 h-px bg-accent/30" /> Internal System Reports
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="liquid-glass p-8 rounded-xl border border-white/10 group hover:border-accent/50 transition-colors">
                <div className="flex justify-between items-start mb-6">
                   <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">REPORT_ID::V1_ARCH_REV</span>
                   <span className="text-[10px] font-mono text-accent uppercase">Final_Alpha</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">Unified Documentation Report</h3>
                <p className="text-sm text-slate-500 font-light mb-8 leading-relaxed">
                  A comprehensive architectural breakdown of the MWA framework, covering Möbius logic, Liquid Glass engine, and technical protocols.
                </p>
                <Link to="/report/v1-arch-rev">
                  <Button variant="neo" size="sm" className="w-full">
                    OPEN_TERMINAL_DOC
                  </Button>
                </Link>
             </div>

             <div className="liquid-glass p-8 rounded-xl border border-white/10 group hover:border-accent/50 transition-colors text-white">
                <div className="flex justify-between items-start mb-6">
                   <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">REPORT_ID::V1_DIAG_STAB</span>
                   <span className="text-[10px] font-mono text-red-500 uppercase">Critical_Fix</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter">System Diagnostic Report</h3>
                <p className="text-sm text-slate-500 font-light mb-8 leading-relaxed">
                  Post-Phase II diagnostic identifying root causes for layout failures and implementing the Registry ID Collision protocol.
                </p>
                <Link to="/report/v1-arch-rev"> {/* Reusing viewer for now */}
                  <Button variant="neo" size="sm" className="w-full">
                    OPEN_TERMINAL_DOC
                  </Button>
                </Link>
             </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 text-white">
          <div className="grid grid-cols-12 gap-4 text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-4 px-4">
            <div className="col-span-1">ID</div>
            <div className="col-span-2">Year</div>
            <div className="col-span-5">Project</div>
            <div className="col-span-4 text-right">Category</div>
          </div>
          
          {archivedProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-12 gap-4 items-center p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-accent/30 transition-all group"
            >
              <div className="col-span-1 text-xs font-mono text-slate-500">{project.id}</div>     
              <div className="col-span-2 text-xs font-mono">{project.year}</div>
              <div className="col-span-5">
                <Link to={`/project/${project.id}`}>
                  <Button variant="neo" size="sm" className="font-mono text-[9px] px-4 py-1">
                    ACCESS_RECORD::{project.id}
                  </Button>
                </Link>
              </div>
              <div className="col-span-4 text-right text-xs uppercase tracking-widest text-slate-500">
                {project.category}
              </div>
            </motion.div>
          ))}          
          {archivedProjects.length === 0 && (
            <p className="text-slate-500 text-center py-24 italic border border-dashed border-white/10">
              The archive is currently empty. All data is active.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Archive;
