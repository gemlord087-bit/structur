'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Dashboard } from '../dashboard';
import { loadProjects, saveProject, deleteProject } from '@/lib/db';
import { DEFAULT_FILES } from '@/lib/constants';
import { Project, GeneratedFile } from '@/lib/types';

interface GenerationResponse {
  files: GeneratedFile[];
  summary?: string;
  projectName?: string;
}

export const DashboardClient: React.FC = () => {
  // State
  const [prompt, setPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  // Check for initial prompt from landing page
  useEffect(() => {
    const initialPrompt = sessionStorage.getItem('initialPrompt');
    if (initialPrompt) {
      setPrompt(initialPrompt);
      sessionStorage.removeItem('initialPrompt');
    }
  }, []);

  // Load projects on mount
  useEffect(() => {
    const initializeProjects = async () => {
      try {
        const loadedProjects = await loadProjects();
        setProjects(loadedProjects);
      } catch (error) {
        console.error('Failed to load projects:', error);
        setError('Failed to load projects');
      }
    };

    initializeProjects();
  }, []);

  // Generate new project
  const handleGenerate = useCallback(async (platform: 'web' | 'mobile') => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, platform }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GenerationResponse = await response.json();

      if (!data.files || data.files.length === 0) {
        throw new Error('No files generated');
      }

      // Create new project
      const newProject: Project = {
        id: `project-${Date.now()}`,
        name: data.projectName || `Project ${new Date().toLocaleDateString()}`,
        platform: platform,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        files: data.files,
        messages: []
      };

      // Save project
      await saveProject(newProject);
      
      // Update projects list
      setProjects(prev => [newProject, ...prev]);
      
      // Clear prompt
      setPrompt('');
      
      // Navigate to new project
      window.location.href = `/project/${newProject.id}`;

    } catch (error) {
      console.error('Generation failed:', error);
      setError(error instanceof Error ? error.message : 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  }, [prompt]);

  // Delete project
  const handleDeleteProject = useCallback(async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (error) {
      console.error('Failed to delete project:', error);
      setError('Failed to delete project');
    }
  }, []);

  const handleProjectSelect = useCallback((projectId: string) => {
    // Navigate to project page using Next.js router
    window.location.href = `/project/${projectId}`;
  }, []);

  return (
    <Dashboard
      projects={projects}
      activeProjectId={null} // No active project on dashboard
      onProjectSelect={handleProjectSelect}
      onDeleteProject={handleDeleteProject}
      onGenerate={handleGenerate}
      prompt={prompt}
      onPromptChange={setPrompt}
      isGenerating={isGenerating}
      error={error}
      onClearError={() => setError(null)}
    />
  );
};