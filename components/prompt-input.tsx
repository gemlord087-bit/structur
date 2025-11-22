'use client';

import React, { useState } from 'react';
import { MagicWandIcon } from '@/lib/constants';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: (platform: 'web' | 'mobile') => void;
  isGenerating: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  onGenerate,
  isGenerating
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<'web' | 'mobile'>('web');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onGenerate(selectedPlatform);
    }
  };

  const examples = [
    "A modern crypto trading dashboard with dark theme",
    "A social media app with stories and messaging",
    "An e-commerce product page with reviews",
    "A fitness tracking app with progress charts",
    "A restaurant menu with online ordering",
    "A portfolio website for a photographer"
  ];

  return (
    <div className="space-y-6">
      {/* Platform Toggle */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            onClick={() => setSelectedPlatform('web')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              selectedPlatform === 'web'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            🌐 Web App
          </button>
          <button
            type="button"
            onClick={() => setSelectedPlatform('mobile')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              selectedPlatform === 'mobile'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            📱 Mobile App
          </button>
        </div>
      </div>

      {/* Main Input */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
        <div className="relative flex items-center bg-white rounded-xl shadow-xl p-2 border border-gray-200">
          <div className="pl-6 text-gray-400">
            <MagicWandIcon />
          </div>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={`Describe your ${selectedPlatform} interface...`}
            className="flex-1 p-6 bg-transparent text-xl text-gray-900 placeholder-gray-400 focus:outline-none"
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={!prompt.trim() || isGenerating}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-all shadow-md hover:shadow-lg flex items-center gap-2 shrink-0 mr-2"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                Generate
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Examples */}
      <div className="space-y-3">
        <p className="text-sm text-gray-500 text-center">Try these examples:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setPrompt(example)}
              className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors border border-gray-200 hover:border-gray-300"
              disabled={isGenerating}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};