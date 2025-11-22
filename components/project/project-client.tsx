'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PreviewWindow } from '../preview-window';
import { ChatInterface } from '../chat-interface';
import { loadProjects, saveProject } from '@/lib/db';
import { Project, GeneratedFile } from '@/lib/types';

interface ProjectClientProps {
  projectId: string;
}

interface GenerationResponse {
  files: GeneratedFile[];
  summary?: string;
  projectName?: string;
}

export const ProjectClient: React.FC<ProjectClientProps> = ({ projectId }) => {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'chat' | 'preview'>('preview');
  const [loading, setLoading] = useState(true);

  // Load project on mount
  useEffect(() => {
    const loadProject = async () => {
      try {
        const projects = await loadProjects();
        const foundProject = projects.find(p => p.id === projectId);
        
        if (!foundProject) {
          router.push('/dashboard');
          return;
        }
        
        setProject(foundProject);
      } catch (error) {
        console.error('Failed to load project:', error);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId, router]);

  const handleRefine = useCallback(async (refinementPrompt: string) => {
    if (!refinementPrompt.trim() || !project) return;
    
    setIsRefining(true);
    setError(null);
    
    try {
      const response = await fetch('/api/refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: refinementPrompt,
          currentFiles: project.files,
          platform: project.platform
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to refine UI');
      }

      const result: GenerationResponse = await response.json();
      
      // Update project with refined files
      const updatedProject: Project = {
        ...project,
        files: result.files,
        updatedAt: Date.now(),
        messages: [
          ...project.messages,
          {
            id: Date.now().toString(),
            role: 'user',
            content: refinementPrompt,
            timestamp: Date.now()
          },
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: result.summary || 'Refined your UI successfully!',
            timestamp: Date.now()
          }
        ]
      };

      await saveProject(updatedProject);
      setProject(updatedProject);
    } catch (error) {
      console.error('Refinement error:', error);
      setError(error instanceof Error ? error.message : 'Failed to refine UI');
    } finally {
      setIsRefining(false);
    }
  }, [project]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h1>
          <p className="text-gray-600 mb-4">The project you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Project Header */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{project.name}</h1>
              <p className="text-sm text-gray-500 capitalize">{project.platform} Project</p>
            </div>
          </div>

          {/* Mobile Tab Selector */}
          <div className="lg:hidden bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMobileTab('preview')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                mobileTab === 'preview'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setMobileTab('chat')}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                mobileTab === 'chat'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Chat
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex pt-28">
        {/* Preview Window */}
        <div className={`flex-1 ${mobileTab === 'chat' ? 'hidden lg:block' : ''}`}>
          <PreviewWindow project={project} />
        </div>

        {/* Chat Interface */}
        <div className={`w-full lg:w-96 border-l border-gray-200 ${mobileTab === 'preview' ? 'hidden lg:block' : ''}`}>
          <ChatInterface
            project={project}
            onRefine={handleRefine}
            isRefining={isRefining}
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};