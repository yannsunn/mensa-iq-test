'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Trophy, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { useTestStore } from '@/store/testStore';
import TestQuestion from '@/components/TestQuestion';
import TestResults from '@/components/TestResults';

export default function Home() {
  const {
    currentSession,
    testResult,
    isTestActive,
    startTest,
    answerQuestion,
    nextQuestion,
    previousQuestion,
    resetTest
  } = useTestStore();

  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  const handleAnswerSelect = (answer: number) => {
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    answerQuestion(answer, timeSpent);
  };

  const handleNext = () => {
    setQuestionStartTime(Date.now());
    nextQuestion();
  };

  const handlePrevious = () => {
    setQuestionStartTime(Date.now());
    previousQuestion();
  };

  const handleStartTest = () => {
    startTest();
    setQuestionStartTime(Date.now());
  };

  // Test Results View
  if (testResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <TestResults result={testResult} onRetakeTest={resetTest} />
      </div>
    );
  }

  // Active Test View
  if (isTestActive && currentSession) {
    const currentQuestion = currentSession.questions[currentSession.currentQuestionIndex];
    const selectedAnswer = currentSession.answers[currentSession.currentQuestionIndex];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <TestQuestion
          question={currentQuestion}
          questionNumber={currentSession.currentQuestionIndex + 1}
          totalQuestions={currentSession.questions.length}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoNext={selectedAnswer !== null}
          canGoPrevious={currentSession.currentQuestionIndex > 0}
        />
      </div>
    );
  }

  // Landing Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Brain className="w-20 h-20 text-blue-600 mx-auto mb-4" />
          </motion.div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            MENSA IQテスト
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            IQ130以上のMENSA会員レベルの知能を測定する、
            科学的に設計された高精度IQテストです
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStartTest}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg inline-flex items-center space-x-2 transition-colors"
          >
            <span>テストを開始</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <Clock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">25分テスト</h3>
            <p className="text-gray-600 text-sm">MENSA標準の25分間で35問を解答</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">MENSA基準</h3>
            <p className="text-gray-600 text-sm">IQ130以上でMENSA適格判定</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">7分野測定</h3>
            <p className="text-gray-600 text-sm">論理・数値・空間など総合評価</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-lg text-center"
          >
            <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-800 mb-2">上位2%判定</h3>
            <p className="text-gray-600 text-sm">統計的に正確な偏差値算出</p>
          </motion.div>
        </div>

        {/* Test Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white p-8 rounded-xl shadow-lg mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            テスト内容
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: '論理推論', desc: '論理的思考力', color: 'blue' },
              { name: '数値パターン', desc: '数学的推理力', color: 'green' },
              { name: '空間認識', desc: '3D視覚化能力', color: 'purple' },
              { name: '行列推論', desc: 'パターン認識力', color: 'orange' },
              { name: '言語的類推', desc: '言語理解力', color: 'pink' },
              { name: '抽象思考', desc: '概念化能力', color: 'indigo' },
              { name: '作業記憶', desc: '情報処理力', color: 'red' }
            ].map((category) => (
              <div key={category.name} className="text-center">
                <div className={`w-16 h-16 bg-${category.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <CheckCircle className={`w-8 h-8 text-${category.color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-blue-50 p-6 rounded-xl border border-blue-200"
        >
          <h3 className="font-bold text-blue-800 mb-4">テスト前の注意事項</h3>
          <ul className="text-blue-700 space-y-2 text-sm">
            <li>• 静かな環境でテストを受けてください</li>
            <li>• 25分間の制限時間内に35問すべてに答えてください</li>
            <li>• 各問題には個別の制限時間があります</li>
            <li>• 一度答えた問題は後から変更可能です</li>
            <li>• 集中力を保つため、途中での休憩は避けてください</li>
            <li>• 電卓や外部資料の使用は禁止です</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}