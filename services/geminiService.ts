
import { GoogleGenAI } from "@google/genai";
import { GeneratedFile } from "../types";

interface GenerationResponse {
  files: GeneratedFile[];
  summary?: string;
}

const SYSTEM_PROMPT = `
  You are an expert UI/UX designer and frontend developer specializing in Tailwind CSS. 
  Your task is to generate HTML files based on the user's prompt.
  
  Technical Requirements:
  1. Generate a valid HTML file using Tailwind CSS (include <script src="https://cdn.tailwindcss.com"></script>).
  2. Use Lucide Icons. Include <script src="https://unpkg.com/lucide@latest"></script> in head and <script>lucide.createIcons();</script> at the end of body.
  3. IMPORTANT: Use Unsplash source URLs for images (e.g., https://images.unsplash.com/photo-...) or placeholder services. DO NOT use local file paths or base64 data URIs.
  4. Keep the code clean and concise but functional.
  5. FORMATTING: Separate multiple files using this comment delimiter EXACTLY: <!-- filename: filename.html -->
  6. Return ONLY the raw code. Do not use markdown code blocks.

  Mobile Design Rules (Crucial):
  1. If the design needs a bottom navigation bar, it MUST use 'fixed bottom-0 left-0 w-full z-50'.
  2. You MUST add sufficient bottom padding (e.g., 'pb-20' or 'pb-24') to the main content wrapper or body so the content is not hidden behind the fixed bottom nav.
`;

const cleanResponse = (text: string): string => {
  let cleaned = text.trim();
  // Remove markdown code blocks if present (both html and generic)
  cleaned = cleaned.replace(/```html/g, '').replace(/```/g, '');
  return cleaned;
};

const parseResponse = (text: string): GenerationResponse => {
  const cleanedCode = cleanResponse(text);
  
  // Extract Summary if present
  const summaryRegex = /<!-- summary: (.*?) -->/s;
  const summaryMatch = cleanedCode.match(summaryRegex);
  const summary = summaryMatch ? summaryMatch[1].trim() : undefined;

  // Remove summary from code to avoid duplication in file content if it was placed outside
  const codeWithoutSummary = cleanedCode.replace(summaryRegex, '');

  const delimiterRegex = /<!-- filename: (.*?) -->/g;
  const parts = codeWithoutSummary.split(delimiterRegex);
  
  // If no delimiters found, assume it's a single index.html
  if (parts.length === 1) {
      return { 
          files: [{ name: 'index.html', content: codeWithoutSummary.trim() }],
          summary 
      };
  }

  const files: GeneratedFile[] = [];
  // The split result will be [preamble, filename1, content1, filename2, content2...]
  for (let i = 1; i < parts.length; i += 2) {
      const name = parts[i].trim();
      const content = parts[i + 1].trim();
      if (name && content) {
          files.push({ name, content });
      }
  }
  return { files, summary };
};

export const generateUI = async (prompt: string, platform: 'web' | 'mobile'): Promise<GenerationResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const platformInstruction = platform === 'mobile' 
        ? `Generate a Mobile App UI. The design should be suitable for a mobile screen (375px width). If it's a full app, include a fixed bottom navigation.` 
        : `Generate a responsive Single Page Web Application.`;

    const fullPrompt = `
      ${SYSTEM_PROMPT}
      
      ${platformInstruction}

      User's Prompt: "${prompt}"
      
      INSTRUCTIONS:
      - Generate the requested UI. 
      - If multiple screens are needed (e.g., login and home), return multiple files separated by the delimiter.
      - Default to 'index.html' for the main file.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: fullPrompt,
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return parseResponse(text);

  } catch (error: any) {
    console.error("Error generating UI:", error);
    throw new Error(`Failed to generate UI: ${error.message}`);
  }
};

export const refineUI = async (currentFiles: GeneratedFile[], userPrompt: string, platform: 'web' | 'mobile'): Promise<GenerationResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Create a context string of existing files
    const filesContext = currentFiles.map(f => `
<!-- filename: ${f.name} -->
${f.content}
    `).join('\n');

    const fullPrompt = `
      ${SYSTEM_PROMPT}

      CONTEXT:
      The user wants to modify an existing ${platform} project.
      
      CURRENT FILES:
      ${filesContext}

      USER'S REQUEST:
      "${userPrompt}"

      INSTRUCTIONS:
      1. If editing an existing file, return the FULL updated code for that file with its filename delimiter.
      2. If creating a new screen, return the code for the new file with a new filename delimiter (e.g., <!-- filename: login.html -->).
      3. ALWAYS include a brief summary of what you changed in this format: <!-- summary: I have updated the color scheme and added a new login screen. -->
      4. Do not skip sections of code; return full files.
      5. Ensure mobile navigation rules are still applied if relevant.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: fullPrompt,
    });

     const text = response.text;
     if (!text) throw new Error("No response from AI");
     
     return parseResponse(text);

  } catch (error: any) {
    console.error("Error refining UI:", error);
    throw new Error(`Failed to refine UI: ${error.message}`);
  }
};
