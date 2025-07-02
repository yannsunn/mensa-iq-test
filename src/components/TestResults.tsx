'use client';

import { motion } from 'framer-motion';
import { Trophy, Target, Clock, BarChart3, RefreshCw, Download } from 'lucide-react';
import { TestResult } from '@/types';

interface TestResultsProps {
  result: TestResult;
  onRetakeTest: () => void;
}

export default function TestResults({ result, onRetakeTest }: TestResultsProps) {
  const getMensaStatus = () => {
    if (result.iqScore >= 130) {
      return {
        status: 'MENSA適格',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        message: 'おめでとうございます！MENSAの入会基準を満たしています。',
      };
    } else if (result.iqScore >= 120) {
      return {
        status: '高知能',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        message: '非常に高い知能レベルです。さらなる向上が期待できます。',
      };
    } else {
      return {
        status: '標準レベル',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
        message: '継続的な学習で知能を向上させることができます。',
      };
    }
  };

  const mensaStatus = getMensaStatus();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}分${secs}秒`;
  };

  const getCategoryName = (category: string) => {
    const names = {
      logical: '論理推論',
      numerical: '数値パターン',
      spatial: '空間認識',
      matrix: '行列推論',
      verbal: '言語的類推',
      abstract: '抽象思考',
      memory: '作業記憶',
    };
    return names[category as keyof typeof names] || category;
  };

  const getPerformanceLevel = (percentage: number) => {
    if (percentage >= 80) return { level: '優秀', color: 'text-green-600' };
    if (percentage >= 60) return { level: '良好', color: 'text-blue-600' };
    if (percentage >= 40) return { level: '平均', color: 'text-yellow-600' };
    return { level: '要改善', color: 'text-red-600' };
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">テスト結果</h1>
        <p className="text-gray-600">あなたの知能レベルを詳しく分析しました</p>
      </motion.div>

      {/* Main Results */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* IQ Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg border"
        >
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">IQスコア</h2>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {result.iqScore}
            </div>
            <div className="text-sm text-gray-500 mb-4">
              上位 {(100 - result.percentile).toFixed(1)}% に位置
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${mensaStatus.bgColor} ${mensaStatus.color}`}>
              {mensaStatus.status}
            </div>
          </div>
        </motion.div>

        {/* Basic Stats */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg border"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-4">基本統計</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">正解数</span>
              </div>
              <span className="font-semibold">{result.totalScore} / 35</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">正答率</span>
              </div>
              <span className="font-semibold">{((result.totalScore / 35) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-gray-600">所要時間</span>
              </div>
              <span className="font-semibold">{formatTime(result.timeSpent)}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* MENSA Status Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`p-4 rounded-lg mb-8 ${mensaStatus.bgColor}`}
      >
        <p className={`text-center font-medium ${mensaStatus.color}`}>
          {mensaStatus.message}
        </p>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-lg border mb-8"
      >
        <h2 className="text-lg font-semibold text-gray-700 mb-6">分野別パフォーマンス</h2>
        <div className="space-y-4">
          {Object.entries(result.categoryScores).map(([category, score], index) => {
            const performance = getPerformanceLevel(score.percentage);
            return (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    {getCategoryName(category)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {score.score}/{score.total}
                    </span>
                    <span className={`text-sm font-medium ${performance.color}`}>
                      {performance.level}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${score.percentage}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  />
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500">
                    {score.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <button
          onClick={onRetakeTest}
          className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          <span>再テスト</span>
        </button>
        
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg transition-colors font-medium"
        >
          <Download className="w-4 h-4" />
          <span>結果を保存</span>
        </button>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-4 bg-gray-50 rounded-lg"
      >
        <h3 className="font-semibold text-gray-700 mb-2">テスト情報</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• このテストは標準的なIQテストの形式に基づいています</p>
          <p>• IQ130以上でMENSA入会基準を満たします</p>
          <p>• 結果は参考値であり、公式な診断ではありません</p>
          <p>• 完了日時: {result.completedAt.toLocaleString('ja-JP')}</p>
        </div>
      </motion.div>
    </div>
  );
}