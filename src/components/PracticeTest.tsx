'use client';

import { useState, useEffect } from 'react';
import BaseTest from './BaseTest';
import { UnifiedQuestion } from '@/types/question';
import { loadPracticeQuestions } from '@/lib/questionLoader';

interface PracticeTestProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onBack: () => void;
}

export default function PracticeTest({ difficulty, onBack }: PracticeTestProps) {
  const [questions, setQuestions] = useState<UnifiedQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const practiceQuestions = await loadPracticeQuestions(difficulty, 10);
        setQuestions(practiceQuestions);
      } catch (error) {
        console.error('Failed to load questions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, [difficulty]);

  if (isLoading || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-radial flex items-center justify-center">
        <div className="text-text-primary text-xl">問題を読み込み中...</div>
      </div>
    );
  }

  return (
    <BaseTest
      mode="practice"
      questions={questions}
      onBack={onBack}
    />
  );
}