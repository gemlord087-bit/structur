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