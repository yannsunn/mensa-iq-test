'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UnifiedQuestion, TestResult } from '@/types/question';
import { calculateIQScore, calculatePercentile, calculateCategoryScores } from '@/utils/scoring';
import { useTimer } from '@/hooks/useTimer';
import { useQuestionNavigation } from '@/hooks/useQuestionNavigation';
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
  const getAnsweredCount = () => answers.filter(answer => answer !== null).length;

  // 解答選択
  const handleAnswerSelect = useCallback((answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
    
    if (mode === 'exam') {
      // 試験モードでは即座に保存
      const newAnswers = [...answers];
      newAnswers[navigation.currentIndex] = answerIndex;
      setAnswers(newAnswers);
    }
  }, [showFeedback, mode, answers, navigation.currentIndex]);

  // 解答提出（練習モード）
  const handleSubmitAnswer = useCallback(() => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    const newAnswers = [...answers];
    newAnswers[navigation.currentIndex] = selectedAnswer;
    setAnswers(newAnswers);
    
    setShowFeedback(true);
  }, [selectedAnswer, currentQuestion, answers, navigation.currentIndex]);

  // テスト終了
  const handleSubmitTest = useCallback(() => {
    const totalScore = answers.reduce<number>((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

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
  }, [answers, questions, startTime, mode, onComplete]);

  // 次の問題へ（練習モード）
  const handleContinue = useCallback(() => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (navigation.isLast) {
      handleSubmitTest();
    } else {
      navigation.goToNext();
    }
  }, [navigation, handleSubmitTest]);

  // 前の問題へ
  const handlePrevious = useCallback(() => {
    if (mode === 'practice' && showFeedback) {
      setShowFeedback(false);
    }
    navigation.goToPrevious();
  }, [mode, showFeedback, navigation]);

  // 次の問題へ
  const handleNext = useCallback(() => {
    if (mode === 'practice' && !showFeedback && selectedAnswer !== null) {
      handleSubmitAnswer();
    } else if (mode === 'exam' || showFeedback) {
      navigation.goToNext();
    }
  }, [mode, showFeedback, selectedAnswer, navigation, handleSubmitAnswer]);

  return (
    <TestLayout
      mode={mode}
      currentQuestion={currentQuestion}
      currentIndex={navigation.currentIndex}
      totalQuestions={questions.length}
      timeRemaining={timeLimit ? timer.time : undefined}
      totalTime={timeLimit}
      answeredCount={mode === 'exam' ? getAnsweredCount() : undefined}
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
            }
          } as DetailedQuestion}
          userAnswer={selectedAnswer}
          isCorrect={isCorrect}
          onContinue={handleContinue}
          showFeedback={showFeedback}
        />
      )}

      {/* ナビゲーションボタン */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 mt-8"
      >
        <button
          onClick={handlePrevious}
          disabled={navigation.isFirst}
          className={`
            flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300
            ${navigation.isFirst
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-white/10 text-white hover:bg-white/20'
            }
          `}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>前の問題</span>
        </button>

        <div className="text-center">
          {mode === 'practice' && !showFeedback && (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={`
                px-8 py-3 rounded-xl font-bold transition-all duration-300
                ${selectedAnswer === null
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                }
              `}
            >
              解答を確認
            </button>
          )}
          
          {mode === 'exam' && (
            <button
              onClick={handleSubmitTest}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              テスト終了
            </button>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={navigation.isLast || (mode === 'practice' && !showFeedback && selectedAnswer === null)}
          className={`
            flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300
            ${navigation.isLast || (mode === 'practice' && !showFeedback && selectedAnswer === null)
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
            }
          `}
        >
          <span>{navigation.isLast && mode === 'practice' && showFeedback ? 'テスト終了' : '次の問題'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </TestLayout>
  );
}