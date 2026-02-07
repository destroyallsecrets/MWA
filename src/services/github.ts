import { Project } from '../types';
import { projects as staticProjects } from '../data/projects';

export interface GithubRepoData {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
}

export const fetchGithubProjects = async (): Promise<Project[]> => {
  try {
    const token = import.meta.env.VITE_GITHUB_TOKEN || '';
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const response = await fetch('https://api.github.com/users/destroyallsecrets/repos?sort=updated&per_page=100', {
      headers
    });
    
    if (!response.ok) throw new Error(`Registry Handshake Failed: ${response.status}`);
    
    const repos: GithubRepoData[] = await response.json();

    // Filter for repos that have production sites (homepageUrl)
    const filteredRepos = repos
      .filter((repo: any) => repo.homepage && (repo.homepage.includes('vercel.app') || repo.homepage.includes('lovable.app') || repo.homepage.includes('github.io')))
      .slice(0, 12)
      .map((repo: GithubRepoData, index: number) => ({
        id: `OWSE-${(index + 1).toString().padStart(2, '0')}`,
        title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
        category: getCategoryForRepo(repo),
        description: repo.description || 'Official project registry entry synchronized with current production state.',
        fullDescription: repo.description ? `${repo.description}. Optimized for high-fidelity extraction via the OWSE Nexus.` : `Autonomous architectural node synchronized with the ${repo.name} repository. Part of the Outside We Stand Eternally production grid.`,
        year: new Date(repo.updated_at).getFullYear().toString(),
        color: getColorForLanguage(repo.language),
        role: 'Lead Architect',
        link: repo.homepage,
        githubUrl: repo.html_url,
        techStack: [repo.language, ...repo.topics].filter(Boolean),
        layoutType: getLayoutForRepo(repo),
        shapeType: getShapeForIndex(index),
        stats: {
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          issues: repo.open_issues_count
        }
      }));

    if (filteredRepos.length === 0) {
        return staticProjects;
    }

    return filteredRepos;
  } catch (error) {
    console.error('[NEXUS_ERROR]: Registry Sync Interrupted:', error);
    return staticProjects;
  }
};

const getColorForLanguage = (lang: string): string => {
  const colors: Record<string, string> = {
    TypeScript: '#22d3ee',
    JavaScript: '#fbbf24',
    Rust: '#f97316',
    Go: '#60a5fa',
    Python: '#34d399',
    HTML: '#f472b6',
    CSS: '#818cf8',
    'C++': '#ec4899',
    Solidity: '#818cf8',
    Swift: '#f97316'
  };
  return colors[lang] || '#94a3b8';
};

const getLayoutForRepo = (repo: any): 'classic' | 'immersive' | 'technical' | 'modern' => {
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();

  if (name.includes('agent') || name.includes('swarm') || name.includes('logic')) return 'modern';
  if (name.includes('ledger') || name.includes('orchestrator') || desc.includes('architecture')) return 'technical';
  if (name.includes('wave') || name.includes('scope') || name.includes('visual') || name.includes('3d')) return 'immersive';
  return 'classic';
};

const getCategoryForRepo = (repo: any): string => {
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  const topics = (repo.topics || []).map((t: string) => t.toLowerCase());

  const isMatch = (keys: string[]) => 
    keys.some(k => name.includes(k) || desc.includes(k) || topics.includes(k));

  if (isMatch(['agent', 'ai', 'intelligence', 'brain', 'neural', 'gemini', 'gpt', 'llm'])) return 'INTELLIGENCE';
  if (isMatch(['3d', 'three', 'webgl', 'visual', 'canvas', 'motion', 'interactive', 'immersive'])) return 'IMMERSIVE';
  if (isMatch(['server', 'api', 'backend', 'cloud', 'database', 'db', 'protocol', 'network', 'infrastructure'])) return 'INFRASTRUCTURE';
  if (isMatch(['tool', 'cli', 'utility', 'library', 'lib', 'plugin', 'extension', 'helper', 'generator'])) return 'UTILITIES';

  return 'APPLICATIONS';
};

const getShapeForIndex = (index: number): any => {
  const shapes: any[] = ['icosahedron', 'torus', 'octahedron', 'sphere', 'dodecahedron'];    
  return shapes[index % shapes.length];
};
