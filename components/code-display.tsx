'use client';

import React from 'react';

interface CodeDisplayProps {
  code: string;
  language: string;
}

export const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, language }) => {
  return (
    <div className="h-full overflow-auto">
      <pre className="p-4 text-sm font-mono bg-gray-900 text-gray-100 h-full overflow-auto">
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};