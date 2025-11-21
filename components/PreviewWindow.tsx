
import React, { useState, useRef, useEffect } from 'react';
import { CodeDisplay } from './CodeDisplay';
import { GeneratedFile } from '../types';
import JSZip from 'jszip';

interface PreviewWindowProps {
  files: GeneratedFile[];
  isLoading: boolean;
  error: string | null;
  platform: 'web' | 'mobile';
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

const ZoomInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
);

const ZoomOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
);

const FitScreenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);

export const PreviewWindow: React.FC<PreviewWindowProps> = ({ files, isLoading, error, platform }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [activeTab, setActiveTab] = useState<Tab>('preview'); // Default to preview
  
  // Export Dropdown State
  const [isExportOpen, setIsExportOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  
  // Canvas State
  const containerRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeDesignIndex, setActiveDesignIndex] = useState<number | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  
  // We track the max height of all screens to fit them
  const [maxHeight, setMaxHeight] = useState(platform === 'mobile' ? 812 : 1080);

  useEffect(() => {
    if (platform === 'mobile') {
        setViewMode('mobile');
        setMaxHeight(812);
    } else {
        setViewMode('desktop');
        setMaxHeight(1080);
    }
  }, [platform]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setIsExportOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [exportRef]);

  // Calculate scale to fit content within container
  const fitToScreen = () => {
    if (containerRef.current) {
        const { clientWidth: containerW, clientHeight: containerH } = containerRef.current;
        
        const isMobile = platform === 'mobile';
        const screenWidth = isMobile ? 375 : 1200; // Updated desktop width
        const screenHeight = maxHeight;
        const gap = 40;
        
        const contentW = isMobile 
            ? (files.length * screenWidth) + ((files.length - 1) * gap) 
            : screenWidth;
            
        const contentH = screenHeight;
        
        const padding = 60;
        const availableW = containerW - padding;
        const availableH = containerH - padding;
        
        // Calculate scale to fit both dimensions
        const scaleX = availableW / contentW;
        const scaleY = availableH / contentH;
        const newZoom = Math.min(scaleX, scaleY, 1); 
        
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

  // Trigger fit when file count or platform changes, but only initially or on manual trigger
  useEffect(() => {
      if (activeTab === 'canvas' && files.length > 0) {
          // Small delay to let heights render
          setTimeout(fitToScreen, 100);
      }
  }, [activeTab, platform, files.length]);

  // --- Helper to fix h-screen in canvas mode ---
  const prepareCanvasContent = (content: string, isActive: boolean) => {
      const isMobile = platform === 'mobile';
      // Use a fixed pixel height instead of 100vh to prevent iframe expansion issues
      const fallbackHeight = isMobile ? 'min-h-[812px]' : 'min-h-[900px]';
      
      // Replace h-screen with a fixed min-height
      let modified = content.replace(/h-screen/g, fallbackHeight);
      modified = modified.replace(/min-h-screen/g, fallbackHeight);
      modified = modified.replace(/h-\[100vh\]/g, fallbackHeight);

      // If not active, disable pointer events to make it act like a screenshot
      const pointerEvents = isActive ? 'auto' : 'none';

      // Inject style to hide scrollbars and ensure body takes height
      const styleInjection = `
        <style>
            ::-webkit-scrollbar { display: none; }
            body { overflow: ${isActive ? 'auto' : 'hidden'}; pointer-events: ${pointerEvents}; user-select: none; }
            html, body { min-height: 100%; height: auto; }
        </style>
      `;
      
      return modified.replace('</head>', `${styleInjection}</head>`);
  };

  // --- Mouse Event Handlers for Pan/Zoom ---

  const handleMouseDown = (e: React.MouseEvent) => {
      if (activeTab !== 'canvas') return;
      // If clicking on background (not a design), start dragging
      if (e.target === containerRef.current || e.target === e.currentTarget) {
           e.preventDefault();
           setIsDragging(true);
           setActiveDesignIndex(null); // Deselect designs
           dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
      }
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
      
      if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const zoomSensitivity = 0.001;
          const delta = -e.deltaY * zoomSensitivity;
          const newZoom = Math.max(0.1, Math.min(5, zoom + delta));
          setZoom(newZoom);
      } else {
          // Only pan if not scrolling inside an active iframe (though wheel events usually don't bubble out of iframe easily)
          setPan(prev => ({
              x: prev.x - e.deltaX,
              y: prev.y - e.deltaY
          }));
      }
  };

  const handleZoomIn = () => setZoom(z => Math.min(5, z + 0.1));
  const handleZoomOut = () => setZoom(z => Math.max(0.1, z - 0.1));
  
  // --- Export Functions ---
  
  const downloadZip = async () => {
      const zip = new JSZip();
      files.forEach(file => {
          zip.file(file.name, file.content);
      });
      
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ui-design-files.zip";
      a.click();
      URL.revokeObjectURL(url);
  };

  const isMobile = platform === 'mobile';

  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      {/* Toolbar */}
      <header className="relative h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4 shrink-0 z-20">
        
        {/* Left: Mode Toggle */}
        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-gray-200">
          {/* Canvas Button Hidden for now */}
          {/*
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
          */}
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

        {/* Center: Breakpoints (Only visible in Preview mode AND Web platform) */}
        {activeTab === 'preview' && platform === 'web' && (
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

        {/* Right Actions */}
        <div className="flex items-center gap-3 relative" ref={exportRef}>
             {isLoading && (
                 <div className="flex items-center gap-2 text-xs text-blue-600 animate-pulse font-medium mr-4">
                     <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                     AI Working...
                 </div>
             )}
             
             <button 
                onClick={() => setIsExportOpen(!isExportOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
             >
                 <span className="hidden sm:inline">Export</span>
                 <ChevronDownIcon />
             </button>

             {/* Export Dropdown */}
             {isExportOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 origin-top-right animate-in fade-in zoom-in-95 duration-100">
                    <button
                        onClick={() => {
                            downloadZip();
                            setIsExportOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                    >
                        <div className="p-1.5 bg-gray-100 rounded-md text-gray-600">
                            <DownloadIcon />
                        </div>
                        <div>
                            <div className="font-medium">Download Code</div>
                            <div className="text-xs text-gray-500">Save as .ZIP archive</div>
                        </div>
                    </button>
                </div>
             )}
        </div> 
      </header>

      {/* Content Area */}
      <div className="flex-grow relative overflow-hidden flex flex-col" id="preview-container">
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
                
                <div className="absolute bottom-6 left-6 bg-white px-3 py-1.5 rounded-md shadow-sm border border-gray-200 text-xs font-mono text-gray-600 z-30 pointer-events-none">
                    {Math.round(zoom * 100)}%
                </div>

                {/* Content Container */}
                {files.length > 0 && (
                    <div 
                        style={{
                            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                            transformOrigin: '0 0',
                            display: 'flex',
                            gap: '40px', // Gap between screens
                        }}
                        className="absolute top-0 left-0 transition-transform duration-75 will-change-transform p-10"
                    >
                         {files.map((file, idx) => {
                             const isActive = activeDesignIndex === idx;
                             return (
                                <div 
                                    key={idx}
                                    style={{
                                        width: isMobile ? '375px' : '1200px', // 1200px for canvas desktop reference too
                                        height: isMobile ? '812px' : `${maxHeight}px`, 
                                    }}
                                    className={`bg-white shadow-2xl overflow-hidden flex-shrink-0 select-none relative transition-all duration-200 ${
                                        isActive ? 'ring-4 ring-blue-500/50' : 'hover:ring-2 hover:ring-gray-300'
                                    }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveDesignIndex(idx);
                                    }}
                                >
                                    {/* Overlay to capture click when not active (prevents interaction until active) */}
                                    {!isActive && (
                                        <div className="absolute inset-0 z-10 bg-transparent cursor-pointer" />
                                    )}
                                    
                                    <iframe
                                        srcDoc={prepareCanvasContent(file.content, isActive)}
                                        title={file.name}
                                        className="w-full h-full border-0 block bg-white"
                                        scrolling={isActive ? 'auto' : 'no'}
                                        onLoad={(e) => {
                                            if (!isMobile) {
                                                try {
                                                    // Add some buffer to calculated height to avoid cutting off fixed elements
                                                    const h = e.currentTarget.contentDocument?.body.scrollHeight;
                                                    if(h && h > maxHeight) setMaxHeight(h + 100);
                                                } catch(err) {}
                                            }
                                        }}
                                    />
                                </div>
                             );
                         })}
                    </div>
                )}
             </div>
        ) : activeTab === 'preview' ? (
          <div className="flex-grow relative bg-gray-100 overflow-hidden" ref={previewContainerRef}>
             {/* Background pattern */}
             <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Scroll Container - Use flex layout with margin:auto on children to safely center content while allowing scroll */}
            <div className="absolute inset-0 overflow-x-auto overflow-y-hidden flex">
                 <div className="flex gap-10 m-auto px-10 py-10 h-full items-center">
                     {files.map((file, idx) => (
                         <div 
                            key={idx}
                            className={`
                            transition-all duration-500 ease-in-out bg-white shadow-xl flex-shrink-0 flex flex-col overflow-hidden
                            ${viewMode === 'desktop' ? 'w-[calc(100vw-20rem)] md:w-[1200px] h-full shadow-none rounded-none border border-gray-200' : 'rounded-2xl shadow-2xl border border-gray-100'}
                            ${viewMode === 'tablet' ? 'w-[768px] h-[95%]' : ''}
                            ${viewMode === 'mobile' ? 'w-[375px] h-full max-h-[844px]' : ''}
                            `}
                        >
                            <iframe
                            srcDoc={file.content}
                            title={file.name}
                            className="w-full h-full bg-white flex-1"
                            sandbox="allow-scripts"
                            />
                        </div>
                     ))}
                 </div>
            </div>
            
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
            <CodeDisplay files={files} error={error} isLoading={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
};
