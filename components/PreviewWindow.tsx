
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface PreviewWindowProps {
  code: string;
}

const ZoomInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
);

const ZoomOutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="8" y1="11" x2="14" y2="11"></line></svg>
);

const ResetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4"/><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>
);

export const PreviewWindow: React.FC<PreviewWindowProps> = ({ code }) => {
  const [scale, setScale] = useState(0.75);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const resetView = useCallback(() => {
    if (canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const contentWidth = 1280; 
      const contentHeight = 720;
      
      const newScale = Math.min(
        (canvasRect.width - 80) / contentWidth,
        (canvasRect.height - 80) / contentHeight
      );
      
      setScale(newScale > 0 ? newScale : 0.1);
      
      setPosition({ 
        x: (canvasRect.width - contentWidth * newScale) / 2, 
        y: (canvasRect.height - contentHeight * newScale) / 2
      });
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(resetView, 50);
    window.addEventListener('resize', resetView);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', resetView);
    };
  }, [resetView]);

  useEffect(() => {
    if (code) {
      resetView();
    }
  }, [code, resetView]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const { deltaY, clientX, clientY } = e;
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const zoomIntensity = 0.001;
    const newScale = scale * (1 - deltaY * zoomIntensity);
    const clampedScale = Math.max(0.1, Math.min(newScale, 4));

    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    
    const newX = mouseX - (mouseX - position.x) * (clampedScale / scale);
    const newY = mouseY - (mouseY - position.y) * (clampedScale / scale);

    setScale(clampedScale);
    setPosition({ x: newX, y: newY });
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== canvasRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setStartDrag({ 
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setPosition({
      x: e.clientX - startDrag.x,
      y: e.clientY - startDrag.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const zoom = (factor: number) => {
    const newScale = scale * factor;
    const clampedScale = Math.max(0.1, Math.min(newScale, 4));
    
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const newX = centerX - (centerX - position.x) * (clampedScale / scale);
      const newY = centerY - (centerY - position.y) * (clampedScale / scale);

      setScale(clampedScale);
      setPosition({ x: newX, y: newY });
    }
  };

  return (
    <div className="w-full h-full flex-grow relative overflow-hidden bg-gem-slate/50 select-none">
      <div
        ref={canvasRef}
        className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #475569 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
        onWheel={code ? handleWheel : undefined}
        onMouseDown={code ? handleMouseDown : undefined}
        onMouseMove={code ? handleMouseMove : undefined}
        onMouseUp={code ? handleMouseUp : undefined}
        onMouseLeave={code ? handleMouseUp : undefined}
      >
        {code ? (
          <div
            className="absolute top-0 left-0"
            style={{ 
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'top left'
            }}
          >
            <div 
              className="bg-white rounded-md shadow-2xl overflow-hidden ring-1 ring-black/10" 
              style={{ width: '1280px', height: '720px' }}
            >
                <iframe
                  srcDoc={code}
                  title="UI Preview"
                  sandbox="allow-scripts"
                  className={`w-full h-full border-0 ${isDragging ? 'pointer-events-none' : ''}`}
                />
            </div>
          </div>
        ) : (
           <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-gem-gray p-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gem-silver">Live Preview Canvas</h3>
              <p className="mt-1 text-sm">The rendered UI will be displayed here.</p>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-4 right-4 bg-gem-onyx/80 backdrop-blur-sm rounded-lg p-1 flex items-center space-x-1 text-gem-silver text-sm border border-gem-gray/50 shadow-lg">
        <button onClick={() => zoom(0.8)} className="p-2 hover:bg-gem-slate rounded-md transition-colors" title="Zoom Out">
          <ZoomOutIcon />
        </button>
        <div 
          onClick={resetView} 
          className="w-16 text-center tabular-nums cursor-pointer hover:bg-gem-slate rounded-md py-2"
          title="Reset View"
        >
          {Math.round(scale * 100)}%
        </div>
        <button onClick={() => zoom(1.25)} className="p-2 hover:bg-gem-slate rounded-md transition-colors" title="Zoom In">
          <ZoomInIcon />
        </button>
        <div className="w-px h-5 bg-gem-gray/50 mx-1"></div>
        <button onClick={resetView} className="p-2 hover:bg-gem-slate rounded-md transition-colors" title="Fit to screen">
          <ResetIcon />
        </button>
      </div>
    </div>
  );
};
