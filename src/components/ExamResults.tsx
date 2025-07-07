'use client';

import { motion } from 'framer-motion';
import { Trophy, Brain, Target, Clock, Star, Award, TrendingUp, BarChart3, Medal, Crown } from 'lucide-react';

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

interface ExamResultsProps {
  result: ExamResult;
  onRestart: () => void;
  onBackToHome: () => void;
}

export default function ExamResults({ result, onRestart, onBackToHome }: ExamResultsProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}時間${mins}分${secs}秒`;
    }
    return `${mins}分${secs}秒`;
  };

  const getIQLevel = (iq: number) => {
    if (iq >= 160) return { level: '天才級', color: 'from-purple-400 to-pink-400', icon: Crown };
    if (iq >= 145) return { level: '極めて優秀', color: 'from-yellow-400 to-orange-400', icon: Medal };
    if (iq >= 130) return { level: 'MENSA基準', color: 'from-blue-400 to-purple-400', icon: Award };
    if (iq >= 115) return { level: '優秀', color: 'from-green-400 to-blue-400', icon: Star };
    if (iq >= 100) return { level: '平均以上', color: 'from-blue-400 to-indigo-400', icon: TrendingUp };
    return { level: '平均', color: 'from-gray-400 to-gray-500', icon: BarChart3 };
  };

  const iqLevel = getIQLevel(result.iqScore);
  const IconComponent = iqLevel.icon;

  const categoryNames: { [key: string]: string } = {
    logical: '論理推論',
    numerical: '数的推論', 
    spatial: '空間認識',
    matrix: '行列推論',
    verbal: '言語推理',
    abstract: '抽象推論',
    memory: '作業記憶'
  };

  const getPerformanceMessage = () => {
    if (result.mensaQualified) {
      return "おめでとうございます！MENSA入会基準（上位2%）に到達しています。";
    } else if (result.iqScore >= 120) {
      return "優秀な結果です。継続的な訓練でさらなる向上が期待できます。";
    } else if (result.iqScore >= 100) {
      return "平均以上の結果です。特定の認知領域での強化をお勧めします。";
    } else {
      return "継続的な練習により、認知能力の向上が期待できます。";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* メインヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <Trophy className="w-16 h-16 text-yellow-400 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              テスト完了
            </h1>
            <Brain className="w-16 h-16 text-purple-400 ml-4" />
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            国際MENSA基準による正式な知能評価が完了しました
          </p>
        </motion.div>

        {/* メインスコア表示 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-4 mb-6"
            >
              <IconComponent className="w-12 h-12 text-yellow-400" />
              <div>
                <div className={`text-6xl md:text-8xl font-bold bg-gradient-to-r ${iqLevel.color} bg-clip-text text-transparent`}>
                  {result.iqScore}
                </div>
                <div className="text-2xl font-semibold text-white mt-2">IQスコア</div>
              </div>
              <IconComponent className="w-12 h-12 text-yellow-400" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <div className={`text-2xl font-bold bg-gradient-to-r ${iqLevel.color} bg-clip-text text-transparent`}>
                {iqLevel.level}
              </div>
              <div className="text-lg text-white/80">
                上位 <span className="font-bold text-yellow-400">{(100 - result.percentile).toFixed(1)}%</span> の知能水準
              </div>
              {result.mensaQualified && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, type: "spring" }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl px-6 py-3"
                >
                  <Crown className="w-6 h-6 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">MENSA入会資格</span>
                  <Crown className="w-6 h-6 text-yellow-400" />
                </motion.div>
              )}
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 rounded-2xl p-6 border border-white/10"
            >
              <Target className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{result.totalScore}</div>
              <div className="text-white/60">正解数 / {result.totalQuestions}</div>
              <div className="text-blue-400 font-semibold">
                {Math.round((result.totalScore / result.totalQuestions) * 100)}% 正答率
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white/5 rounded-2xl p-6 border border-white/10"
            >
              <Clock className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{formatTime(result.timeSpent)}</div>
              <div className="text-white/60">使用時間</div>
              <div className="text-green-400 font-semibold">
                残り時間: {formatTime(45 * 60 - result.timeSpent)}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white/5 rounded-2xl p-6 border border-white/10"
            >
              <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">{result.percentile.toFixed(1)}</div>
              <div className="text-white/60">パーセンタイル</div>
              <div className="text-purple-400 font-semibold">
                100人中上位{Math.ceil(100 - result.percentile)}位
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* カテゴリ別分析 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Brain className="w-6 h-6 text-blue-400 mr-3" />
            認知領域別パフォーマンス
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(result.categoryScores).map(([category, score], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white/5 rounded-xl p-4 border border-white/10"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-semibold">{categoryNames[category] || category}</h3>
                  <span className="text-2xl font-bold text-blue-400">
                    {score.correct}/{score.total}
                  </span>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>正答率</span>
                    <span>{score.percentage.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score.percentage}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                      className={`h-full rounded-full ${
                        score.percentage >= 80 ? 'bg-green-400' :
                        score.percentage >= 60 ? 'bg-yellow-400' :
                        score.percentage >= 40 ? 'bg-orange-400' : 'bg-red-400'
                      }`}
                    />
                  </div>
                </div>
                
                <div className={`text-sm font-medium ${
                  score.percentage >= 80 ? 'text-green-400' :
                  score.percentage >= 60 ? 'text-yellow-400' :
                  score.percentage >= 40 ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {score.percentage >= 80 ? '優秀' :
                   score.percentage >= 60 ? '良好' :
                   score.percentage >= 40 ? '標準' : '要改善'}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* フィードバックメッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">総合評価</h2>
          <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
            {getPerformanceMessage()}
          </p>
          
          {result.mensaQualified && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="mt-6 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-yellow-400 mb-2">
                🎉 MENSA入会資格獲得 🎉
              </h3>
              <p className="text-white/80">
                あなたのIQスコアは上位2%に位置し、国際MENSA協会の入会基準を満たしています。
                高度な知的能力を証明する素晴らしい結果です。
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* アクションボタン */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            もう一度挑戦
          </button>
          
          <button
            onClick={onBackToHome}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            ホームに戻る
          </button>
        </motion.div>

        {/* 統計情報 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="mt-12 text-center text-white/40 text-sm"
        >
          <p>このテストは国際MENSA基準に準拠した正式な知能評価です</p>
          <p className="mt-1">結果は統計的に検証された算出方法により計算されています</p>
        </motion.div>
      </div>
    </div>
  );
}