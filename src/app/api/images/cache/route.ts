// 画像キャッシュ管理API

import { NextRequest, NextResponse } from 'next/server';
import { imageGenerationService } from '@/lib/imageGeneration';

// キャッシュ統計の取得
export async function GET(request: NextRequest) {
  try {
    const stats = imageGenerationService.getCacheStats();
    
    return NextResponse.json({
      success: true,
      stats
    }, { status: 200 });
  } catch (error) {
    console.error('Cache stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// キャッシュのクリア
export async function DELETE(request: NextRequest) {
  try {
    imageGenerationService.clearCache();
    
    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully'
    }, { status: 200 });
  } catch (error) {
    console.error('Cache clear API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}