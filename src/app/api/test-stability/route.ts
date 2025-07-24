// Stability AI直接テスト用エンドポイント（セキュアエラーハンドリング版）

import { NextResponse, NextRequest } from 'next/server';
import { getEnvVariable, initializeEnv } from '@/lib/env';
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

export const GET = withErrorHandling(async (request: NextRequest) => {
  logger.log('[TEST] Starting Stability AI test...');
  
  // レート制限チェック（テストエンドポイントは特に制限を強化）
  const clientIP = getClientIP(request);
  checkRateLimit(clientIP, 3, 300000); // 5分間に3リクエスト
  
  // 環境変数を初期化
  const envStatus = initializeEnv();
  
  // APIキーを取得
  const apiKey = getEnvVariable('STABILITY_API_KEY');
  
  // 本番環境では機密情報を隐す
  const isProduction = process.env.NODE_ENV === 'production';
  
  const testResult = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      vercel: !!process.env.VERCEL,
      vercelEnv: process.env.VERCEL_ENV
    },
    apiKeyCheck: {
      present: !!apiKey,
      // 本番環境ではAPIキーの詳細を間す
      ...(isProduction ? {} : {
        length: apiKey ? apiKey.length : 0,
        prefix: apiKey ? apiKey.substring(0, 10) + '...' : 'not set',
        expectedLength: 43
      })
    },
    envStatus: isProduction ? { status: 'hidden for security' } : envStatus,
    testApiCall: null as Record<string, unknown> | null
  };
  
  // APIキーが存在する場合、実際にAPIを呼び出してみる
  if (apiKey) {
    try {
      logger.log('[TEST] Making test API call to Stability AI...');
      
      const formData = new FormData();
      formData.append('prompt', 'A simple test image, minimalist design');
      formData.append('negative_prompt', 'text, words, letters, numbers, watermark');
      formData.append('cfg_scale', '7');
      formData.append('height', '512');
      formData.append('width', '512');
      formData.append('steps', '20');
      formData.append('samples', '1');
      
      const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: formData
      });
      
      const responseData = await response.text();
      
      testResult.testApiCall = {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        success: response.ok,
        responseLength: responseData.length,
        responsePreview: responseData.substring(0, 200)
      };
      
      logger.log('[TEST] API call completed:', testResult.testApiCall);
      
    } catch (error) {
      // 本番環境ではエラー詳細を限定
      testResult.testApiCall = {
        error: isProduction ? 'API test failed' : (error instanceof Error ? error.message : 'Unknown error'),
        errorType: isProduction ? 'Error' : (error instanceof Error ? error.constructor.name : typeof error)
      };
      logger.error('[TEST] API call failed:', isProduction ? 'API test failed' : error);
    }
  } else {
    testResult.testApiCall = {
      skipped: true,
      reason: 'No API key found'
    };
  }
  
  return createSuccessResponse(testResult);
});