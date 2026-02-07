import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { GithubEmbed } from '../ui/GithubEmbed';
import { InteractiveGlass } from '../ui/InteractiveGlass';
import { SecureHandshake } from '../ui/SecureHandshake';
import { ProjectShell } from './ProjectShell';
import { Zap } from 'lucide-react';

export const ImmersiveLayout: React.FC<{ project: Project }> = ({ project }) => (
  <ProjectShell project={project}>
    <main className="w-full">
      {/* Full Screen Hero */}
      <section className="h-screen w-full relative flex flex-col items-center justify-center p-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary z-10" /> 

        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center opacity-30">
          <Zap className="w-64 h-64 text-accent animate-pulse blur-xl" />
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative z-20"
        >
          <div className="flex justify-center mb-12"><SecureHandshake /></div>
          <p className="text-accent font-mono text-xs mb-4 tracking-[0.5em] uppercase">{project.category}</p>
          <h1 className="text-7xl md:text-[12rem] font-bold tracking-tighter leading-none mb-8 drop-shadow-2xl uppercase">
            {project.title.split(' ').map((word: string, i: number) => (
              <span key={i} className={i % 2 === 1 ? 'text-transparent stroke-text' : ''}>{word} </span>
            ))}
          </h1>
        </motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-6 space-y-32 py-32">
        <section className="text-center">
          <InteractiveGlass className="p-24 rounded-[4rem]">
            <p className="text-3xl md:text-5xl font-light leading-snug tracking-tight text-slate-300">
              {project.fullDescription || project.description}
            </p>
          </InteractiveGlass>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <GithubEmbed url={project.githubUrl} stats={project.stats} className="aspect-[3/4]" />
          <InteractiveGlass className="p-12 rounded-3xl flex flex-col justify-center">
             <div className="mb-12">
                <h3 className="text-3xl font-bold tracking-tighter uppercase text-white mb-4">Spatial_Interface</h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  The architecture for {project.title} was engineered to create a sense of weightless information flow. Every interaction is calculated to maintain the immersion of the user within the data stream.
                </p>
             </div>
             <div className="pt-8 border-t border-white/10">
                <p className="text-xs uppercase tracking-widest text-slate-600 mb-2 font-bold font-mono">Registry_Contributor</p>
                <p className="text-xl text-white uppercase font-bold">{project.role}</p>       
             </div>
          </InteractiveGlass>
        </section>
      </div>
    </main>
  </ProjectShell>
);
