import { UnifiedQuestion } from '@/types/question';
import { logicalReasoningQuestions, numericalReasoningQuestions, spatialReasoningQuestions, verbalReasoningQuestions, abstractReasoningQuestions } from './internationalMensaQuestions';
import { visualQuestions } from './visualQuestions';

// すべての質問を統一フォーマットに変換
interface QuestionWithPracticeMode {
  id: string;
  category: string;
  difficulty: number;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
  explanation?: string;
  practiceMode?: {
    immediateExplanation: string;
    detailedSolution: string;
    commonMistakes: string[];
    relatedConcepts: string[];
    difficultyJustification: string;
  };
  source?: string;
  mensaLevel?: string;
  cognitiveSkills?: string[];
  visualType?: string;
  visualData?: {
    type?: string;
    data?: unknown;
    visualType?: string;
    cubeData?: unknown;
  };
  cubeData?: unknown;
}

function convertToUnifiedFormat(questions: QuestionWithPracticeMode[], defaultCategory?: string): UnifiedQuestion[] {
  return questions.map((q): UnifiedQuestion => {
    const base: UnifiedQuestion = {
      id: q.id,
      category: (q.category || defaultCategory || 'logical') as UnifiedQuestion['category'],
      difficulty: q.difficulty,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      timeLimit: q.timeLimit,
      explanation: q.explanation || q.practiceMode?.immediateExplanation || ''
    };

    // 練習モードの詳細を追加
    if (q.practiceMode) {
      base.practiceDetails = {
        immediateExplanation: q.practiceMode.immediateExplanation,
        detailedSolution: q.practiceMode.detailedSolution,
        commonMistakes: q.practiceMode.commonMistakes,
        relatedConcepts: q.practiceMode.relatedConcepts,
        difficultyJustification: q.practiceMode.difficultyJustification
      };
    }

    // MENSA情報を追加
    if (q.source || q.mensaLevel || q.cognitiveSkills) {
      base.mensaInfo = {
        source: q.source || 'MENSA International',
        mensaLevel: (q.mensaLevel || 'standard') as 'entry' | 'standard' | 'expert' | 'genius',
        cognitiveSkills: q.cognitiveSkills || []
      };
    }

    // ビジュアルデータを追加
    if (q.visualType || q.cubeData || q.visualData) {
      base.visualData = {
        type: (q.visualData?.type || (q.visualType ? 'cube' : 'pattern')) as 'matrix' | 'pattern' | 'cube' | 'geometric',
        data: q.visualData?.data,
        visualType: q.visualType as 'cube_rotation' | 'net_to_cube' | 'opposite_faces' | undefined,
        cubeData: q.cubeData as {
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
        } | undefined
      };
    }

    return base;
  });
}

// 統一された質問データベース
export const UNIFIED_QUESTIONS: UnifiedQuestion[] = [
  ...convertToUnifiedFormat(logicalReasoningQuestions as QuestionWithPracticeMode[]),
  ...convertToUnifiedFormat(numericalReasoningQuestions as QuestionWithPracticeMode[]),
  ...convertToUnifiedFormat(spatialReasoningQuestions as QuestionWithPracticeMode[]),
  ...convertToUnifiedFormat(verbalReasoningQuestions as QuestionWithPracticeMode[]),
  ...convertToUnifiedFormat(abstractReasoningQuestions as QuestionWithPracticeMode[]),
  ...convertToUnifiedFormat(visualQuestions as QuestionWithPracticeMode[])
];

// カテゴリ別に質問を取得
export function getQuestionsByCategory(category: string): UnifiedQuestion[] {
  return UNIFIED_QUESTIONS.filter(q => q.category === category);
}

// 難易度範囲で質問を取得
export function getQuestionsByDifficulty(
  minDifficulty: number,
  maxDifficulty: number
): UnifiedQuestion[] {
  return UNIFIED_QUESTIONS.filter(
    q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty
  );
}

// 練習セットを生成（難易度別）
export function generatePracticeSet(
  difficulty: 'easy' | 'medium' | 'hard',
  count: number = 10
): UnifiedQuestion[] {
  const difficultyRanges = {
    easy: { min: 1, max: 7 },
    medium: { min: 8, max: 14 },
    hard: { min: 15, max: 20 }
  };

  const range = difficultyRanges[difficulty];
  const availableQuestions = getQuestionsByDifficulty(range.min, range.max);
  
  // 各カテゴリから均等に選択
  const categories = Array.from(new Set(availableQuestions.map(q => q.category)));
  const questionsPerCategory = Math.ceil(count / categories.length);
  
  let selectedQuestions: UnifiedQuestion[] = [];
  
  categories.forEach(category => {
    const categoryQuestions = availableQuestions
      .filter(q => q.category === category)
      .sort(() => Math.random() - 0.5)
      .slice(0, questionsPerCategory);
    
    selectedQuestions = [...selectedQuestions, ...categoryQuestions];
  });

  return selectedQuestions.slice(0, count);
}

// 試験セットを生成（MENSA標準形式）
export function generateExamSet(count: number = 45): UnifiedQuestion[] {
  // MENSA標準の難易度分布
  const distribution = {
    easy: Math.floor(count * 0.2),    // 20%
    medium: Math.floor(count * 0.5),  // 50%
    hard: Math.floor(count * 0.3)     // 30%
  };

  const easyQuestions = getQuestionsByDifficulty(1, 7)
    .sort(() => Math.random() - 0.5)
    .slice(0, distribution.easy);
    
  const mediumQuestions = getQuestionsByDifficulty(8, 14)
    .sort(() => Math.random() - 0.5)
    .slice(0, distribution.medium);
    
  const hardQuestions = getQuestionsByDifficulty(15, 20)
    .sort(() => Math.random() - 0.5)
    .slice(0, distribution.hard);

  // 難易度順に並べる（実際のMENSAテストは徐々に難しくなる）
  return [...easyQuestions, ...mediumQuestions, ...hardQuestions];
}

// カスタムセットを生成
export function generateCustomSet(
  categories: string[],
  difficultyRange: { min: number; max: number },
  count: number
): UnifiedQuestion[] {
  let availableQuestions = UNIFIED_QUESTIONS;

  // カテゴリでフィルター
  if (categories.length > 0) {
    availableQuestions = availableQuestions.filter(q => categories.includes(q.category));
  }

  // 難易度でフィルター
  availableQuestions = availableQuestions.filter(
    q => q.difficulty >= difficultyRange.min && q.difficulty <= difficultyRange.max
  );

  // ランダムに選択
  return availableQuestions
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

// 統計情報を取得
export function getQuestionsStatistics() {
  const stats = {
    total: UNIFIED_QUESTIONS.length,
    byCategory: {} as Record<string, number>,
    byDifficulty: {} as Record<string, number>,
    byMensaLevel: {} as Record<string, number>
  };

  UNIFIED_QUESTIONS.forEach(q => {
    // カテゴリ別
    stats.byCategory[q.category] = (stats.byCategory[q.category] || 0) + 1;
    
    // 難易度別
    const difficultyLevel = 
      q.difficulty <= 7 ? 'easy' :
      q.difficulty <= 14 ? 'medium' : 'hard';
    stats.byDifficulty[difficultyLevel] = (stats.byDifficulty[difficultyLevel] || 0) + 1;
    
    // MENSAレベル別
    if (q.mensaInfo?.mensaLevel) {
      stats.byMensaLevel[q.mensaInfo.mensaLevel] = 
        (stats.byMensaLevel[q.mensaInfo.mensaLevel] || 0) + 1;
    }
  });

  return stats;
}