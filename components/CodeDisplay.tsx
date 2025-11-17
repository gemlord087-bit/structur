
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
    <div className="flex-grow flex flex-col bg-gem-slate rounded-md border border-gem-gray min-h-0">
      <div className="flex justify-between items-center p-3 border-b border-gem-gray">
        <h3 className="font-semibold text-gem-silver">Generated Code</h3>
        {code && (
           <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-3 py-1 bg-gem-gray/50 hover:bg-gem-gray rounded-md text-sm text-gem-silver transition-colors"
          >
            <ClipboardIcon />
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        )}
      </div>

      <div className="relative flex-grow min-h-0 overflow-auto p-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gem-slate/80 backdrop-blur-sm z-10">
            <p className="text-gem-silver">Generating code...</p>
          </div>
        )}
        {!hasContent && !isLoading && (
           <div className="flex items-center justify-center h-full text-center text-gem-gray">
            <p>Your generated code will appear here.</p>
          </div>
        )}
        {error && (
          <div className="text-red-400 p-4 bg-red-900/20 rounded-md">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        {code && (
           <pre className="text-sm text-gem-white whitespace-pre-wrap">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
};
