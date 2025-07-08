'use client';

import { useState, useEffect } from 'react';
import BaseTest from './BaseTest';
import { UnifiedQuestion, TestResult } from '@/types/question';
import { loadExamQuestions } from '@/lib/lazyLoad';

interface ExamTestProps {
  onBack: () => void;
  onComplete: (result: TestResult) => void;
}

export default function ExamTest({ onComplete }: ExamTestProps) {
  const [questions, setQuestions] = useState<UnifiedQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const examQuestions = await loadExamQuestions(45);
        setQuestions(examQuestions);
      } catch (error) {
        console.error('Failed to load questions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadQuestions();
  }, []);

  if (isLoading || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-radial flex items-center justify-center">
        <div className="text-text-primary text-xl">テスト準備中...</div>
      </div>
    );
  }

  return (
    <BaseTest
      mode="exam"
      questions={questions}
      onBack={() => {}} // 試験モードでは戻るボタンを無効化
      onComplete={onComplete}
      timeLimit={45 * 60} // 45分
    />
  );
}