'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UnifiedQuestion, TestResult } from '@/types/question';
import { calculateIQScore, calculatePercentile, calculateCategoryScores } from '@/utils/scoring';
import { useTimer } from '@/hooks/useTimer';
import { useQuestionNavigation } from '@/hooks/useQuestionNavigation';
import { getCognitiveSkills } from '@/utils/dataValidation';
import TestLayout from './common/TestLayout';
import QuestionDisplay from './common/QuestionDisplay';
import PracticeFeedback from './PracticeFeedback';
import { DetailedQuestion } from '@/data/internationalMensaQuestions';

interface BaseTestProps {
  mode: 'practice' | 'exam';
  questions: UnifiedQuestion[];
  onBack: () => void;
  onComplete?: (result: TestResult) => void;
  timeLimit?: number; // 全体の制限時間（秒）
}

export default function BaseTest({
  mode,
  questions,
  onComplete,
  timeLimit
}: BaseTestProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [startTime] = useState(Date.now());

  // ナビゲーションフック
  const navigation = useQuestionNavigation({
    totalQuestions: questions.length,
    onQuestionChange: (index) => {
      setSelectedAnswer(answers[index]);
      setShowFeedback(false);
    }
  });

  // タイマーフック
  const timer = useTimer({
    initialTime: timeLimit || 0,
    countDown: true,
    autoStart: !!timeLimit,
    onTimeUp: () => {
      if (mode === 'exam') {
        handleSubmitTest();
      }
    }
  });

  const currentQuestion = questions[navigation.currentIndex];
  
  // メモ化された統計情報（パフォーマンス最適化）
  const { answeredCount, totalScore } = useMemo(() => {
    const answeredCount = answers.filter(answer => answer !== null).length;
    const totalScore = answers.reduce<number>((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    return { answeredCount, totalScore };
  }, [answers, questions]);

  // 解答選択（最適化版）
  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
    
    if (mode === 'exam') {
      // 試験モードでは即座に保存
      setAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[navigation.currentIndex] = answerIndex;
        return newAnswers;
      });
    }
  }, [showFeedback, mode, navigation.currentIndex]);

  // 解答提出（練習モード）
  const handleSubmitAnswer = useCallback(() => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[navigation.currentIndex] = selectedAnswer;
      return newAnswers;
    });
    
    setShowFeedback(true);
  }, [selectedAnswer, currentQuestion, navigation.currentIndex]);

  // テスト終了（最適化版）
  const handleSubmitTest = useCallback(() => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const iqScore = calculateIQScore(totalScore, questions.length);
    const percentile = calculatePercentile(iqScore);
    const categoryScores = calculateCategoryScores(answers, questions);

    const result: TestResult = {
      totalScore,
      totalQuestions: questions.length,
      iqScore,
      percentile,
      categoryScores,
      timeSpent,
      difficulty: mode === 'practice' ? 'practice' : 'standard',
      mensaQualified: iqScore >= 130
    };

    onComplete?.(result);
  }, [totalScore, answers, questions, startTime, mode, onComplete]);

  // ナビゲーションハンドラー群（最適化版）
  const navigationHandlers = useMemo(() => ({
    continue: () => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      
      if (navigation.isLast) {
        handleSubmitTest();
      } else {
        navigation.goToNext();
      }
    },
    
    previous: () => {
      if (mode === 'practice' && showFeedback) {
        setShowFeedback(false);
      }
      navigation.goToPrevious();
    },
    
    next: () => {
      if (mode === 'practice' && !showFeedback && selectedAnswer !== null) {
        handleSubmitAnswer();
      } else if (mode === 'exam' || showFeedback) {
        navigation.goToNext();
      }
    }
  }), [mode, showFeedback, selectedAnswer, navigation, handleSubmitAnswer, handleSubmitTest]);

  return (
    <TestLayout
      mode={mode}
      currentQuestion={currentQuestion}
      currentIndex={navigation.currentIndex}
      totalQuestions={questions.length}
      timeRemaining={timeLimit ? timer.time : undefined}
      totalTime={timeLimit}
      answeredCount={mode === 'exam' ? answeredCount : undefined}
    >
      {/* 問題表示 */}
      <QuestionDisplay
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
        showExplanation={mode === 'practice' && showFeedback}
        isCorrect={isCorrect}
      />

      {/* フィードバック（練習モードのみ） */}
      {mode === 'practice' && showFeedback && (
        <PracticeFeedback
          question={{
            ...currentQuestion,
            practiceMode: currentQuestion.practiceDetails || {
              immediateExplanation: currentQuestion.explanation,
              detailedSolution: '',
              commonMistakes: [],
              relatedConcepts: [],
              difficultyJustification: ''
            },
            cognitiveSkills: getCognitiveSkills(currentQuestion)
          } as DetailedQuestion}
          userAnswer={selectedAnswer}
          isCorrect={isCorrect}
          onContinue={navigationHandlers.continue}
          showFeedback={showFeedback}
        />
      )}

      {/* ナビゲーションボタン - レスポンシブ改善 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mt-6 sm:mt-8"
      >
        <button
          onClick={navigationHandlers.previous}
          disabled={navigation.isFirst}
          className={`
            flex items-center justify-center sm:justify-start space-x-2 px-4 sm:px-6 py-3.5 sm:py-3 rounded-xl transition-all duration-300 w-full sm:w-auto
            text-sm sm:text-base font-medium
            ${navigation.isFirst
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-60'
              : 'bg-white/10 text-white hover:bg-white/20 active:scale-95'
            }
          `}
          style={{ minHeight: 'var(--min-touch-target)' }}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          <span className="text-sm sm:text-base">前の問題</span>
        </button>

        <div className="text-center order-first sm:order-none w-full sm:w-auto">
          {mode === 'practice' && !showFeedback && (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={`
                px-6 sm:px-8 py-3.5 sm:py-3 rounded-xl font-bold transition-all duration-300 w-full sm:w-auto
                text-sm sm:text-base
                ${selectedAnswer === null
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-60'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 active:scale-95 shadow-lg'
                }
              `}
              style={{ minHeight: 'var(--min-touch-target)' }}
            >
              解答を確認
            </button>
          )}
          
          {mode === 'exam' && (
            <button
              onClick={handleSubmitTest}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg w-full sm:w-auto text-sm sm:text-base"
              style={{ minHeight: 'var(--min-touch-target)' }}
            >
              テスト終了
            </button>
          )}
        </div>

        <button
          onClick={navigationHandlers.next}
          disabled={navigation.isLast || (mode === 'practice' && !showFeedback && selectedAnswer === null)}
          className={`
            flex items-center justify-center sm:justify-start space-x-2 px-4 sm:px-6 py-3.5 sm:py-3 rounded-xl transition-all duration-300 w-full sm:w-auto
            text-sm sm:text-base font-medium
            ${navigation.isLast || (mode === 'practice' && !showFeedback && selectedAnswer === null)
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-60'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 active:scale-95 shadow-lg'
            }
          `}
          style={{ minHeight: 'var(--min-touch-target)' }}
        >
          <span className="text-sm sm:text-base">{navigation.isLast && mode === 'practice' && showFeedback ? 'テスト終了' : '次の問題'}</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
        </button>
      </motion.div>
    </TestLayout>
  );
}