import React from 'react';
import { Project } from '../../types';
import { GithubEmbed } from '../ui/GithubEmbed';
import { InteractiveGlass } from '../ui/InteractiveGlass';
import { SecureHandshake } from '../ui/SecureHandshake';
import { ProjectShell } from './ProjectShell';
import { SystemLog } from '../ui/SystemLog';
import { Cpu, Shield, Code, Server } from 'lucide-react';

export const TechnicalLayout: React.FC<{ project: Project }> = ({ project }) => (
  <ProjectShell project={project}>
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 font-mono">
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
        <div className="lg:col-span-8">
          <SecureHandshake />
          <p className="text-accent text-xs mb-4 font-bold tracking-widest uppercase">Registry_Entry::v2.0</p>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-8">{project.title}</h1>
        </div>
        <div className="lg:col-span-4 border-l border-white/10 pl-12 flex flex-col justify-end">
          <div className="space-y-4 text-xs uppercase tracking-widest text-slate-500 font-bold">
             <div className="flex justify-between border-b border-white/5 pb-2"><span>Status</span><span className="text-green-500">Active_Node</span></div>
             <div className="flex justify-between border-b border-white/5 pb-2"><span>Extraction</span><span className="text-white">Success</span></div>
             <div className="flex justify-between border-b border-white/5 pb-2"><span>ID_Signature</span><span className="text-white">{project.id}</span></div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-12">
          <InteractiveGlass className="p-8 rounded-xl border border-white/5">
            <h2 className="text-xs font-bold text-slate-600 mb-6 uppercase flex items-center gap-2">
              <Cpu size={14} className="text-accent" /> Neural_Logic_Core
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed font-light">
              {project.fullDescription || project.description}
            </p>
          </InteractiveGlass>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InteractiveGlass className="p-8 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={14} className="text-red-500" />
                <h3 className="text-xs font-bold text-red-500 uppercase">Challenge_Detected</h3>
              </div>
              <p className="text-sm text-slate-500 uppercase tracking-tight leading-loose">    
                {project.challenges || 'Optimizing recursive logic chains for maximum output efficiency within the void.'}
              </p>
            </InteractiveGlass>
            <InteractiveGlass className="p-8 border-accent/20 bg-accent/5 rounded-xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <Code size={14} className="text-accent" />
                <h3 className="text-xs font-bold text-accent uppercase">Surgical_Solution</h3> 
              </div>
              <p className="text-sm text-slate-300 uppercase tracking-tight leading-loose">    
                {project.solution || 'Deployment of a decentralized orchestration layer with real-time state synchronization.'}
              </p>
            </InteractiveGlass>
          </section>
        </div>
        <aside className="md:col-span-1 space-y-12">
          <section>
            <h2 className="text-[10px] font-bold text-slate-600 mb-6 uppercase tracking-[0.4em]">Node_Dependencies</h2>
            <div className="flex flex-wrap gap-2 mb-12">
              {project.techStack?.map((tech: string) => (
                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/5 rounded text-[9px] text-slate-400 uppercase tracking-widest">
                  {tech}
                </span>
              ))}
            </div>

            <h2 className="text-[10px] font-bold text-slate-600 mb-6 uppercase tracking-[0.4em]">Audit_Log::Live</h2>
            <SystemLog lines={[
              `Accessing node ${project.id}...`,
              `Handshake: Success`,
              `Mirroring registry: ${project.title}`,
              `Deployment: Production`,
              `Status: Synchronized`
            ]} />
          </section>
        </aside>
      </div>

      <section className="mt-32">
         <header className="flex items-center gap-4 mb-12">
            <Server size={18} className="text-slate-700" />
            <h2 className="text-xs font-bold text-slate-600 uppercase tracking-[0.3em]">Source_Infrastructure_Explorer</h2>
         </header>
         <GithubEmbed url={project.githubUrl} stats={project.stats} className="min-h-[600px]" />
      </section>
    </main>
  </ProjectShell>
);
