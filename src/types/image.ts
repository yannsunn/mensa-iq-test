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