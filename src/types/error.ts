// エラー型定義と型安全なエラーハンドリング

export interface AppError {
  type: 'validation' | 'authentication' | 'authorization' | 'not_found' | 'server' | 'network' | 'timeout';
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
  timestamp: string;
  requestId?: string;
}

export interface ApiErrorResponse {
  error: {
    type: AppError['type'];
    code: string;
    message: string;
    details?: Record<string, unknown>;
    timestamp: string;
    requestId?: string;
  };
  success: false;
}

export interface ApiSuccessResponse<T = unknown> {
  data: T;
  success: true;
  meta?: {
    timestamp: string;
    requestId?: string;
    cacheMetadata?: Record<string, unknown>;
  };
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

// 定義済みエラータイプ
export const ErrorTypes = {
  VALIDATION: 'validation' as const,
  AUTHENTICATION: 'authentication' as const,
  AUTHORIZATION: 'authorization' as const,
  NOT_FOUND: 'not_found' as const,
  SERVER: 'server' as const,
  NETWORK: 'network' as const,
  TIMEOUT: 'timeout' as const
} as const;

// 定義済みエラーコード
export const ErrorCodes = {
  // バリデーションエラー
  INVALID_JSON: 'INVALID_JSON',
  MISSING_FIELD: 'MISSING_FIELD',
  INVALID_FIELD_TYPE: 'INVALID_FIELD_TYPE',
  FIELD_TOO_LONG: 'FIELD_TOO_LONG',
  INVALID_FIELD_VALUE: 'INVALID_FIELD_VALUE',
  
  // 認証・認可エラー
  INVALID_API_KEY: 'INVALID_API_KEY',
  MISSING_API_KEY: 'MISSING_API_KEY',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  
  // リソースエラー
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_UNAVAILABLE: 'RESOURCE_UNAVAILABLE',
  
  // サーバーエラー
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  DATABASE_ERROR: 'DATABASE_ERROR',
  
  // ネットワーク・タイムアウトエラー
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  
  // 画像生成特有のエラー
  IMAGE_GENERATION_FAILED: 'IMAGE_GENERATION_FAILED',
  INVALID_IMAGE_PROMPT: 'INVALID_IMAGE_PROMPT',
  IMAGE_PROCESSING_ERROR: 'IMAGE_PROCESSING_ERROR'
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes];

// タイプガード関数
export function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    'code' in error &&
    'message' in error &&
    'statusCode' in error &&
    'timestamp' in error
  );
}

export function isApiErrorResponse(response: unknown): response is ApiErrorResponse {
  return (
    typeof response === 'object' &&
    response !== null &&
    'error' in response &&
    'success' in response &&
    (response as ApiErrorResponse).success === false
  );
}

export function isApiSuccessResponse<T>(response: unknown): response is ApiSuccessResponse<T> {
  return (
    typeof response === 'object' &&
    response !== null &&
    'data' in response &&
    'success' in response &&
    (response as ApiSuccessResponse<T>).success === true
  );
}

// エラー作成ヘルパー関数
export function createAppError(
  type: AppError['type'],
  code: ErrorCode,
  message: string,
  statusCode: number = 500,
  details?: Record<string, unknown>
): AppError {
  return {
    type,
    code,
    message,
    statusCode,
    details,
    timestamp: new Date().toISOString()
  };
}

// よく使われるエラーの作成関数
export const createValidationError = (code: ErrorCode, message: string, details?: Record<string, unknown>) =>
  createAppError(ErrorTypes.VALIDATION, code, message, 400, details);

export const createAuthenticationError = (code: ErrorCode, message: string, details?: Record<string, unknown>) =>
  createAppError(ErrorTypes.AUTHENTICATION, code, message, 401, details);

export const createAuthorizationError = (code: ErrorCode, message: string, details?: Record<string, unknown>) =>
  createAppError(ErrorTypes.AUTHORIZATION, code, message, 403, details);

export const createNotFoundError = (code: ErrorCode, message: string, details?: Record<string, unknown>) =>
  createAppError(ErrorTypes.NOT_FOUND, code, message, 404, details);

export const createServerError = (code: ErrorCode, message: string, details?: Record<string, unknown>) =>
  createAppError(ErrorTypes.SERVER, code, message, 500, details);

export const createTimeoutError = (code: ErrorCode, message: string, details?: Record<string, unknown>) =>
  createAppError(ErrorTypes.TIMEOUT, code, message, 408, details);

// エラーメッセージの国際化対応
export interface ErrorMessages {
  [key: string]: {
    ja: string;
    en: string;
  };
}

export const errorMessages: ErrorMessages = {
  [ErrorCodes.INVALID_JSON]: {
    ja: 'リクエストのJSONが無効です',
    en: 'Invalid JSON in request'
  },
  [ErrorCodes.MISSING_FIELD]: {
    ja: '必須フィールドが不足しています',
    en: 'Required field is missing'
  },
  [ErrorCodes.INVALID_FIELD_TYPE]: {
    ja: 'フィールドの型が無効です',
    en: 'Invalid field type'
  },
  [ErrorCodes.FIELD_TOO_LONG]: {
    ja: 'フィールドが長すぎます',
    en: 'Field is too long'
  },
  [ErrorCodes.INTERNAL_SERVER_ERROR]: {
    ja: '内部サーバーエラーが発生しました',
    en: 'An internal server error occurred'
  },
  [ErrorCodes.IMAGE_GENERATION_FAILED]: {
    ja: '画像生成に失敗しました',
    en: 'Image generation failed'
  },
  [ErrorCodes.TIMEOUT_ERROR]: {
    ja: 'リクエストがタイムアウトしました',
    en: 'Request timed out'
  }
};

export function getErrorMessage(code: ErrorCode, locale: 'ja' | 'en' = 'ja'): string {
  return errorMessages[code]?.[locale] || errorMessages[ErrorCodes.INTERNAL_SERVER_ERROR][locale];
}