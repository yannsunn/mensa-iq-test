'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, Brain, ChevronRight, Timer, CheckCircle, Zap, Shield, Star, TrendingUp, Users, Award } from 'lucide-react';
import { Button, Card, Container, GlowText } from '@/components/ui';

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
    <div className="min-h-screen bg-gradient-radial flex flex-col relative" style={{ overflow: 'visible' }}>
      {/* 背景エフェクト */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-60 h-60 md:w-80 md:h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-60 h-60 md:w-80 md:h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* ヘッダーセクション */}
      <div className="relative z-10">
        <Container className="py-responsive-lg">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center">
            <div className="flex items-center justify-center mb-4 md:mb-6">
              <motion.div 
                className="bg-gradient-primary p-2 md:p-3 rounded-2xl mr-3 md:mr-4 shadow-glow"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </motion.div>
              <GlowText size="xl" variant="primary" className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight">
                MENSA IQ Test
              </GlowText>
            </div>
            <p className="text-sm md:text-base text-text-secondary font-medium">
              国際MENSA基準であなたのIQを測定
            </p>
            
            {/* 信頼性指標（ニューロマーケティング） */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-responsive-md mt-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card variant="glass" className="text-center p-responsive-sm" hover={false}>
                  <motion.div 
                    className="text-lg md:text-xl lg:text-2xl font-bold text-primary mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    {stats.total}
                  </motion.div>
                  <div className="text-sm md:text-base text-text-secondary flex items-center justify-center gap-1" style={{ lineHeight: '1.5' }}>
                    <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                    問題数
                  </div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="glass" className="text-center p-responsive-sm" hover={false}>
                  <motion.div 
                    className="text-lg md:text-xl lg:text-2xl font-bold text-accent mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    {stats.avgIQ}+
                  </motion.div>
                  <div className="text-sm md:text-base text-text-secondary flex items-center justify-center gap-1" style={{ lineHeight: '1.5' }}>
                    <Brain className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                    平均IQ
                  </div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card variant="glass" className="text-center p-responsive-sm" hover={false}>
                  <motion.div 
                    className="text-lg md:text-xl lg:text-2xl font-bold text-warning mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  >
                    {stats.successRate}%
                  </motion.div>
                  <div className="text-sm md:text-base text-text-secondary flex items-center justify-center gap-1" style={{ lineHeight: '1.5' }}>
                    <Star className="w-3 h-3 md:w-4 md:h-4 text-warning" />
                    満足度
                  </div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card variant="glass" className="text-center p-responsive-sm" hover={false}>
                  <motion.div 
                    className="text-lg md:text-xl lg:text-2xl font-bold text-purple-400 mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    {stats.users}
                  </motion.div>
                  <div className="text-sm md:text-base text-text-secondary flex items-center justify-center gap-1" style={{ lineHeight: '1.5' }}>
                    <Users className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
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
        <Container className="pt-8 pb-responsive-lg">
          <div className="grid md:grid-cols-2 gap-responsive-lg">
            {/* 練習モード */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMode('practice')}
              className="w-full cursor-pointer"
            >
              <Card
                variant={selectedMode === 'practice' ? 'gradient' : 'glass'}
                active={selectedMode === 'practice'}
                className="relative cursor-pointer p-responsive-lg min-h-[280px] md:min-h-[320px]"
                glow={selectedMode === 'practice'}
                style={{ overflow: 'visible', position: 'relative', paddingTop: '2rem' }}
              >
                {/* 推奨ラベル - レスポンシブ完全対応版 */}
                <div className="absolute left-4 md:left-6 -top-3 z-40">
                  <div className="inline-flex items-center gap-1 px-3 md:px-4 lg:px-5 py-1.5 md:py-2 lg:py-2.5 text-sm md:text-base lg:text-lg font-bold text-white bg-gradient-to-r from-accent/90 to-accent-light/90 rounded-full shadow-glow-accent border-2 border-white/30 whitespace-nowrap backdrop-blur-sm" style={{ lineHeight: '1.5' }}>
                    <Star className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                    推奨
                  </div>
                </div>
              
                <div className="mb-4 md:mb-6">
                  <div className="flex items-center mb-3">
                    <div className="p-3 bg-primary/20 rounded-xl mr-3 backdrop-blur-sm">
                      <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-base md:text-lg lg:text-xl font-bold text-text-primary" style={{ lineHeight: '1.5' }}>練習モード</h2>
                      <p className="text-sm md:text-base text-text-secondary" style={{ lineHeight: '1.5' }}>初めての方におすすめ</p>
                    </div>
                  </div>
                </div>
              
                <div className="space-y-3 mb-4 md:mb-6">
                  {practiceFeatures.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`p-2 md:p-1.5 rounded-lg mr-3 backdrop-blur-sm ${
                        feature.highlight ? 'bg-primary/20' : 'bg-white/5'
                      }`}>
                        <feature.icon className={`w-4 h-4 md:w-5 md:h-5 ${
                          feature.highlight ? 'text-primary' : 'text-text-secondary'
                        }`} />
                      </div>
                      <span className={`text-sm md:text-base ${
                        feature.highlight ? 'text-text-primary font-medium' : 'text-text-secondary'
                      }`} style={{ lineHeight: '1.5' }}>{feature.text}</span>
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
                      className="border-t border-border-default pt-3 md:pt-4"
                    >
                      <p className="text-sm md:text-base font-medium text-text-secondary mb-4" style={{ lineHeight: '1.5' }}>難易度を選択</p>
                      <div className="grid grid-cols-3 gap-responsive-sm">
                        {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
                          <Button
                            key={difficulty}
                            variant={selectedDifficulty === difficulty ? 'primary' : 'secondary'}
                            size="md"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDifficulty(difficulty);
                            }}
                            className="w-full"
                            style={{ minHeight: 'var(--min-touch-target)' }}
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
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMode('exam')}
              className="w-full cursor-pointer"
            >
              <Card
                variant={selectedMode === 'exam' ? 'gradient' : 'glass'}
                active={selectedMode === 'exam'}
                className="relative cursor-pointer p-responsive-lg min-h-[280px] md:min-h-[320px]"
                glow={selectedMode === 'exam'}
              >
                <div className="mb-4 md:mb-6">
                  <div className="flex items-center mb-3">
                    <div className="p-3 bg-warning/20 rounded-xl mr-3 backdrop-blur-sm">
                      <Trophy className="w-5 h-5 md:w-6 md:h-6 text-warning" />
                    </div>
                    <div>
                      <h2 className="text-base md:text-lg lg:text-xl font-bold text-text-primary" style={{ lineHeight: '1.5' }}>本番モード</h2>
                      <p className="text-sm md:text-base text-text-secondary" style={{ lineHeight: '1.5' }}>正式なIQスコアを測定</p>
                    </div>
                  </div>
                </div>
              
                <div className="space-y-3 mb-4 md:mb-6">
                  {examFeatures.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className={`p-2 md:p-1.5 rounded-lg mr-3 backdrop-blur-sm ${
                        feature.highlight ? 'bg-warning/20' : 'bg-white/5'
                      }`}>
                        <feature.icon className={`w-4 h-4 md:w-5 md:h-5 ${
                          feature.highlight ? 'text-warning' : 'text-text-secondary'
                        }`} />
                      </div>
                      <span className={`text-sm md:text-base ${
                        feature.highlight ? 'text-text-primary font-medium' : 'text-text-secondary'
                      }`} style={{ lineHeight: '1.5' }}>{feature.text}</span>
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
                      className="border-t border-border-default pt-3 md:pt-4"
                    >
                      <Card variant="solid" className="p-responsive-sm" hover={false}>
                        <div className="flex items-center text-warning mb-1">
                          <Timer className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                          <span className="text-base md:text-lg font-medium">制限時間: 45分</span>
                        </div>
                        <p className="text-text-secondary text-base md:text-lg">
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
                className="mt-8 md:mt-12 text-center"
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
                  className="text-base md:text-lg px-responsive-xl py-responsive-md"
                  style={{ minHeight: 'var(--min-touch-target)' }}
                >
                  {selectedMode === 'practice' 
                    ? `練習開始（${selectedDifficulty === 'easy' ? '初級' : selectedDifficulty === 'medium' ? '中級' : '上級'}）` 
                    : 'テスト開始'
                  }
                </Button>
                
                {/* 信頼性メッセージ */}
                <motion.p 
                  className="mt-4 text-base md:text-lg text-text-secondary flex items-center justify-center gap-2"
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