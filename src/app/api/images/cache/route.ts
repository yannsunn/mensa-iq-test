// 画像キャッシュ管理API

import { NextResponse } from 'next/server';
import { imageGenerationService } from '@/lib/imageGeneration';
import { logger } from '@/utils/logger';

// キャッシュ統計の取得
export async function GET() {
  try {
    const stats = imageGenerationService.getCacheStats();
    
    return NextResponse.json({
      success: true,
      stats
    }, { status: 200 });
  } catch (error) {
    logger.error('Cache stats API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// キャッシュのクリア
export async function DELETE() {
  try {
    imageGenerationService.clearCache();
    
    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully'
    }, { status: 200 });
  } catch (error) {
    logger.error('Cache clear API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}