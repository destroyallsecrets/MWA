import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { GithubEmbed } from '../ui/GithubEmbed';
import { InteractiveGlass } from '../ui/InteractiveGlass';
import { SecureHandshake } from '../ui/SecureHandshake';
import { ProjectShell } from './ProjectShell';
import { Info } from 'lucide-react';

export const ClassicLayout: React.FC<{ project: Project }> = ({ project }) => (
  <ProjectShell project={project}>
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-24"
      >
        <SecureHandshake />
        <p className="text-accent font-mono text-sm mb-4">[{project.category}]</p>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 uppercase">{project.title}</h1>
        <div className="flex flex-wrap gap-12 text-xs uppercase tracking-[0.2em] text-slate-500 font-bold border-t border-white/10 pt-8">
          <div>
            <p className="text-slate-600 mb-1 font-mono">Year</p>
            <p className="text-white">{project.year}</p>
          </div>
          <div>
            <p className="text-slate-600 mb-1 font-mono">Role</p>
            <p className="text-white">{project.role || 'Lead Architect'}</p>
          </div>
          {project.link && (
            <div>
              <p className="text-slate-600 mb-1 font-mono">Link</p>
              <a href={project.link} target="_blank" rel="noreferrer" className="text-accent hover:underline">Live Site</a>
            </div>
          )}
        </div>
      </motion.header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
        <InteractiveGlass className="p-12 rounded-2xl">
          <div className="space-y-8">
            <div className="flex items-center gap-3 text-accent border-b border-white/5 pb-4"> 
              <Info size={18} />
              <h2 className="text-2xl font-bold uppercase tracking-tighter text-white">Project_Scope</h2>
            </div>
            <p className="text-xl text-slate-400 leading-relaxed font-light">
              {project.fullDescription || project.description}
            </p>
          </div>
        </InteractiveGlass>
        <GithubEmbed url={project.githubUrl} stats={project.stats} className="aspect-video" />
      </section>

      {project.techStack && (
        <section className="mt-32">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-[0.3em] mb-8">System_Stack::Dependencies</h2>
          <div className="flex flex-wrap gap-4">
            {project.techStack.map((tech: string) => (
              <InteractiveGlass key={tech} className="px-6 py-3 rounded-full border-none">     
                <span className="text-xs font-mono text-white whitespace-nowrap uppercase tracking-widest">
                  {tech}
                </span>
              </InteractiveGlass>
            ))}
          </div>
        </section>
      )}
    </main>
  </ProjectShell>
);
