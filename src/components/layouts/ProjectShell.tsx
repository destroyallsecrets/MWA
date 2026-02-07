import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '../SEO';
import { projects as staticProjects } from '../../data/projects';
import { Project } from '../../types';

interface ProjectShellProps {
  project: Project;
  children: React.ReactNode;
}

export const ProjectShell: React.FC<ProjectShellProps> = ({ project, children }) => {
  const location = useLocation();
  
  // Combine static and current dynamic projects for navigation sequence
  const allKnownProjects = React.useMemo(() => {
    const list = [...staticProjects];
    if (location.state?.project && !list.some(p => p.id === location.state.project.id)) {    
      list.push(location.state.project);
    }
    return list;
  }, [location.state?.project]);

  return (
    <div className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-primary overflow-x-hidden">
      <SEO title={project.title} description={project.description} />

      {/* Persistent Back Button */}
      <div className="fixed top-0 left-0 w-full p-6 z-50 pointer-events-none mix-blend-difference">
        <Link to="/" className="pointer-events-auto inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Work
        </Link>
      </div>

      <div className="relative z-10">
        {children}
      </div>

      {/* Shared Footer / Next Project */}
      <footer className="border-t border-white/10 py-32 px-6 text-center bg-slate-950/50 relative z-10">
         <p className="text-xs uppercase tracking-widest text-slate-500 mb-4 font-bold">Transmission Sequence Continued</p>
         {(() => {
           const currentIndex = allKnownProjects.findIndex(p => p.id === project.id);        
           const nextIndex = (currentIndex + 1) % allKnownProjects.length;
           const nextProject = allKnownProjects[nextIndex >= 0 ? nextIndex : 0];

           if (!nextProject) return null;

           return (
             <Link to={`/project/${nextProject.id}`} state={{ project: nextProject }}>       
               <h2 className="text-4xl md:text-8xl font-bold hover:text-accent cursor-pointer transition-all tracking-tighter hover:scale-105 duration-500 uppercase">
                 {nextProject.title}
               </h2>
             </Link>
           );
         })()}
      </footer>
    </div>
  );
};
