# Stitch AI - Next.js Migration

A modern AI-powered UI generation platform built with Next.js 14 and the App Router. This application allows users to describe their desired interface and generates complete, functional code using Google's Gemini AI.

## 🚀 Features

- **AI-Powered Generation**: Describe your UI in natural language and get complete code
- **Multi-Platform Support**: Generate both web and mobile interfaces
- **Real-time Preview**: See your generated UI in action with responsive preview modes
- **Interactive Chat**: Refine and iterate on your designs through conversational AI
- **Project Management**: Save, organize, and manage multiple UI projects
- **Code Export**: Download complete project files as ZIP archives
- **Responsive Design**: Built with Tailwind CSS for modern, responsive layouts

## 🏗️ Architecture

This application follows Next.js 14 App Router best practices with proper client/server separation:

### Server Components
- **Landing Page** (`app/page.tsx`): Static marketing content
- **Layout** (`app/layout.tsx`): Global app structure and metadata
- **Legal Pages** (`components/legal-pages.tsx`): Terms, privacy, etc.

### Client Components
- **Dashboard** (`components/dashboard.tsx`): Main project interface
- **Chat Interface** (`components/chat-interface.tsx`): AI conversation UI
- **Preview Window** (`components/preview-window.tsx`): Live code preview
- **App Client** (`components/app-client.tsx`): Main application state management

### API Routes
- **Generate** (`app/api/generate/route.ts`): Initial UI generation
- **Refine** (`app/api/refine/route.ts`): Iterative improvements

### Services & Utilities
- **Types** (`lib/types.ts`): TypeScript definitions
- **Database** (`lib/db.ts`): Local storage management
- **Gemini Service** (`lib/gemini-service.ts`): AI integration
- **Constants** (`lib/constants.tsx`): Shared constants and icons

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Gemini AI
- **State Management**: React hooks and context
- **Storage**: Browser localStorage
- **Build Tool**: Turbopack (Next.js)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd structur
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your Gemini API key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:12000](http://localhost:12000)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following:

```env
API_KEY=your_gemini_api_key_here
```

### Next.js Configuration

The app is configured with:
- Server Actions enabled
- Security headers
- Custom port (12000)
- TypeScript strict mode
- Path mapping (`@/*` for root imports)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `API_KEY` environment variable
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:

```bash
npm run build
npm start
```

## 📁 Project Structure

```
structur/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── dashboard.tsx      # Main dashboard
│   ├── chat-interface.tsx # AI chat
│   ├── preview-window.tsx # Code preview
│   └── ...               # Other components
├── lib/                   # Utilities and services
│   ├── types.ts          # TypeScript definitions
│   ├── db.ts             # Storage management
│   ├── gemini-service.ts # AI integration
│   └── constants.tsx     # Shared constants
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS config
└── tsconfig.json         # TypeScript config
```

## 🔄 Migration from Vite

This project was successfully migrated from Vite to Next.js 14 with the following improvements:

- **Better SEO**: Server-side rendering and metadata management
- **Improved Performance**: Automatic code splitting and optimization
- **Enhanced Developer Experience**: Built-in TypeScript support and hot reloading
- **Scalable Architecture**: Clear separation between client and server components
- **Production Ready**: Optimized builds and deployment options

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

## 🙏 Acknowledgments

- Google Gemini AI for powering the generation capabilities
- Next.js team for the excellent framework
- Tailwind CSS for the utility-first styling approach