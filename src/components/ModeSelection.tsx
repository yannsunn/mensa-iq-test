'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Trophy, Brain, Sparkles, Timer, Target, CheckCircle, Globe, BarChart3, Award } from 'lucide-react';
import { getQuestionsStatistics } from '@/data/unifiedQuestions';

interface ModeSelectionProps {
  onSelectMode: (mode: 'practice' | 'exam', difficulty?: 'easy' | 'medium' | 'hard') => void;
}

export default function ModeSelection({ onSelectMode }: ModeSelectionProps) {
  const [selectedMode, setSelectedMode] = useState<'practice' | 'exam' | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [stats, setStats] = useState<{ total: number; byCategory: Record<string, number> }>({ total: 0, byCategory: {} });

  useEffect(() => {
    const statistics = getQuestionsStatistics();
    setStats(statistics);
  }, []);

  const practiceFeatures = [
    { icon: CheckCircle, text: '一問一答形式で即座にフィードバック' },
    { icon: BookOpen, text: '詳細な解説とよくある間違い' },
    { icon: Brain, text: '関連概念と学習ポイント' },
    { icon: BarChart3, text: '段階的な難易度調整' },
    { icon: Target, text: '認知スキル別の分析' },
    { icon: Award, text: '国際MENSA基準準拠' }
  ];

  const examFeatures = [
    { icon: Timer, text: '本番と同じ45問構成' },
    { icon: Target, text: '制限時間内での集中テスト' },
    { icon: Trophy, text: '最終結果のみ表示' },
    { icon: Brain, text: '正式なIQスコア算出' },
    { icon: Globe, text: '世界標準MENSA基準' },
    { icon: BarChart3, text: 'パーセンタイル表示' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <Brain className="w-10 h-10 text-cyan-400 mr-3" />
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              MENSA IQ Test
            </h1>
            <motion.div
              initial={{ rotate: 180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
            >
              <Sparkles className="w-8 h-8 text-violet-400 ml-3" />
            </motion.div>
          </div>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            国際MENSA基準準拠の知能テスト
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* 練習モード */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
              selectedMode === 'practice'
                ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
            }`}
            onClick={() => setSelectedMode('practice')}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-cyan-500/10 rounded-lg mr-3">
                    <BookOpen className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">練習モード</h2>
                </div>
                {selectedMode === 'practice' && (
                  <CheckCircle className="w-5 h-5 text-cyan-400" />
                )}
              </div>
              
              <p className="text-slate-400 text-sm mb-4">
                段階的な学習システム
              </p>
              
              <div className="space-y-2">
                {practiceFeatures.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center text-slate-300">
                    <feature.icon className="w-4 h-4 text-cyan-400 mr-2 flex-shrink-0" />
                    <span className="text-xs">{feature.text}</span>
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
                    className="mt-4 pt-4 border-t border-slate-700"
                  >
                    <p className="text-xs text-slate-400 mb-3">難易度選択</p>
                    <div className="flex gap-2">
                      {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
                        <button
                          key={difficulty}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDifficulty(difficulty);
                          }}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition-all ${
                            selectedDifficulty === difficulty
                              ? 'bg-cyan-500 text-white'
                              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          }`}
                        >
                          {difficulty === 'easy' ? '初級' : difficulty === 'medium' ? '中級' : '上級'}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 本番モード */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
              selectedMode === 'exam'
                ? 'bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/50 shadow-lg shadow-violet-500/20'
                : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
            }`}
            onClick={() => setSelectedMode('exam')}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-2 bg-violet-500/10 rounded-lg mr-3">
                    <Trophy className="w-6 h-6 text-violet-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-white">本番モード</h2>
                </div>
                {selectedMode === 'exam' && (
                  <CheckCircle className="w-5 h-5 text-violet-400" />
                )}
              </div>
              
              <p className="text-slate-400 text-sm mb-4">
                MENSA公式テスト形式
              </p>
              
              <div className="space-y-2">
                {examFeatures.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center text-slate-300">
                    <feature.icon className="w-4 h-4 text-violet-400 mr-2 flex-shrink-0" />
                    <span className="text-xs">{feature.text}</span>
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
                    className="mt-4 pt-4 border-t border-slate-700"
                  >
                    <div className="flex items-center text-amber-400 mb-2">
                      <Timer className="w-4 h-4 mr-2" />
                      <span className="text-xs font-medium">制限時間: 45分</span>
                    </div>
                    <p className="text-slate-400 text-xs">
                      集中できる環境で挑戦してください
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* 開始ボタン */}
        <AnimatePresence mode="wait">
          {selectedMode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
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
                className={`relative px-8 py-3 rounded-xl font-medium text-white transition-all duration-200 transform hover:scale-105 ${
                  selectedMode === 'practice'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/25'
                    : 'bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 shadow-lg shadow-violet-500/25'
                }`}
              >
                <span className="relative z-10">
                  {selectedMode === 'practice' 
                    ? `練習開始（${selectedDifficulty === 'easy' ? '初級' : selectedDifficulty === 'medium' ? '中級' : '上級'}）` 
                    : 'テスト開始'
                  }
                </span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 統計情報 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-cyan-400">{stats.total}</div>
            <div className="text-slate-400 text-sm mt-1">総問題数</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-violet-400">{Object.keys(stats.byCategory).length}</div>
            <div className="text-slate-400 text-sm mt-1">認知領域</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-emerald-400">8</div>
            <div className="text-slate-400 text-sm mt-1">対応国</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <div className="text-2xl font-bold text-amber-400">130+</div>
            <div className="text-slate-400 text-sm mt-1">MENSA基準</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}