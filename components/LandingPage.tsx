
import React, { useState } from 'react';
import { LogoIcon, MagicWandIcon } from '../constants';

interface LandingPageProps {
  onGetStarted: (initialPrompt?: string) => void;
  onViewPrivacy: () => void;
  onViewTerms: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onViewPrivacy, onViewTerms }) => {
  const [heroPrompt, setHeroPrompt] = useState('');

  const handleHeroSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (heroPrompt.trim()) {
          onGetStarted(heroPrompt);
      } else {
          onGetStarted();
      }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onGetStarted()}>
              <LogoIcon />
              <span className="text-xl font-bold tracking-tight">Stitch AI</span>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => onGetStarted()}
                className="hidden sm:block text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => onGetStarted()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
            <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wide mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            Powered by Gemini 3 Pro
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
            Turn your ideas into <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              User Interfaces
            </span> instantly.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Stitch AI writes the HTML & Tailwind CSS for you. Describe your dream app, and we'll build the interface in seconds.
          </p>
          
          {/* Hero Prompt Input */}
          <div className="max-w-2xl mx-auto mb-16 relative z-20">
              <form onSubmit={handleHeroSubmit} className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
                  <div className="relative flex items-center bg-white rounded-xl shadow-xl p-2 border border-gray-200">
                    <div className="pl-4 text-gray-400">
                        <MagicWandIcon />
                    </div>
                    <input 
                        type="text" 
                        value={heroPrompt}
                        onChange={(e) => setHeroPrompt(e.target.value)}
                        placeholder="Describe an app (e.g. 'A crypto dashboard')" 
                        className="flex-1 p-4 bg-transparent text-lg text-gray-900 placeholder-gray-400 focus:outline-none"
                    />
                    <button 
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 shrink-0"
                    >
                        Generate
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </button>
                  </div>
              </form>
          </div>

          {/* Examples Grid */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
             <div className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Analytics Dashboard" 
                    className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white font-bold text-sm">Analytics Dashboards</span>
                </div>
             </div>
             <div className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white md:-mt-8">
                <img 
                    src="https://images.unsplash.com/photo-1555421689-492a6c3a3730?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="E-commerce UI" 
                    className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white font-bold text-sm">E-commerce Stores</span>
                </div>
             </div>
             <div className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
                <img 
                    src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Mobile App Design" 
                    className="w-full h-48 object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white font-bold text-sm">Mobile Applications</span>
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
                onClick={() => onGetStarted()}
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
                  <button onClick={onViewPrivacy} className="hover:text-blue-600 transition-colors">Privacy Policy</button>
                  <button onClick={onViewTerms} className="hover:text-blue-600 transition-colors">Terms of Service</button>
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
