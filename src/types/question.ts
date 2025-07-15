// 統一された質問インターフェース
export interface BaseQuestion {
  id: string;
  category: 'logical' | 'numerical' | 'spatial' | 'pattern' | 'verbal' | 'abstract' | 'memory' | 'matrix';
  difficulty: number; // 1-20
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
  explanation: string;
}

// ビジュアル要素を持つ質問
export interface VisualData {
  type: 'matrix' | 'pattern' | 'cube' | 'geometric';
  data?: unknown;
  visualType?: 'cube_rotation' | 'net_to_cube' | 'opposite_faces';
  cubeData?: {
    initialState?: {
      front: string;
      top: string;
      right: string;
      back?: string;
      bottom?: string;
      left?: string;
    };
    rotation?: string;
    netLabels?: string[];
  };
  // 画像生成関連の設定
  generatedImage?: {
    url: string;
    prompt: string;
    generatedAt: string;
    style?: 'minimal' | 'detailed' | 'abstract' | 'geometric';
  };
}

// 練習モード用の詳細情報
export interface PracticeDetails {
  immediateExplanation: string;
  detailedSolution: string;
  commonMistakes: string[];
  relatedConcepts: string[];
  difficultyJustification: string;
}

// MENSA関連情報
export interface MensaInfo {
  source: string;
  mensaLevel: 'entry' | 'standard' | 'expert' | 'genius';
  cognitiveSkills: string[];
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

// テスト結果
export interface TestResult {
  totalScore: number;
  totalQuestions: number;
  iqScore: number;
  percentile: number;
  categoryScores: {
    [key: string]: {
      correct: number;
      total: number;
      percentage: number;
    };
  };
  timeSpent: number;
  difficulty: string;
  mensaQualified: boolean;
}

// カテゴリ情報
export const QUESTION_CATEGORIES = {
  logical: { name: '論理推論', icon: '🧠', color: 'blue' },
  numerical: { name: '数的推論', icon: '🔢', color: 'green' },
  spatial: { name: '空間認識', icon: '🎲', color: 'purple' },
  pattern: { name: 'パターン認識', icon: '🔷', color: 'orange' },
  verbal: { name: '言語推論', icon: '📝', color: 'red' },
  abstract: { name: '抽象推論', icon: '🌀', color: 'indigo' },
  memory: { name: '記憶力', icon: '🧩', color: 'pink' },
  matrix: { name: '行列推論', icon: '⬜', color: 'yellow' }
} as const;