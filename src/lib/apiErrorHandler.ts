// API統一エラーハンドラー

import { NextResponse } from 'next/server';
import { logger } from '@/utils/logger';
import { 
  AppError, 
  ApiErrorResponse, 
  ApiSuccessResponse,
  createAppError,
  createServerError,
  ErrorCodes,
  ErrorTypes,
  getErrorMessage,
  isAppError 
} from '@/types/error';
import { randomUUID } from 'crypto';

// 本番環境判定
const isProduction = process.env.NODE_ENV === 'production';

// セキュリティヘッダーの設定
function setSecurityHeaders<T>(response: NextResponse<T>): NextResponse<T> {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // CSP設定（画像生成APIの場合）
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'"
  );
  
  return response;
}

// エラーの詳細情報をサニタイズ（本番環境では機密情報を除去）
function sanitizeErrorDetails(error: unknown): Record<string, unknown> {
  if (!isProduction) {
    // 開発環境では詳細な情報を返す
    return {
      stack: error instanceof Error ? error.stack : undefined,
      originalError: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString()
    };
  }
  
  // 本番環境では最小限の情報のみ
  return {
    timestamp: new Date().toISOString()
  };
}

// 統一エラーレスポンスの作成
export function createErrorResponse(
  error: AppError | Error | string | unknown,
  requestId?: string,
  locale: 'ja' | 'en' = 'ja'
): NextResponse<ApiErrorResponse> {
  let appError: AppError;
  
  if (isAppError(error)) {
    appError = error;
  } else if (error instanceof Error) {
    // 一般的なErrorオブジェクトをAppErrorに変換
    appError = createServerError(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      isProduction ? getErrorMessage(ErrorCodes.INTERNAL_SERVER_ERROR, locale) : error.message,
      sanitizeErrorDetails(error)
    );
  } else if (typeof error === 'string') {
    appError = createServerError(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      isProduction ? getErrorMessage(ErrorCodes.INTERNAL_SERVER_ERROR, locale) : error
    );
  } else {
    // 不明なエラータイプ
    appError = createServerError(
      ErrorCodes.INTERNAL_SERVER_ERROR,
      getErrorMessage(ErrorCodes.INTERNAL_SERVER_ERROR, locale),
      sanitizeErrorDetails(error)
    );
  }
  
  // リクエストIDを設定
  if (requestId) {
    appError.requestId = requestId;
  }
  
  // ログ出力（セキュリティを考慮）
  const logData = {
    requestId: appError.requestId,
    type: appError.type,
    code: appError.code,
    message: appError.message,
    statusCode: appError.statusCode,
    timestamp: appError.timestamp,
    ...(isProduction ? {} : { details: appError.details })
  };
  
  logger.error('[API Error]', logData);
  
  const errorResponse: ApiErrorResponse = {
    error: {
      type: appError.type,
      code: appError.code,
      message: appError.message,
      timestamp: appError.timestamp,
      requestId: appError.requestId,
      // 本番環境では詳細情報を隠す
      ...(isProduction ? {} : { details: appError.details })
    },
    success: false
  };
  
  const response = NextResponse.json(errorResponse, { status: appError.statusCode }) as NextResponse<ApiErrorResponse>;
  return setSecurityHeaders(response);
}

// 成功レスポンスの作成
export function createSuccessResponse<T>(
  data: T,
  requestId?: string,
  cacheMetadata?: Record<string, unknown>
): NextResponse<ApiSuccessResponse<T>> {
  const successResponse: ApiSuccessResponse<T> = {
    data,
    success: true,
    meta: {
      timestamp: new Date().toISOString(),
      requestId,
      ...(cacheMetadata && { cacheMetadata })
    }
  };
  
  const response = NextResponse.json(successResponse, { status: 200 });
  return setSecurityHeaders(response);
}

// APIハンドラーラッパー（エラーハンドリングを自動適用）
export function withErrorHandling<T extends any[], R>(
  handler: (...args: T) => Promise<NextResponse<R>>
) {
  return async (...args: T): Promise<NextResponse<R | ApiErrorResponse>> => {
    const requestId = randomUUID();
    
    try {
      logger.log(`[API Request] ${requestId} - Starting request`);
      
      const result = await handler(...args);
      
      logger.log(`[API Request] ${requestId} - Completed successfully`);
      return result;
      
    } catch (error) {
      logger.error(`[API Request] ${requestId} - Error occurred:`, error);
      
      // タイムアウトエラーの特別処理
      if (error instanceof Error && error.message.includes('timeout')) {
        const timeoutError = createAppError(
          ErrorTypes.TIMEOUT,
          ErrorCodes.TIMEOUT_ERROR,
          getErrorMessage(ErrorCodes.TIMEOUT_ERROR),
          408
        );
        return createErrorResponse(timeoutError, requestId);
      }
      
      return createErrorResponse(error, requestId);
    }
  };
}

// バリデーションヘルパー
export const validators = {
  required: (value: unknown, fieldName: string): void => {
    if (value === undefined || value === null || value === '') {
      throw createAppError(
        ErrorTypes.VALIDATION,
        ErrorCodes.MISSING_FIELD,
        `${fieldName} is required`,
        400,
        { field: fieldName }
      );
    }
  },
  
  string: (value: unknown, fieldName: string): void => {
    if (typeof value !== 'string') {
      throw createAppError(
        ErrorTypes.VALIDATION,
        ErrorCodes.INVALID_FIELD_TYPE,
        `${fieldName} must be a string`,
        400,
        { field: fieldName, receivedType: typeof value }
      );
    }
  },
  
  maxLength: (value: string, maxLength: number, fieldName: string): void => {
    if (value.length > maxLength) {
      throw createAppError(
        ErrorTypes.VALIDATION,
        ErrorCodes.FIELD_TOO_LONG,
        `${fieldName} must be at most ${maxLength} characters`,
        400,
        { field: fieldName, maxLength, actualLength: value.length }
      );
    }
  },
  
  json: (body: string): unknown => {
    try {
      return JSON.parse(body);
    } catch {
      throw createAppError(
        ErrorTypes.VALIDATION,
        ErrorCodes.INVALID_JSON,
        'Invalid JSON in request body',
        400
      );
    }
  }
};

// レート制限チェッカー（簡易版）
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(
  identifier: string, 
  maxRequests: number = 100, 
  windowMs: number = 60000
): void {
  const now = Date.now();
  const current = rateLimitMap.get(identifier);
  
  if (!current || now > current.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return;
  }
  
  if (current.count >= maxRequests) {
    throw createAppError(
      ErrorTypes.AUTHORIZATION,
      ErrorCodes.RATE_LIMIT_EXCEEDED,
      'Rate limit exceeded',
      429,
      { 
        maxRequests, 
        windowMs,
        resetTime: new Date(current.resetTime).toISOString()
      }
    );
  }
  
  current.count++;
}