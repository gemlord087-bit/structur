
import React from 'react';
import { MagicWandIcon } from '../constants';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt, onGenerate, isLoading }) => {
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onGenerate();
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="relative">
        <textarea
          id="prompt-textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your app idea... (e.g., 'A dashboard for a coffee shop with sales charts and inventory list')"
          className="w-full h-32 p-4 bg-transparent text-lg resize-none focus:outline-none text-gray-900 placeholder-gray-400"
          disabled={isLoading}
        />
        <div className="absolute bottom-3 right-3">
             <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                ⌘ + Enter to generate
             </span>
        </div>
      </div>
      
      <div className="border-t border-gray-100 p-3 bg-gray-50/50 rounded-b-2xl flex justify-end">
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform active:scale-95"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <MagicWandIcon />
              Generate Project
            </>
          )}
        </button>
      </div>
    </div>
  );
};
