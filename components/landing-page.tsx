'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoIcon, MagicWandIcon } from '@/lib/constants';

export const LandingPage: React.FC = () => {
  const router = useRouter();
  const [heroPrompt, setHeroPrompt] = useState('');

  const handleHeroSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Store the prompt in sessionStorage and navigate to dashboard
      if (heroPrompt.trim()) {
          sessionStorage.setItem('initialPrompt', heroPrompt);
      }
      router.push('/dashboard');
  };

  const handleGetStarted = () => {
      router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleGetStarted}>
              <LogoIcon />
              <span className="text-xl font-bold tracking-tight">Stitch AI</span>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={handleGetStarted}
                className="hidden sm:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={handleGetStarted}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
            <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
            <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wide mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Powered by Gemini 3 Pro
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Build stunning UIs <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              in seconds.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stitch AI converts your text prompts into production-ready HTML & Tailwind CSS. No coding required to start.
          </p>
          
          {/* Hero Prompt Input */}
          <div className="max-w-3xl mx-auto mb-20 relative z-20">
              <form onSubmit={handleHeroSubmit} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
                  <div className="relative flex items-center bg-white rounded-xl shadow-xl p-2 border border-gray-200">
                    <div className="pl-6 text-gray-400">
                        <MagicWandIcon />
                    </div>
                    <input 
                        type="text" 
                        value={heroPrompt}
                        onChange={(e) => setHeroPrompt(e.target.value)}
                        placeholder="Describe an app (e.g. 'A crypto dashboard')" 
                        className="flex-1 p-6 bg-transparent text-xl text-gray-900 placeholder-gray-400 focus:outline-none"
                    />
                    <button 
                        type="submit"
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 shrink-0 mr-2"
                    >
                        Generate
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                  </div>
              </form>
          </div>

          {/* Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
             {/* Example 1 */}
             <div className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Analytics Dashboard" 
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <span className="text-white font-bold text-lg">Analytics Dashboards</span>
                </div>
             </div>

             {/* Example 2 */}
             <div className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white lg:-mt-12">
                <img 
                    src="https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Mobile App" 
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <span className="text-white font-bold text-lg">Mobile Applications</span>
                </div>
             </div>

             {/* Example 3 */}
             <div className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                <img 
                    src="https://images.unsplash.com/photo-1481487484168-9b930d5b7d89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="SaaS Landing Page" 
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <span className="text-white font-bold text-lg">SaaS Landing Pages</span>
                </div>
             </div>

             {/* Example 4 */}
             <div className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Fintech Dashboard" 
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <span className="text-white font-bold text-lg">Fintech & Crypto</span>
                </div>
             </div>

             {/* Example 5 */}
             <div className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white lg:-mt-12">
                <img 
                    src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Profile & Portfolio" 
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <span className="text-white font-bold text-lg">Portfolios & Profiles</span>
                </div>
             </div>

             {/* Example 6 */}
             <div className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                <img 
                    src="https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="E-commerce" 
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <span className="text-white font-bold text-lg">E-commerce Stores</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Everything you need to build fast</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">From concept to code, Stitch AI streamlines the entire frontend design process.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Feature 1 */}
              <div className="p-8 bg-gray-50 rounded-2xl hover:bg-blue-50/50 transition-colors border border-gray-100">
                 <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-3">Iterative Refinement</h3>
                 <p className="text-gray-600 leading-relaxed">
                    Don't like the first version? Chat with the AI to change colors, adjust layouts, or add new sections instantly.
                 </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 bg-gray-50 rounded-2xl hover:bg-blue-50/50 transition-colors border border-gray-100">
                 <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="10" height="14" x="3" y="3" rx="2"/><rect width="8" height="10" x="13" y="11" rx="2"/></svg>
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Platform</h3>
                 <p className="text-gray-600 leading-relaxed">
                    Generate responsive landing pages for web or mobile-first app interfaces with fixed navigation.
                 </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 bg-gray-50 rounded-2xl hover:bg-blue-50/50 transition-colors border border-gray-100">
                 <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7 7"/><path d="M12 19V5"/></svg>
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-3">Export Ready</h3>
                 <p className="text-gray-600 leading-relaxed">
                    Download your project as a ZIP file containing clean, standard HTML & Tailwind CSS, ready to deploy.
                 </p>
              </div>
           </div>

           <div className="text-center">
                <button 
                onClick={handleGetStarted}
                className="px-10 py-4 bg-gray-900 text-white text-lg font-bold rounded-xl hover:bg-black transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                Generate UI Now
                </button>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-2">
                  <LogoIcon />
                  <span className="text-lg font-bold text-gray-900">Stitch AI</span>
               </div>
               
               <div className="flex gap-8 text-sm font-medium text-gray-600">
                  <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
               </div>

               <div className="text-sm text-gray-500">
                  &copy; {new Date().getFullYear()} Stitch AI. All rights reserved.
               </div>
            </div>
         </div>
      </footer>
    </div>
  );
};