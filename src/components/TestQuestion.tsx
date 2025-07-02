'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Question } from '@/types';
import { VisualQuestion } from '@/data/visualQuestions';
import RavenMatrix from './RavenMatrix';
import CubeQuestion from './CubeQuestion';

interface TestQuestionProps {
  question: Question | VisualQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export default function TestQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}: TestQuestionProps) {
  const [timeLeft, setTimeLeft] = useState(question.timeLimit);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    setTimeLeft(question.timeLimit);
    setIsTimeUp(false);
  }, [question.id, question.timeLimit]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeUp(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 10) return 'text-red-500';
    if (timeLeft <= 30) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getCategoryBadgeColor = () => {
    const colors = {
      logical: 'bg-blue-100 text-blue-800',
      numerical: 'bg-green-100 text-green-800',
      spatial: 'bg-purple-100 text-purple-800',
      matrix: 'bg-orange-100 text-orange-800',
      verbal: 'bg-pink-100 text-pink-800',
      abstract: 'bg-indigo-100 text-indigo-800',
      memory: 'bg-red-100 text-red-800',
    };
    return colors[question.category];
  };

  const getDifficultyStars = () => {
    const stars = Math.ceil(question.difficulty / 4); // 1-5 stars
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-500">
            問題 {questionNumber} / {totalQuestions}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryBadgeColor()}`}>
            {question.category}
          </span>
          <span className="text-sm text-gray-500">
            難易度: {getDifficultyStars()}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className={`w-4 h-4 ${getTimeColor()}`} />
          <span className={`font-mono text-lg font-bold ${getTimeColor()}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
        <motion.div
          className="bg-blue-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          {/* 質問内容 - 視覚的問題かどうかで分岐 */}
          {(() => {
            const visualQuestion = question as VisualQuestion;
            
            // 視覚的問題の場合
            if ('visualType' in visualQuestion && visualQuestion.visualData) {
              switch (visualQuestion.visualType) {
                case 'raven_matrix':
                  return (
                    <RavenMatrix
                      matrix={visualQuestion.visualData.matrix || []}
                      options={visualQuestion.options}
                      onSelect={onAnswerSelect}
                      selectedAnswer={selectedAnswer}
                      title={visualQuestion.question}
                    />
                  );
                
                case 'cube_spatial':
                  return (
                    <CubeQuestion
                      type={visualQuestion.visualData.cubeType || 'net_to_cube'}
                      question={visualQuestion.question}
                      options={visualQuestion.options}
                      onSelect={onAnswerSelect}
                      selectedAnswer={selectedAnswer}
                      netLabels={visualQuestion.visualData.netLabels}
                      cubeViews={visualQuestion.visualData.cubeViews}
                    />
                  );
                
                default:
                  // 通常のテキスト問題
                  return (
                    <>
                      <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                        {question.question}
                      </h2>
                      <div className="grid gap-3">
                        {question.options.map((option, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onAnswerSelect(index)}
                            disabled={isTimeUp}
                            className={`
                              p-4 text-left border-2 rounded-lg transition-all duration-200
                              ${selectedAnswer === index
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                              }
                              ${isTimeUp ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                              flex items-center justify-between
                            `}
                          >
                            <span className="flex-1">{option}</span>
                            {selectedAnswer === index && (
                              <CheckCircle className="w-5 h-5 text-blue-500" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </>
                  );
              }
            } else {
              // 通常のテキスト問題
              return (
                <>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                    {question.question}
                  </h2>
                  <div className="grid gap-3">
                    {question.options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onAnswerSelect(index)}
                        disabled={isTimeUp}
                        className={`
                          p-4 text-left border-2 rounded-lg transition-all duration-200
                          ${selectedAnswer === index
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }
                          ${isTimeUp ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                          flex items-center justify-between
                        `}
                      >
                        <span className="flex-1">{option}</span>
                        {selectedAnswer === index && (
                          <CheckCircle className="w-5 h-5 text-blue-500" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </>
              );
            }
          })()}

          {/* Time's up overlay */}
          {isTimeUp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <h3 className="text-lg font-bold text-red-600 mb-2">時間切れ！</h3>
                <p className="text-gray-600 mb-4">次の問題に進みます。</p>
                <button
                  onClick={onNext}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  次へ
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
            ${canGoPrevious
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>前の問題</span>
        </button>

        <div className="text-sm text-gray-500">
          {selectedAnswer !== null ? '回答済み' : '未回答'}
        </div>

        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`
            flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors font-medium
            ${canGoNext
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <span>{questionNumber === totalQuestions ? 'テスト完了' : '次の問題'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}