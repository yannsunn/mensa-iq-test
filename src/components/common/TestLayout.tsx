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
    <div className="min-h-screen bg-gradient-radial relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Container className="relative z-elevated py-6">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card variant="glass" className="mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <motion.div 
                  className="p-3 bg-gradient-primary rounded-xl shadow-glow"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <GlowText size="xl" variant={mode === 'practice' ? 'primary' : 'accent'} className="text-2xl font-bold">
                    {mode === 'practice' ? 'MENSA 練習モード' : 'MENSA 本番テスト'}
                  </GlowText>
                  <p className="text-text-secondary text-sm mt-1">
                    問題 {currentIndex + 1} / {totalQuestions}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                {mode === 'exam' && (
                  <Card variant="solid" className="card-compact" hover={false}>
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-accent" />
                      <div>
                        <div className="text-text-tertiary text-xs">回答済み</div>
                        <div className="text-text-primary font-bold">
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
                    <div className="flex items-center space-x-2">
                      <Clock className={`w-5 h-5 ${getTimeColorClass(timeWarning)}`} />
                      <span className={`font-mono text-lg font-bold ${getTimeColorClass(timeWarning)}`}>
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
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-text-secondary text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
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
            <Card variant="glass" className="p-8 mb-8" glow>
              {/* 問題メタデータ */}
              <Card variant="solid" className="mb-6 card-compact" hover={false}>
                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <Badge variant="primary">
                    <span className="mr-1">{categoryInfo.icon}</span>
                    {categoryInfo.name}
                  </Badge>
                  <Badge variant="accent">
                    難易度: {currentQuestion.difficulty}/20
                  </Badge>
                  {currentQuestion.mensaInfo && (
                    <Badge variant="default">
                      {currentQuestion.mensaInfo.mensaLevel}
                    </Badge>
                  )}
                  {timeRemaining !== undefined && totalTime && (
                    <Badge 
                      variant={timeWarning === 'danger' ? 'danger' : timeWarning === 'warning' ? 'warning' : 'success'}
                      className={timeWarning === 'danger' ? 'animate-pulse' : ''}
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
                  <Card variant="gradient" className="mt-6 p-4 border-primary/20" hover={false}>
                    <h3 className="text-text-primary font-semibold mb-3 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-primary" />
                      この問題で測定される認知スキル
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentQuestion.mensaInfo.cognitiveSkills.map((skill, index) => (
                        <Badge key={index} variant="primary" size="sm">
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
}

function getTimeColorClass(level: 'normal' | 'warning' | 'danger'): string {
  switch (level) {
    case 'danger': return 'text-danger';
    case 'warning': return 'text-warning';
    default: return 'text-success';
  }
}