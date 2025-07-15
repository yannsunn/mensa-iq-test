// Stability AI直接テスト用エンドポイント

import { NextResponse } from 'next/server';
import { getEnvVariable, initializeEnv } from '@/lib/env';

export async function GET() {
  console.log('[TEST] Starting Stability AI test...');
  
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
    testApiCall: null as any
  };
  
  // APIキーが存在する場合、実際にAPIを呼び出してみる
  if (apiKey) {
    try {
      console.log('[TEST] Making test API call to Stability AI...');
      
      const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: 'A simple test image, minimalist design',
              weight: 1
            }
          ],
          cfg_scale: 7,
          height: 512,
          width: 512,
          steps: 20,
          samples: 1
        })
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
      
      console.log('[TEST] API call completed:', testResult.testApiCall);
      
    } catch (error) {
      testResult.testApiCall = {
        error: error instanceof Error ? error.message : 'Unknown error',
        errorType: error instanceof Error ? error.constructor.name : typeof error
      };
      console.error('[TEST] API call failed:', error);
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