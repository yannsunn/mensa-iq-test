'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Brain, Activity, Target } from 'lucide-react';
import { UnifiedQuestion, QUESTION_CATEGORIES } from '@/types/question';
import { formatTime, getTimeWarningLevel } from '@/hooks/useTimer';
import { Card, Badge, Progress, GlowText, Container } from '@/components/ui';

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

const TestLayout = React.memo(function TestLayout({
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
    <div className="min-h-screen bg-gradient-radial relative overflow-hidden">
      {/* 背景エフェクト - パフォーマンス最適化済み */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-primary/10 rounded-full blur-2xl sm:blur-3xl opacity-30 sm:opacity-50" 
          style={{ transform: 'translateZ(0)' }} 
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-accent/10 rounded-full blur-2xl sm:blur-3xl opacity-30 sm:opacity-50" 
          style={{ transform: 'translateZ(0)' }} 
        />
      </div>

      <Container className="relative z-elevated py-4 sm:py-6">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card variant="glass" className="mb-4 sm:mb-6 lg:mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 lg:gap-6">
              <div className="flex items-center space-x-2 sm:space-x-4 w-full lg:w-auto">
                <motion.div 
                  className="p-2 sm:p-3 bg-gradient-primary rounded-xl shadow-glow flex-shrink-0"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <GlowText size="xl" variant={mode === 'practice' ? 'primary' : 'accent'} className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
                    {mode === 'practice' ? 'MENSA 練習モード' : 'MENSA 本番テスト'}
                  </GlowText>
                  <p className="text-text-secondary text-xs sm:text-sm mt-0.5 sm:mt-1">
                    問題 {currentIndex + 1} / {totalQuestions}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 w-full lg:w-auto justify-end">
                {mode === 'exam' && (
                  <Card variant="solid" className="card-compact" hover={false}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Target className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                      <div>
                        <div className="text-text-tertiary text-xs">回答済み</div>
                        <div className="text-text-primary font-bold text-sm sm:text-base">
                          {answeredCount} / {totalQuestions}
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
                
                {timeRemaining !== undefined && (
                  <Card 
                    variant="solid" 
                    className={`card-compact ${timeWarning === 'danger' ? 'border-danger animate-pulse' : ''}`}
                    hover={false}
                  >
                    <div className="flex items-center space-x-1.5 sm:space-x-2">
                      <Clock className={`w-4 h-4 sm:w-5 sm:h-5 ${getTimeColorClass(timeWarning)}`} />
                      <span className={`font-mono text-base sm:text-lg font-bold ${getTimeColorClass(timeWarning)}`}>
                        {formatTime(timeRemaining)}
                      </span>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* プログレスバー */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-4 sm:mb-6 lg:mb-8"
        >
          <div className="flex justify-between items-center mb-1.5 sm:mb-2">
            <span className="text-text-secondary text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
              <Activity className="w-3 h-3 sm:w-4 sm:h-4" />
              進捗状況
            </span>
            <Badge variant="primary" size="sm">
              {Math.round(progress)}%
            </Badge>
          </div>
          <Progress value={progress} variant="primary" size="lg" />
        </motion.div>

        {/* 問題表示エリア */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card variant="glass" className="p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 lg:mb-8" glow>
              {/* 問題メタデータ */}
              <Card variant="solid" className="mb-4 sm:mb-6 card-compact" hover={false}>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3">
                  <Badge variant="primary" size="sm" className="text-xs sm:text-sm">
                    <span className="mr-0.5 sm:mr-1">{categoryInfo.icon}</span>
                    {categoryInfo.name}
                  </Badge>
                  <Badge variant="accent" size="sm" className="text-xs sm:text-sm">
                    難易度: {currentQuestion.difficulty}/20
                  </Badge>
                  {currentQuestion.mensaInfo && (
                    <Badge variant="default" size="sm" className="text-xs sm:text-sm">
                      {currentQuestion.mensaInfo.mensaLevel}
                    </Badge>
                  )}
                  {timeRemaining !== undefined && totalTime && (
                    <Badge 
                      variant={timeWarning === 'danger' ? 'danger' : timeWarning === 'warning' ? 'warning' : 'success'}
                      className={`${timeWarning === 'danger' ? 'animate-pulse' : ''} text-xs sm:text-sm`}
                      size="sm"
                    >
                      残り時間: {formatTime(timeRemaining)}
                    </Badge>
                  )}
                </div>
              </Card>

              {/* 問題内容 */}
              <div className="relative">
                {children}
              </div>

              {/* 認知スキル情報（練習モードのみ） */}
              {mode === 'practice' && currentQuestion.mensaInfo?.cognitiveSkills && Array.isArray(currentQuestion.mensaInfo.cognitiveSkills) && currentQuestion.mensaInfo.cognitiveSkills.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card variant="gradient" className="mt-4 sm:mt-6 p-3 sm:p-4 border-primary/20" hover={false}>
                    <h3 className="text-text-primary font-semibold mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                      <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      この問題で測定される認知スキル
                    </h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {currentQuestion.mensaInfo.cognitiveSkills.map((skill, index) => (
                        <Badge key={index} variant="primary" size="sm" className="text-xs sm:text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
});

export default TestLayout;

function getTimeColorClass(level: 'normal' | 'warning' | 'danger'): string {
  switch (level) {
    case 'danger': return 'text-danger';
    case 'warning': return 'text-warning';
    default: return 'text-success';
  }
}