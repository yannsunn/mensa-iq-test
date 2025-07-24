// 画像生成テストAPI

import { NextResponse } from 'next/server';
import { imageGenerationService } from '@/lib/imageGeneration';
import { logger } from '@/utils/logger';

export async function GET() {
  try {
    // テスト用のプロンプト
    const testPrompt = "minimalist geometric pattern for IQ test, 3x3 grid with shapes, black and white, clean lines";
    
    // 現在のプロバイダーを取得
    const provider = imageGenerationService.getCurrentProvider();
    
    // テスト画像を生成
    const result = await imageGenerationService.generateImage({
      questionId: 'test-' + Date.now(),
      prompt: testPrompt,
      style: 'minimal',
      quality: 'draft' // テストなのでコスト最小化
    });
    
    return NextResponse.json({
      provider,
      testResult: result,
      timestamp: new Date().toISOString()
    }, { status: 200 });
    
  } catch (error) {
    logger.error('Test image generation error:', error);
    return NextResponse.json(
      { 
        error: 'Test failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}