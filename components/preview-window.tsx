'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CodeDisplay } from './code-display';
import { Project } from '@/lib/types';
import { ClipboardIcon } from '@/lib/constants';
import JSZip from 'jszip';

interface PreviewWindowProps {
  project: Project;
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

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);

export const PreviewWindow: React.FC<PreviewWindowProps> = ({ project }) => {
  const [activeTab, setActiveTab] = useState<Tab>('preview');
  const [viewMode, setViewMode] = useState<ViewMode>(project.platform === 'mobile' ? 'mobile' : 'desktop');
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeFile = project.files[activeFileIndex];

  useEffect(() => {
    if (iframeRef.current && activeFile) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(activeFile.content);
        doc.close();
      }
    }
  }, [activeFile]);

  const getViewportDimensions = () => {
    switch (viewMode) {
      case 'mobile':
        return { width: 375, height: 667 };
      case 'tablet':
        return { width: 768, height: 1024 };
      case 'desktop':
        return { width: 1200, height: 800 };
      default:
        return { width: 1200, height: 800 };
    }
  };

  const downloadProject = useCallback(async () => {
    const zip = new JSZip();
    
    project.files.forEach(file => {
      zip.file(file.name, file.content);
    });

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${project.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error creating zip file:', error);
    }
  }, [project]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const { width, height } = getViewportDimensions();

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-200">
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <EyeIcon />
            Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'code'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <CodeIcon />
            Code
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {activeTab === 'preview' && (
            <>
              {/* View Mode Selector */}
              <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-200">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'desktop'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Desktop view"
                >
                  <DesktopIcon />
                </button>
                <button
                  onClick={() => setViewMode('tablet')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'tablet'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Tablet view"
                >
                  <TabletIcon />
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'mobile'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  title="Mobile view"
                >
                  <MobileIcon />
                </button>
              </div>
            </>
          )}

          {/* Download Button */}
          <button
            onClick={downloadProject}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <DownloadIcon />
            Download
          </button>
        </div>
      </div>

      {/* File Tabs */}
      {project.files.length > 1 && (
        <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-200 bg-gray-50 overflow-x-auto">
          {project.files.map((file, index) => (
            <button
              key={index}
              onClick={() => setActiveFileIndex(index)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                index === activeFileIndex
                  ? 'bg-white text-blue-600 border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {file.name}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'preview' ? (
          <div className="h-full bg-gray-100 flex items-center justify-center p-4">
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              style={{
                width: Math.min(width * zoom, window.innerWidth - 100),
                height: Math.min(height * zoom, window.innerHeight - 200),
                transform: `scale(${zoom})`,
                transformOrigin: 'center center'
              }}
            >
              <iframe
                ref={iframeRef}
                className="w-full h-full border-0"
                style={{ width: width, height: height }}
                title="Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        ) : (
          <div className="h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-medium text-gray-900">{activeFile.name}</h3>
              <button
                onClick={() => copyToClipboard(activeFile.content)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ClipboardIcon />
                Copy
              </button>
            </div>
            <CodeDisplay code={activeFile.content} language="html" />
          </div>
        )}
      </div>
    </div>
  );
};