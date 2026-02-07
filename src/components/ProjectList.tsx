import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import { fetchGithubProjects } from '../services/github';
import { Project } from '../types';
import { setActiveProject } from '../hooks/useActiveProject';
import { Cpu, Terminal, Activity, ChevronRight } from 'lucide-react';

export const ProjectList: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGithubProjects().then(data => {
      setDynamicProjects(data);
      setIsLoading(false);
    });
  }, []);
  
  const categories = ['ALL', ...new Set(dynamicProjects.filter(p => p?.category).map(p => p.category.toUpperCase()))];
  
  const filteredProjects = filter === 'ALL' 
    ? dynamicProjects 
    : dynamicProjects.filter(p => p.category?.toUpperCase() === filter);

  if (isLoading) {
    return (
      <div className="py-64 text-center">
        <div className="inline-block relative">
          <div className="w-24 h-24 border border-accent/20 border-t-accent rounded-full animate-spin mb-8" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Cpu className="text-accent animate-pulse" size={32} />
          </div>
        </div>
        <p className="text-[10px] font-mono text-accent uppercase tracking-[1em] animate-pulse">
          Syncing_Nexus_Registries...
        </p>
      </div>
    );
  }

  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-32 font-mono">
      {/* Terminal Style Header */}
      <header className="mb-32 border-l-2 border-accent pl-12 py-4">
        <div className="flex items-center gap-4 text-accent mb-4">
          <Terminal size={18} />
          <span className="text-xs font-bold tracking-widest uppercase">System::Repository_Browser</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8">
          SELECTED_WORKS
        </h2>
        <div className="flex flex-wrap gap-12 text-[10px] text-slate-500 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-green-500" />
            <span>Active_Nodes: {dynamicProjects.length}</span>
          </div>
          <div>Location: F://MWA/SRC/REGISTRY</div>
          <div>Status: Fully_Synchronized</div>
        </div>
      </header>

      {/* Control Strip (Filter) */}
      <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-12 border-b border-white/10 pb-8">
        <div className="w-full md:w-auto overflow-x-auto no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
          <div className="flex flex-nowrap md:flex-wrap gap-8 text-[10px] font-bold tracking-widest uppercase">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`pb-2 border-b-2 transition-all whitespace-nowrap cursor-pointer ${filter === cat ? 'border-accent text-white' : 'border-transparent text-slate-600 hover:text-slate-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="text-[10px] text-slate-700 hidden md:block">
          SEC_LEVEL::UNRESTRICTED
        </div>
      </div>

      {/* The Nexus Menu */}
      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onMouseEnter={() => setActiveProject(project)}
              onMouseLeave={() => setActiveProject(null)}
              className="group relative"
            >
              <Link to={`/project/${project.id}`} state={{ project }}>
                <div className="liquid-glass rounded-xl p-8 md:p-12 transition-all duration-500 group-hover:border-accent/40 group-hover:translate-x-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    
                    {/* ID & Meta */}
                    <div className="md:col-span-2 border-r border-white/5 pr-8">
                      <span className="text-4xl font-bold text-white/10 group-hover:text-accent/20 transition-colors">
                        {project.id}
                      </span>
                      <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-widest">{project.year}</p>
                    </div>

                    {/* Title & Description */}
                    <div className="md:col-span-7">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tighter uppercase group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed max-w-2xl">
                        {project.description}
                      </p>
                    </div>

                    {/* CTA & Status */}
                    <div className="md:col-span-3 flex flex-col items-end gap-4">
                      <div className="hidden md:block text-right">
                        <p className="text-[9px] text-slate-700 uppercase tracking-[0.2em] mb-1">Status</p>
                        <p className="text-[10px] text-green-500 font-bold uppercase">Ready_For_Extraction</p>
                      </div>
                      <Button variant="neo" size="sm" className="w-full md:w-auto">
                        INITIALIZE_LINK <ChevronRight size={14} className="ml-2" />
                      </Button>
                    </div>

                  </div>
                </div>
              </Link>
              
              {/* Vertical Connector Line (Visual only) */}
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-white/10 group-hover:w-8 group-hover:bg-accent transition-all duration-500" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
