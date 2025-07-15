// Stability AI 画像生成サービス

import { 
  ImageGenerationRequest, 
  ImageGenerationResponse, 
  ImageCache,
  StabilityAIRequest,
  StabilityAIResponse,
  StabilityAIModel,
  STABILITY_AI_MODELS,
  PROMPT_TEMPLATES,
  PromptTemplate
} from '@/types/image';

class StabilityImageGenerationService {
  private apiKey: string;
  private baseUrl: string = 'https://api.stability.ai/v1/generation';
  private cache: Map<string, ImageCache> = new Map();
  private readonly CACHE_EXPIRATION = 24 * 60 * 60 * 1000; // 24時間

  constructor() {
    this.apiKey = process.env.STABILITY_API_KEY || '';
    if (!this.apiKey) {
      console.warn('STABILITY_API_KEY not found in environment variables');
    }
  }

  // モデル選択ロジック
  private selectOptimalModel(category: string, quality: string = 'standard'): StabilityAIModel {
    // 開発モード
    if (process.env.NODE_ENV === 'development') {
      return 'sdxl-1.0'; // 開発時はコスト最小化
    }

    // カテゴリとクオリティに基づくモデル選択
    const modelSelection: Record<string, Record<string, StabilityAIModel>> = {
      'pattern': {
        'draft': 'sdxl-1.0',
        'standard': 'sd-3.5-medium',
        'high': 'sd-3.5-large'
      },
      'spatial': {
        'draft': 'sdxl-1.0',
        'standard': 'sd-3.5-large-turbo',
        'high': 'stable-image-core'
      },
      'abstract': {
        'draft': 'sd-1.6',
        'standard': 'sd-3.5-medium',
        'high': 'sd-3.5-large'
      },
      'geometric': {
        'draft': 'sdxl-1.0',
        'standard': 'sd-3.5-medium',
        'high': 'stable-image-core'
      },
      'matrix': {
        'draft': 'sdxl-1.0',
        'standard': 'sd-3.5-large-turbo',
        'high': 'sd-3.5-large'
      },
      'default': {
        'draft': 'sd-1.6',
        'standard': 'sdxl-1.0',
        'high': 'sd-3.5-medium'
      }
    };

    const categoryModels = modelSelection[category] || modelSelection['default'];
    return categoryModels[quality] || categoryModels['standard'];
  }

  // 解像度設定
  private getOptimalResolution(model: StabilityAIModel): { width: number; height: number } {
    const modelConfig = STABILITY_AI_MODELS[model];
    const maxRes = modelConfig.maxResolution;

    // IQテスト用は正方形が最適
    if (maxRes >= 2048) return { width: 1024, height: 1024 };
    if (maxRes >= 1024) return { width: 1024, height: 1024 };
    return { width: 512, height: 512 };
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
      size: 0
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

  // Stability AI API呼び出し
  private async callStabilityAPI(model: StabilityAIModel, request: StabilityAIRequest): Promise<StabilityAIResponse> {
    const modelConfig = STABILITY_AI_MODELS[model];
    const endpoint = `${this.baseUrl}/${modelConfig.endpoint}/text-to-image`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: request.prompt,
              weight: 1
            }
          ],
          cfg_scale: request.cfg_scale || 7,
          height: request.height,
          width: request.width,
          steps: request.steps || 30,
          samples: request.samples || 1,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Stability API error: ${response.status} - ${JSON.stringify(error)}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Stability API call failed:', error);
      throw error;
    }
  }

  // Base64画像をDataURLに変換
  private base64ToDataUrl(base64: string): string {
    return `data:image/png;base64,${base64}`;
  }

  // 画像生成のメイン関数
  async generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    const { questionId, prompt, style = 'minimal', quality = 'standard' } = request;

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
        error: 'Stability API key not configured',
        generatedAt: new Date().toISOString(),
        prompt,
        style
      };
    }

    try {
      // カテゴリを推測（プロンプトから）
      const category = this.inferCategory(prompt);
      
      // 最適なモデルを選択
      const model = this.selectOptimalModel(category, quality);
      const resolution = this.getOptimalResolution(model);
      
      // プロンプトを最適化
      const optimizedPrompt = this.optimizePrompt(prompt, style);
      
      const apiRequest: StabilityAIRequest = {
        prompt: optimizedPrompt,
        width: resolution.width,
        height: resolution.height,
        cfg_scale: 7,
        steps: 30,
        negative_prompt: "text, words, letters, numbers, watermark, signature, blurry, distorted, low quality, photorealistic, human, person"
      };

      const response = await this.callStabilityAPI(model, apiRequest);
      
      if (response.images && response.images.length > 0) {
        const imageUrl = this.base64ToDataUrl(response.images[0].base64);
        
        // キャッシュに保存
        this.setCachedImage(questionId, imageUrl, prompt, style);
        
        return {
          success: true,
          imageUrl,
          generatedAt: new Date().toISOString(),
          prompt,
          style
        };
      } else {
        return {
          success: false,
          error: 'No images generated',
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

  // カテゴリを推測
  private inferCategory(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('pattern') || lowerPrompt.includes('sequence')) return 'pattern';
    if (lowerPrompt.includes('spatial') || lowerPrompt.includes('3d') || lowerPrompt.includes('rotation')) return 'spatial';
    if (lowerPrompt.includes('abstract') || lowerPrompt.includes('concept')) return 'abstract';
    if (lowerPrompt.includes('geometric') || lowerPrompt.includes('shape')) return 'geometric';
    if (lowerPrompt.includes('matrix') || lowerPrompt.includes('grid')) return 'matrix';
    
    return 'default';
  }

  // プロンプトの最適化
  private optimizePrompt(prompt: string, style: string): string {
    const styleModifiers = {
      minimal: "minimalist, clean, simple, geometric, high contrast, professional, vector style",
      detailed: "detailed, intricate, complex patterns, rich textures, professional, technical drawing",
      abstract: "abstract, conceptual, artistic, modern, sophisticated, non-representational",
      geometric: "geometric, mathematical, precise, technical drawing, blueprint style, grid-based"
    };

    const basePrompt = `${prompt}, ${styleModifiers[style as keyof typeof styleModifiers]}, 
    IQ test visualization, educational diagram, no text or numbers, clean white background, 
    professional test format, high quality, sharp lines, diagram style, technical illustration`;

    return basePrompt;
  }

  // 特定の問題カテゴリ向けの画像生成
  async generateQuestionImage(
    questionId: string, 
    category: string, 
    description: string, 
    style: string = 'minimal'
  ): Promise<ImageGenerationResponse> {
    const prompt = this.applyPromptTemplate(category, description);
    
    return this.generateImage({
      questionId,
      prompt,
      style: style as any,
      quality: process.env.NODE_ENV === 'production' ? 'standard' : 'draft'
    });
  }

  // コスト計算
  calculateCost(model: StabilityAIModel, count: number = 1): number {
    const modelConfig = STABILITY_AI_MODELS[model];
    return modelConfig.cost * count;
  }

  // 月間コスト予測
  estimateMonthlyCost(questionsPerDay: number): { development: number; production: number } {
    const devModel = 'sdxl-1.0';
    const prodModel = 'sd-3.5-medium';
    
    const monthlyQuestions = questionsPerDay * 30;
    
    return {
      development: this.calculateCost(devModel, monthlyQuestions),
      production: this.calculateCost(prodModel, monthlyQuestions)
    };
  }

  // キャッシュ統計
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

  // キャッシュクリア
  clearCache(): void {
    this.cache.clear();
  }
}

export const stabilityImageService = new StabilityImageGenerationService();