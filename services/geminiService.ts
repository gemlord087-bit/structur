
import { GoogleGenAI } from "@google/genai";

const cleanHtmlResponse = (response: string): string => {
  const htmlRegex = /<!DOCTYPE html>[\s\S]*?<\/html>/;
  const match = response.match(htmlRegex);
  if (match) {
    return match[0];
  }
  // Fallback if regex fails, remove markdown
  return response.replace(/```html|```/g, '').trim();
};


export const generateUI = async (prompt: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const fullPrompt = `
      You are an expert UI/UX designer and frontend developer specializing in Tailwind CSS. 
      Your task is to generate a single, complete HTML file based on the user's prompt.
      The HTML file must use Tailwind CSS for all styling.
      The generated HTML should be directly renderable in a browser.
      It MUST include a <head> section with the Tailwind CSS CDN script: <script src="https://cdn.tailwindcss.com"></script>.
      Do not include any explanations, introductions, markdown formatting, or any text outside of the HTML code itself. 
      Your entire response should be only the HTML code, starting with <!DOCTYPE html> and ending with </html>.

      User's Prompt: "${prompt}"
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: fullPrompt,
    });

    const generatedText = response.text;
    if (!generatedText) {
        throw new Error("Received an empty response from the AI.");
    }
    
    return cleanHtmlResponse(generatedText);

  } catch (error: any) {
    console.error("Error generating UI with Gemini:", error);
    throw new Error(`Failed to generate UI: ${error.message}`);
  }
};
