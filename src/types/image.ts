// 画像生成関連の型定義

export interface ImageGenerationRequest {
  questionId: string;
  prompt: string;
  style?: 'minimal' | 'detailed' | 'abstract' | 'geometric';
  aspectRatio?: '1:1' | '16:9' | '4:3';
  quality?: 'draft' | 'standard' | 'high';
}

export interface ImageGenerationResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
  generatedAt: string;
  prompt: string;
  style: string;
}

export interface ImageCache {
  questionId: string;
  imageUrl: string;
  prompt: string;
  style: string;
  generatedAt: string;
  lastAccessed: string;
  size: number;
}

export interface ImageGenerationSettings {
  provider: 'imagineapi' | 'openai' | 'stabilityai';
  apiKey: string;
  defaultStyle: 'minimal' | 'detailed' | 'abstract' | 'geometric';
  cacheExpiration: number; // hours
  maxCacheSize: number; // MB
}

// Stability AI専用の型定義
export interface StabilityAIRequest {
  prompt: string;
  negative_prompt?: string;
  cfg_scale?: number;
  steps?: number;
  width?: number;
  height?: number;
  samples?: number;
}

export interface StabilityAIResponse {
  images?: Array<{
    base64: string;
    seed?: number;
    finishReason?: string;
  }>;
  image?: string; // Base64エンコードされた画像データ
  id?: string;
  status?: string;
  message?: string;
  errors?: Array<{
    id: string;
    message: string;
    name: string;
  }>;
}

// モデル別の設定
export const STABILITY_AI_MODELS = {
  'stable-image-ultra': {
    name: 'Stable Image Ultra',
    maxResolution: 8192,
    cost: 0.08,
    description: '最高品質、8K対応',
    endpoint: 'stable-image-ultra'
  },
  'stable-image-core': {
    name: 'Stable Image Core',
    maxResolution: 2048,
    cost: 0.03,
    description: 'バランス型、商用利用最適',
    endpoint: 'stable-image-core'
  },
  'sd-3.5-large': {
    name: 'SD 3.5 Large',
    maxResolution: 1536,
    cost: 0.065,
    description: '最新モデル、プロンプト理解力最高',
    endpoint: 'sd-3.5-large'
  },
  'sd-3.5-large-turbo': {
    name: 'SD 3.5 Large Turbo',
    maxResolution: 1024,
    cost: 0.04,
    description: '高速版、品質維持',
    endpoint: 'sd-3.5-large-turbo'
  },
  'sd-3.5-medium': {
    name: 'SD 3.5 Medium',
    maxResolution: 1024,
    cost: 0.035,
    description: 'コスパ最強、十分な品質',
    endpoint: 'sd-3.5-medium'
  },
  'sdxl-1.0': {
    name: 'SDXL 1.0',
    maxResolution: 1024,
    cost: 0.002,
    description: '安定性重視、予測可能',
    endpoint: 'sdxl-1.0'
  },
  'sd-1.6': {
    name: 'SD 1.6',
    maxResolution: 512,
    cost: 0.001,
    description: '旧世代、最安価',
    endpoint: 'sd-1.6'
  }
} as const;

export type StabilityAIModel = keyof typeof STABILITY_AI_MODELS;

// ImagineAPI専用の型定義
export interface ImagineAPIRequest {
  prompt: string;
  style?: string;
  aspect_ratio?: string;
  quality?: string;
  negative_prompt?: string;
}

export interface ImagineAPIResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  url?: string;
  error?: string;
  created_at: string;
  updated_at: string;
}

// 画像生成のプロンプトテンプレート
export const PROMPT_TEMPLATES = {
  matrix: "Create a minimalist geometric pattern matrix for IQ test, showing {description}, clean lines, black and white, professional test format",
  pattern: "Generate an abstract pattern sequence for cognitive testing, {description}, minimal design, geometric shapes, high contrast",
  cube: "Create a 3D cube visualization for spatial reasoning test, {description}, isometric view, clean geometric style",
  geometric: "Design geometric shapes for logical reasoning test, {description}, simple lines, educational diagram style",
  numerical: "Create a mathematical visualization for numerical reasoning, {description}, clean numbers and symbols, minimalist design",
  spatial: "Generate spatial reasoning diagram, {description}, 3D perspective, technical drawing style",
  logical: "Create logical reasoning diagram, {description}, flowchart style, clean arrows and connections"
} as const;

export type PromptTemplate = keyof typeof PROMPT_TEMPLATES;