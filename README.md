# Stitch AI

Stitch AI is an intelligent UI design assistant that transforms natural language descriptions into production-ready HTML and Tailwind CSS code. Powered by Google's **Gemini 3 Pro** model, it generates responsive, modern interfaces instantly.

## Features

- **AI-Powered Generation**: Utilizes `gemini-3-pro-preview` to interpret complex design prompts and generate high-quality code.
- **Platform Selection**: Toggle between **Web** and **Mobile** contexts to tailor the design output.
- **Instant Preview**: Render generated code immediately in a secure sandbox.
- **Responsive Viewports**:
  - **Web Mode**: Switch between Desktop, Tablet, and Mobile breakpoints.
  - **Mobile Mode**: optimized full-height mobile view.
- **Code Inspector**:
  - View generated source code in a macOS-style terminal window.
  - Syntax highlighting powered by PrismJS.
  - One-click copy functionality.
- **Modern Tech Stack**: Automatically includes Tailwind CSS for styling and Lucide Icons for vector graphics.

## Tech Stack

- **Frontend**: React 19, TypeScript
- **AI Model**: Google Gemini API (`@google/genai`)
- **Styling**: Tailwind CSS (via CDN for generated content)
- **Icons**: Lucide Icons
- **Syntax Highlighting**: PrismJS

## Usage

1. **Configure Platform**: Select "Web" or "Mobile" at the top of the prompt panel.
2. **Describe Your UI**: Enter a detailed description of the interface you want to build (e.g., "A SaaS landing page with a hero section, pricing table, and testimonial grid").
3. **Generate**: Click the "Generate UI" button or press `Cmd/Ctrl + Enter`.
4. **Preview & Test**:
   - Use the **Preview** tab to interact with the result.
   - Use the viewport controls (Desktop/Tablet/Mobile) to test responsiveness (Web mode only).
5. **Export**: Switch to the **Code** tab to view and copy the raw HTML/CSS.

## API Configuration

This application requires a valid Google Gemini API key set in the environment variables.

```env
API_KEY=your_gemini_api_key_here
```

## License

MIT