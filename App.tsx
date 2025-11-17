
import React, { useState, useCallback } from 'react';
import { PromptInput } from './components/PromptInput';
import { PreviewWindow } from './components/PreviewWindow';
import { generateUI } from './services/geminiService';
import { LogoIcon } from './constants';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');

    try {
      const code = await generateUI(prompt);
      setGeneratedCode(code);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setGeneratedCode('');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);
  
  return (
    <main className="bg-gem-onyx text-gem-white h-screen w-screen overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full font-sans">
        
        {/* Left Panel: Controls */}
        <div className="lg:col-span-1 bg-gem-onyx flex flex-col h-full border-r border-gem-slate/50">
          <header className="p-4 border-b border-gem-slate/50 flex items-center space-x-3 shrink-0">
            <LogoIcon />
            <h1 className="text-xl font-bold text-gem-white">Stitch AI</h1>
          </header>

          <div className="p-4 md:p-6 flex-grow flex flex-col gap-4 overflow-y-auto">
            <PromptInput 
              prompt={prompt} 
              setPrompt={setPrompt} 
              onGenerate={handleGenerate} 
              isLoading={isLoading} 
            />
             {error && (
              <div className="text-red-400 p-4 mt-4 bg-red-900/20 rounded-md">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Preview Canvas */}
        <div className="lg:col-span-2 bg-gem-slate/50 flex flex-col h-full">
           <header className="p-4 border-b border-gem-slate/50 flex items-center shrink-0">
            <h2 className="text-lg font-semibold text-gem-silver">Live Preview Canvas</h2>
          </header>
          <PreviewWindow code={generatedCode} />
        </div>
      </div>
    </main>
  );
};

export default App;
