'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Dashboard } from './dashboard';
import { PreviewWindow } from './preview-window';
import { ChatInterface } from './chat-interface';
import { LandingPage } from './landing-page';
import { PrivacyPolicy, TermsOfService } from './legal-pages';
import { loadProjects, saveProject, deleteProject } from '@/lib/db';
import { DEFAULT_FILES } from '@/lib/constants';
import { Project, View, Message, GeneratedFile } from '@/lib/types';

interface GenerationResponse {
  files: GeneratedFile[];
  summary?: string;
  projectName?: string;
}

export const AppClient: React.FC = () => {
  // State
  const [view, setView] = useState<View>('landing');
  const [prompt, setPrompt] = useState<string>('');
  const [activeProjectId, setActiveProjectId] = useState<string | null>('default');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'chat' | 'preview'>('preview');
  const [projects, setProjects] = useState<Project[]>([]);

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
  
  // Add Crypto Project as default for mobile demonstration
  const cryptoProject: Project = {
      id: 'crypto-mobile',
      name: 'Crypto Mobile App',
      platform: 'mobile',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      files: [
          {
             name: 'index.html',
             content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto App - Home</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
    </style>
</head>
<body class="bg-gray-950 text-white font-sans antialiased pb-24 min-h-screen">

    <!-- Top Header -->
    <header class="flex justify-between items-center px-6 py-6 sticky top-0 z-40 bg-gray-950/80 backdrop-blur-md">
        <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60" alt="User" class="w-full h-full object-cover">
            </div>
            <div>
                <p class="text-xs text-gray-400">Welcome back,</p>
                <p class="font-semibold text-sm">Alex Morgan</p>
            </div>
        </div>
        <button class="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition relative">
            <i data-lucide="bell" class="w-5 h-5 text-gray-300"></i>
            <span class="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-gray-800"></span>
        </button>
    </header>

    <!-- Main Content -->
    <main class="px-6 space-y-8">

        <!-- Balance Card -->
        <div class="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 shadow-2xl shadow-indigo-900/20">
            <!-- Background Pattern -->
            <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div class="absolute -left-10 bottom-0 w-32 h-32 bg-black/10 rounded-full blur-xl"></div>

            <div class="relative z-10">
                <p class="text-indigo-200 text-sm font-medium mb-1">Total Balance</p>
                <h1 class="text-4xl font-bold mb-2">$42,593.00</h1>
                <div class="flex items-center gap-2 bg-white/20 w-fit px-2 py-1 rounded-lg backdrop-blur-sm">
                    <i data-lucide="trending-up" class="w-4 h-4 text-green-300"></i>
                    <span class="text-xs font-semibold text-green-100">+2.4% ($1,204)</span>
                </div>

                <div class="grid grid-cols-4 gap-4 mt-8">
                    <button class="flex flex-col items-center gap-2 group">
                        <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition">
                            <i data-lucide="arrow-up-right" class="w-6 h-6 text-white"></i>
                        </div>
                        <span class="text-xs text-indigo-100">Send</span>
                    </button>
                    <button class="flex flex-col items-center gap-2 group">
                        <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition">
                            <i data-lucide="arrow-down-left" class="w-6 h-6 text-white"></i>
                        </div>
                        <span class="text-xs text-indigo-100">Receive</span>
                    </button>
                    <button class="flex flex-col items-center gap-2 group">
                        <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition">
                            <i data-lucide="credit-card" class="w-6 h-6 text-white"></i>
                        </div>
                        <span class="text-xs text-indigo-100">Buy</span>
                    </button>
                    <button class="flex flex-col items-center gap-2 group">
                        <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition">
                            <i data-lucide="arrow-left-right" class="w-6 h-6 text-white"></i>
                        </div>
                        <span class="text-xs text-indigo-100">Swap</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Watchlist -->
        <div>
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-bold">Watchlist</h2>
                <a href="#" class="text-sm text-indigo-400 hover:text-indigo-300">See All</a>
            </div>
            <div class="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                <!-- Bitcoin Card -->
                <div class="min-w-[150px] bg-gray-900 p-4 rounded-2xl border border-gray-800">
                    <div class="flex items-center gap-2 mb-3">
                        <div class="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                            <i data-lucide="bitcoin" class="w-5 h-5"></i>
                        </div>
                        <span class="font-bold text-sm">BTC</span>
                    </div>
                    <p class="text-gray-400 text-xs mb-1">Bitcoin</p>
                    <p class="font-bold text-lg mb-1">$29,432</p>
                    <p class="text-xs text-green-500 font-medium">+1.2%</p>
                </div>

                <!-- Ethereum Card -->
                <div class="min-w-[150px] bg-gray-900 p-4 rounded-2xl border border-gray-800">
                    <div class="flex items-center gap-2 mb-3">
                        <div class="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                            <i data-lucide="gem" class="w-5 h-5"></i>
                        </div>
                        <span class="font-bold text-sm">ETH</span>
                    </div>
                    <p class="text-gray-400 text-xs mb-1">Ethereum</p>
                    <p class="font-bold text-lg mb-1">$1,845</p>
                    <p class="text-xs text-green-500 font-medium">+0.8%</p>
                </div>

                <!-- Solana Card -->
                <div class="min-w-[150px] bg-gray-900 p-4 rounded-2xl border border-gray-800">
                    <div class="flex items-center gap-2 mb-3">
                        <div class="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                            <i data-lucide="zap" class="w-5 h-5"></i>
                        </div>
                        <span class="font-bold text-sm">SOL</span>
                    </div>
                    <p class="text-gray-400 text-xs mb-1">Solana</p>
                    <p class="font-bold text-lg mb-1">$24.50</p>
                    <p class="text-xs text-red-500 font-medium">-2.1%</p>
                </div>
            </div>
        </div>

        <!-- Recent Activity -->
        <div>
            <h2 class="text-lg font-bold mb-4">Recent Activity</h2>
            <div class="space-y-4">
                <!-- Item 1 -->
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                            <i data-lucide="arrow-down-left" class="w-6 h-6 text-green-400"></i>
                        </div>
                        <div>
                            <p class="font-semibold">Received BTC</p>
                            <p class="text-xs text-gray-400">Today, 10:45 AM</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-green-400">+0.045 BTC</p>
                        <p class="text-xs text-gray-500">+$1,245.00</p>
                    </div>
                </div>
                <!-- Item 2 -->
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                            <i data-lucide="coffee" class="w-6 h-6 text-orange-400"></i>
                        </div>
                        <div>
                            <p class="font-semibold">Starbucks</p>
                            <p class="text-xs text-gray-400">Yesterday, 2:30 PM</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-white">- $8.50</p>
                    </div>
                </div>
                <!-- Item 3 -->
                <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                            <i data-lucide="arrow-up-right" class="w-6 h-6 text-red-400"></i>
                        </div>
                        <div>
                            <p class="font-semibold">Sent ETH</p>
                            <p class="text-xs text-gray-400">Aug 24, 9:00 AM</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-white">-0.5 ETH</p>
                        <p class="text-xs text-gray-500">-$920.00</p>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 pb-safe pt-3 px-6 z-50">
        <div class="flex justify-between items-center pb-4">
            <a href="index.html" class="flex flex-col items-center gap-1 text-indigo-500">
                <i data-lucide="home" class="w-6 h-6"></i>
                <span class="text-[10px] font-medium">Home</span>
            </a>
            <a href="market.html" class="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition">
                <i data-lucide="bar-chart-2" class="w-6 h-6"></i>
                <span class="text-[10px] font-medium">Market</span>
            </a>
            <div class="relative -top-8">
                <button class="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/40 text-white hover:scale-105 transition">
                    <i data-lucide="arrow-left-right" class="w-7 h-7"></i>
                </button>
            </div>
            <a href="#" class="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition">
                <i data-lucide="wallet" class="w-6 h-6"></i>
                <span class="text-[10px] font-medium">Wallet</span>
            </a>
            <a href="#" class="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition">
                <i data-lucide="settings" class="w-6 h-6"></i>
                <span class="text-[10px] font-medium">Settings</span>
            </a>
        </div>
    </nav>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>`
          }
      ],
      messages: []
  };

  // Load projects on mount
  useEffect(() => {
    const initializeProjects = async () => {
      try {
        const loadedProjects = await loadProjects();
        
        // Check if default projects exist
        const hasDefault = loadedProjects.some(p => p.id === 'default');
        const hasCrypto = loadedProjects.some(p => p.id === 'crypto-mobile');
        
        const projectsToAdd = [];
        if (!hasDefault) projectsToAdd.push(defaultProject);
        if (!hasCrypto) projectsToAdd.push(cryptoProject);
        
        // Save default projects if they don't exist
        for (const project of projectsToAdd) {
          await saveProject(project);
        }
        
        // Reload projects
        const updatedProjects = await loadProjects();
        setProjects(updatedProjects);
      } catch (error) {
        console.error('Failed to load projects:', error);
        // Fallback to default projects
        setProjects([defaultProject, cryptoProject]);
      }
    };

    initializeProjects();
  }, []);

  const activeProject = projects.find(p => p.id === activeProjectId) || defaultProject;

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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate UI');
      }

      const result: GenerationResponse = await response.json();
      
      // Create new project
      const newProject: Project = {
        id: Date.now().toString(),
        name: result.projectName || `Generated ${platform} App`,
        platform,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        files: result.files,
        messages: [
          {
            id: Date.now().toString(),
            role: 'user',
            content: prompt,
            timestamp: Date.now()
          },
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: result.summary || 'Generated your UI successfully!',
            timestamp: Date.now()
          }
        ]
      };

      await saveProject(newProject);
      const updatedProjects = await loadProjects();
      setProjects(updatedProjects);
      setActiveProjectId(newProject.id);
      setView('project');
      setPrompt('');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsGenerating(false);
    }
  }, [prompt]);

  const handleRefine = useCallback(async (refinementPrompt: string) => {
    if (!refinementPrompt.trim() || !activeProject) return;
    
    setIsRefining(true);
    setError(null);
    
    try {
      const response = await fetch('/api/refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentFiles: activeProject.files,
          userPrompt: refinementPrompt,
          platform: activeProject.platform,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to refine UI');
      }

      const result: GenerationResponse = await response.json();
      
      // Update project
      const updatedProject: Project = {
        ...activeProject,
        files: result.files,
        updatedAt: Date.now(),
        messages: [
          ...activeProject.messages,
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
      const updatedProjects = await loadProjects();
      setProjects(updatedProjects);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsRefining(false);
    }
  }, [activeProject]);

  const handleOpenProject = useCallback((project: Project) => {
    setActiveProjectId(project.id);
    setView('project');
  }, []);

  const handleDeleteProject = useCallback(async (projectId: string) => {
    try {
      await deleteProject(projectId);
      const updatedProjects = await loadProjects();
      setProjects(updatedProjects);
      
      if (activeProjectId === projectId) {
        setActiveProjectId(updatedProjects[0]?.id || null);
        if (updatedProjects.length === 0) {
          setView('dashboard');
        }
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  }, [activeProjectId]);

  // Render based on current view
  switch (view) {
    case 'landing':
      return <LandingPage onGetStarted={() => setView('dashboard')} />;
    
    case 'dashboard':
      return (
        <Dashboard
          prompt={prompt}
          setPrompt={setPrompt}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          projects={projects}
          onOpenProject={handleOpenProject}
        />
      );
    
    case 'project':
      if (!activeProject) {
        setView('dashboard');
        return null;
      }
      
      return (
        <div className="flex h-screen bg-gray-50">
          {/* Desktop Layout */}
          <div className="hidden lg:flex flex-1">
            <div className="w-1/2 border-r border-gray-200">
              <ChatInterface
                project={activeProject}
                onRefine={handleRefine}
                isRefining={isRefining}
                error={error}
                onBack={() => setView('dashboard')}
                onDeleteProject={handleDeleteProject}
              />
            </div>
            <div className="w-1/2">
              <PreviewWindow project={activeProject} />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden flex-1 flex flex-col">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setMobileTab('chat')}
                className={`flex-1 py-3 px-4 text-sm font-medium ${
                  mobileTab === 'chat'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setMobileTab('preview')}
                className={`flex-1 py-3 px-4 text-sm font-medium ${
                  mobileTab === 'preview'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Preview
              </button>
            </div>
            
            {mobileTab === 'chat' ? (
              <ChatInterface
                project={activeProject}
                onRefine={handleRefine}
                isRefining={isRefining}
                error={error}
                onBack={() => setView('dashboard')}
                onDeleteProject={handleDeleteProject}
              />
            ) : (
              <PreviewWindow project={activeProject} />
            )}
          </div>
        </div>
      );
    
    case 'privacy':
      return <PrivacyPolicy onBack={() => setView('landing')} />;
    
    case 'terms':
      return <TermsOfService onBack={() => setView('landing')} />;
    
    default:
      return <LandingPage onGetStarted={() => setView('dashboard')} />;
  }
};