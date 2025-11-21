
import React, { useState, useCallback, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { PreviewWindow } from './components/PreviewWindow';
import { ChatInterface } from './components/ChatInterface';
import { LandingPage } from './components/LandingPage';
import { PrivacyPolicy, TermsOfService } from './components/LegalPages';
import { generateUI, refineUI } from './services/geminiService';
import { loadProjects, saveProject, deleteProject } from './services/db';
import { DEFAULT_FILES } from './constants';
import { Project, View, Message } from './types';

const App: React.FC = () => {
  // State
  const [view, setView] = useState<View>('landing');
  const [prompt, setPrompt] = useState<string>('');
  const [activeProjectId, setActiveProjectId] = useState<string | null>('default');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'chat' | 'preview'>('preview');

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
          },
          {
              name: 'market.html',
              content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto App - Market</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="bg-gray-950 text-white font-sans antialiased pb-24 min-h-screen">

    <!-- Header -->
    <header class="px-6 pt-6 pb-2 sticky top-0 bg-gray-950 z-40">
        <h1 class="text-2xl font-bold mb-4">Market</h1>
        
        <!-- Search Bar -->
        <div class="relative mb-4">
            <i data-lucide="search" class="absolute left-4 top-3.5 w-5 h-5 text-gray-500"></i>
            <input type="text" placeholder="Search coin pairs" class="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-600">
        </div>

        <!-- Filter Tabs -->
        <div class="flex gap-4 overflow-x-auto no-scrollbar">
            <button class="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-full whitespace-nowrap">All Assets</button>
            <button class="px-5 py-2 bg-gray-900 border border-gray-800 text-gray-400 text-sm font-medium rounded-full whitespace-nowrap">Top Gainers</button>
            <button class="px-5 py-2 bg-gray-900 border border-gray-800 text-gray-400 text-sm font-medium rounded-full whitespace-nowrap">Top Losers</button>
            <button class="px-5 py-2 bg-gray-900 border border-gray-800 text-gray-400 text-sm font-medium rounded-full whitespace-nowrap">New</button>
        </div>
    </header>

    <!-- Coin List -->
    <main class="px-6 mt-4 space-y-1">
        
        <!-- Header Row -->
        <div class="flex justify-between text-xs text-gray-500 px-2 pb-2">
            <span>Asset</span>
            <div class="flex gap-8">
                <span>Chart</span>
                <span>Price</span>
            </div>
        </div>

        <!-- Coin Item: BTC -->
        <div class="py-4 border-b border-gray-800/50 flex items-center justify-between group hover:bg-gray-900/30 rounded-lg px-2 transition cursor-pointer">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                    <i data-lucide="bitcoin" class="w-6 h-6"></i>
                </div>
                <div>
                    <p class="font-bold">Bitcoin</p>
                    <p class="text-xs text-gray-500">BTC</p>
                </div>
            </div>
            <div class="w-20 h-10 flex items-center">
                <!-- Simplified Sparkline SVG -->
                <svg viewBox="0 0 100 40" class="w-full h-full stroke-green-500 stroke-2 fill-none">
                    <path d="M0,30 Q20,35 40,20 T80,10 T100,5" />
                </svg>
            </div>
            <div class="text-right">
                <p class="font-bold">$29,432.50</p>
                <div class="bg-green-500/10 px-2 py-0.5 rounded text-xs text-green-500 inline-block mt-1 font-medium">+1.24%</div>
            </div>
        </div>

        <!-- Coin Item: ETH -->
        <div class="py-4 border-b border-gray-800/50 flex items-center justify-between group hover:bg-gray-900/30 rounded-lg px-2 transition cursor-pointer">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <i data-lucide="gem" class="w-5 h-5"></i>
                </div>
                <div>
                    <p class="font-bold">Ethereum</p>
                    <p class="text-xs text-gray-500">ETH</p>
                </div>
            </div>
            <div class="w-20 h-10 flex items-center">
                <svg viewBox="0 0 100 40" class="w-full h-full stroke-green-500 stroke-2 fill-none">
                    <path d="M0,25 Q25,30 50,15 T100,10" />
                </svg>
            </div>
            <div class="text-right">
                <p class="font-bold">$1,845.20</p>
                <div class="bg-green-500/10 px-2 py-0.5 rounded text-xs text-green-500 inline-block mt-1 font-medium">+0.82%</div>
            </div>
        </div>

        <!-- Coin Item: SOL -->
        <div class="py-4 border-b border-gray-800/50 flex items-center justify-between group hover:bg-gray-900/30 rounded-lg px-2 transition cursor-pointer">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                    <i data-lucide="zap" class="w-5 h-5"></i>
                </div>
                <div>
                    <p class="font-bold">Solana</p>
                    <p class="text-xs text-gray-500">SOL</p>
                </div>
            </div>
            <div class="w-20 h-10 flex items-center">
                <svg viewBox="0 0 100 40" class="w-full h-full stroke-red-500 stroke-2 fill-none">
                    <path d="M0,10 Q30,5 50,20 T100,35" />
                </svg>
            </div>
            <div class="text-right">
                <p class="font-bold">$24.50</p>
                <div class="bg-red-500/10 px-2 py-0.5 rounded text-xs text-red-500 inline-block mt-1 font-medium">-2.10%</div>
            </div>
        </div>

        <!-- Coin Item: DOGE -->
        <div class="py-4 border-b border-gray-800/50 flex items-center justify-between group hover:bg-gray-900/30 rounded-lg px-2 transition cursor-pointer">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                    <i data-lucide="dog" class="w-5 h-5"></i>
                </div>
                <div>
                    <p class="font-bold">Dogecoin</p>
                    <p class="text-xs text-gray-500">DOGE</p>
                </div>
            </div>
            <div class="w-20 h-10 flex items-center">
                <svg viewBox="0 0 100 40" class="w-full h-full stroke-gray-500 stroke-2 fill-none opacity-50">
                    <path d="M0,20 L20,20 L30,15 L50,25 L80,20 L100,20" />
                </svg>
            </div>
            <div class="text-right">
                <p class="font-bold">$0.076</p>
                <div class="bg-gray-700 px-2 py-0.5 rounded text-xs text-gray-300 inline-block mt-1 font-medium">0.00%</div>
            </div>
        </div>

        <!-- Coin Item: MATIC -->
        <div class="py-4 border-b border-gray-800/50 flex items-center justify-between group hover:bg-gray-900/30 rounded-lg px-2 transition cursor-pointer">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                    <i data-lucide="hexagon" class="w-5 h-5"></i>
                </div>
                <div>
                    <p class="font-bold">Polygon</p>
                    <p class="text-xs text-gray-500">MATIC</p>
                </div>
            </div>
            <div class="w-20 h-10 flex items-center">
                <svg viewBox="0 0 100 40" class="w-full h-full stroke-green-500 stroke-2 fill-none">
                    <path d="M0,35 Q25,35 40,25 T100,5" />
                </svg>
            </div>
            <div class="text-right">
                <p class="font-bold">$0.65</p>
                <div class="bg-green-500/10 px-2 py-0.5 rounded text-xs text-green-500 inline-block mt-1 font-medium">+5.4%</div>
            </div>
        </div>

    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 pb-safe pt-3 px-6 z-50">
        <div class="flex justify-between items-center pb-4">
            <a href="index.html" class="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition">
                <i data-lucide="home" class="w-6 h-6"></i>
                <span class="text-[10px] font-medium">Home</span>
            </a>
            <a href="market.html" class="flex flex-col items-center gap-1 text-indigo-500">
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

  const [projects, setProjects] = useState<Project[]>([defaultProject, cryptoProject]);

  // Helper to get current project
  const activeProject = projects.find(p => p.id === activeProjectId) || null;

  // Load projects from DB on mount
  useEffect(() => {
      const fetchProjects = async () => {
          try {
              const savedProjects = await loadProjects();
              // Merge default projects with saved projects, ensuring no duplicates by ID
              const mergedProjects = [...savedProjects];
              
              if (!mergedProjects.some(p => p.id === 'default')) {
                  mergedProjects.push(defaultProject);
              }
              if (!mergedProjects.some(p => p.id === 'crypto-mobile')) {
                   mergedProjects.push(cryptoProject);
              }
              
              // Sort by updated desc
              mergedProjects.sort((a, b) => b.updatedAt - a.updatedAt);
              
              setProjects(mergedProjects);
              
              // Save defaults if they weren't there (lazy save)
              if (savedProjects.length === 0) {
                  saveProject(defaultProject);
                  saveProject(cryptoProject);
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
        name: data.projectName || `New ${platform === 'web' ? 'Web' : 'Mobile'} Interface`, // Use generated name or fallback
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

  // 3. Rename Project
  const handleRenameProject = useCallback(async (newName: string) => {
      if (!activeProject) return;
      
      const updatedProject = { ...activeProject, name: newName, updatedAt: Date.now() };
      
      // Update state
      setProjects(prev => prev.map(p => p.id === activeProject.id ? updatedProject : p));
      
      // Update DB
      await saveProject(updatedProject);
  }, [activeProject]);

  // Navigation
  const openProject = (project: Project) => {
    setActiveProjectId(project.id);
    setView('project');
    setError(null);
    setMobileTab('preview'); // Reset to default tab on mobile
  };

  const goToDashboard = (initialPrompt?: string) => {
    if (initialPrompt) {
        setPrompt(initialPrompt);
    }
    setView('dashboard');
    setActiveProjectId(null);
    setError(null);
  };

  // --- Render ---

  if (view === 'landing') {
    return (
      <LandingPage 
        onGetStarted={goToDashboard} 
        onViewPrivacy={() => setView('privacy')}
        onViewTerms={() => setView('terms')}
      />
    );
  }

  if (view === 'privacy') {
    return <PrivacyPolicy onBack={() => setView('landing')} />;
  }

  if (view === 'terms') {
    return <TermsOfService onBack={() => setView('landing')} />;
  }

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
        {/* Mobile Tab Navigation */}
        <div className="md:hidden flex items-center border-b border-gray-200 bg-white shrink-0 z-20">
            <button 
                onClick={() => goToDashboard()}
                className="p-3 text-gray-500 hover:bg-gray-100 border-r border-gray-100"
                title="Back to Dashboard"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <div className="flex flex-1 justify-around">
                <button 
                    onClick={() => setMobileTab('chat')}
                    className={`py-3 px-4 border-b-2 text-sm font-medium transition-colors ${
                        mobileTab === 'chat' 
                        ? 'border-blue-600 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Chat
                </button>
                <button 
                    onClick={() => setMobileTab('preview')}
                    className={`py-3 px-4 border-b-2 text-sm font-medium transition-colors ${
                        mobileTab === 'preview' 
                        ? 'border-blue-600 text-blue-600' 
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Preview
                </button>
            </div>
        </div>

        {/* Left Panel: Chat Interface */}
        <section className={`
            md:col-span-4 lg:col-span-3 md:flex flex-col h-full
            ${mobileTab === 'chat' ? 'flex' : 'hidden'}
        `}>
            {activeProject && (
                <ChatInterface 
                    messages={activeProject.messages}
                    onSendMessage={handleRefineProject}
                    isLoading={isRefining}
                    projectName={activeProject.name}
                    onRenameProject={handleRenameProject}
                    onBack={() => goToDashboard()}
                />
            )}
        </section>

        {/* Right Panel: Preview Window */}
        <section className={`
            md:col-span-8 lg:col-span-9 bg-gray-100 flex flex-col h-full overflow-hidden
            ${mobileTab === 'preview' ? 'flex' : 'hidden'}
        `}>
            {activeProject && (
                <PreviewWindow 
                    files={activeProject.files}
                    isLoading={isRefining}
                    error={error}
                    platform={activeProject.platform}
                />
            )}
        </section>
    </main>
  );
};

export default App;
