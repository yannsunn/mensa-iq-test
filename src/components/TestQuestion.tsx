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


  const getDifficultyStars = () => {
    const stars = Math.ceil(question.difficulty / 4); // 1-5 stars
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 sm:p-8 lg:p-12 relative glass-advanced"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8 w-full">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <span className="text-sm font-medium text-white/80 bg-white/10 px-3 py-1 rounded-full backdrop-blur">
            問題 {questionNumber} / {totalQuestions}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
            {question.category}
          </span>
          <span className="text-sm text-white/70">
            難易度: {getDifficultyStars()}
          </span>
        </div>
        
        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur px-3 sm:px-4 py-2 rounded-2xl">
          <Clock className={`w-5 h-5 ${getTimeColor()}`} />
          <span className={`font-mono text-xl font-bold ${getTimeColor()}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="w-full bg-white/20 rounded-full h-4 mb-8 sm:mb-10 overflow-hidden backdrop-blur progress-modern section-spacing">
        <motion.div
          className="h-4 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 shadow-lg relative"
          initial={{ width: 0 }}
          animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </motion.div>
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
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-8 sm:mb-10 leading-relaxed text-display px-2 text-center text-spacing">
                        {question.question}
                      </h2>
                      <div className="max-w-4xl mx-auto grid gap-4 sm:gap-6 px-4 sm:px-6">
                        {question.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => onAnswerSelect(index)}
                            disabled={isTimeUp}
                            className={`
                              p-6 sm:p-8 text-center border-2 rounded-2xl glass-advanced
                              ${selectedAnswer === index
                                ? 'border-blue-400 bg-blue-400/30 text-white backdrop-blur-sm shadow-xl'
                                : 'border-white/20 bg-white/5 backdrop-blur-sm'
                              }
                              ${isTimeUp ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-white/30 hover:bg-white/10'}
                              flex items-center justify-center text-white relative transition-colors duration-200
                            `}
                          >
                            <div className="flex items-center justify-center space-x-3">
                              <span className="font-medium text-lg sm:text-xl lg:text-2xl text-center">{option}</span>
                              {selectedAnswer === index && (
                                <CheckCircle className="w-6 h-6 text-blue-400 ml-3" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  );
              }
            } else {
              // 通常のテキスト問題
              return (
                <>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-8 sm:mb-10 leading-relaxed text-center">
                    {question.question}
                  </h2>
                  <div className="max-w-4xl mx-auto grid gap-4 sm:gap-6 px-4 sm:px-6">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => onAnswerSelect(index)}
                        disabled={isTimeUp}
                        className={`
                          p-6 sm:p-8 text-center border-2 rounded-2xl glass-advanced transition-colors duration-200
                          ${selectedAnswer === index
                            ? 'border-blue-400 bg-blue-400/30 text-white backdrop-blur-sm shadow-xl'
                            : 'border-white/20 bg-white/5 backdrop-blur-sm text-white'
                          }
                          ${isTimeUp ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-white/30 hover:bg-white/10'}
                          flex items-center justify-center relative
                        `}
                      >
                        <div className="flex items-center justify-center space-x-3">
                          <span className="font-medium text-lg sm:text-xl lg:text-2xl text-center">{option}</span>
                          {selectedAnswer === index && (
                            <CheckCircle className="w-6 h-6 text-blue-400 ml-3" />
                          )}
                        </div>
                      </button>
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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8 w-full section-spacing">
        <motion.button
          whileHover={{ scale: canGoPrevious ? 1.05 : 1 }}
          whileTap={{ scale: canGoPrevious ? 0.95 : 1 }}
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`
            flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 glass-advanced
            ${canGoPrevious
              ? 'text-white hover:bg-white/20 btn-magnetic'
              : 'text-white/50 cursor-not-allowed'
            }
          `}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>前の問題</span>
        </motion.button>

        <div className="text-sm text-white/70 font-medium bg-white/10 px-4 py-2 rounded-full backdrop-blur order-last sm:order-none center-content">
          {selectedAnswer !== null ? (
            <span className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>回答済み</span>
            </span>
          ) : (
            <span className="text-orange-300">未回答</span>
          )}
        </div>

        <motion.button
          whileHover={{ scale: canGoNext ? 1.05 : 1 }}
          whileTap={{ scale: canGoNext ? 0.95 : 1 }}
          onClick={onNext}
          disabled={!canGoNext}
          className={`
            flex items-center space-x-2 px-8 py-3 rounded-2xl transition-all duration-300 font-medium
            ${canGoNext
              ? 'btn-modern btn-magnetic breathing text-white'
              : 'glass-advanced text-white/50 cursor-not-allowed'
            }
          `}
        >
          <span>{questionNumber === totalQuestions ? 'テスト完了' : '次の問題'}</span>
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}