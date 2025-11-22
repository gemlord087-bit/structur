import React from 'react';
import { GeneratedFile } from './types';

export const LogoIcon: React.FC = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gem-blue">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const MagicWandIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2"
  >
    <path d="M15 4V2" />
    <path d="M15 10V8" />
    <path d="M12.5 6.5h-5" />
    <path d="m3 14 1.5-1.5" />
    <path d="m21 14-1.5-1.5" />
    <path d="m14.5 12.5 1 1" />
    <path d="m6 3 1 1" />
    <path d="m18 3-1 1" />
    <path d="M9.5 12.5 9 12" />
    <path d="M15 22v-4.5" />
    <path d="m12.5 17.5-2-2" />
    <path d="m17.5 17.5 2-2" />
    <path d="M12.5 12.5 15 10l-5-5-2.5 2.5L12.5 12.5Z" />
  </svg>
);

export const ClipboardIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);

const SUNNYDALE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sunnydale Elementary School</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Nunito', sans-serif;
        }
        .wave-shape {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            overflow: hidden;
            line-height: 0;
        }
        .wave-shape svg {
            position: relative;
            display: block;
            width: calc(100% + 1.3px);
            height: 60px;
        }
        .blob-shape {
            border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%;
        }
    </style>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#2563EB',   // Blue
                        secondary: '#F59E0B', // Amber
                        accent: '#10B981',    // Emerald
                        danger: '#EF4444',    // Red
                        brand: {
                            light: '#E0F2FE',
                            dark: '#1E3A8A',
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-white text-slate-700 overflow-x-hidden">

    <!-- Top Bar -->
    <div class="bg-brand-dark text-white py-2 text-sm hidden md:block">
        <div class="container mx-auto px-4 flex justify-between items-center">
            <div class="flex items-center space-x-6">
                <div class="flex items-center gap-2">
                    <i data-lucide="phone" class="w-4 h-4 text-secondary"></i>
                    <span>(555) 123-4567</span>
                </div>
                <div class="flex items-center gap-2">
                    <i data-lucide="mail" class="w-4 h-4 text-secondary"></i>
                    <span>office@sunnydale.edu</span>
                </div>
                <div class="flex items-center gap-2">
                    <i data-lucide="map-pin" class="w-4 h-4 text-secondary"></i>
                    <span>123 Sunshine Blvd, Springfield</span>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <a href="#" class="hover:text-secondary transition">Calendar</a>
                <a href="#" class="hover:text-secondary transition">Staff Directory</a>
                <a href="#" class="hover:text-secondary transition">Lunch Menu</a>
            </div>
        </div>
    </div>

    <!-- Navigation -->
    <nav class="bg-white shadow-md sticky top-0 z-50">
        <div class="container mx-auto px-4 py-3">
            <div class="flex justify-between items-center">
                <!-- Logo -->
                <a href="#" class="flex items-center gap-2 group">
                    <div class="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition duration-300">
                        <i data-lucide="sun" class="w-6 h-6"></i>
                    </div>
                    <div>
                        <h1 class="text-2xl font-extrabold text-brand-dark leading-none">Sunnydale</h1>
                        <span class="text-xs text-primary font-bold tracking-widest uppercase">Elementary</span>
                    </div>
                </a>

                <!-- Desktop Menu -->
                <div class="hidden lg:flex items-center space-x-8 font-bold text-slate-600">
                    <a href="#" class="text-primary hover:text-secondary transition">Home</a>
                    <a href="#" class="hover:text-primary transition">About Us</a>
                    <a href="#" class="hover:text-primary transition">Academics</a>
                    <a href="#" class="hover:text-primary transition">Admissions</a>
                    <a href="#" class="hover:text-primary transition">Student Life</a>
                    <a href="#" class="px-6 py-2 bg-primary text-white rounded-full hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2">
                        <i data-lucide="user" class="w-4 h-4"></i> Parent Portal
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <button onclick="document.getElementById('mobile-menu').classList.toggle('hidden')" class="lg:hidden p-2 text-slate-600 hover:text-primary">
                    <i data-lucide="menu" class="w-8 h-8"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Menu Dropdown -->
        <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-lg">
            <a href="#" class="block font-bold text-primary">Home</a>
            <a href="#" class="block font-bold text-slate-600">About Us</a>
            <a href="#" class="block font-bold text-slate-600">Academics</a>
            <a href="#" class="block font-bold text-slate-600">Admissions</a>
            <a href="#" class="block font-bold text-slate-600">Student Life</a>
            <a href="#" class="block w-full text-center py-3 bg-brand-dark text-white rounded-lg font-bold">Parent Portal Login</a>
        </div>
    </nav>

    <!-- Hero Section -->
    <header class="relative bg-brand-light pt-16 pb-32 overflow-hidden">
        <div class="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div class="space-y-6 text-center lg:text-left">
                <div class="inline-block px-4 py-1 bg-white text-secondary font-bold rounded-full text-sm shadow-sm mb-2">
                    Now Enrolling for Fall 2024! 🎒
                </div>
                <h2 class="text-4xl md:text-6xl font-extrabold text-brand-dark leading-tight">
                    Nurturing Minds, <br/>
                    <span class="text-primary">Building Futures.</span>
                </h2>
                <p class="text-lg md:text-xl text-slate-600 max-w-lg mx-auto lg:mx-0">
                    Welcome to Sunnydale Elementary, where every child is encouraged to dream, discover, and grow in a safe and inclusive environment.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    <a href="#" class="px-8 py-4 bg-secondary text-white font-bold rounded-full shadow-lg hover:bg-yellow-500 transition transform hover:-translate-y-1 flex justify-center items-center gap-2">
                        Schedule a Tour <i data-lucide="arrow-right" class="w-5 h-5"></i>
                    </a>
                    <a href="#" class="px-8 py-4 bg-white text-brand-dark font-bold rounded-full shadow-md hover:bg-gray-100 transition border-2 border-transparent hover:border-brand-dark flex justify-center items-center gap-2">
                        <i data-lucide="play-circle" class="w-5 h-5 text-danger"></i> Watch Video
                    </a>
                </div>
            </div>
            <div class="relative">
                <!-- Abstract Background blobs -->
                <div class="absolute -top-10 -right-10 w-72 h-72 bg-secondary opacity-20 rounded-full blur-3xl"></div>
                <div class="absolute -bottom-10 -left-10 w-72 h-72 bg-primary opacity-20 rounded-full blur-3xl"></div>
                
                <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-500">
                    <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Happy students learning" class="w-full h-[400px] object-cover">
                </div>
            </div>
        </div>
         <!-- SVG Wave -->
        <div class="wave-shape">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="fill-white"></path>
            </svg>
        </div>
    </header>

    <script>
        lucide.createIcons();
    </script>
</body>
</html>`;

export const DEFAULT_FILES: GeneratedFile[] = [
    {
        name: 'index.html',
        content: SUNNYDALE_HTML
    }
];