import { NextRequest, NextResponse } from 'next/server';
import { refineUI } from '@/lib/gemini-service';

export async function POST(request: NextRequest) {
  try {
    const { currentFiles, userPrompt, platform } = await request.json();

    if (!currentFiles || !userPrompt || !platform) {
      return NextResponse.json(
        { error: 'Missing required fields: currentFiles, userPrompt, and platform' },
        { status: 400 }
      );
    }

    if (platform !== 'web' && platform !== 'mobile') {
      return NextResponse.json(
        { error: 'Platform must be either "web" or "mobile"' },
        { status: 400 }
      );
    }

    const result = await refineUI(currentFiles, userPrompt, platform);
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Refine API error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to refine UI' },
      { status: 500 }
    );
  }
}