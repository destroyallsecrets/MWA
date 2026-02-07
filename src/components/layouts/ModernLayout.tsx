import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { GithubEmbed } from '../ui/GithubEmbed';
import { InteractiveGlass } from '../ui/InteractiveGlass';
import { SecureHandshake } from '../ui/SecureHandshake';
import { ProjectShell } from './ProjectShell';

export const ModernLayout: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <ProjectShell project={project}>
      <main className="max-w-7xl mx-auto px-6 pt-48 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Header Area */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SecureHandshake />
              <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-[0.8] mb-12 uppercase">
                {project.title}
              </h1>
              <div className="flex gap-12 text-[10px] font-mono uppercase tracking-[0.3em] text-accent font-bold">
                <span>ID::{project.id}</span>
                <span>Type::{project.category}</span>
                <span>Year::{project.year}</span>
              </div>
            </motion.div>
          </div>

          {/* Metadata Sidebar */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <InteractiveGlass className="p-8 rounded-2xl border border-white/5 bg-white/[0.01]">
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-2 font-bold">Role</p>
                  <p className="text-white font-bold uppercase">{project.role}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-2 font-bold">Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.slice(0, 4).map(t => (
                      <span key={t} className="px-2 py-0.5 bg-accent/10 border border-accent/20 rounded text-[9px] text-accent uppercase font-bold">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </InteractiveGlass>
          </div>

          {/* Description Section */}
          <div className="lg:col-span-12">
            <div className="h-px w-full bg-gradient-to-r from-accent/50 to-transparent mb-24" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <p className="text-3xl md:text-5xl font-light leading-snug tracking-tight text-slate-300">
                {project.fullDescription || project.description}
              </p>
              <div className="space-y-12">
                <GithubEmbed url={project.githubUrl} stats={project.stats} className="min-h-[400px]" />
              </div>
            </div>
          </div>

        </div>
      </main>
    </ProjectShell>
  );
};
