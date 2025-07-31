// 問題データを自動的に拡張するローダー

import { UnifiedQuestion } from '@/types/question';
import { enhanceQuestionWithVisualData } from '@/utils/visualDataEnhancer';

// 問題を拡張して返す
export const enhanceQuestion = (question: UnifiedQuestion): UnifiedQuestion => {
  // visualDataを自動追加
  const enhancedQuestion = enhanceQuestionWithVisualData(question);
  
  // その他の拡張処理があればここに追加
  
  return enhancedQuestion;
};

// 問題配列を一括拡張
export const enhanceQuestions = (questions: UnifiedQuestion[]): UnifiedQuestion[] => {
  return questions.map(enhanceQuestion);
};

// キャッシュ付き問題拡張
const enhancedQuestionsCache = new Map<string, UnifiedQuestion>();

export const getEnhancedQuestion = (question: UnifiedQuestion): UnifiedQuestion => {
  const cacheKey = question.id;
  
  if (enhancedQuestionsCache.has(cacheKey)) {
    return enhancedQuestionsCache.get(cacheKey)!;
  }
  
  const enhanced = enhanceQuestion(question);
  enhancedQuestionsCache.set(cacheKey, enhanced);
  
  return enhanced;
};