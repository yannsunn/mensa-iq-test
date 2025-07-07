/**
 * データ検証ユーティリティ
 * 全てのデータアクセスを安全に行うための関数群
 */

import { UnifiedQuestion } from '@/types/question';

/**
 * 安全な配列アクセス
 */
export function safeArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

/**
 * 安全な配列結合
 */
export function safeJoin(value: string[] | undefined | null, separator: string = ', '): string {
  const array = safeArray(value);
  return array.length > 0 ? array.join(separator) : '';
}

/**
 * 安全な文字列アクセス
 */
export function safeString(value: string | undefined | null, fallback: string = ''): string {
  return typeof value === 'string' ? value : fallback;
}

/**
 * 安全な数値アクセス
 */
export function safeNumber(value: number | undefined | null, fallback: number = 0): number {
  return typeof value === 'number' && !isNaN(value) ? value : fallback;
}

/**
 * 問題データの検証
 */
export function validateQuestion(question: UnifiedQuestion): UnifiedQuestion {
  return {
    ...question,
    category: question.category,
    difficulty: safeNumber(question.difficulty, 10),
    options: safeArray(question.options),
    explanation: safeString(question.explanation),
    mensaInfo: question.mensaInfo ? {
      ...question.mensaInfo,
      cognitiveSkills: safeArray(question.mensaInfo.cognitiveSkills),
      mensaLevel: question.mensaInfo.mensaLevel
    } : undefined,
    practiceDetails: question.practiceDetails ? {
      ...question.practiceDetails,
      commonMistakes: safeArray(question.practiceDetails.commonMistakes),
      relatedConcepts: safeArray(question.practiceDetails.relatedConcepts)
    } : undefined
  };
}

/**
 * 問題配列の検証
 */
export function validateQuestions(questions: UnifiedQuestion[]): UnifiedQuestion[] {
  const validQuestions = safeArray(questions);
  return validQuestions.map(validateQuestion);
}

/**
 * 認知スキル配列の安全な取得
 */
export function getCognitiveSkills(question: UnifiedQuestion): string[] {
  return safeArray(question.mensaInfo?.cognitiveSkills);
}

/**
 * 認知スキル文字列の安全な取得
 */
export function getCognitiveSkillsString(question: UnifiedQuestion): string {
  const skills = getCognitiveSkills(question);
  return skills.length > 0 ? skills.join(', ') : '情報なし';
}

/**
 * よくある間違い配列の安全な取得
 */
export function getCommonMistakes(question: UnifiedQuestion): string[] {
  return safeArray(question.practiceDetails?.commonMistakes);
}

/**
 * 関連概念配列の安全な取得
 */
export function getRelatedConcepts(question: UnifiedQuestion): string[] {
  return safeArray(question.practiceDetails?.relatedConcepts);
}