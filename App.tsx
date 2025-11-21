
import React, { useState, useCallback } from 'react';
import { Dashboard } from './components/Dashboard';
import { PreviewWindow } from './components/PreviewWindow';
import { ChatInterface } from './components/ChatInterface';
import { generateUI, refineUI } from './services/geminiService';
import { DEFAULT_CODE } from './constants';
import { Project, View, Message } from './types';

const App: React.FC = () => {
  // State
  const [view, setView] = useState<View>('dashboard');
  const [prompt, setPrompt] = useState<string>('');
  const [activeProjectId, setActiveProjectId] = useState<string | null>('default');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initial Project
  const defaultProject: Project = {
    id: 'default',
    name: 'Sunnydale Elementary',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    code: DEFAULT_CODE,
    messages: []
  };

  const [projects, setProjects] = useState<Project[]>([defaultProject]);

  // Helper to get current project
  const activeProject = projects.find(p => p.id === activeProjectId) || null;

  // --- Actions ---

  // 1. Generate New Project (From Dashboard)
  const handleGenerateNew = useCallback(async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const code = await generateUI(prompt);
      
      const newProject: Project = {
        id: crypto.randomUUID(),
        name: prompt.split(' ').slice(0, 4).join(' ') || 'Untitled Project', // Simple name generation
        createdAt: Date.now(),
        updatedAt: Date.now(),
        code: code,
        messages: []
      };

      setProjects(prev => [newProject, ...prev]);
      setPrompt(''); // Clear dashboard input
      // Optional: Automatically open the project? The prompt said "show the project below".
      // We will keep view as dashboard but the new project will appear in the list.
    } catch (err: any) {
      console.error(err);
      alert('Failed to generate project. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [prompt]);

  // 2. Refine Existing Project (From Chat)
  const handleRefineProject = useCallback(async (messageContent: string) => {
    if (!activeProject) return;

    setIsRefining(true);
    setError(null);

    // Add user message immediately
    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: messageContent,
      timestamp: Date.now()
    };

    const updatedProjectState = {
      ...activeProject,
      messages: [...activeProject.messages, userMsg]
    };

    // Optimistic update for UI to show user message
    setProjects(prev => prev.map(p => p.id === activeProject.id ? updatedProjectState : p));

    try {
      // Call API to refine code
      const refinedCode = await refineUI(activeProject.code, messageContent);

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'I have updated the design based on your request.',
        timestamp: Date.now()
      };

      // Update project with new code and assistant response
      setProjects(prev => prev.map(p => {
        if (p.id === activeProject.id) {
          return {
            ...p,
            code: refinedCode,
            updatedAt: Date.now(),
            messages: [...updatedProjectState.messages, assistantMsg]
          };
        }
        return p;
      }));

    } catch (err: any) {
      setError(err.message || 'Failed to refine design');
      // Add error message to chat
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error while trying to update the design.',
        timestamp: Date.now()
      };
      setProjects(prev => prev.map(p => {
        if (p.id === activeProject.id) {
          return {
             ...p,
             messages: [...updatedProjectState.messages, errorMsg]
          };
        }
        return p;
      }));
    } finally {
      setIsRefining(false);
    }
  }, [activeProject]);

  // Navigation
  const openProject = (project: Project) => {
    setActiveProjectId(project.id);
    setView('project');
    setError(null);
  };

  const goToDashboard = () => {
    setView('dashboard');
    setActiveProjectId(null);
    setError(null);
  };

  // --- Render ---

  if (view === 'dashboard') {
    return (
      <Dashboard 
        prompt={prompt}
        setPrompt={setPrompt}
        onGenerate={handleGenerateNew}
        isGenerating={isGenerating}
        projects={projects}
        onOpenProject={openProject}
      />
    );
  }

  // Project View
  return (
    <main className="h-[100dvh] w-screen flex flex-col md:grid md:grid-cols-12 bg-gray-50 overflow-hidden font-sans">
        {/* Left: Chat Interface */}
        <div className="md:col-span-3 lg:col-span-3 h-[40vh] md:h-full z-10 border-r border-gray-200 shadow-xl">
           {activeProject && (
             <ChatInterface 
                projectName={activeProject.name}
                messages={activeProject.messages}
                onSendMessage={handleRefineProject}
                isLoading={isRefining}
                onBack={goToDashboard}
             />
           )}
        </div>

        {/* Right: Preview Window */}
        <div className="md:col-span-9 lg:col-span-9 h-[60vh] md:h-full relative min-h-0">
           {activeProject && (
             <PreviewWindow 
                code={activeProject.code}
                isLoading={isRefining} // Show loading overlay on preview when refining
                error={error}
             />
           )}
        </div>
    </main>
  );
};

export default App;
