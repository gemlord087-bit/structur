import React, { useState } from 'react';
import { CodeDisplay } from './CodeDisplay';

interface PreviewWindowProps {
  code: string;
  isLoading: boolean;
  error: string | null;
}

type ViewMode = 'desktop' | 'tablet' | 'mobile';
type Tab = 'preview' | 'code';

const DesktopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
);

const TabletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);

const MobileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);

export const PreviewWindow: React.FC<PreviewWindowProps> = ({ code, isLoading, error }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [activeTab, setActiveTab] = useState<Tab>('preview');

  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      {/* Toolbar */}
      <header className="relative h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shrink-0 z-20">
        
        {/* Left: Mode Toggle */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'preview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
            }`}
          >
            <EyeIcon />
            <span className="hidden sm:inline">Preview</span>
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'code'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
            }`}
          >
            <CodeIcon />
            <span className="hidden sm:inline">Code</span>
          </button>
        </div>

        {/* Center: Breakpoints (Only visible in Preview mode) */}
        {activeTab === 'preview' && (
          <div className="flex items-center bg-gray-100 rounded-lg p-1 border border-gray-200 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'desktop' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
              title="Desktop View"
            >
              <DesktopIcon />
            </button>
            <button
              onClick={() => setViewMode('tablet')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'tablet' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
              title="Tablet View"
            >
              <TabletIcon />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'mobile' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
              title="Mobile View"
            >
              <MobileIcon />
            </button>
          </div>
        )}

        {/* Right spacer for balance (desktop only) */}
        <div className="hidden md:block w-[120px]"></div> 
      </header>

      {/* Content Area */}
      <div className="flex-grow relative overflow-hidden flex flex-col">
        {activeTab === 'preview' ? (
          <div className="flex-grow relative overflow-hidden flex items-center justify-center bg-gray-100 p-4">
            {/* Background pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            />
            
            {/* Loading State Overlay for Preview */}
            {isLoading && (
               <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-500 font-medium animate-pulse">Generating your UI...</p>
               </div>
            )}

            {code && !isLoading ? (
              <div 
                className={`
                  transition-all duration-500 ease-in-out bg-white shadow-xl relative
                  ${viewMode === 'desktop' ? 'w-full h-full shadow-none' : ''}
                  ${viewMode === 'tablet' ? 'w-[768px] max-w-full h-[95%]' : ''}
                  ${viewMode === 'mobile' ? 'w-[375px] max-w-full h-[90%]' : ''}
                `}
              >
                <iframe
                  srcDoc={code}
                  title="Preview"
                  className="w-full h-full bg-white"
                  sandbox="allow-scripts"
                />
              </div>
            ) : (
              !isLoading && (
                <div className="text-center text-gray-400 p-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200/50 mb-4">
                    <DesktopIcon />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Ready to preview</h3>
                  <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                    Generate some UI code to see it rendered here. Switch between device sizes using the toolbar.
                  </p>
                </div>
              )
            )}
             {error && !isLoading && (
                <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/90 p-8">
                    <div className="text-red-500 text-center max-w-lg bg-red-50 p-6 rounded-xl border border-red-100">
                        <p className="font-bold text-xl mb-2">Generation Error</p>
                        <p>{error}</p>
                    </div>
                </div>
             )}
          </div>
        ) : (
          <div className="flex-grow flex flex-col min-h-0">
            <CodeDisplay code={code} error={error} isLoading={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
};
