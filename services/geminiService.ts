
import { GoogleGenAI } from "@google/genai";
import { GeneratedFile } from "../types";

interface GenerationResponse {
  files: GeneratedFile[];
  summary?: string;
  projectName?: string;
}

const BASE_SYSTEM_PROMPT = `
  You are an expert UI/UX designer and frontend developer specializing in Tailwind CSS. 
  Your task is to generate HTML files based on the user's prompt.
  
  Technical Requirements:
  1. Generate a valid HTML file using Tailwind CSS (include <script src="https://cdn.tailwindcss.com"></script>).
  2. Use Lucide Icons. Include <script src="https://unpkg.com/lucide@latest"></script> in head and <script>lucide.createIcons();</script> at the end of body.
  3. IMPORTANT: Use Unsplash source URLs for images (e.g., https://images.unsplash.com/photo-...) or placeholder services. DO NOT use local file paths or base64 data URIs.
  4. Keep the code clean and concise but functional.
  5. FORMATTING: 
     - Separate multiple files using this comment delimiter EXACTLY: <!-- filename: filename.html -->
     - Provide a short, creative project name using this comment delimiter: <!-- project_name: Project Name -->
  6. Return ONLY the raw code. Do not use markdown code blocks.

  Summary Rules:
  1. Always include a summary using <!-- summary: ... -->.
  2. In the summary, refer to screens by their functionality (e.g., "Home Screen", "Profile Page", "Settings View") rather than their filenames (e.g., do NOT say "index.html" or "settings.html"). 
  3. Example Good Summary: "I have created a modern Home Screen with a hero section and added a new Settings Page with toggle controls."
`;

const MOBILE_RULES = `
  Mobile Design Rules (Crucial):
  1. Mobile designs MUST look like a mobile app even on desktop. 
  2. WRAPPER: Wrap the entire app content inside a div with classes: 'max-w-md mx-auto min-h-screen bg-[your-bg-color] relative shadow-2xl overflow-hidden'.
  3. BODY: Set the <body> background to a neutral color (e.g., bg-gray-100 or bg-gray-900) to contrast with the app container.
  4. FIXED ELEMENTS: If using fixed positioning (like bottom nav), ensure it stays within the mobile container. 
     - Use: 'fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50'.
  5. PADDING: Add 'pb-24' to the main content to prevent it from hiding behind the bottom nav.
`;

const WEB_RULES = `
  Web Design Rules:
  1. Generate a responsive, full-width web application.
  2. Use semantic HTML tags (header, main, footer, section).
  3. Ensure the layout is responsive using Tailwind's breakpoint prefixes (sm:, md:, lg:, xl:).
  4. Do NOT wrap the body in a restricted width container unless specifically asked for a boxed layout. The app should take up the full viewport width and be mobile-responsive.
`;

const cleanResponse = (text: string): string => {
  let cleaned = text.trim();
  // Remove markdown code blocks if present (both html and generic)
  cleaned = cleaned.replace(/```html/g, '').replace(/```/g, '');
  return cleaned;
};

const parseResponse = (text: string): GenerationResponse => {
  const cleanedCode = cleanResponse(text);
  
  // Extract Project Name
  const nameRegex = /<!-- project_name: (.*?) -->/;
  const nameMatch = cleanedCode.match(nameRegex);
  const projectName = nameMatch ? nameMatch[1].trim() : undefined;

  // Extract Summary if present
  const summaryRegex = /<!-- summary: (.*?) -->/s;
  const summaryMatch = cleanedCode.match(summaryRegex);
  const summary = summaryMatch ? summaryMatch[1].trim() : undefined;

  // Remove metadata from code to avoid duplication in file content
  let codeContent = cleanedCode.replace(nameRegex, '').replace(summaryRegex, '');

  const delimiterRegex = /<!-- filename: (.*?) -->/g;
  const parts = codeContent.split(delimiterRegex);
  
  // If no delimiters found, assume it's a single index.html
  if (parts.length === 1) {
      return { 
          files: [{ name: 'index.html', content: codeContent.trim() }],
          summary,
          projectName
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
  return { files, summary, projectName };
};

export const generateUI = async (prompt: string, platform: 'web' | 'mobile'): Promise<GenerationResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const platformInstruction = platform === 'mobile' ? MOBILE_RULES : WEB_RULES;

    const fullPrompt = `
      ${BASE_SYSTEM_PROMPT}
      
      ${platformInstruction}

      User's Prompt: "${prompt}"
      
      INSTRUCTIONS:
      - Generate the requested UI. 
      - If multiple screens are needed (e.g., login and home), return multiple files separated by the delimiter.
      - Default to 'index.html' for the main file.
      - GENERATE A PROJECT NAME based on the prompt.
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

    const platformInstruction = platform === 'mobile' ? MOBILE_RULES : WEB_RULES;

    const fullPrompt = `
      ${BASE_SYSTEM_PROMPT}
      
      ${platformInstruction}

      CONTEXT:
      The user wants to modify an existing ${platform} project.
      
      CURRENT FILES:
      ${filesContext}

      USER'S REQUEST:
      "${userPrompt}"

      INSTRUCTIONS:
      1. If editing an existing file, return the FULL updated code for that file with its filename delimiter.
      2. If creating a new screen, return the code for the new file with a new filename delimiter (e.g., <!-- filename: login.html -->).
      3. ALWAYS include a brief summary of what you changed in this format: <!-- summary: ... -->
      4. In the summary, refer to screens by their readable names (e.g., "Home Page"), not filenames.
      5. Do not skip sections of code; return full files.
      ${platform === 'mobile' ? '6. Ensure mobile navigation rules (max-w-md, fixed centered nav) are strictly applied.' : ''}
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
