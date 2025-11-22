import { NextRequest, NextResponse } from 'next/server';
import { generateUI } from '@/lib/gemini-service';

export async function POST(request: NextRequest) {
  try {
    const { prompt, platform } = await request.json();

    if (!prompt || !platform) {
      return NextResponse.json(
        { error: 'Missing required fields: prompt and platform' },
        { status: 400 }
      );
    }

    if (platform !== 'web' && platform !== 'mobile') {
      return NextResponse.json(
        { error: 'Platform must be either "web" or "mobile"' },
        { status: 400 }
      );
    }

    // Check if API key is available
    if (!process.env.GEMINI_API_KEY) {
      // Return mock response for demo purposes
      const mockResponse = {
        files: [
          {
            name: 'index.html',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Trading Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body class="bg-gray-900 text-white">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-gray-800 border-b border-gray-700 px-6 py-4">
            <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold">CryptoTrader Pro</h1>
                <div class="flex items-center space-x-4">
                    <span class="text-green-400">$12,345.67</span>
                    <div class="w-8 h-8 bg-blue-600 rounded-full"></div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <div class="flex">
            <!-- Sidebar -->
            <aside class="w-64 bg-gray-800 min-h-screen p-6">
                <nav class="space-y-4">
                    <a href="#" class="flex items-center space-x-3 text-blue-400 bg-gray-700 px-4 py-2 rounded-lg">
                        <i data-lucide="trending-up"></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="#" class="flex items-center space-x-3 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
                        <i data-lucide="wallet"></i>
                        <span>Portfolio</span>
                    </a>
                    <a href="#" class="flex items-center space-x-3 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
                        <i data-lucide="bar-chart-3"></i>
                        <span>Trading</span>
                    </a>
                    <a href="#" class="flex items-center space-x-3 text-gray-300 hover:text-white px-4 py-2 rounded-lg">
                        <i data-lucide="settings"></i>
                        <span>Settings</span>
                    </a>
                </nav>
            </aside>

            <!-- Main Dashboard -->
            <main class="flex-1 p-6">
                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-400 text-sm">Total Balance</p>
                                <p class="text-2xl font-bold text-green-400">$12,345.67</p>
                            </div>
                            <i data-lucide="dollar-sign" class="text-green-400"></i>
                        </div>
                    </div>
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-400 text-sm">24h Change</p>
                                <p class="text-2xl font-bold text-green-400">+5.67%</p>
                            </div>
                            <i data-lucide="trending-up" class="text-green-400"></i>
                        </div>
                    </div>
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-400 text-sm">Active Trades</p>
                                <p class="text-2xl font-bold">8</p>
                            </div>
                            <i data-lucide="activity" class="text-blue-400"></i>
                        </div>
                    </div>
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-gray-400 text-sm">P&L Today</p>
                                <p class="text-2xl font-bold text-green-400">+$234.56</p>
                            </div>
                            <i data-lucide="target" class="text-green-400"></i>
                        </div>
                    </div>
                </div>

                <!-- Chart and Watchlist -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Chart -->
                    <div class="lg:col-span-2 bg-gray-800 p-6 rounded-lg">
                        <h3 class="text-xl font-bold mb-4">BTC/USD</h3>
                        <div class="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
                            <p class="text-gray-400">Chart Placeholder</p>
                        </div>
                    </div>

                    <!-- Watchlist -->
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <h3 class="text-xl font-bold mb-4">Watchlist</h3>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-semibold">BTC</p>
                                    <p class="text-sm text-gray-400">Bitcoin</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-semibold">$43,250</p>
                                    <p class="text-sm text-green-400">+2.5%</p>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-semibold">ETH</p>
                                    <p class="text-sm text-gray-400">Ethereum</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-semibold">$2,650</p>
                                    <p class="text-sm text-red-400">-1.2%</p>
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="font-semibold">ADA</p>
                                    <p class="text-sm text-gray-400">Cardano</p>
                                </div>
                                <div class="text-right">
                                    <p class="font-semibold">$0.45</p>
                                    <p class="text-sm text-green-400">+3.8%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script>lucide.createIcons();</script>
</body>
</html>`
          }
        ],
        summary: 'Created a modern crypto trading dashboard with dark theme featuring a sidebar navigation, stats cards, and watchlist.',
        projectName: 'CryptoTrader Pro Dashboard'
      };
      
      return NextResponse.json(mockResponse);
    }

    const result = await generateUI(prompt, platform);
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate UI' },
      { status: 500 }
    );
  }
}