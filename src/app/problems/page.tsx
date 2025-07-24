'use client';

import React, { useState, useMemo } from 'react';
import { CONSOLIDATED_MENSA_QUESTIONS, ConsolidatedMensaQuestion } from '@/data/consolidatedQuestions';
import ProblemBrowser from '@/components/ProblemBrowser';
import DynamicProblemDisplay from '@/components/DynamicProblemDisplay';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type ViewMode = 'browser' | 'problem' | 'test';

interface TestSession {
  problems: ConsolidatedMensaQuestion[];
  currentIndex: number;
  answers: (number | null)[];
  startTime: Date;
  timeLeft: number;
}

export default function ProblemsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('browser');
  const [selectedProblem, setSelectedProblem] = useState<ConsolidatedMensaQuestion | null>(null);
  const [testSession, setTestSession] = useState<TestSession | null>(null);

  // Statistics
  const stats = useMemo(() => {
    const total = CONSOLIDATED_MENSA_QUESTIONS.length;
    const byCategory = CONSOLIDATED_MENSA_QUESTIONS.reduce((acc, q) => {
      acc[q.category] = (acc[q.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byDifficulty = CONSOLIDATED_MENSA_QUESTIONS.reduce((acc, q) => {
      const level = q.difficulty <= 7 ? 'easy' : q.difficulty <= 14 ? 'medium' : q.difficulty <= 18 ? 'hard' : 'expert';
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const avgDifficulty = CONSOLIDATED_MENSA_QUESTIONS.reduce((sum, q) => sum + q.difficulty, 0) / total;
    
    return { total, byCategory, byDifficulty, avgDifficulty };
  }, []);

  const handleProblemSelect = (problem: ConsolidatedMensaQuestion) => {
    setSelectedProblem(problem);
    setViewMode('problem');
  };

  const handleStartTest = (problems?: ConsolidatedMensaQuestion[]) => {
    const testProblems = problems || CONSOLIDATED_MENSA_QUESTIONS.slice().sort(() => 0.5 - Math.random()).slice(0, 20);
    
    setTestSession({
      problems: testProblems,
      currentIndex: 0,
      answers: new Array(testProblems.length).fill(null),
      startTime: new Date(),
      timeLeft: testProblems.length * 60 // 1 minute per problem
    });
    setViewMode('test');
  };

  const handleTestAnswer = (answerIndex: number) => {
    if (!testSession) return;
    
    const newAnswers = [...testSession.answers];
    newAnswers[testSession.currentIndex] = answerIndex;
    
    setTestSession({
      ...testSession,
      answers: newAnswers
    });
  };

  const handleTestNext = () => {
    if (!testSession) return;
    
    if (testSession.currentIndex < testSession.problems.length - 1) {
      setTestSession({
        ...testSession,
        currentIndex: testSession.currentIndex + 1
      });
    } else {
      // Test completed
      handleTestComplete();
    }
  };

  const handleTestPrevious = () => {
    if (!testSession) return;
    
    if (testSession.currentIndex > 0) {
      setTestSession({
        ...testSession,
        currentIndex: testSession.currentIndex - 1
      });
    }
  };

  const handleTestComplete = () => {
    if (!testSession) return;
    
    // Calculate score
    const correctAnswers = testSession.answers.reduce((count, answer, index) => {
      return count + (answer === testSession.problems[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const score = Math.round((correctAnswers / testSession.problems.length) * 100);
    
    alert(`テスト完了！\n正解数: ${correctAnswers}/${testSession.problems.length}\nスコア: ${score}%`);
    
    setTestSession(null);
    setViewMode('browser');
  };

  const renderHeader = () => (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">MENSA問題システム</h1>
        <p className="text-xl opacity-90 mb-6">
          統合された44問の本格的なMENSA IQテスト問題
        </p>
        
        {/* Navigation */}
        <div className="flex gap-4">
          <Button
            variant={viewMode === 'browser' ? 'primary' : 'outline'}
            onClick={() => setViewMode('browser')}
            className="text-white border-white hover:bg-white hover:text-blue-600"
          >
            問題ブラウザー
          </Button>
          <Button
            variant="outline"
            onClick={() => handleStartTest()}
            className="text-white border-white hover:bg-white hover:text-blue-600"
          >
            ランダムテスト開始
          </Button>
        </div>
      </div>
    </div>
  );

  const renderStats = () => (
    <Card className="p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">統計情報</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">問題数</h3>
          <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">平均難易度</h3>
          <div className="text-3xl font-bold text-purple-600">
            {stats.avgDifficulty.toFixed(1)}/20
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">カテゴリ分布</h3>
          <div className="space-y-1 text-sm">
            {Object.entries(stats.byCategory).map(([category, count]) => (
              <div key={category} className="flex justify-between">
                <span className="capitalize">{category}:</span>
                <span className="font-medium">{count}問</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );

  // Test Mode
  if (viewMode === 'test' && testSession) {
    const currentProblem = testSession.problems[testSession.currentIndex];
    const progress = ((testSession.currentIndex + 1) / testSession.problems.length) * 100;
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Test Header */}
        <div className="bg-white border-b shadow-sm p-4">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">MENSAテストモード</h1>
              <p className="text-gray-600">
                問題 {testSession.currentIndex + 1} / {testSession.problems.length}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-600">進捗</div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Content */}
        <div className="p-6">
          <DynamicProblemDisplay
            problem={currentProblem}
            onAnswerSelect={handleTestAnswer}
            onNext={testSession.currentIndex < testSession.problems.length - 1 ? handleTestNext : handleTestComplete}
            onPrevious={testSession.currentIndex > 0 ? handleTestPrevious : undefined}
          />
        </div>
      </div>
    );
  }

  // Problem View Mode
  if (viewMode === 'problem' && selectedProblem) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b shadow-sm p-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={() => setViewMode('browser')}
              className="mb-4"
            >
              ← 問題一覧に戻る
            </Button>
          </div>
        </div>

        <div className="p-6">
          <DynamicProblemDisplay
            problem={selectedProblem}
            showAnswer={false}
            onNext={() => {
              const currentIndex = CONSOLIDATED_MENSA_QUESTIONS.findIndex(p => p.id === selectedProblem.id);
              const nextProblem = CONSOLIDATED_MENSA_QUESTIONS[currentIndex + 1];
              if (nextProblem) setSelectedProblem(nextProblem);
            }}
            onPrevious={() => {
              const currentIndex = CONSOLIDATED_MENSA_QUESTIONS.findIndex(p => p.id === selectedProblem.id);
              const prevProblem = CONSOLIDATED_MENSA_QUESTIONS[currentIndex - 1];
              if (prevProblem) setSelectedProblem(prevProblem);
            }}
          />
        </div>
      </div>
    );
  }

  // Browser Mode (Default)
  return (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      
      <div className="max-w-7xl mx-auto p-6">
        {renderStats()}
        
        <ProblemBrowser
          problems={CONSOLIDATED_MENSA_QUESTIONS}
          onProblemSelect={handleProblemSelect}
        />
      </div>
    </div>
  );
}