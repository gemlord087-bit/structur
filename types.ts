
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  code: string;
  messages: Message[];
  previewUrl?: string; // For future use with thumbnail generation
}

export type View = 'dashboard' | 'project';
