'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, Brain, Zap, Clock, Target, Star, Globe } from 'lucide-react';

interface ModeSelectionProps {
  onSelectMode: (mode: 'practice' | 'exam', difficulty?: 'easy' | 'medium' | 'hard') => void;
}

export default function ModeSelection({ onSelectMode }: ModeSelectionProps) {
  const [selectedMode, setSelectedMode] = useState<'practice' | 'exam' | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const practiceFeatures = [
    '一問一答形式で即座にフィードバック',
    '詳細な解説とよくある間違い',
    '関連概念と学習ポイント',
    '段階的な難易度調整',
    '認知スキル別の分析',
    '国際MENSA基準準拠'
  ];

  const examFeatures = [
    '本番と同じ35問構成',
    '制限時間内での集中テスト',
    '最終結果のみ表示',
    '正式なIQスコア算出',
    '世界標準MENSA基準',
    'パーセンタイル表示'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Brain className="w-12 h-12 text-blue-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              MENSA IQ Test
            </h1>
            <Globe className="w-12 h-12 text-purple-400 ml-4" />
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            国際MENSA基準準拠の本格的知能テスト<br />
            世界各国のMENSA問題形式を網羅した最高水準の評価システム
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* 練習モード */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative overflow-hidden rounded-3xl p-8 cursor-pointer transition-all duration-300 ${
              selectedMode === 'practice'
                ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border-2 border-blue-400 shadow-2xl scale-105'
                : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15'
            }`}
            onClick={() => setSelectedMode('practice')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <BookOpen className="w-8 h-8 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">練習モード</h2>
                <Zap className="w-6 h-6 text-yellow-400 ml-2" />
              </div>
              
              <p className="text-white/80 mb-6">
                学習重視の段階的訓練システム。一問ごとに詳細な解説付き。
              </p>
              
              <div className="space-y-3 mb-6">
                {practiceFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center text-white/90">
                    <Star className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {selectedMode === 'practice' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-white/20 pt-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">難易度選択</h3>
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
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'bg-white/10 text-white/80 hover:bg-white/20'
                        }`}
                      >
                        {difficulty === 'easy' ? '初級' : difficulty === 'medium' ? '中級' : '上級'}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* 本番モード */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`relative overflow-hidden rounded-3xl p-8 cursor-pointer transition-all duration-300 ${
              selectedMode === 'exam'
                ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-400 shadow-2xl scale-105'
                : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15'
            }`}
            onClick={() => setSelectedMode('exam')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <Trophy className="w-8 h-8 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">本番モード</h2>
                <Target className="w-6 h-6 text-red-400 ml-2" />
              </div>
              
              <p className="text-white/80 mb-6">
                実際のMENSAテスト環境を再現。正式なIQスコア評価。
              </p>
              
              <div className="space-y-3 mb-6">
                {examFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center text-white/90">
                    <Star className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {selectedMode === 'exam' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-white/20 pt-6"
                >
                  <div className="flex items-center text-yellow-400 mb-2">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="font-semibold">制限時間: 45分</span>
                  </div>
                  <p className="text-white/70 text-sm">
                    一度開始すると途中での解説表示はありません。
                    集中できる環境で挑戦してください。
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* 開始ボタン */}
        {selectedMode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <button
              onClick={() => {
                if (selectedMode === 'practice') {
                  onSelectMode('practice', selectedDifficulty);
                } else {
                  onSelectMode('exam');
                }
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-12 rounded-2xl text-xl shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {selectedMode === 'practice' 
                ? `練習開始 (${selectedDifficulty === 'easy' ? '初級' : selectedDifficulty === 'medium' ? '中級' : '上級'})` 
                : '本番テスト開始'
              }
            </button>
            
            <p className="text-white/60 mt-4 text-sm">
              {selectedMode === 'practice' 
                ? '学習効果を最大化する段階的トレーニング'
                : '国際MENSA基準による正式な知能評価'
              }
            </p>
          </motion.div>
        )}

        {/* 統計情報 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-blue-400">35</div>
            <div className="text-white/70 text-sm">総問題数</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-purple-400">7</div>
            <div className="text-white/70 text-sm">認知領域</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-pink-400">8</div>
            <div className="text-white/70 text-sm">対応国</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-yellow-400">130+</div>
            <div className="text-white/70 text-sm">MENSA基準</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}