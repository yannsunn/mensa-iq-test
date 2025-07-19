// 画像生成API エンドポイント（最適化版）

import { NextRequest, NextResponse } from 'next/server';
import { imageGenerationService } from '@/lib/imageGeneration';
import { ImageGenerationRequest } from '@/types/image';
import { initializeEnv } from '@/lib/env';

// APIルート初期化時に環境変数をチェック
initializeEnv();

// レスポンスのキャッシュヘッダー設定
const setCacheHeaders = (response: NextResponse) => {
  response.headers.set('Cache-Control', 'public, max-age=3600'); // 1時間キャッシュ
  response.headers.set('X-Content-Type-Options', 'nosniff');
  return response;
};

// エラーレスポンスの統一処理
const createErrorResponse = (error: string, status: number = 500) => {
  console.error(`[ImageAPI] Error: ${error}`);
  return NextResponse.json({ error }, { status });
};

export async function POST(request: NextRequest) {
  console.log('[API] POST /api/images/generate called');
  
  try {
    // リクエストボディのパース
    let body: ImageGenerationRequest;
    try {
      body = await request.json();
    } catch {
      return createErrorResponse('Invalid JSON in request body', 400);
    }
    
    // リクエストのバリデーション（強化版）
    if (!body.questionId || typeof body.questionId !== 'string') {
      return createErrorResponse('questionId is required and must be a string', 400);
    }
    
    if (!body.prompt || typeof body.prompt !== 'string') {
      return createErrorResponse('prompt is required and must be a string', 400);
    }
    
    if (body.prompt.length > 2000) {
      return createErrorResponse('prompt is too long (max 2000 characters)', 400);
    }

    console.log('Image generation request:', {
      questionId: body.questionId,
      prompt: body.prompt.substring(0, 100) + '...',
      style: body.style || 'minimal',
      provider: imageGenerationService.getCurrentProvider()
    });

    // 画像生成の実行（タイムアウト付き）
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Image generation timeout')), 30000);
    });
    
    const result = await Promise.race([
      imageGenerationService.generateImage(body),
      timeoutPromise
    ]);
    
    if (result.success) {
      const response = NextResponse.json(result, { status: 200 });
      return setCacheHeaders(response);
    } else {
      return createErrorResponse(result.error || 'Unknown error', 500);
    }
  } catch (error) {
    console.error('[ImageAPI] Unhandled error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    const errorDetails = {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      provider: imageGenerationService.getCurrentProvider(),
      timestamp: new Date().toISOString()
    };
    console.error('[ImageAPI] Error details:', errorDetails);
    return createErrorResponse(errorMessage, 500);
  }
}

export async function GET(request: NextRequest) {
  console.log('[API] GET /api/images/generate called');
  
  try {
    const searchParams = request.nextUrl.searchParams;
    const questionId = searchParams.get('questionId');
    const category = searchParams.get('category');
    const description = searchParams.get('description');
    const style = searchParams.get('style') || 'minimal';
    
    // パラメータのバリデーション（強化版）
    if (!questionId || typeof questionId !== 'string') {
      return createErrorResponse('questionId is required and must be a string', 400);
    }
    
    if (!category || typeof category !== 'string') {
      return createErrorResponse('category is required and must be a string', 400);
    }
    
    if (!description || typeof description !== 'string') {
      return createErrorResponse('description is required and must be a string', 400);
    }
    
    if (description.length > 1000) {
      return createErrorResponse('description is too long (max 1000 characters)', 400);
    }

    console.log('Image generation GET request:', {
      questionId,
      category,
      description: description.substring(0, 100) + '...',
      style,
      provider: imageGenerationService.getCurrentProvider()
    });

    // カテゴリ別の画像生成（タイムアウト付き）
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Image generation timeout')), 30000);
    });
    
    const result = await Promise.race([
      imageGenerationService.generateQuestionImage(
        questionId,
        category,
        description,
        style
      ),
      timeoutPromise
    ]);
    
    if (result.success) {
      const response = NextResponse.json(result, { status: 200 });
      return setCacheHeaders(response);
    } else {
      return createErrorResponse(result.error || 'Unknown error', 500);
    }
  } catch (error) {
    console.error('[ImageAPI] Unhandled error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    const errorDetails = {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      provider: imageGenerationService.getCurrentProvider(),
      timestamp: new Date().toISOString()
    };
    console.error('[ImageAPI] Error details:', errorDetails);
    return createErrorResponse(errorMessage, 500);
  }
}