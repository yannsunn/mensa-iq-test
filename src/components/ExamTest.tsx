'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ArrowLeft, ArrowRight, AlertTriangle, Trophy } from 'lucide-react';
import { DetailedQuestion, generateExamSet } from '@/data/internationalMensaQuestions';

interface ExamTestProps {
  onBack: () => void;
  onComplete: (result: ExamResult) => void;
}

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

export default function ExamTest({ onComplete }: ExamTestProps) {
  const [questions, setQuestions] = useState<DetailedQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45分
  const [startTime] = useState(Date.now());
  const [showWarning, setShowWarning] = useState(false);

  const calculatePercentile = (iq: number): number => {
    if (iq >= 160) return 99.99;
    if (iq >= 155) return 99.98;
    if (iq >= 150) return 99.96;
    if (iq >= 145) return 99.87;
    if (iq >= 140) return 99.62;
    if (iq >= 135) return 99.0;
    if (iq >= 130) return 98.0;
    if (iq >= 125) return 95.0;
    if (iq >= 120) return 91.0;
    if (iq >= 115) return 84.0;
    if (iq >= 110) return 75.0;
    if (iq >= 105) return 63.0;
    if (iq >= 100) return 50.0;
    if (iq >= 95) return 37.0;
    if (iq >= 90) return 25.0;
    if (iq >= 85) return 16.0;
    if (iq >= 80) return 9.0;
    return Math.max(1.0, (iq - 55) * 0.32);
  };

  const handleSubmitTest = useCallback(() => {
    const totalScore = answers.reduce((score: number, answer, index) => {
      return score + (answer !== null && answer === questions[index]?.correctAnswer ? 1 : 0);
    }, 0);

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    // カテゴリ別スコア計算
    const categoryScores: { [key: string]: { correct: number; total: number; percentage: number } } = {};
    const categories = ['logical', 'numerical', 'spatial', 'matrix', 'verbal', 'abstract', 'memory'];
    
    categories.forEach(category => {
      const categoryQuestions = questions.filter(q => q.category === category);
      const categoryCorrect = categoryQuestions.reduce((count, question) => {
        const questionIndex = questions.findIndex(q => q.id === question.id);
        return count + (answers[questionIndex] === question.correctAnswer ? 1 : 0);
      }, 0);
      
      categoryScores[category] = {
        correct: categoryCorrect,
        total: categoryQuestions.length,
        percentage: categoryQuestions.length > 0 ? (categoryCorrect / categoryQuestions.length) * 100 : 0
      };
    });

    // IQスコア計算（標準化）
    const percentageScore = (totalScore / questions.length) * 100;
    let iqScore: number;
    
    if (percentageScore >= 97) iqScore = Math.round(145 + (percentageScore - 97) * 2);
    else if (percentageScore >= 90) iqScore = Math.round(130 + (percentageScore - 90) * 2.14);
    else if (percentageScore >= 80) iqScore = Math.round(115 + (percentageScore - 80) * 1.5);
    else if (percentageScore >= 70) iqScore = Math.round(100 + (percentageScore - 70) * 1.5);
    else if (percentageScore >= 50) iqScore = Math.round(85 + (percentageScore - 50) * 0.75);
    else iqScore = Math.round(60 + percentageScore * 0.5);

    // パーセンタイル計算
    const percentile = calculatePercentile(iqScore);

    const result: ExamResult = {
      totalScore,
      totalQuestions: questions.length,
      iqScore,
      percentile,
      categoryScores,
      timeSpent,
      difficulty: 'standard',
      mensaQualified: iqScore >= 130
    };

    onComplete(result);
  }, [answers, questions, startTime, onComplete]);

  useEffect(() => {
    const examQuestions = generateExamSet();
    setQuestions(examQuestions);
    setAnswers(new Array(examQuestions.length).fill(null));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 && questions.length > 0) {
      handleSubmitTest();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleSubmitTest, questions.length])

  // 5分前警告
  useEffect(() => {
    if (timeLeft === 5 * 60 && !showWarning) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000);
    }
  }, [timeLeft, showWarning]);

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">問題を読み込み中...</div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Functions moved before useEffect above

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeLeft <= 5 * 60) return 'text-red-400';
    if (timeLeft <= 10 * 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getAnsweredCount = () => answers.filter(answer => answer !== null).length;

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-white text-xl">テスト準備中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 時間警告 */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500/90 border border-red-400 rounded-xl p-4 text-white shadow-2xl"
            >
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6" />
                <div>
                  <div className="font-bold">残り5分です！</div>
                  <div className="text-sm">未回答の問題を優先して進めてください</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-center mb-8 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
        >
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  MENSA 本番テスト
                </h1>
                <p className="text-white/60 text-sm">
                  問題 {currentQuestionIndex + 1} / {questions.length}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-white/60 text-xs">回答済み</div>
              <div className="text-white font-bold">
                {getAnsweredCount()} / {questions.length}
              </div>
            </div>
            <div className={`flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2 ${timeLeft <= 5 * 60 ? 'animate-pulse' : ''}`}>
              <Clock className={`w-5 h-5 ${getTimeColor()}`} />
              <span className={`font-mono text-lg font-bold ${getTimeColor()}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* プログレスバー */}
        <div className="mb-8">
          <div className="flex justify-between text-white/60 text-sm mb-2">
            <span>進捗</span>
            <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            />
          </div>
        </div>

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
              <span className="text-white/60 text-sm">
                出典: {currentQuestion.source}
              </span>
            </div>

            {/* 問題文 */}
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
              className="grid gap-4 md:gap-6"
            >
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`
                    p-6 md:p-8 text-left border-2 rounded-2xl transition-all duration-300
                    ${answers[currentQuestionIndex] === index
                      ? 'border-yellow-400 bg-yellow-400/20 text-white shadow-xl backdrop-blur-sm'
                      : 'border-white/20 bg-white/5 text-white/90 hover:border-white/30 hover:bg-white/10 backdrop-blur-sm'
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold
                      ${answers[currentQuestionIndex] === index ? 'border-yellow-400 bg-yellow-400 text-black' : 'border-white/40 text-white/60'}
                    `}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-lg md:text-xl">{option}</span>
                  </div>
                </button>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ナビゲーション */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10"
        >
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300
              ${currentQuestionIndex === 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20'
              }
            `}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>前の問題</span>
          </button>

          <div className="text-center">
            <button
              onClick={handleSubmitTest}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              テスト終了
            </button>
            <p className="text-white/60 text-xs mt-1">いつでも終了できます</p>
          </div>

          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300
              ${currentQuestionIndex === questions.length - 1
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
              }
            `}
          >
            <span>次の問題</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}