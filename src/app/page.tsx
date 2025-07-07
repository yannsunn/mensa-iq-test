'use client';

import { useState } from 'react';
import ModeSelection from '@/components/ModeSelection';
import PracticeTest from '@/components/PracticeTest';
import ExamTest from '@/components/ExamTest';
import ExamResults from '@/components/ExamResults';

type AppMode = 'home' | 'practice' | 'exam' | 'results';

interface ExamResult {
  totalScore: number;
  totalQuestions: number;
  iqScore: number;
  percentile: number;
  categoryScores: { [key: string]: { correct: number; total: number; percentage: number } };
  timeSpent: number;
  difficulty: string;
  mensaQualified: boolean;
}

export default function Home() {
  const [currentMode, setCurrentMode] = useState<AppMode>('home');
  const [practiceDifficulty, setPracticeDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  const handleModeSelect = (mode: 'practice' | 'exam', difficulty?: 'easy' | 'medium' | 'hard') => {
    if (mode === 'practice' && difficulty) {
      setPracticeDifficulty(difficulty);
      setCurrentMode('practice');
    } else if (mode === 'exam') {
      setCurrentMode('exam');
    }
  };

  const handleExamComplete = (result: ExamResult) => {
    setExamResult(result);
    setCurrentMode('results');
  };

  const handleBackToHome = () => {
    setCurrentMode('home');
    setExamResult(null);
  };

  const handleRestart = () => {
    setCurrentMode('home');
    setExamResult(null);
  };

  // 各モードの表示
  if (currentMode === 'practice') {
    return (
      <PracticeTest
        difficulty={practiceDifficulty}
        onBack={handleBackToHome}
      />
    );
  }

  if (currentMode === 'exam') {
    return (
      <ExamTest
        onBack={handleBackToHome}
        onComplete={handleExamComplete}
      />
    );
  }

  if (currentMode === 'results' && examResult) {
    return (
      <ExamResults
        result={examResult}
        onRestart={handleRestart}
        onBackToHome={handleBackToHome}
      />
    );
  }

  // ホーム画面（モード選択）
  return <ModeSelection onSelectMode={handleModeSelect} />;
}