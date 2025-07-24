// SVG図形生成API エンドポイント

import { NextRequest } from 'next/server';
import { 
  generateSVGDiagram, 
  svgToBase64, 
  DiagramType,
  SVGDiagramOptions 
} from '@/lib/svgDiagramGenerator';
import { logger } from '@/utils/logger';
import { 
  withErrorHandling,
  createSuccessResponse,
  validators,
  checkRateLimit
} from '@/lib/apiErrorHandler';
import { 
  createValidationError,
  ErrorCodes
} from '@/types/error';
import { ImageGenerationResponse } from '@/types/image';

// SVG生成リクエストの型定義
interface SVGDiagramRequest {
  questionId: string;
  diagramType: DiagramType;
  description: string;
  options?: SVGDiagramOptions;
}

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

// キャッシュマップ（インメモリキャッシュ）
const svgCache = new Map<string, {
  svg: string;
  generatedAt: string;
  accessCount: number;
}>();

const MAX_CACHE_SIZE = 1000;
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7日間

// キャッシュキーの生成
function getCacheKey(questionId: string, diagramType: DiagramType, description: string): string {
  return `${questionId}-${diagramType}-${description}`;
}

// 古いキャッシュエントリを削除
function evictOldCacheEntries() {
  if (svgCache.size < MAX_CACHE_SIZE) return;
  
  const entries = Array.from(svgCache.entries());
  const now = Date.now();
  
  // 古いエントリを削除
  entries.forEach(([key, value]) => {
    const age = now - new Date(value.generatedAt).getTime();
    if (age > CACHE_TTL) {
      svgCache.delete(key);
    }
  });
  
  // それでもサイズが大きい場合は、アクセス数が少ないものから削除
  if (svgCache.size >= MAX_CACHE_SIZE) {
    const sortedEntries = entries.sort((a, b) => a[1].accessCount - b[1].accessCount);
    const toDelete = Math.floor(MAX_CACHE_SIZE * 0.2); // 20%を削除
    
    for (let i = 0; i < toDelete && i < sortedEntries.length; i++) {
      svgCache.delete(sortedEntries[i][0]);
    }
  }
}

export const POST = withErrorHandling(async (request: NextRequest) => {
  logger.log('[API] POST /api/svg-diagram called');
  
  // レート制限チェック
  const clientIP = getClientIP(request);
  checkRateLimit(clientIP, 100, 60000); // 1分間に100リクエスト（SVGは軽量なので多めに）
  
  // リクエストボディのパース
  const rawBody = await request.text();
  const body = validators.json(rawBody) as SVGDiagramRequest;
  
  // リクエストのバリデーション
  validators.required(body.questionId, 'questionId');
  validators.string(body.questionId, 'questionId');
  
  validators.required(body.diagramType, 'diagramType');
  validators.string(body.diagramType, 'diagramType');
  const validDiagramTypes: DiagramType[] = [
    'cross-section', '3d-shapes', 'transformations', 'patterns',
    'matrix', 'geometric', 'numerical', 'spatial'
  ];
  if (!validDiagramTypes.includes(body.diagramType)) {
    throw createValidationError(
      ErrorCodes.INVALID_FIELD_VALUE,
      `Invalid diagram type: ${body.diagramType}`,
      { validTypes: validDiagramTypes }
    );
  }
  
  validators.required(body.description, 'description');
  validators.string(body.description, 'description');
  validators.maxLength(body.description, 1000, 'description');

  logger.log('SVG diagram generation request:', {
    questionId: body.questionId,
    diagramType: body.diagramType,
    description: body.description.substring(0, 100) + '...',
    options: body.options
  });

  try {
    // キャッシュチェック
    const cacheKey = getCacheKey(body.questionId, body.diagramType, body.description);
    const cached = svgCache.get(cacheKey);
    
    if (cached) {
      cached.accessCount++;
      const base64Image = svgToBase64(cached.svg);
      
      const response: ImageGenerationResponse = {
        success: true,
        imageUrl: base64Image,
        generatedAt: cached.generatedAt,
        prompt: body.description,
        style: body.options?.style || 'minimal',
        fromCache: true,
        cacheMetadata: {
          etag: cacheKey,
          maxAge: 604800, // 7日間
          staleWhileRevalidate: 86400 // 1日間
        }
      };
      
      return createSuccessResponse(response, undefined, response.cacheMetadata);
    }
    
    // SVG生成
    const svg = generateSVGDiagram(
      body.description,
      body.diagramType,
      body.options
    );
    
    // Base64エンコード
    const base64Image = svgToBase64(svg);
    
    // キャッシュに保存
    evictOldCacheEntries();
    svgCache.set(cacheKey, {
      svg,
      generatedAt: new Date().toISOString(),
      accessCount: 1
    });
    
    const response: ImageGenerationResponse = {
      success: true,
      imageUrl: base64Image,
      generatedAt: new Date().toISOString(),
      prompt: body.description,
      style: body.options?.style || 'minimal',
      fromCache: false,
      cacheMetadata: {
        etag: cacheKey,
        maxAge: 604800, // 7日間
        staleWhileRevalidate: 86400 // 1日間
      }
    };
    
    return createSuccessResponse(response, undefined, response.cacheMetadata);
    
  } catch (error) {
    logger.error('SVG diagram generation failed:', error);
    throw createValidationError(
      ErrorCodes.IMAGE_GENERATION_FAILED,
      error instanceof Error ? error.message : 'SVG generation failed'
    );
  }
});

