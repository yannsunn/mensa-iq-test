'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trophy } from 'lucide-react';
import { UnifiedQuestion, QUESTION_CATEGORIES } from '@/types/question';
import { formatTime, getTimeWarningLevel } from '@/hooks/useTimer';

interface TestLayoutProps {
  children: React.ReactNode;
  mode: 'practice' | 'exam';
  currentQuestion: UnifiedQuestion;
  currentIndex: number;
  totalQuestions: number;
  timeRemaining?: number;
  totalTime?: number;
  answeredCount?: number;
}

export default function TestLayout({
  children,
  mode,
  currentQuestion,
  currentIndex,
  totalQuestions,
  timeRemaining,
  totalTime,
  answeredCount = 0
}: TestLayoutProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const timeWarning = timeRemaining && totalTime 
    ? getTimeWarningLevel(timeRemaining, totalTime)
    : 'normal';

  const getCategoryInfo = () => {
    const category = QUESTION_CATEGORIES[currentQuestion.category as keyof typeof QUESTION_CATEGORIES];
    return category || { name: currentQuestion.category, icon: '❓', color: 'gray' };
  };

  const categoryInfo = getCategoryInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="max-w-6xl mx-auto">
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
                  {mode === 'practice' ? 'MENSA 練習モード' : 'MENSA 本番テスト'}
                </h1>
                <p className="text-white/60 text-sm">
                  問題 {currentIndex + 1} / {totalQuestions}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {mode === 'exam' && (
              <div className="text-center">
                <div className="text-white/60 text-xs">回答済み</div>
                <div className="text-white font-bold">
                  {answeredCount} / {totalQuestions}
                </div>
              </div>
            )}
            
            {timeRemaining !== undefined && (
              <div className={`
                flex items-center space-x-2 bg-white/10 rounded-lg px-4 py-2
                ${timeWarning === 'danger' ? 'animate-pulse' : ''}
              `}>
                <Clock className={`w-5 h-5 ${getTimeColorClass(timeWarning)}`} />
                <span className={`font-mono text-lg font-bold ${getTimeColorClass(timeWarning)}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* プログレスバー */}
        <div className="mb-8">
          <div className="flex justify-between text-white/60 text-sm mb-2">
            <span>進捗</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            />
          </div>
        </div>

        {/* 問題表示エリア */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 mb-8"
          >
            {/* 問題メタデータ */}
            <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white/5 rounded-xl">
              <span className={`px-3 py-1 bg-${categoryInfo.color}-500/20 text-${categoryInfo.color}-300 rounded-full text-sm flex items-center gap-1`}>
                <span>{categoryInfo.icon}</span>
                <span>{categoryInfo.name}</span>
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                難易度: {currentQuestion.difficulty}/20
              </span>
              {currentQuestion.mensaInfo && (
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                  {currentQuestion.mensaInfo.mensaLevel}
                </span>
              )}
              {timeRemaining !== undefined && totalTime && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  timeWarning === 'danger' 
                    ? 'bg-red-500/20 text-red-300 animate-pulse' 
                    : timeWarning === 'warning'
                    ? 'bg-yellow-500/20 text-yellow-300'
                    : 'bg-pink-500/20 text-pink-300'
                }`}>
                  残り時間: {formatTime(timeRemaining)}
                </span>
              )}
            </div>

            {/* 問題内容 */}
            {children}

            {/* 認知スキル情報（練習モードのみ） */}
            {mode === 'practice' && currentQuestion.mensaInfo?.cognitiveSkills && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-400/20"
              >
                <h3 className="text-white font-semibold mb-2">この問題で測定される認知スキル:</h3>
                <div className="flex flex-wrap gap-2">
                  {currentQuestion.mensaInfo.cognitiveSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function getTimeColorClass(level: 'normal' | 'warning' | 'danger'): string {
  switch (level) {
    case 'danger': return 'text-red-400';
    case 'warning': return 'text-yellow-400';
    default: return 'text-green-400';
  }
}