'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, Brain, ChevronRight, Timer, CheckCircle, Zap, Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-white flex flex-col">
      {/* ヘッダーセクション */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                MENSA IQ Test
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 font-medium">
              国際MENSA基準であなたのIQを測定
            </p>
            
            {/* 信頼性指標（ニューロマーケティング） */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stats.total}</div>
                <div className="text-sm text-gray-600">問題数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stats.avgIQ}+</div>
                <div className="text-sm text-gray-600">平均IQ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stats.successRate}%</div>
                <div className="text-sm text-gray-600">満足度</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stats.users}</div>
                <div className="text-sm text-gray-600">利用者</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* 練習モード */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative bg-white rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-200 ${
                selectedMode === 'practice'
                  ? 'ring-2 ring-blue-600 shadow-lg'
                  : 'border-2 border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedMode('practice')}
            >
              {/* 推奨ラベル */}
              <div className="absolute -top-3 left-6 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                推奨
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="p-3 bg-blue-100 rounded-xl mr-3">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">練習モード</h2>
                    <p className="text-sm text-gray-600">初めての方におすすめ</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {practiceFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`p-1.5 rounded-lg mr-3 ${
                      feature.highlight ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      <feature.icon className={`w-4 h-4 ${
                        feature.highlight ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <span className={`text-sm md:text-base ${
                      feature.highlight ? 'text-gray-900 font-medium' : 'text-gray-700'
                    }`}>{feature.text}</span>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {selectedMode === 'practice' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-200 pt-4"
                  >
                    <p className="text-sm font-medium text-gray-700 mb-3">難易度を選択</p>
                    <div className="grid grid-cols-3 gap-2">
                      {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
                        <button
                          key={difficulty}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDifficulty(difficulty);
                          }}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                            selectedDifficulty === difficulty
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {difficulty === 'easy' ? '初級' : difficulty === 'medium' ? '中級' : '上級'}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* 本番モード */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={`relative bg-white rounded-2xl p-6 md:p-8 cursor-pointer transition-all duration-200 ${
                selectedMode === 'exam'
                  ? 'ring-2 ring-blue-600 shadow-lg'
                  : 'border-2 border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => setSelectedMode('exam')}
            >
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="p-3 bg-amber-100 rounded-xl mr-3">
                    <Trophy className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">本番モード</h2>
                    <p className="text-sm text-gray-600">正式なIQスコアを測定</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {examFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`p-1.5 rounded-lg mr-3 ${
                      feature.highlight ? 'bg-amber-100' : 'bg-gray-100'
                    }`}>
                      <feature.icon className={`w-4 h-4 ${
                        feature.highlight ? 'text-amber-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <span className={`text-sm md:text-base ${
                      feature.highlight ? 'text-gray-900 font-medium' : 'text-gray-700'
                    }`}>{feature.text}</span>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {selectedMode === 'exam' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-200 pt-4"
                  >
                    <div className="bg-amber-50 rounded-lg p-3">
                      <div className="flex items-center text-amber-700 mb-1">
                        <Timer className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">制限時間: 45分</span>
                      </div>
                      <p className="text-amber-600 text-xs">
                        集中できる環境で挑戦してください
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
                className="mt-8 text-center"
              >
                <button
                  onClick={() => {
                    if (selectedMode === 'practice') {
                      onSelectMode('practice', selectedDifficulty);
                    } else {
                      onSelectMode('exam');
                    }
                  }}
                  className={`group relative inline-flex items-center justify-center px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold text-white rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-100 ${
                    selectedMode === 'practice'
                      ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25'
                      : 'bg-gray-900 hover:bg-gray-800 shadow-lg shadow-gray-900/25'
                  }`}
                >
                  <span className="relative z-10 flex items-center">
                    {selectedMode === 'practice' 
                      ? `練習開始（${selectedDifficulty === 'easy' ? '初級' : selectedDifficulty === 'medium' ? '中級' : '上級'}）` 
                      : 'テスト開始'
                    }
                    <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  
                  {/* パルスアニメーション（CTA強化） */}
                  <span className="absolute inset-0 rounded-2xl bg-white opacity-25 animate-pulse" />
                </button>
                
                {/* 信頼性メッセージ */}
                <p className="mt-4 text-sm text-gray-600">
                  {selectedMode === 'practice' 
                    ? '✓ いつでも中断・再開可能' 
                    : '✓ 国際MENSA基準の正確な測定'
                  }
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}