
import React from 'react';
import { PromptInput } from './PromptInput';
import { ProjectCard } from './ProjectCard';
import { Project } from '../types';
import { LogoIcon } from '../constants';

interface DashboardProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
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
               What do you want to <span className="text-blue-600">build</span> today?
             </h2>
             <p className="text-lg text-gray-600">
               Describe your UI idea, and we'll generate the code instantly.
             </p>
           </div>
           
           <div className="bg-white p-2 rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100">
             <PromptInput 
                prompt={prompt}
                setPrompt={setPrompt}
                onGenerate={onGenerate}
                isLoading={isGenerating}
             />
           </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Your Projects</h3>
                <span className="text-sm text-gray-500">{projects.length} Projects</span>
            </div>
            
            {projects.length === 0 && !isGenerating ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </div>
                    <p className="text-gray-500 text-lg">No projects yet. Start creating above!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isGenerating && (
                         <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-4 flex flex-col h-[280px] animate-pulse">
                            <div className="flex-1 bg-blue-50 rounded-lg mb-4 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                        </div>
                    )}
                    {projects.map(project => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            onClick={onOpenProject} 
                        />
                    ))}
                </div>
            )}
        </div>
      </main>
    </div>
  );
};