export const GET = withErrorHandling(async (request: NextRequest) => {
  logger.log('[API] GET /api/svg-diagram called');
  
  // レート制限チェック
  const clientIP = getClientIP(request);
  checkRateLimit(clientIP, 100, 60000); // 1分間に100リクエスト
  
  const searchParams = request.nextUrl.searchParams;
  const questionId = searchParams.get('questionId');
  const diagramType = searchParams.get('diagramType') as DiagramType;
  const description = searchParams.get('description');
  const style = searchParams.get('style') as SVGDiagramOptions['style'] || 'minimal';
  
  // パラメータのバリデーション
  validators.required(questionId, 'questionId');
  validators.string(questionId, 'questionId');
  
  validators.required(diagramType, 'diagramType');
  validators.string(diagramType, 'diagramType');
  const validDiagramTypes: DiagramType[] = [
    'cross-section', '3d-shapes', 'transformations', 'patterns',
    'matrix', 'geometric', 'numerical', 'spatial'
  ];
  if (!validDiagramTypes.includes(diagramType)) {
    throw createValidationError(
      ErrorCodes.INVALID_FIELD_VALUE,
      `Invalid diagram type: ${diagramType}`,
      { validTypes: validDiagramTypes }
    );
  }
  
  validators.required(description, 'description');
  validators.string(description, 'description');
  validators.maxLength(description as string, 1000, 'description');

  logger.log('SVG diagram GET request:', {
    questionId,
    diagramType,
    description: (description as string).substring(0, 100) + '...',
    style
  });

  try {
    // キャッシュチェック
    const cacheKey = getCacheKey(questionId as string, diagramType, description as string);
    const cached = svgCache.get(cacheKey);
    
    if (cached) {
      cached.accessCount++;
      const base64Image = svgToBase64(cached.svg);
      
      const response: ImageGenerationResponse = {
        success: true,
        imageUrl: base64Image,
        generatedAt: cached.generatedAt,
        prompt: description as string,
        style,
        fromCache: true,
        cacheMetadata: {
          etag: cacheKey,
          maxAge: 604800, // 7日間
          staleWhileRevalidate: 86400 // 1日間
        }
      };
      
      return createSuccessResponse(response, undefined, response.cacheMetadata);
    }
    
    // SVG生成
    const options: SVGDiagramOptions = {
      style,
      width: 400,
      height: 400,
      strokeWidth: 2,
      strokeColor: '#000000',
      fillColor: 'none',
      backgroundColor: '#ffffff'
    };
    
    const svg = generateSVGDiagram(
      description as string,
      diagramType,
      options
    );
    
    // Base64エンコード
    const base64Image = svgToBase64(svg);
    
    // キャッシュに保存
    evictOldCacheEntries();
    svgCache.set(cacheKey, {
      svg,
      generatedAt: new Date().toISOString(),
      accessCount: 1
    });
    
    const response: ImageGenerationResponse = {
      success: true,
      imageUrl: base64Image,
      generatedAt: new Date().toISOString(),
      prompt: description as string,
      style,
      fromCache: false,
      cacheMetadata: {
        etag: cacheKey,
        maxAge: 604800, // 7日間
        staleWhileRevalidate: 86400 // 1日間
      }
    };
    
    return createSuccessResponse(response, undefined, response.cacheMetadata);
    
  } catch (error) {
    logger.error('SVG diagram generation failed:', error);
    throw createValidationError(
      ErrorCodes.IMAGE_GENERATION_FAILED,
      error instanceof Error ? error.message : 'SVG generation failed'
    );
  }
});