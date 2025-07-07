// 動的インポートユーティリティ
import { UnifiedQuestion } from '@/types/question';

// 質問データの遅延読み込み
export async function loadQuestionsByCategory(
  category: string
): Promise<UnifiedQuestion[]> {
  const { getQuestionsByCategory } = await import('@/data/unifiedQuestions');
  return getQuestionsByCategory(category);
}

export async function loadPracticeQuestions(
  difficulty: 'easy' | 'medium' | 'hard',
  count: number = 10
): Promise<UnifiedQuestion[]> {
  const { generatePracticeSet } = await import('@/data/unifiedQuestions');
  return generatePracticeSet(difficulty, count);
}

export async function loadExamQuestions(
  count: number = 45
): Promise<UnifiedQuestion[]> {
  const { generateExamSet } = await import('@/data/unifiedQuestions');
  return generateExamSet(count);
}

// コンポーネントの遅延読み込み
export const LazyComponents = {
  CubeQuestion: () => import('@/components/CubeQuestion'),
  PracticeFeedback: () => import('@/components/PracticeFeedback'),
  ExamResults: () => import('@/components/ExamResults'),
  TestResults: () => import('@/components/TestResults'),
};