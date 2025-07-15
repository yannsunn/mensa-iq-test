// 環境変数チェック用エンドポイント（デバッグ用）

import { NextResponse } from 'next/server';

export async function GET() {
  // 環境変数の状態をチェック
  const envCheck = {
    nodeEnv: process.env.NODE_ENV,
    hasStabilityKey: !!process.env.STABILITY_API_KEY,
    stabilityKeyLength: process.env.STABILITY_API_KEY ? process.env.STABILITY_API_KEY.length : 0,
    stabilityKeyPrefix: process.env.STABILITY_API_KEY ? 
      process.env.STABILITY_API_KEY.substring(0, 10) + '...' : 
      'not set',
    hasImagineKey: !!process.env.IMAGINE_API_KEY,
    enableImageGeneration: process.env.NEXT_PUBLIC_ENABLE_IMAGE_GENERATION,
    imageProvider: process.env.NEXT_PUBLIC_IMAGE_PROVIDER,
    // すべての環境変数キー（セキュリティのため値は表示しない）
    allEnvKeys: Object.keys(process.env).sort(),
    stabilityRelatedKeys: Object.keys(process.env).filter(key => 
      key.includes('STABILITY') || key.includes('IMAGE')
    ),
    // プロセス情報
    processInfo: {
      platform: process.platform,
      version: process.version,
      pid: process.pid,
      cwd: process.cwd()
    }
  };

  return NextResponse.json(envCheck, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}