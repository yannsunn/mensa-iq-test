// 画像キャッシュ管理API（セキュアエラーハンドリング版）

import { NextRequest } from 'next/server';
import { imageGenerationService } from '@/lib/imageGeneration';
import { logger } from '@/utils/logger';
import { 
  withErrorHandling,
  createSuccessResponse,
  checkRateLimit
} from '@/lib/apiErrorHandler';
import { 
  createServerError,
  ErrorCodes
} from '@/types/error';

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

// キャッシュ統計の取得
export const GET = withErrorHandling(async (request: NextRequest) => {
  // レート制限チェック（キャッシュ管理は管理者機能なので制限を強化）
  const clientIP = getClientIP(request);
  checkRateLimit(clientIP, 10, 60000); // 1分間に10リクエスト
  
  try {
    const stats = imageGenerationService.getCacheStats();
    return createSuccessResponse(stats);
  } catch (error) {
    logger.error('Cache stats API error:', error);
    throw createServerError(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      'Failed to retrieve cache statistics'
    );
  }
});

// キャッシュのクリア
export const DELETE = withErrorHandling(async (request: NextRequest) => {
  // レート制限チェック（キャッシュクリアは管理者機能なのでさらに制限を強化）
  const clientIP = getClientIP(request);
  checkRateLimit(clientIP, 5, 60000); // 1分間に5リクエスト
  
  try {
    imageGenerationService.clearCache();
    
    logger.log('[Cache] Cache cleared successfully by IP:', clientIP);
    
    return createSuccessResponse({
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Cache clear API error:', error);
    throw createServerError(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      'Failed to clear cache'
    );
  }
});