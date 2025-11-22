'use client';

import React from 'react';
import { PromptInput } from './prompt-input';
import { ProjectCard } from './project-card';
import { Project } from '@/lib/types';
import { LogoIcon } from '@/lib/constants';

interface DashboardProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: (platform: 'web' | 'mobile') => void;
  isGenerating: boolean;
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  prompt, 
  setPrompt, 
  onGenerate, 
  isGenerating, 
  projects, 
  onOpenProject 
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <LogoIcon />
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Stitch AI</h1>
           </div>
           <div className="flex items-center gap-4">
               {/* Placeholder for future user profile or settings */}
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600"></div>
           </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        
        {/* Hero / Input Section */}
        <div className="max-w-3xl mx-auto mb-16 space-y-8">
           <div className="text-center space-y-4">
             <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">
               Design your <span className="text-blue-600">Interface</span>.
             </h2>
             <p className="text-lg text-gray-600">
               Describe your desired user interface, and we'll generate the code instantly.
             </p>
           </div>

           <PromptInput
             prompt={prompt}
             setPrompt={setPrompt}
             onGenerate={onGenerate}
             isGenerating={isGenerating}
           />
        </div>

        {/* Projects Section */}
        {projects.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Your Projects</h3>
              <span className="text-sm text-gray-500">{projects.length} project{projects.length !== 1 ? 's' : ''}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={() => onOpenProject(project)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Create your first UI by describing what you want to build above.</p>
          </div>
        )}
      </main>
    </div>
  );
};