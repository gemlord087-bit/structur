
import { GoogleGenAI } from "@google/genai";
import { GeneratedFile } from "../types";

interface GenerationResponse {
  files: GeneratedFile[];
}

const SYSTEM_PROMPT = `
  You are an expert UI/UX designer and frontend developer specializing in Tailwind CSS. 
  Your task is to generate HTML files based on the user's prompt.
  
  Technical Requirements:
  1. Generate a valid HTML file using Tailwind CSS (include <script src="https://cdn.tailwindcss.com"></script>).
  2. Use Lucide Icons. Include <script src="https://unpkg.com/lucide@latest"></script> in head and <script>lucide.createIcons();</script> at the end of body.
  3. IMPORTANT: Use Unsplash source URLs for images (e.g., https://images.unsplash.com/photo-...) or placeholder services. DO NOT use local file paths or base64 data URIs for images.
  4. Keep the code clean and concise but functional.
  5. If the user asks for multiple screens (e.g., "dashboard and login"), generate multiple files.
  6. FORMATTING: Separate multiple files using this comment delimiter EXACTLY: <!-- filename: filename.html -->
  7. Return ONLY the raw code. Do not use markdown code blocks.
`;

// Helper to parse the custom delimited format
const parseFiles = (text: string): GeneratedFile[] => {
  const delimiterRegex = /<!-- filename: (.*?) -->/g;
  const parts = text.split(delimiterRegex);
  
  // If no delimiters found, assume it's a single index.html
  if (parts.length === 1) {
      return [{ name: 'index.html', content: text.trim() }];
  }

  const files: GeneratedFile[] = [];
  // The split result will be [preamble, filename1, content1, filename2, content2...]
  // We start at index 1 because index 0 is usually empty or preamble
  for (let i = 1; i < parts.length; i += 2) {
      const name = parts[i].trim();
      const content = parts[i + 1].trim();
      if (name && content) {
          files.push({ name, content });
      }
  }
  return files;
};

const cleanResponse = (text: string): string => {
  let cleaned = text.trim();
  // Remove markdown code blocks if present (both html and generic)
  cleaned = cleaned.replace(/```html/g, '').replace(/```/g, '');
  return cleaned;
};

export const generateUI = async (prompt: string, platform: 'web' | 'mobile'): Promise<GenerationResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const platformInstruction = platform === 'mobile' 
        ? `Generate a Mobile App UI. The design should be suitable for a mobile screen (375px width).` 
        : `Generate a responsive Single Page Web Application.`;

    const fullPrompt = `
      ${SYSTEM_PROMPT}
      
      ${platformInstruction}

      User's Prompt: "${prompt}"
      
      REMEMBER: If multiple files are needed, separate them with <!-- filename: name.html -->.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: fullPrompt,
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const cleanedCode = cleanResponse(text);
    const files = parseFiles(cleanedCode);

    return { files };

  } catch (error: any) {
    console.error("Error generating UI:", error);
    throw new Error(`Failed to generate UI: ${error.message}`);
  }
};

export const refineUI = async (currentFiles: GeneratedFile[], userPrompt: string): Promise<GeneratedFile[]> => {
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
      The user wants to modify an existing project or add new screens.
      
      CURRENT FILES:
      ${filesContext}

      USER'S REQUEST:
      "${userPrompt}"

      INSTRUCTIONS:
      1. If editing an existing file, return the FULL updated code for that file with its filename delimiter.
      2. If creating a new screen, return the code for the new file with a new filename delimiter (e.g., <!-- filename: login.html -->).
      3. You can return multiple files.
      4. Do not skip sections of code; return full files.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: fullPrompt,
    });

     const text = response.text;
     if (!text) throw new Error("No response from AI");
     
     const cleanedCode = cleanResponse(text);
     const files = parseFiles(cleanedCode);

     return files;

  } catch (error: any) {
    console.error("Error refining UI:", error);
    throw new Error(`Failed to refine UI: ${error.message}`);
  }
};
