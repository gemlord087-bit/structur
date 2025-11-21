
import React, { useState, useRef, useEffect } from 'react';
import { CodeDisplay } from './CodeDisplay';

interface PreviewWindowProps {
  code: string;
  isLoading: boolean;
  error: string | null;
}

type ViewMode = 'desktop' | 'tablet' | 'mobile';
type Tab = 'preview' | 'canvas' | 'code';

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

const CanvasIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
);

const ZoomInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
);

const ZoomOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
);

const FitScreenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
);

export const PreviewWindow: React.FC<PreviewWindowProps> = ({ code, isLoading, error }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [activeTab, setActiveTab] = useState<Tab>('canvas');
  
  // Canvas State
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [iframeHeight, setIframeHeight] = useState(1080);

  // Calculate scale to fit content within container
  const fitToScreen = () => {
    if (containerRef.current && iframeHeight > 0) {
        const { clientWidth: containerW, clientHeight: containerH } = containerRef.current;
        const contentW = 1280; // Standard desktop width
        const contentH = iframeHeight;
        
        const padding = 60;
        const availableW = containerW - padding;
        const availableH = containerH - padding;
        
        // Calculate scale to fit both dimensions
        const scaleX = availableW / contentW;
        const scaleY = availableH / contentH;
        const newZoom = Math.min(scaleX, scaleY, 1); // Cap at 100% default
        
        setZoom(newZoom);
        
        // Center the content
        const scaledW = contentW * newZoom;
        const scaledH = contentH * newZoom;
        
        setPan({
            x: (containerW - scaledW) / 2,
            y: (containerH - scaledH) / 2
        });
    }
  };

  const handleIframeLoad = () => {
    if (iframeRef.current) {
        try {
            // Small timeout to ensure CSS is rendered
            setTimeout(() => {
                const doc = iframeRef.current?.contentDocument;
                if (doc) {
                    // Set scrolling no to prevent scrollbars inside iframe
                    doc.body.style.overflow = 'hidden';
                    const h = doc.body.scrollHeight;
                    setIframeHeight(h);
                    
                    // Initial fit
                    // We call fitToScreen here, but we need to wait for state update of iframeHeight
                    // passing h directly to a helper would be better, but state update loop is fine for this interaction speed
                }
            }, 100);
        } catch (e) {
            console.error("Cannot access iframe content", e);
        }
    }
  };

  // Trigger fit when height updates
  useEffect(() => {
      if (activeTab === 'canvas' && iframeHeight > 0) {
          fitToScreen();
      }
  }, [iframeHeight, activeTab]);

  // --- Mouse Event Handlers for Pan/Zoom ---

  const handleMouseDown = (e: React.MouseEvent) => {
      if (activeTab !== 'canvas') return;
      e.preventDefault();
      setIsDragging(true);
      dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging || activeTab !== 'canvas') return;
      e.preventDefault();
      setPan({
          x: e.clientX - dragStart.current.x,
          y: e.clientY - dragStart.current.y
      });
  };

  const handleMouseUp = () => {
      setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
      if (activeTab !== 'canvas') return;
      
      // Check for zoom gesture (Ctrl + Wheel) or if user just wants to scroll vertically
      if (e.ctrlKey || e.metaKey) {
          // Zoom
          e.preventDefault();
          const zoomSensitivity = 0.001;
          const delta = -e.deltaY * zoomSensitivity;
          const newZoom = Math.max(0.1, Math.min(5, zoom + delta));
          setZoom(newZoom);
      } else {
          // Pan (Scroll)
          // e.preventDefault(); // Optional: prevent browser back swipe
          setPan(prev => ({
              x: prev.x - e.deltaX,
              y: prev.y - e.deltaY
          }));
      }
  };

  const handleZoomIn = () => setZoom(z => Math.min(5, z + 0.1));
  const handleZoomOut = () => setZoom(z => Math.max(0.1, z - 0.1));


  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      {/* Toolbar */}
      <header className="relative h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shrink-0 z-20">
        
        {/* Left: Mode Toggle */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => setActiveTab('canvas')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'canvas'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200/50'
            }`}
          >
            <CanvasIcon />
            <span className="hidden sm:inline">Canvas</span>
          </button>
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
        {activeTab === 'canvas' ? (
             <div 
                className="flex-grow relative overflow-hidden bg-gray-200 cursor-grab active:cursor-grabbing"
                ref={containerRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
             >
                 {/* Background pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                    backgroundImage: 'radial-gradient(#6b7280 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    }}
                />

                {/* Zoom Controls */}
                <div className="absolute bottom-6 right-6 flex flex-col gap-2 bg-white p-1.5 rounded-lg shadow-lg border border-gray-200 z-30">
                    <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 rounded-md text-gray-700" title="Zoom In">
                        <ZoomInIcon />
                    </button>
                    <button onClick={fitToScreen} className="p-2 hover:bg-gray-100 rounded-md text-gray-700" title="Fit to Screen">
                        <FitScreenIcon />
                    </button>
                    <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 rounded-md text-gray-700" title="Zoom Out">
                        <ZoomOutIcon />
                    </button>
                </div>
                
                {/* Current Zoom Level Indicator */}
                <div className="absolute bottom-6 left-6 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-200 text-xs font-mono text-gray-600 z-30 pointer-events-none">
                    {Math.round(zoom * 100)}%
                </div>

                 {isLoading && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm pointer-events-none">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-500 font-medium animate-pulse">Generating your UI...</p>
                    </div>
                )}

                {code && !isLoading && (
                    <div 
                        style={{
                            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                            transformOrigin: '0 0',
                            width: '1280px', // Fixed desktop width
                            height: `${iframeHeight}px`,
                        }}
                        className="bg-white shadow-2xl pointer-events-none select-none transition-transform duration-75 will-change-transform"
                    >
                         <iframe
                            ref={iframeRef}
                            srcDoc={code}
                            title="Canvas Preview"
                            className="w-full h-full border-0"
                            onLoad={handleIframeLoad}
                            scrolling="no"
                        />
                    </div>
                )}
                 {error && !isLoading && (
                    <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/90 p-8 pointer-events-none">
                        <div className="text-red-500 text-center max-w-lg bg-red-50 p-6 rounded-xl border border-red-100">
                            <p className="font-bold text-xl mb-2">Generation Error</p>
                            <p>{error}</p>
                        </div>
                    </div>
                )}
             </div>
        ) : activeTab === 'preview' ? (
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
                  ${viewMode === 'mobile' ? 'w-[375px] max-w-full h-full max-h-[844px]' : ''}
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
