'use client';

import { useState, useCallback, useMemo } from 'react';

interface UseQuestionNavigationOptions {
  totalQuestions: number;
  onQuestionChange?: (index: number) => void;
}

interface UseQuestionNavigationReturn {
  currentIndex: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  goToQuestion: (index: number) => void;
  isFirst: boolean;
  isLast: boolean;
  progress: number;
}

export function useQuestionNavigation({
  totalQuestions,
  onQuestionChange
}: UseQuestionNavigationOptions): UseQuestionNavigationReturn {
  const [currentIndex, setCurrentIndex] = useState(0);

  const canGoNext = currentIndex < totalQuestions - 1;
  const canGoPrevious = currentIndex > 0;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const goToNext = useCallback(() => {
    if (canGoNext) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      onQuestionChange?.(newIndex);
    }
  }, [currentIndex, canGoNext, onQuestionChange]);

  const goToPrevious = useCallback(() => {
    if (canGoPrevious) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      onQuestionChange?.(newIndex);
    }
  }, [currentIndex, canGoPrevious, onQuestionChange]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setCurrentIndex(index);
      onQuestionChange?.(index);
    }
  }, [totalQuestions, onQuestionChange]);

  return useMemo(() => ({
    currentIndex,
    canGoNext,
    canGoPrevious,
    goToNext,
    goToPrevious,
    goToQuestion,
    isFirst,
    isLast,
    progress
  }), [
    currentIndex,
    canGoNext,
    canGoPrevious,
    goToNext,
    goToPrevious,
    goToQuestion,
    isFirst,
    isLast,
    progress
  ]);
}

// 問題のフィルタリングとソート
export function filterQuestionsByCategory<T extends { category: string }>(
  questions: T[],
  categories: string[]
): T[] {
  if (categories.length === 0) return questions;
  return questions.filter(q => categories.includes(q.category));
}

export function sortQuestionsByDifficulty<T extends { difficulty: number }>(
  questions: T[],
  order: 'asc' | 'desc' = 'asc'
): T[] {
  return [...questions].sort((a, b) => {
    return order === 'asc' 
      ? a.difficulty - b.difficulty 
      : b.difficulty - a.difficulty;
  });
}

// 問題のシャッフル（Fisher-Yatesアルゴリズム）
export function shuffleQuestions<T>(questions: T[]): T[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}