// Stability AI直接テスト用エンドポイント

import { NextResponse } from 'next/server';
import { getEnvVariable, initializeEnv } from '@/lib/env';
import { logger } from '@/utils/logger';

export async function GET() {
  logger.log('[TEST] Starting Stability AI test...');
  
  // 環境変数を初期化
  const envStatus = initializeEnv();
  
  // APIキーを取得
  const apiKey = getEnvVariable('STABILITY_API_KEY');
  
  const testResult = {
    timestamp: new Date().toISOString(),
    environment: {
      nodeEnv: process.env.NODE_ENV,
      vercel: !!process.env.VERCEL,
      vercelEnv: process.env.VERCEL_ENV
    },
    apiKeyCheck: {
      present: !!apiKey,
      length: apiKey ? apiKey.length : 0,
      prefix: apiKey ? apiKey.substring(0, 10) + '...' : 'not set',
      expectedLength: 43 // Stability AIのAPIキーは通常43文字
    },
    envStatus,
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
      testResult.testApiCall = {
        error: error instanceof Error ? error.message : 'Unknown error',
        errorType: error instanceof Error ? error.constructor.name : typeof error
      };
      logger.error('[TEST] API call failed:', error);
    }
  } else {
    testResult.testApiCall = {
      skipped: true,
      reason: 'No API key found'
    };
  }
  
  return NextResponse.json(testResult, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}