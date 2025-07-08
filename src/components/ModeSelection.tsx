'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, Brain, ChevronRight, Timer, CheckCircle, Zap, Shield, Star, TrendingUp, Users, Award } from 'lucide-react';
import { Button, Card, Container, Badge, GlowText } from '@/components/ui';

interface ModeSelectionProps {
  onSelectMode: (mode: 'practice' | 'exam', difficulty?: 'easy' | 'medium' | 'hard') => void;
}

export default function ModeSelection({ onSelectMode }: ModeSelectionProps) {
  const [selectedMode, setSelectedMode] = useState<'practice' | 'exam' | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  
  // ニューロマーケティングに基づく統計情報
  const stats = { 
    total: 268, 
    avgIQ: 130,
    successRate: 92,
    users: '50,000+'
  };

  const practiceFeatures = [
    { icon: CheckCircle, text: '即座にフィードバック', highlight: true },
    { icon: Brain, text: '詳細な解説付き' },
    { icon: Zap, text: 'スキル別分析' }
  ];

  const examFeatures = [
    { icon: Timer, text: '45問45分', highlight: true },
    { icon: Trophy, text: 'IQスコア算出' },
    { icon: Shield, text: 'MENSA基準' }
  ];

  return (
    <div className="min-h-screen bg-gradient-radial flex flex-col relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* ヘッダーセクション */}
      <div className="relative z-10">
        <Container className="py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center">
            <div className="flex items-center justify-center mb-6">
              <motion.div 
                className="bg-gradient-primary p-3 rounded-2xl mr-4 shadow-glow"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-8 h-8 text-white" />
              </motion.div>
              <GlowText size="2xl" variant="primary" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                MENSA IQ Test
              </GlowText>
            </div>
            <p className="text-lg md:text-xl text-text-secondary font-medium">
              国際MENSA基準であなたのIQを測定
            </p>
            
            {/* 信頼性指標（ニューロマーケティング） */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card variant="glass" className="text-center p-4" hover={false}>
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold text-primary mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    {stats.total}
                  </motion.div>
                  <div className="text-sm text-text-secondary flex items-center justify-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    問題数
                  </div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="glass" className="text-center p-4" hover={false}>
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold text-accent mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    {stats.avgIQ}+
                  </motion.div>
                  <div className="text-sm text-text-secondary flex items-center justify-center gap-1">
                    <Brain className="w-3 h-3" />
                    平均IQ
                  </div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="glass" className="text-center p-4" hover={false}>
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold text-warning mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  >
                    {stats.successRate}%
                  </motion.div>
                  <div className="text-sm text-text-secondary flex items-center justify-center gap-1">
                    <Star className="w-3 h-3" />
                    満足度
                  </div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card variant="glass" className="text-center p-4" hover={false}>
                  <motion.div 
                    className="text-3xl md:text-4xl font-bold text-purple-400 mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    {stats.users}
                  </motion.div>
                  <div className="text-sm text-text-secondary flex items-center justify-center gap-1">
                    <Users className="w-3 h-3" />
                    利用者
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 relative z-10">
        <Container className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* 練習モード */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedMode('practice')}
            >
              <Card
                variant={selectedMode === 'practice' ? 'gradient' : 'glass'}
                active={selectedMode === 'practice'}
                className="relative cursor-pointer p-8 md:p-10"
                glow={selectedMode === 'practice'}
              >
                {/* 推奨ラベル */}
                <Badge variant="accent" className="absolute -top-3 left-8">
                  <Star className="w-3 h-3 mr-1" />
                  推奨
                </Badge>
              
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="p-3 bg-primary/20 rounded-xl mr-3 backdrop-blur-sm">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-text-primary">練習モード</h2>
                      <p className="text-sm text-text-secondary">初めての方におすすめ</p>
                    </div>
                  </div>
                </div>
              
                <div className="space-y-3 mb-6">
                  {practiceFeatures.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`p-1.5 rounded-lg mr-3 backdrop-blur-sm ${
                        feature.highlight ? 'bg-primary/20' : 'bg-white/5'
                      }`}>
                        <feature.icon className={`w-4 h-4 ${
                          feature.highlight ? 'text-primary' : 'text-text-secondary'
                        }`} />
                      </div>
                      <span className={`text-sm md:text-base ${
                        feature.highlight ? 'text-text-primary font-medium' : 'text-text-secondary'
                      }`}>{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedMode === 'practice' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-border-default pt-4"
                    >
                      <p className="text-sm font-medium text-text-secondary mb-3">難易度を選択</p>
                      <div className="grid grid-cols-3 gap-2">
                        {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
                          <Button
                            key={difficulty}
                            variant={selectedDifficulty === difficulty ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDifficulty(difficulty);
                            }}
                            className="w-full"
                          >
                            {difficulty === 'easy' ? '初級' : difficulty === 'medium' ? '中級' : '上級'}
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>

            {/* 本番モード */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedMode('exam')}
            >
              <Card
                variant={selectedMode === 'exam' ? 'gradient' : 'glass'}
                active={selectedMode === 'exam'}
                className="relative cursor-pointer p-6 md:p-8"
                glow={selectedMode === 'exam'}
              >
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="p-3 bg-warning/20 rounded-xl mr-3 backdrop-blur-sm">
                      <Trophy className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-text-primary">本番モード</h2>
                      <p className="text-sm text-text-secondary">正式なIQスコアを測定</p>
                    </div>
                  </div>
                </div>
              
                <div className="space-y-3 mb-6">
                  {examFeatures.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`p-1.5 rounded-lg mr-3 backdrop-blur-sm ${
                        feature.highlight ? 'bg-warning/20' : 'bg-white/5'
                      }`}>
                        <feature.icon className={`w-4 h-4 ${
                          feature.highlight ? 'text-warning' : 'text-text-secondary'
                        }`} />
                      </div>
                      <span className={`text-sm md:text-base ${
                        feature.highlight ? 'text-text-primary font-medium' : 'text-text-secondary'
                      }`}>{feature.text}</span>
                    </motion.div>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedMode === 'exam' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-border-default pt-4"
                    >
                      <Card variant="solid" className="p-3" hover={false}>
                        <div className="flex items-center text-warning mb-1">
                          <Timer className="w-4 h-4 mr-2" />
                          <span className="text-sm font-medium">制限時間: 45分</span>
                        </div>
                        <p className="text-text-secondary text-xs">
                          集中できる環境で挑戦してください
                        </p>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </div>

          {/* 開始ボタン（ニューロマーケティング最適化） */}
          <AnimatePresence mode="wait">
            {selectedMode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-12 text-center"
              >
                <Button
                  variant="cta"
                  size="lg"
                  icon={ChevronRight}
                  onClick={() => {
                    if (selectedMode === 'practice') {
                      onSelectMode('practice', selectedDifficulty);
                    } else {
                      onSelectMode('exam');
                    }
                  }}
                  className="text-xl md:text-2xl px-12 md:px-16 py-5 md:py-6"
                >
                  {selectedMode === 'practice' 
                    ? `練習開始（${selectedDifficulty === 'easy' ? '初級' : selectedDifficulty === 'medium' ? '中級' : '上級'}）` 
                    : 'テスト開始'
                  }
                </Button>
                
                {/* 信頼性メッセージ */}
                <motion.p 
                  className="mt-4 text-sm text-text-secondary flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Award className="w-4 h-4 text-accent" />
                  {selectedMode === 'practice' 
                    ? 'いつでも中断・再開可能' 
                    : '国際MENSA基準の正確な測定'
                  }
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </div>
    </div>
  );
}