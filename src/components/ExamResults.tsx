'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Brain, Target, Clock, Star, Award, TrendingUp, BarChart3, Medal, Crown, Sparkles, ChevronRight } from 'lucide-react';
import { Button, Card, Container, Badge, Progress, GlowText, Divider } from '@/components/ui';

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

const ExamResults = React.memo(function ExamResults({ result, onRestart, onBackToHome }: ExamResultsProps) {
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

  const categoryNames: { [key: string]: string } = useMemo(() => ({
    logical: '論理推論',
    numerical: '数的推論', 
    spatial: '空間認識',
    matrix: '行列推論',
    verbal: '言語推理',
    abstract: '抽象推論',
    memory: '作業記憶'
  }), []);

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
    <div className="min-h-screen bg-gradient-radial relative overflow-hidden">
      {/* 背景エフェクト - パフォーマンス最適化済み */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-yellow-400/10 rounded-full blur-3xl opacity-60" 
          style={{ transform: 'translateZ(0)' }} 
        />
        <div 
          className="absolute bottom-20 right-20 w-64 sm:w-96 h-64 sm:h-96 bg-purple-400/10 rounded-full blur-3xl opacity-60" 
          style={{ transform: 'translateZ(0)' }} 
        />
        <div 
          className="absolute top-1/2 left-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-accent/10 rounded-full blur-3xl opacity-60" 
          style={{ transform: 'translate(-50%, -50%) translateZ(0)' }} 
        />
      </div>

      <Container className="relative z-elevated py-6">
        {/* メインヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center mb-4 sm:mb-6 gap-2 sm:gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="hidden sm:block"
            >
              <Trophy className="w-12 sm:w-16 h-12 sm:h-16 text-yellow-400" />
            </motion.div>
            <GlowText size="2xl" variant="accent" className="text-2xl sm:text-3xl md:text-5xl font-bold">
              テスト完了
            </GlowText>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="hidden sm:block"
            >
              <Brain className="w-12 sm:w-16 h-12 sm:h-16 text-purple-400" />
            </motion.div>
          </div>
          <p className="text-base sm:text-xl text-text-secondary max-w-3xl mx-auto px-4 sm:px-0">
            国際MENSA基準による正式な知能評価が完了しました
          </p>
        </motion.div>

        {/* メインスコア表示 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card variant="gradient" className="card-spacious mb-8" glow>
            <div className="text-center mb-6 md:mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="inline-flex items-center space-x-2 sm:space-x-4 mb-4 md:mb-6"
              >
                <IconComponent className="w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 text-yellow-400 hidden sm:block" />
                <div>
                  <GlowText size="2xl" variant="accent" className={`text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r ${iqLevel.color} bg-clip-text text-transparent`}>
                    {result.iqScore}
                  </GlowText>
                  <div className="text-lg sm:text-xl md:text-2xl font-semibold text-text-primary mt-1 md:mt-2">IQスコア</div>
                </div>
                <IconComponent className="w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 text-yellow-400 hidden sm:block" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                <GlowText size="xl" variant="primary" className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${iqLevel.color} bg-clip-text text-transparent`}>
                  {iqLevel.level}
                </GlowText>
                <div className="text-base md:text-lg text-text-secondary">
                  上位 <span className="font-bold text-accent">{(100 - result.percentile).toFixed(1)}%</span> の知能水準
                </div>
                {result.mensaQualified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9, type: "spring" }}
                  >
                    <Badge variant="accent" className="text-base md:text-lg px-4 md:px-6 py-2 md:py-3">
                      <Crown className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
                      MENSA入会資格
                      <Crown className="w-4 h-4 md:w-5 md:h-5 ml-1 md:ml-2" />
                    </Badge>
                  </motion.div>
                )}
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card variant="solid" className="card-compact sm:card-lg" hover={false}>
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-primary mx-auto mb-2 sm:mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold text-text-primary">{result.totalScore}</div>
                  <div className="text-sm sm:text-base text-text-secondary">正解数 / {result.totalQuestions}</div>
                  <Badge variant="primary" className="mt-2 text-xs sm:text-sm">
                    {Math.round((result.totalScore / result.totalQuestions) * 100)}% 正答率
                  </Badge>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Card variant="solid" className="card-compact sm:card-lg" hover={false}>
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-success mx-auto mb-2 sm:mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold text-text-primary">{formatTime(result.timeSpent)}</div>
                  <div className="text-sm sm:text-base text-text-secondary">使用時間</div>
                  <Badge variant="success" className="mt-2 text-xs sm:text-sm">
                    残り: {formatTime(45 * 60 - result.timeSpent)}
                  </Badge>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Card variant="solid" className="card-compact sm:card-lg" hover={false}>
                  <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mx-auto mb-2 sm:mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold text-text-primary">{result.percentile.toFixed(1)}</div>
                  <div className="text-sm sm:text-base text-text-secondary">パーセンタイル</div>
                  <Badge variant="default" className="mt-2 text-xs sm:text-sm">
                    100人中上位{Math.ceil(100 - result.percentile)}位
                  </Badge>
                </Card>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* カテゴリ別分析 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card variant="glass" className="card-spacious mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-4 sm:mb-6 flex items-center">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2 sm:mr-3" />
              認知領域別パフォーマンス
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {useMemo(() => Object.entries(result.categoryScores).map(([category, score], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card variant="solid" className="card-compact" hover={false}>
                    <div className="flex justify-between items-center mb-2 sm:mb-3">
                      <h3 className="text-sm sm:text-base text-text-primary font-semibold truncate mr-2">{categoryNames[category] || category}</h3>
                      <Badge variant="primary" size="sm">
                        {score.correct}/{score.total}
                      </Badge>
                    </div>
                    
                    <div className="mb-2 sm:mb-3">
                      <div className="flex justify-between text-xs sm:text-sm text-text-secondary mb-1 sm:mb-2">
                        <span>正答率</span>
                        <span>{score.percentage.toFixed(0)}%</span>
                      </div>
                      <Progress 
                        value={score.percentage} 
                        variant={score.percentage >= 80 ? 'success' : score.percentage >= 60 ? 'primary' : 'accent'}
                        size="sm"
                      />
                    </div>
                    
                    <Badge 
                      variant={score.percentage >= 80 ? 'success' : score.percentage >= 60 ? 'warning' : score.percentage >= 40 ? 'accent' : 'danger'}
                      size="sm"
                      className="text-xs sm:text-sm"
                    >
                      {score.percentage >= 80 ? '優秀' :
                       score.percentage >= 60 ? '良好' :
                       score.percentage >= 40 ? '標準' : '要改善'}
                    </Badge>
                  </Card>
                </motion.div>
              )), [result.categoryScores, categoryNames])}
            </div>
          </Card>
        </motion.div>

        {/* フィードバックメッセージ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card variant="glass" className="card-spacious mb-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 sm:mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
              総合評価
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto px-4 sm:px-0">
              {getPerformanceMessage()}
            </p>
            
            {result.mensaQualified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
              >
                <Card variant="gradient" className="mt-4 sm:mt-6 card-compact sm:card-lg border-accent/30">
                  <h3 className="text-lg sm:text-xl font-bold text-accent mb-2 flex items-center justify-center gap-1 sm:gap-2">
                    <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
                    MENSA入会資格獲得
                    <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
                  </h3>
                  <p className="text-sm sm:text-base text-text-secondary px-2 sm:px-0">
                    あなたのIQスコアは上位2%に位置し、国際MENSA協会の入会基準を満たしています。
                    高度な知的能力を証明する素晴らしい結果です。
                  </p>
                </Card>
              </motion.div>
            )}
          </Card>
        </motion.div>

        {/* アクションボタン */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            variant="primary"
            size="lg"
            icon={ChevronRight}
            onClick={onRestart}
            className="min-w-[200px]"
          >
            もう一度挑戦
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={onBackToHome}
            className="min-w-[200px]"
          >
            ホームに戻る
          </Button>
        </motion.div>

        <Divider className="my-12" />

        {/* 統計情報 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="text-center text-text-tertiary text-sm"
        >
          <p className="text-xs sm:text-sm">このテストは国際MENSA基準に準拠した正式な知能評価です</p>
          <p className="text-xs sm:text-sm mt-1">結果は統計的に検証された算出方法により計算されています</p>
        </motion.div>
      </Container>
    </div>
  );
});

export default ExamResults;