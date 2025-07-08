'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Lightbulb, Brain, Target, AlertTriangle, BookOpen, TrendingUp } from 'lucide-react';
import { DetailedQuestion } from '@/data/internationalMensaQuestions';
import { getCognitiveSkillsString, safeArray } from '@/utils/dataValidation';

interface PracticeFeedbackProps {
  question: DetailedQuestion;
  userAnswer: number | null;
  isCorrect: boolean;
  onContinue: () => void;
  showFeedback: boolean;
}

export default function PracticeFeedback({
  question,
  userAnswer,
  isCorrect,
  onContinue,
  showFeedback
}: PracticeFeedbackProps) {
  if (!showFeedback) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-responsive-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
        >
          {/* ヘッダー：正解/不正解 */}
          <div className="flex items-center justify-center mb-8">
            {isCorrect ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="flex items-center space-x-4 bg-green-500/20 border border-green-400/30 rounded-2xl px-responsive-lg py-4"
              >
                <CheckCircle className="w-8 h-8 text-green-400" />
                <div>
                  <h2 className="text-2xl font-bold text-green-400">正解！</h2>
                  <p className="text-green-300/80">素晴らしい推論力です</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="flex items-center space-x-4 bg-red-500/20 border border-red-400/30 rounded-2xl px-responsive-lg py-4"
              >
                <XCircle className="w-8 h-8 text-red-400" />
                <div>
                  <h2 className="text-2xl font-bold text-red-400">不正解</h2>
                  <p className="text-red-300/80">学習の機会です</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* 問題情報 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 p-responsive-lg bg-white/5 rounded-2xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Brain className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">{question.category}</span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  難易度: {question.difficulty}/20
                </span>
              </div>
              <div className="text-right text-sm text-white/60">
                <div>出典: {question.source}</div>
                <div>レベル: {question.mensaLevel}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-white">あなたの回答:</strong>
                <span className={`ml-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {userAnswer !== null ? question.options[userAnswer] : '未回答'}
                </span>
              </div>
              <div>
                <strong className="text-white">正解:</strong>
                <span className="ml-2 text-green-400">
                  {question.options[question.correctAnswer]}
                </span>
              </div>
            </div>
          </motion.div>

          {/* 即時解説 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <div className="flex items-center mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-400 mr-3" />
              <h3 className="text-xl font-bold text-white">即時解説</h3>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-xl p-4">
              <p className="text-yellow-100 leading-relaxed">
                {question.practiceMode.immediateExplanation}
              </p>
            </div>
          </motion.div>

          {/* 詳細解法 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-6"
          >
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-400 mr-3" />
              <h3 className="text-xl font-bold text-white">詳細解法</h3>
            </div>
            <div className="bg-blue-500/10 border border-blue-400/20 rounded-xl p-4">
              <pre className="text-blue-100 leading-relaxed whitespace-pre-wrap font-sans">
                {question.practiceMode.detailedSolution}
              </pre>
            </div>
          </motion.div>

          {/* よくある間違い */}
          {!isCorrect && safeArray(question.practiceMode.commonMistakes).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-6"
            >
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-400 mr-3" />
                <h3 className="text-xl font-bold text-white">よくある間違い</h3>
              </div>
              <div className="bg-orange-500/10 border border-orange-400/20 rounded-xl p-4">
                <ul className="space-y-2">
                  {safeArray(question.practiceMode.commonMistakes).map((mistake, index) => (
                    <li key={index} className="text-orange-100 flex items-start">
                      <span className="text-orange-400 mr-2">•</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* 関連概念 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-6"
          >
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-400 mr-3" />
              <h3 className="text-xl font-bold text-white">関連概念・学習ポイント</h3>
            </div>
            <div className="bg-purple-500/10 border border-purple-400/20 rounded-xl p-4">
              <div className="flex flex-wrap gap-2 mb-3">
                {safeArray(question.practiceMode.relatedConcepts).map((concept, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-400/20 text-purple-200 rounded-full text-sm"
                  >
                    {concept}
                  </span>
                ))}
              </div>
              <p className="text-purple-100 text-sm">
                <strong>認知スキル:</strong> {getCognitiveSkillsString(question)}
              </p>
            </div>
          </motion.div>

          {/* 難易度の根拠 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-8"
          >
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-indigo-400 mr-3" />
              <h3 className="text-xl font-bold text-white">難易度分析</h3>
            </div>
            <div className="bg-indigo-500/10 border border-indigo-400/20 rounded-xl p-4">
              <p className="text-indigo-100 leading-relaxed">
                {question.practiceMode.difficultyJustification}
              </p>
            </div>
          </motion.div>

          {/* 続行ボタン */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-center"
          >
            <button
              onClick={onContinue}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              次の問題へ
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}