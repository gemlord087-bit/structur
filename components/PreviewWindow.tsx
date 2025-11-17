
import React from 'react';

interface PreviewWindowProps {
  code: string;
}

export const PreviewWindow: React.FC<PreviewWindowProps> = ({ code }) => {
  return (
    <div className="w-full h-full flex-grow bg-white">
      {code ? (
        <iframe
          srcDoc={code}
          title="UI Preview"
          sandbox="allow-scripts"
          className="w-full h-full border-0"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gem-slate/50">
          <div className="text-center text-gem-gray p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gem-silver">Live Preview</h3>
            <p className="mt-1 text-sm text-gem-gray">The rendered UI will be displayed in this window.</p>
          </div>
        </div>
      )}
    </div>
  );
};
