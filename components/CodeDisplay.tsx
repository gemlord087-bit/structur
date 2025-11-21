
import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from '../constants';
import { GeneratedFile } from '../types';

interface CodeDisplayProps {
  files: GeneratedFile[];
  error: string | null;
  isLoading: boolean;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ files, error, isLoading }) => {
  const [copied, setCopied] = useState(false);
  const [activeFileIndex, setActiveFileIndex] = useState(0);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const activeFile = files[activeFileIndex];
  const code = activeFile ? activeFile.content : '';

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
    }
  };
  
  const hasContent = files.length > 0 || error;

  return (
    <div className="flex-grow flex bg-gray-100 h-full min-h-0 relative">
      {/* Background pattern */}
       <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
            backgroundSize: '20px 20px',
          }}
        />
      
      {/* Window Container */}
      <div className="w-full h-full md:m-4 m-2 bg-[#1e1e1e] rounded-xl shadow-2xl border border-gray-300/50 flex overflow-hidden font-mono text-sm ring-1 ring-black/5 z-10">
        
        {/* Sidebar (File Explorer) */}
        <div className="w-48 bg-[#252526] border-r border-[#333] flex flex-col shrink-0">
            <div className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider border-b border-[#333]">
                Explorer
            </div>
            <div className="flex-1 overflow-y-auto py-2">
                {files.map((file, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveFileIndex(index)}
                        className={`w-full text-left px-4 py-2 flex items-center gap-2 transition-colors ${
                            activeFileIndex === index 
                                ? 'bg-[#37373d] text-white border-l-2 border-blue-500' 
                                : 'text-gray-400 hover:text-gray-200 hover:bg-[#2a2d2e]'
                        }`}
                    >
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                        <span className="truncate text-xs">{file.name}</span>
                    </button>
                ))}
                {files.length === 0 && (
                    <div className="px-4 text-gray-600 text-xs italic">No files</div>
                )}
            </div>
        </div>

        {/* Main Code Area */}
        <div className="flex-1 flex flex-col min-w-0">
            {/* Window Header (Title Bar) */}
            <div className="flex justify-between items-center px-4 py-2 bg-[#1e1e1e] border-b border-[#333] select-none">
            {/* Active Filename */}
            <div className="text-gray-300 text-xs font-medium font-sans flex items-center">
                {activeFile?.name || 'untitled'}
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
            
            {/* Non-blocking loading indicator */}
            {isLoading && (
                <div className="absolute top-2 right-4 flex items-center gap-2 px-3 py-1 bg-blue-900/30 text-blue-200 rounded-full text-xs border border-blue-500/30 z-20">
                   <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                   Updating code...
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
    </div>
  );
};
