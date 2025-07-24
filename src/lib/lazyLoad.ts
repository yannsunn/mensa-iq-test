// 動的インポートユーティリティ
import { ConsolidatedMensaQuestion } from '@/data/consolidatedQuestions';

// 質問データの遅延読み込み
export async function loadQuestionsByCategory(
  category: string
): Promise<ConsolidatedMensaQuestion[]> {
  const { getProblemsByCategory } = await import('@/data/consolidatedQuestions');
  return getProblemsByCategory(category);
}

export async function loadPracticeQuestions(
  difficulty: 'easy' | 'medium' | 'hard',
  count: number = 10
): Promise<ConsolidatedMensaQuestion[]> {
  const { getProblemsByDifficulty } = await import('@/data/consolidatedQuestions');
  const difficultyRange = {
    easy: { min: 1, max: 7 },
    medium: { min: 8, max: 14 },
    hard: { min: 15, max: 20 }
  };
  const range = difficultyRange[difficulty];
  const problems = getProblemsByDifficulty(range.min, range.max);
  return problems.slice(0, count);
}

export async function loadExamQuestions(
  count: number = 20
): Promise<ConsolidatedMensaQuestion[]> {
  const { CONSOLIDATED_MENSA_QUESTIONS } = await import('@/data/consolidatedQuestions');
  const shuffled = [...CONSOLIDATED_MENSA_QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// コンポーネントの遅延読み込み
export const LazyComponents = {
  CubeQuestion: () => import('@/components/CubeQuestion'),
  PracticeFeedback: () => import('@/components/PracticeFeedback'),
  ExamResults: () => import('@/components/ExamResults'),
};