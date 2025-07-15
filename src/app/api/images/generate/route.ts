// 画像生成API エンドポイント

import { NextRequest, NextResponse } from 'next/server';
import { imageGenerationService } from '@/lib/imageGeneration';
import { ImageGenerationRequest } from '@/types/image';

export async function POST(request: NextRequest) {
  try {
    const body: ImageGenerationRequest = await request.json();
    
    // リクエストのバリデーション
    if (!body.questionId || !body.prompt) {
      return NextResponse.json(
        { error: 'questionId and prompt are required' },
        { status: 400 }
      );
    }

    // 画像生成の実行
    const result = await imageGenerationService.generateImage(body);
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Image generation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const questionId = searchParams.get('questionId');
    const category = searchParams.get('category');
    const description = searchParams.get('description');
    const style = searchParams.get('style') || 'minimal';
    
    if (!questionId || !category || !description) {
      return NextResponse.json(
        { error: 'questionId, category, and description are required' },
        { status: 400 }
      );
    }

    // カテゴリ別の画像生成
    const result = await imageGenerationService.generateQuestionImage(
      questionId,
      category,
      description,
      style
    );
    
    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Image generation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}