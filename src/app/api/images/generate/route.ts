// 画像生成API エンドポイント（セキュアエラーハンドリング版）

import { NextRequest, NextResponse } from 'next/server';
import { imageGenerationService } from '@/lib/imageGeneration';
import { ImageGenerationRequest } from '@/types/image';
import { initializeEnv } from '@/lib/env';
import { logger } from '@/utils/logger';
import { 
  withErrorHandling,
  createSuccessResponse,
  createErrorResponse,
  validators,
  checkRateLimit
} from '@/lib/apiErrorHandler';
import { 
  createValidationError,
  createTimeoutError,
  ErrorCodes
} from '@/types/error';

// APIルート初期化時に環境変数をチェック
initializeEnv();

// Vercelエッジキャッシュ対応のヘッダー設定
const setCacheHeaders = (response: NextResponse, cacheMetadata?: any) => {
  const maxAge = cacheMetadata?.maxAge || 3600;
  const staleWhileRevalidate = cacheMetadata?.staleWhileRevalidate || 86400;
  
  // Vercelエッジキャッシュ最適化
  response.headers.set(
    'Cache-Control', 
    `public, max-age=${maxAge}, s-maxage=${maxAge * 2}, stale-while-revalidate=${staleWhileRevalidate}`
  );
  
  // ETag設定（ブラウザキャッシュ効率化）
  if (cacheMetadata?.etag) {
    response.headers.set('ETag', `"${cacheMetadata.etag}"`);
  }
  
  // セキュリティヘッダー
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  
  // CDN最適化
  response.headers.set('Vary', 'Accept-Encoding');
  
  return response;
};

// Client IPアドレス取得（レート制限用）
const getClientIP = (request: NextRequest): string => {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
};

export const POST = withErrorHandling(async (request: NextRequest) => {
  logger.log('[API] POST /api/images/generate called');
  
  // レート制限チェック
  const clientIP = getClientIP(request);
  checkRateLimit(clientIP, 50, 60000); // 1分間に50リクエスト
  
  // リクエストボディのパース
  const rawBody = await request.text();
  const body = validators.json(rawBody) as ImageGenerationRequest;
  
  // リクエストのバリデーション（型安全）
  validators.required(body.questionId, 'questionId');
  validators.string(body.questionId, 'questionId');
  
  validators.required(body.prompt, 'prompt');
  validators.string(body.prompt, 'prompt');
  validators.maxLength(body.prompt, 2000, 'prompt');

  logger.log('Image generation request:', {
    questionId: body.questionId,
    prompt: body.prompt.substring(0, 100) + '...',
    style: body.style || 'minimal',
    provider: imageGenerationService.getCurrentProvider()
  });

  // 画像生成の実行（タイムアウト付き）
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(createTimeoutError(
        ErrorCodes.TIMEOUT_ERROR,
        'Image generation request timed out after 30 seconds'
      ));
    }, 30000);
  });
  
  const result = await Promise.race([
    imageGenerationService.generateImage(body),
    timeoutPromise
  ]);
  
  if (result.success) {
    return createSuccessResponse(result, undefined, result.cacheMetadata);
  } else {
    throw createValidationError(
      ErrorCodes.IMAGE_GENERATION_FAILED,
      result.error || 'Image generation failed',
      { provider: imageGenerationService.getCurrentProvider() }
    );
  }
});

export const GET = withErrorHandling(async (request: NextRequest) => {
  logger.log('[API] GET /api/images/generate called');
  
  // レート制限チェック
  const clientIP = getClientIP(request);
  checkRateLimit(clientIP, 50, 60000); // 1分間に50リクエスト
  
  const searchParams = request.nextUrl.searchParams;
  const questionId = searchParams.get('questionId');
  const category = searchParams.get('category');
  const description = searchParams.get('description');
  const style = searchParams.get('style') || 'minimal';
  
  // パラメータのバリデーション（型安全）
  validators.required(questionId, 'questionId');
  validators.string(questionId, 'questionId');
  
  validators.required(category, 'category');
  validators.string(category, 'category');
  
  validators.required(description, 'description');
  validators.string(description, 'description');
  validators.maxLength(description, 1000, 'description');

  logger.log('Image generation GET request:', {
    questionId,
    category,
    description: description.substring(0, 100) + '...',
    style,
    provider: imageGenerationService.getCurrentProvider()
  });

  // カテゴリ別の画像生成（タイムアウト付き）
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(createTimeoutError(
        ErrorCodes.TIMEOUT_ERROR,
        'Image generation request timed out after 30 seconds'
      ));
    }, 30000);
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
    return createSuccessResponse(result, undefined, result.cacheMetadata);
  } else {
    throw createValidationError(
      ErrorCodes.IMAGE_GENERATION_FAILED,
      result.error || 'Image generation failed',
      { provider: imageGenerationService.getCurrentProvider() }
    );
  }
});