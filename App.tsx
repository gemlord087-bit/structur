
import React, { useState, useCallback } from 'react';
import { PromptInput } from './components/PromptInput';
import { PreviewWindow } from './components/PreviewWindow';
import { generateUI } from './services/geminiService';
import { LogoIcon, DEFAULT_CODE } from './constants';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>(DEFAULT_CODE);
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
    <main className="bg-white text-gray-900 h-[100dvh] w-screen overflow-hidden">
      <div className="flex flex-col lg:grid lg:grid-cols-3 h-full font-sans">
        
        {/* Left Panel: Prompt Input */}
        <div className="lg:col-span-1 bg-white flex flex-col border-b lg:border-b-0 lg:border-r border-gray-200 shadow-sm z-10 shrink-0 max-h-[45vh] lg:max-h-full lg:h-full">
          <header className="p-4 border-b border-gray-200 flex items-center space-x-3 shrink-0">
            <LogoIcon />
            <h1 className="text-xl font-bold text-gray-900">Stitch AI</h1>
          </header>

          <div className="p-4 md:p-6 flex-grow flex flex-col gap-6 overflow-y-auto min-h-0">
            <PromptInput 
              prompt={prompt} 
              setPrompt={setPrompt} 
              onGenerate={handleGenerate} 
              isLoading={isLoading} 
            />
          </div>
        </div>

        {/* Right Panel: Preview & Code */}
        <div className="lg:col-span-2 bg-gray-50 flex flex-col flex-grow h-full relative overflow-hidden min-h-0">
          <PreviewWindow 
            code={generatedCode} 
            isLoading={isLoading} 
            error={error} 
          />
        </div>
      </div>
    </main>
  );
};

export default App;
