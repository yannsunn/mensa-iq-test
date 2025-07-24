'use client';

import { useState, lazy, Suspense, memo, useCallback } from 'react';
import { Skeleton } from '@/components/ui';

// Dynamic importsでバンドルサイズを最適化
const ModeSelection = lazy(() => import('@/components/ModeSelection'));

// 重いコンポーネントの遅延読み込み
const PracticeTest = lazy(() => import('@/components/PracticeTest'));
const ExamTest = lazy(() => import('@/components/ExamTest'));
const ExamResults = lazy(() => import('@/components/ExamResults'));

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

// メモ化されたローディングコンポーネント
const LoadingFallback = memo(function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-radial">
      <div className="text-center">
        <div className="mb-8">
          <Skeleton className="w-64 h-12 mx-auto mb-4" />
          <Skeleton className="w-96 h-8 mx-auto mb-2" />
          <Skeleton className="w-80 h-8 mx-auto" />
        </div>
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4" />
          <p className="text-text-secondary">読み込み中...</p>
        </div>
      </div>
    </div>
  );
});

// メモ化されたメインコンポーネント
const Home = memo(function Home() {
  const [currentMode, setCurrentMode] = useState<AppMode>('home');
  const [practiceDifficulty, setPracticeDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  // イベントハンドラーのメモ化
  const handleModeSelect = useCallback((mode: 'practice' | 'exam', difficulty?: 'easy' | 'medium' | 'hard') => {
    if (mode === 'practice' && difficulty) {
      setPracticeDifficulty(difficulty);
      setCurrentMode('practice');
    } else if (mode === 'exam') {
      setCurrentMode('exam');
    }
  }, []);

  const handleExamComplete = useCallback((result: ExamResult) => {
    setExamResult(result);
    setCurrentMode('results');
  }, []);

  const handleBackToHome = useCallback(() => {
    setCurrentMode('home');
    setExamResult(null);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentMode('home');
    setExamResult(null);
  }, []);

  // 各モードの表示
  if (currentMode === 'practice') {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <PracticeTest
          difficulty={practiceDifficulty}
          onBack={handleBackToHome}
        />
      </Suspense>
    );
  }

  if (currentMode === 'exam') {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <ExamTest
          onBack={handleBackToHome}
          onComplete={handleExamComplete}
        />
      </Suspense>
    );
  }

  if (currentMode === 'results' && examResult) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <ExamResults
          result={examResult}
          onRestart={handleRestart}
          onBackToHome={handleBackToHome}
        />
      </Suspense>
    );
  }

  // ホーム画面（モード選択）
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ModeSelection onSelectMode={handleModeSelect} />
    </Suspense>
  );
});

export default Home;
}