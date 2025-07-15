// 画像生成サービス

import { 
  ImageGenerationRequest, 
  ImageGenerationResponse, 
  ImageCache,
  ImagineAPIRequest,
  ImagineAPIResponse,
  PROMPT_TEMPLATES,
  PromptTemplate
} from '@/types/image';

class ImageGenerationService {
  private apiKey: string;
  private baseUrl: string = 'https://cl.imagineapi.dev/items/images/';
  private cache: Map<string, ImageCache> = new Map();
  private readonly CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24時間

  constructor() {
    this.apiKey = process.env.IMAGINE_API_KEY || '';
    if (!this.apiKey) {
      console.warn('IMAGINE_API_KEY not found in environment variables');
    }
  }

  // キャッシュからの画像取得
  private getCachedImage(questionId: string): ImageCache | null {
    const cached = this.cache.get(questionId);
    if (!cached) return null;

    const now = Date.now();
    const cacheTime = new Date(cached.generatedAt).getTime();
    
    if (now - cacheTime > this.CACHE_EXPIRATION) {
      this.cache.delete(questionId);
      return null;
    }

    // アクセス時間を更新
    cached.lastAccessed = new Date().toISOString();
    return cached;
  }

  // キャッシュへの画像保存
  private setCachedImage(questionId: string, imageUrl: string, prompt: string, style: string): void {
    const now = new Date().toISOString();
    const cacheEntry: ImageCache = {
      questionId,
      imageUrl,
      prompt,
      style,
      generatedAt: now,
      lastAccessed: now,
      size: 0 // 実際のサイズは後で計算
    };
    
    this.cache.set(questionId, cacheEntry);
  }

  // プロンプトテンプレートの適用
  private applyPromptTemplate(category: string, description: string): string {
    const template = PROMPT_TEMPLATES[category as PromptTemplate];
    if (!template) {
      return `Create a professional IQ test visualization: ${description}`;
    }
    return template.replace('{description}', description);
  }

  // ImagineAPI呼び出し
  private async callImagineAPI(request: ImagineAPIRequest): Promise<ImagineAPIResponse> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('ImagineAPI call failed:', error);
      throw error;
    }
  }

  // 画像生成のメイン関数
  async generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    const { questionId, prompt, style = 'minimal', aspectRatio = '1:1', quality = 'standard' } = request;

    // キャッシュから既存画像を確認
    const cachedImage = this.getCachedImage(questionId);
    if (cachedImage) {
      return {
        success: true,
        imageUrl: cachedImage.imageUrl,
        generatedAt: cachedImage.generatedAt,
        prompt: cachedImage.prompt,
        style: cachedImage.style
      };
    }

    if (!this.apiKey) {
      return {
        success: false,
        error: 'API key not configured',
        generatedAt: new Date().toISOString(),
        prompt,
        style
      };
    }

    try {
      // プロンプトを最適化
      const optimizedPrompt = this.optimizePrompt(prompt, style);
      
      const apiRequest: ImagineAPIRequest = {
        prompt: optimizedPrompt,
        style: this.getStyleParameter(style),
        aspect_ratio: aspectRatio,
        quality: quality,
        negative_prompt: "text, words, letters, numbers, watermark, signature, blurry, distorted, low quality"
      };

      const response = await this.callImagineAPI(apiRequest);
      
      if (response.status === 'completed' && response.url) {
        // キャッシュに保存
        this.setCachedImage(questionId, response.url, prompt, style);
        
        return {
          success: true,
          imageUrl: response.url,
          generatedAt: response.created_at,
          prompt,
          style
        };
      } else {
        return {
          success: false,
          error: response.error || 'Image generation failed',
          generatedAt: new Date().toISOString(),
          prompt,
          style
        };
      }
    } catch (error) {
      console.error('Image generation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        generatedAt: new Date().toISOString(),
        prompt,
        style
      };
    }
  }

  // プロンプトの最適化
  private optimizePrompt(prompt: string, style: string): string {
    const styleModifiers = {
      minimal: "minimalist, clean, simple, geometric, high contrast, professional",
      detailed: "detailed, intricate, complex patterns, rich textures, professional",
      abstract: "abstract, conceptual, artistic, modern, sophisticated",
      geometric: "geometric, mathematical, precise, technical drawing, blueprint style"
    };

    const basePrompt = `${prompt}, ${styleModifiers[style as keyof typeof styleModifiers]}, 
    IQ test style, educational diagram, no text, no numbers, clean background, 
    professional test format, high quality, sharp lines`;

    return basePrompt;
  }

  // スタイルパラメータの変換
  private getStyleParameter(style: string): string {
    const styleMap = {
      minimal: "minimal geometric",
      detailed: "detailed technical",
      abstract: "abstract art",
      geometric: "geometric pattern"
    };
    return styleMap[style as keyof typeof styleMap] || "minimal geometric";
  }

  // 特定の問題カテゴリ向けの画像生成
  async generateQuestionImage(questionId: string, category: string, description: string, style: string = 'minimal'): Promise<ImageGenerationResponse> {
    const prompt = this.applyPromptTemplate(category, description);
    
    return this.generateImage({
      questionId,
      prompt,
      style: style as any,
      aspectRatio: '1:1',
      quality: 'standard'
    });
  }

  // キャッシュの統計情報
  getCacheStats(): { size: number; entries: number; oldestEntry?: string } {
    const entries = Array.from(this.cache.values());
    return {
      size: entries.length,
      entries: entries.length,
      oldestEntry: entries.length > 0 ? 
        entries.sort((a, b) => new Date(a.generatedAt).getTime() - new Date(b.generatedAt).getTime())[0].generatedAt : 
        undefined
    };
  }

  // キャッシュのクリア
  clearCache(): void {
    this.cache.clear();
  }
}

export const imageGenerationService = new ImageGenerationService();