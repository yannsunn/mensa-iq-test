// 統一された質問インターフェース（最適化版）
export type QuestionCategory = 'logical' | 'numerical' | 'spatial' | 'pattern' | 'verbal' | 'abstract' | 'memory' | 'matrix';

export interface BaseQuestion {
  readonly id: string;
  readonly category: QuestionCategory;
  readonly difficulty: number; // 1-20
  readonly question: string;
  readonly options: string[];
  readonly correctAnswer: number;
  readonly timeLimit: number;
  readonly explanation: string;
}

// ビジュアル要素を持つ質問（最適化版）
export type VisualType = 'matrix' | 'pattern' | 'cube' | 'geometric';
export type CubeVisualType = 'cube_rotation' | 'net_to_cube' | 'opposite_faces';
export type ImageStyle = 'minimal' | 'detailed' | 'abstract' | 'geometric';

export interface CubeData {
  readonly initialState?: {
    readonly front: string;
    readonly top: string;
    readonly right: string;
    readonly back?: string;
    readonly bottom?: string;
    readonly left?: string;
  };
  readonly rotation?: string;
  readonly netLabels?: readonly string[];
}

export interface GeneratedImage {
  readonly url: string;
  readonly prompt: string;
  readonly generatedAt: string;
  readonly style?: ImageStyle;
}

export interface VisualData {
  readonly type: VisualType;
  readonly data?: unknown;
  readonly visualType?: CubeVisualType;
  readonly cubeData?: CubeData;
  readonly generatedImage?: GeneratedImage;
}

// 練習モード用の詳細情報（最適化版）
export type MensaLevel = 'entry' | 'standard' | 'expert' | 'genius';

export interface PracticeDetails {
  readonly immediateExplanation: string;
  readonly detailedSolution: string;
  readonly commonMistakes: readonly string[];
  readonly relatedConcepts: readonly string[];
  readonly difficultyJustification: string;
}

// MENSA関連情報（最適化版）
export interface MensaInfo {
  readonly source: string;
  readonly mensaLevel: MensaLevel;
  readonly cognitiveSkills: readonly string[];
}

// 統一された質問タイプ
export interface UnifiedQuestion extends BaseQuestion {
  visualData?: VisualData;
  practiceDetails?: PracticeDetails;
  mensaInfo?: MensaInfo;
}

// 問題セットの生成タイプ
export type QuestionDifficulty = 'easy' | 'medium' | 'hard';
export type TestMode = 'practice' | 'exam' | 'custom';

// テスト結果（最適化版）
export interface CategoryScore {
  readonly correct: number;
  readonly total: number;
  readonly percentage: number;
}

export interface TestResult {
  readonly totalScore: number;
  readonly totalQuestions: number;
  readonly iqScore: number;
  readonly percentile: number;
  readonly categoryScores: Record<string, CategoryScore>;
  readonly timeSpent: number;
  readonly difficulty: string;
  readonly mensaQualified: boolean;
}

// カテゴリ情報（最適化版）
export interface CategoryInfo {
  readonly name: string;
  readonly icon: string;
  readonly color: string;
}

export const QUESTION_CATEGORIES: Record<QuestionCategory, CategoryInfo> = {
  logical: { name: '論理推論', icon: '🧠', color: 'blue' },
  numerical: { name: '数的推論', icon: '🔢', color: 'green' },
  spatial: { name: '空間認識', icon: '🎲', color: 'purple' },
  pattern: { name: 'パターン認識', icon: '🔷', color: 'orange' },
  verbal: { name: '言語推論', icon: '📝', color: 'red' },
  abstract: { name: '抽象推論', icon: '🌀', color: 'indigo' },
  memory: { name: '記憶力', icon: '🧩', color: 'pink' },
  matrix: { name: '行列推論', icon: '⬜', color: 'yellow' }
} as const;