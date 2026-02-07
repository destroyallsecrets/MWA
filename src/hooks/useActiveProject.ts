import { useState, useEffect } from 'react';
import { Project } from '../types';

type ProjectState = Project | null;

let activeProject: ProjectState = null;
const listeners = new Set<(p: ProjectState) => void>();

export const setActiveProject = (project: ProjectState) => {
  activeProject = project;
  listeners.forEach(l => l(project));
};

export const useActiveProject = () => {
  const [project, setProject] = useState<ProjectState>(activeProject);

  useEffect(() => {
    const l = (p: ProjectState) => setProject(p);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);

  return project;
};
