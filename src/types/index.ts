export interface ProjectSystem {
  id: string;
  name: string;
  repoUrl: string;
  role: string;
  tagline: string;
  architecture: string;
  layer: 'Core API' | 'Central Ops' | 'Mobile Edge' | 'Security Shield';
  stack: string[];
  metrics: { label: string; value: string }[];
  securityHighlights: string[];
  description: string;
  codeSnippet: {
    filename: string;
    language: string;
    code: string;
  };
}

export interface WarStory {
  id: string;
  title: string;
  category: 'Reverse Engineering' | 'Legacy Modernization';
  period: string;
  challenge: string;
  solution: string;
  impact: string;
  before: string;
  after: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  achievements: string[];
  technologies: string[];
  badge?: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  bpm: number;
}
