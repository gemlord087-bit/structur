
import React, { useState, useCallback, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { PreviewWindow } from './components/PreviewWindow';
import { ChatInterface } from './components/ChatInterface';
import { generateUI, refineUI } from './services/geminiService';
import { loadProjects, saveProject, deleteProject } from './services/db';
import { DEFAULT_FILES } from './constants';
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
    platform: 'web',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    files: DEFAULT_FILES,
    messages: []
  };

  const [projects, setProjects] = useState<Project[]>([defaultProject]);

  // Helper to get current project
  const activeProject = projects.find(p => p.id === activeProjectId) || null;

  // Load projects from DB on mount
  useEffect(() => {
      const fetchProjects = async () => {
          try {
              const savedProjects = await loadProjects();
              if (savedProjects.length > 0) {
                  // Check if default project exists in DB, if not, add it (or keep memory one if DB empty)
                  const hasDefault = savedProjects.some(p => p.id === 'default');
                  if (hasDefault) {
                      setProjects(savedProjects);
                  } else {
                      setProjects([defaultProject, ...savedProjects]);
                  }
              } else {
                  // Save default project to DB first time
                  await saveProject(defaultProject);
              }
          } catch (err) {
              console.error("Failed to load projects from DB", err);
          }
      };
      fetchProjects();
  }, []);

  // --- Actions ---

  // 1. Generate New Project (From Dashboard)
  const handleGenerateNew = useCallback(async (platform: 'web' | 'mobile') => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      // Simplified generation: 1 screen default, raw text response
      const data = await generateUI(prompt, platform);
      
      const newProject: Project = {
        id: crypto.randomUUID(),
        name: `New ${platform === 'web' ? 'Web' : 'Mobile'} Project`, // Default naming
        platform: platform,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        files: data.files,
        messages: []
      };

      // Save to DB and State
      await saveProject(newProject);
      setProjects(prev => [newProject, ...prev]);
      
      setPrompt(''); // Clear dashboard input
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

    // Optimistic update
    setProjects(prev => prev.map(p => p.id === activeProject.id ? updatedProjectState : p));
    // Background save optimistic state
    saveProject(updatedProjectState).catch(console.error);

    try {
      // Call API to refine code (intelligent handling of multiple files + summary)
      const { files: updatedFiles, summary } = await refineUI(
          activeProject.files, 
          messageContent,
          activeProject.platform
      );

      // Merge logic: Update existing files, add new ones
      const newFilesMap = new Map(updatedFiles.map(f => [f.name, f]));
      
      const mergedFiles = activeProject.files.map(f => {
          if (newFilesMap.has(f.name)) {
              const updated = newFilesMap.get(f.name)!;
              newFilesMap.delete(f.name); 
              return updated;
          }
          return f;
      });

      // Add any remaining new files that weren't in the original list
      const finalFiles = [...mergedFiles, ...Array.from(newFilesMap.values())];

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: summary || 'I have updated the design based on your request.',
        timestamp: Date.now()
      };

      const finalProjectState = {
        ...updatedProjectState,
        files: finalFiles,
        updatedAt: Date.now(),
        messages: [...updatedProjectState.messages, assistantMsg]
      };

      // Update project with new code and assistant response
      setProjects(prev => prev.map(p => {
        if (p.id === activeProject.id) {
          return finalProjectState;
        }
        return p;
      }));

      // Save final state to DB
      await saveProject(finalProjectState);

    } catch (err: any) {
      setError(err.message || 'Failed to refine design');
      // Add error message to chat
      const errorMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Sorry, I encountered an error while trying to update the design.',
        timestamp: Date.now()
      };
      
      const errorProjectState = {
          ...updatedProjectState,
           messages: [...updatedProjectState.messages, errorMsg]
      };

      setProjects(prev => prev.map(p => {
        if (p.id === activeProject.id) {
          return errorProjectState;
        }
        return p;
      }));
      
      saveProject(errorProjectState).catch(console.error);
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
                files={activeProject.files}
                platform={activeProject.platform}
                isLoading={isRefining} 
                error={error}
             />
           )}
        </div>
    </main>
  );
};

export default App;
