export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface GeneratedFile {
  name: string; // e.g., 'index.html', 'profile.html'
  content: string;
}

export interface Project {
  id: string;
  name: string;
  platform: 'web' | 'mobile';
  createdAt: number;
  updatedAt: number;
  files: GeneratedFile[];
  messages: Message[];
}

export type View = 'landing' | 'dashboard' | 'project' | 'privacy' | 'terms';