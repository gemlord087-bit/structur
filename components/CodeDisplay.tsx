import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from '../constants';

interface CodeDisplayProps {
  code: string;
  error: string | null;
  isLoading: boolean;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, error, isLoading }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
    }
  };
  
  const hasContent = code || error;

  return (
    <div className="flex-grow flex flex-col bg-gray-100 h-full min-h-0 p-4 md:p-8 items-center justify-center relative">
      {/* Background pattern */}
       <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
      
      {/* Window Container */}
      <div className="w-full h-full max-w-5xl bg-[#1e1e1e] rounded-xl shadow-2xl border border-gray-300/50 flex flex-col overflow-hidden font-mono text-sm ring-1 ring-black/5 z-10">
        
        {/* Window Header (Title Bar) */}
        <div className="flex justify-between items-center px-4 py-3 bg-[#252526] border-b border-[#333] select-none">
          {/* Traffic Lights */}
          <div className="flex space-x-2 w-20">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
          </div>
          
          {/* Title */}
          <div className="text-gray-400 text-xs font-medium font-sans flex items-center">
            <svg className="w-3 h-3 mr-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            index.html
          </div>

          {/* Actions */}
          <div className="flex justify-end w-20">
             {code && (
               <button
                onClick={handleCopy}
                className={`flex items-center space-x-1.5 px-2 py-1 rounded transition-all duration-200 ${
                  copied 
                    ? 'text-green-400 bg-green-400/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                title="Copy Code"
              >
                <ClipboardIcon />
                <span className="text-xs font-sans">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Window Body */}
        <div className="relative flex-grow min-h-0 overflow-auto bg-[#1e1e1e]">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1e1e1e]/90 backdrop-blur-[2px] z-10">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3"></div>
              <p className="text-gray-400 font-sans text-sm">Generating code...</p>
            </div>
          )}
          
          {!hasContent && !isLoading && (
             <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 select-none">
               <div className="w-16 h-16 mb-4 rounded-full bg-[#252526] flex items-center justify-center">
                  <svg className="w-8 h-8 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
               </div>
              <p className="font-sans text-sm">Generated HTML code will appear here</p>
            </div>
          )}

          {error && (
            <div className="p-6 text-red-400 font-sans">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                 <p className="font-bold text-sm mb-2">Generation Error</p>
                 <pre className="whitespace-pre-wrap text-xs opacity-80 font-mono">{error}</pre>
              </div>
            </div>
          )}

          {code && (
             <pre className="p-4 md:p-6 text-[#d4d4d4] text-[13px] leading-relaxed font-mono tab-4 selection:bg-blue-500/30">
              <code>{code}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};