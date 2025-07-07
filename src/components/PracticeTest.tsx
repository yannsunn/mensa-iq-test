'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowLeft, BookOpen } from 'lucide-react';
import { DetailedQuestion, generatePracticeSet } from '@/data/internationalMensaQuestions';
import PracticeFeedback from './PracticeFeedback';
import CubeQuestion from './CubeQuestion';

interface PracticeTestProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onBack: () => void;
}

export default function PracticeTest({ difficulty, onBack }: PracticeTestProps) {
  const [questions, setQuestions] = useState<DetailedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const practiceQuestions = generatePracticeSet(difficulty);
    setQuestions(practiceQuestions);
    setAnswers(new Array(practiceQuestions.length).fill(null));
  }, [difficulty]);

  useEffect(() => {
    setStartTime(Date.now());
    setTimeSpent(0);
    setTimeRemaining(currentQuestion?.timeLimit || null);
    
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(elapsed);
      
      if (currentQuestion?.timeLimit) {
        const remaining = currentQuestion.timeLimit - elapsed;
        setTimeRemaining(remaining > 0 ? remaining : 0);
        
        if (remaining <= 0 && !showFeedback) {
          // 時間切れの場合、自動的に提出
          if (selectedAnswer === null) {
            setSelectedAnswer(-1); // 未回答を示す特別な値
          }
          handleSubmitAnswer();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);
    
    setShowFeedback(true);
  };

  const handleContinue = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 練習完了
      alert('練習完了！お疲れ様でした。');
      onBack();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'from-green-500 to-blue-500';
      case 'medium': return 'from-blue-500 to-purple-500';
      case 'hard': return 'from-purple-500 to-red-500';
    }
  };

  const getDifficultyText = () => {
    switch (difficulty) {
      case 'easy': return '初級練習';
      case 'medium': return '中級練習';
      case 'hard': return '上級練習';
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">問題を読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
        >
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>戻る</span>
            </button>
            <div className="h-6 w-px bg-white/20" />
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <div>
                <h1 className={`text-2xl font-bold bg-gradient-to-r ${getDifficultyColor()} bg-clip-text text-transparent`}>
                  {getDifficultyText()}
                </h1>
                <p className="text-white/60 text-sm">
                  問題 {currentQuestionIndex + 1} / {questions.length}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-white font-mono">{formatTime(timeSpent)}</span>
            </div>
            <div className="text-white/60 text-sm">
              出典: {currentQuestion.source}
            </div>
          </div>
        </motion.div>

        {/* プログレスバー */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />

        {/* 問題表示エリア */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 mb-8"
          >
            {/* 問題メタデータ */}
            <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white/5 rounded-xl">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                {currentQuestion.category}
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                難易度: {currentQuestion.difficulty}/20
              </span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                {currentQuestion.mensaLevel}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                timeRemaining && timeRemaining <= 10 
                  ? 'bg-red-500/20 text-red-300 animate-pulse' 
                  : 'bg-pink-500/20 text-pink-300'
              }`}>
                残り時間: {timeRemaining !== null ? timeRemaining : currentQuestion.timeLimit}秒
              </span>
            </div>

            {/* 空間問題の特別な表示 */}
            {currentQuestion.category === 'spatial' && currentQuestion.visualType && currentQuestion.cubeData ? (
              <CubeQuestion
                type={currentQuestion.visualType}
                question={currentQuestion.question}
                options={currentQuestion.options}
                onSelect={handleAnswerSelect}
                selectedAnswer={selectedAnswer}
                cubeViews={
                  currentQuestion.visualType === 'cube_rotation' ? [
                    // 初期状態（前面=A（赤）、上面=B（青）、右面=C（緑））
                    {
                      showFaces: ['front', 'top', 'right'],
                      colors: {
                        front: '#ff6b6b', // A - 赤
                        top: '#4ecdc4',   // B - 青  
                        right: '#45b7d1'  // C - 緑
                      }
                    },
                    // 左回転後の状態（右面が前面に移動）
                    {
                      showFaces: ['front', 'top', 'right'],
                      colors: {
                        front: '#45b7d1', // C - 緑（元の右面）
                        top: '#4ecdc4',   // B - 青（上面は変化なし）
                        right: '#9c27b0'  // D - 紫（元の後面）
                      }
                    },
                    // 選択肢A: 元の前面
                    {
                      showFaces: ['front', 'top', 'right'],
                      colors: {
                        front: '#ff6b6b', // A - 赤
                        top: '#4ecdc4',   // B - 青
                        right: '#ffeb3b'  // 黄
                      }
                    },
                    // 選択肢B: 元の上面
                    {
                      showFaces: ['front', 'top', 'right'],
                      colors: {
                        front: '#4ecdc4', // B - 青
                        top: '#e67e22',   // オレンジ
                        right: '#ff6b6b'  // A - 赤
                      }
                    },
                    // 選択肢C: 元の右面（正解）
                    {
                      showFaces: ['front', 'top', 'right'],
                      colors: {
                        front: '#45b7d1', // C - 緑
                        top: '#4ecdc4',   // B - 青
                        right: '#9c27b0'  // D - 紫
                      }
                    },
                    // 選択肢D: 反対面
                    {
                      showFaces: ['front', 'top', 'right'],
                      colors: {
                        front: '#9c27b0', // D - 紫
                        top: '#4ecdc4',   // B - 青
                        right: '#34495e'  // 灰色
                      }
                    }
                  ] : undefined
                }
              />
            ) : (
              <>
                {/* 通常の問題文 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 leading-relaxed">
                    {currentQuestion.question}
                  </h2>
                </motion.div>

                {/* 選択肢 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid gap-4 md:gap-6 mb-8"
                >
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(index)}
                      className={`
                        p-6 md:p-8 text-left border-2 rounded-2xl transition-all duration-300
                        ${selectedAnswer === index
                          ? 'border-blue-400 bg-blue-400/20 text-white shadow-xl backdrop-blur-sm'
                          : 'border-white/20 bg-white/5 text-white/90 hover:border-white/30 hover:bg-white/10 backdrop-blur-sm'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`
                          w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold
                          ${selectedAnswer === index ? 'border-blue-400 bg-blue-400 text-white' : 'border-white/40 text-white/60'}
                        `}>
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="text-lg md:text-xl">{option}</span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </>
            )}

            {/* 認知スキル情報 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-400/20"
            >
              <h3 className="text-white font-semibold mb-2">この問題で測定される認知スキル:</h3>
              <div className="flex flex-wrap gap-2">
                {currentQuestion.cognitiveSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* 回答ボタン */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`
                  px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-300 transform
                  ${selectedAnswer !== null
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-2xl hover:scale-105'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                解答して解説を見る
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* フィードバック表示 */}
        <PracticeFeedback
          question={currentQuestion}
          userAnswer={selectedAnswer}
          isCorrect={isCorrect}
          onContinue={handleContinue}
          showFeedback={showFeedback}
        />
      </div>
    </div>
  );
}