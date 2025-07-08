'use client';

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
    <div className="min-h-screen bg-gradient-radial relative overflow-hidden">
      {/* 背景エフェクト */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Container className="relative z-elevated py-6">
        {/* メインヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6 gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Trophy className="w-16 h-16 text-yellow-400" />
            </motion.div>
            <GlowText size="2xl" variant="accent" className="text-3xl md:text-5xl font-bold">
              テスト完了
            </GlowText>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-16 h-16 text-purple-400" />
            </motion.div>
          </div>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
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
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="inline-flex items-center space-x-4 mb-6"
              >
                <IconComponent className="w-12 h-12 text-yellow-400" />
                <div>
                  <GlowText size="2xl" variant="accent" className={`text-5xl md:text-7xl font-bold bg-gradient-to-r ${iqLevel.color} bg-clip-text text-transparent`}>
                    {result.iqScore}
                  </GlowText>
                  <div className="text-2xl font-semibold text-text-primary mt-2">IQスコア</div>
                </div>
                <IconComponent className="w-12 h-12 text-yellow-400" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                <GlowText size="xl" variant="primary" className={`text-2xl font-bold bg-gradient-to-r ${iqLevel.color} bg-clip-text text-transparent`}>
                  {iqLevel.level}
                </GlowText>
                <div className="text-lg text-text-secondary">
                  上位 <span className="font-bold text-accent">{(100 - result.percentile).toFixed(1)}%</span> の知能水準
                </div>
                {result.mensaQualified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9, type: "spring" }}
                  >
                    <Badge variant="accent" className="text-lg px-6 py-3">
                      <Crown className="w-5 h-5 mr-2" />
                      MENSA入会資格
                      <Crown className="w-5 h-5 ml-2" />
                    </Badge>
                  </motion.div>
                )}
              </motion.div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Card variant="solid" className="card-lg" hover={false}>
                  <Target className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-text-primary">{result.totalScore}</div>
                  <div className="text-text-secondary">正解数 / {result.totalQuestions}</div>
                  <Badge variant="primary" className="mt-2">
                    {Math.round((result.totalScore / result.totalQuestions) * 100)}% 正答率
                  </Badge>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <Card variant="solid" className="card-lg" hover={false}>
                  <Clock className="w-8 h-8 text-success mx-auto mb-3" />
                  <div className="text-3xl font-bold text-text-primary">{formatTime(result.timeSpent)}</div>
                  <div className="text-text-secondary">使用時間</div>
                  <Badge variant="success" className="mt-2">
                    残り: {formatTime(45 * 60 - result.timeSpent)}
                  </Badge>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <Card variant="solid" className="card-lg" hover={false}>
                  <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-text-primary">{result.percentile.toFixed(1)}</div>
                  <div className="text-text-secondary">パーセンタイル</div>
                  <Badge variant="default" className="mt-2">
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
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center">
              <Brain className="w-6 h-6 text-primary mr-3" />
              認知領域別パフォーマンス
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Object.entries(result.categoryScores).map(([category, score], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Card variant="solid" className="card-compact" hover={false}>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-text-primary font-semibold">{categoryNames[category] || category}</h3>
                      <Badge variant="primary">
                        {score.correct}/{score.total}
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-text-secondary mb-2">
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
                    >
                      {score.percentage >= 80 ? '優秀' :
                       score.percentage >= 60 ? '良好' :
                       score.percentage >= 40 ? '標準' : '要改善'}
                    </Badge>
                  </Card>
                </motion.div>
              ))}
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
            <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              総合評価
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed max-w-3xl mx-auto">
              {getPerformanceMessage()}
            </p>
            
            {result.mensaQualified && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
              >
                <Card variant="gradient" className="mt-6 card-lg border-accent/30">
                  <h3 className="text-xl font-bold text-accent mb-2 flex items-center justify-center gap-2">
                    <Crown className="w-6 h-6" />
                    MENSA入会資格獲得
                    <Crown className="w-6 h-6" />
                  </h3>
                  <p className="text-text-secondary">
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
          <p>このテストは国際MENSA基準に準拠した正式な知能評価です</p>
          <p className="mt-1">結果は統計的に検証された算出方法により計算されています</p>
        </motion.div>
      </Container>
    </div>
  );
}