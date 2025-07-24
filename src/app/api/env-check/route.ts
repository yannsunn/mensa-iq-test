// 環境変数チェック用エンドポイント（開発環境のみ）

import { NextResponse } from 'next/server';

export async function GET() {
  // 本番環境では無効化
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not available in production' }, 
      { status: 403 }
    );
  }

  // 開発環境のみ最小限の情報を返す
  const envCheck = {
    nodeEnv: process.env.NODE_ENV,
    hasStabilityKey: !!process.env.STABILITY_API_KEY,
    hasImagineKey: !!process.env.IMAGINE_API_KEY,
    enableImageGeneration: process.env.NEXT_PUBLIC_ENABLE_IMAGE_GENERATION === 'true'
  };

  return NextResponse.json(envCheck, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}