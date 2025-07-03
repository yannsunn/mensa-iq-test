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
      <div className="min-h-screen gradient-neural">
        <TestResults result={testResult} onRetakeTest={resetTest} />
      </div>
    );
  }

  // Active Test View
  if (isTestActive && currentSession) {
    const currentQuestion = currentSession.questions[currentSession.currentQuestionIndex];
    const selectedAnswer = currentSession.answers[currentSession.currentQuestionIndex];

    return (
      <div className="min-h-screen gradient-neural">
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
    <div className="min-h-screen neural-bg relative overflow-hidden">
      {/* Enhanced floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl floating liquid-blob"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/20 rounded-full blur-lg floating morphing-loader" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl floating liquid-blob" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-pink-500/15 rounded-full blur-lg floating morphing-loader" style={{animationDelay: '3s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10 center-content">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 section-spacing center-content"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <div className="relative">
              <Brain className="w-24 h-24 mx-auto mb-6 text-white drop-shadow-2xl floating" />
              <div className="absolute inset-0 w-24 h-24 mx-auto bg-white/20 rounded-full blur-xl"></div>
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-display"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}
          >
            <span className="parallax-text neon-glow" data-text="MENSA">MENSA</span> <span className="block sm:inline text-spacing">IQテスト</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto text-body font-light leading-relaxed px-4 text-spacing center-content"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.2)'
            }}
          >
            <span className="block sm:inline">IQ130以上のMENSA会員レベルの知能を測定する、</span>
            <span className="block sm:inline">科学的に設計された高精度IQテストです</span>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="center-content"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartTest}
              className="btn-modern btn-magnetic breathing text-base sm:text-lg px-8 sm:px-12 py-4 sm:py-5 shadow-2xl group relative tooltip-modern focus-visible"
              data-tooltip="最高のIQテスト体験を開始しましょう"
              aria-label="MENSA IQテストを開始する"
            >
              <span className="relative z-10 flex items-center space-x-3">
                <span>テストを開始</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20 px-4 section-spacing center-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="glass-advanced card-3d text-center hover-lift group card-spacing"
          >
            <div className="relative mb-6">
              <Clock className="w-14 h-14 text-blue-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 w-14 h-14 mx-auto bg-blue-400/20 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
            </div>
            <h3 className="font-bold text-white mb-3 text-lg">25分テスト</h3>
            <p className="text-white/80 text-sm leading-relaxed">MENSA標準の25分間で35問を解答</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="glass-advanced card-3d text-center hover-lift group card-spacing"
          >
            <div className="relative mb-6">
              <Trophy className="w-14 h-14 text-yellow-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 w-14 h-14 mx-auto bg-yellow-400/20 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
            </div>
            <h3 className="font-bold text-white mb-3 text-lg">MENSA基準</h3>
            <p className="text-white/80 text-sm leading-relaxed">IQ130以上でMENSA適格判定</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="glass-advanced card-3d text-center hover-lift group card-spacing"
          >
            <div className="relative mb-6">
              <Brain className="w-14 h-14 text-purple-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 w-14 h-14 mx-auto bg-purple-400/20 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
            </div>
            <h3 className="font-bold text-white mb-3 text-lg">7分野測定</h3>
            <p className="text-white/80 text-sm leading-relaxed">論理・数値・空間など総合評価</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="glass-advanced card-3d text-center hover-lift group card-spacing"
          >
            <div className="relative mb-6">
              <Users className="w-14 h-14 text-green-400 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 w-14 h-14 mx-auto bg-green-400/20 rounded-full blur-lg group-hover:blur-xl transition-all"></div>
            </div>
            <h3 className="font-bold text-white mb-3 text-lg">上位2%判定</h3>
            <p className="text-white/80 text-sm leading-relaxed">統計的に正確な偏差値算出</p>
          </motion.div>
        </div>

        {/* Test Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="glass-advanced card-3d mb-20 section-spacing center-content"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center text-display text-spacing">
            テスト内容
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 center-content">
            {[
              { name: '論理推論', desc: '論理的思考力', color: 'blue', gradient: 'from-blue-400 to-blue-600' },
              { name: '数値パターン', desc: '数学的推理力', color: 'green', gradient: 'from-green-400 to-green-600' },
              { name: '空間認識', desc: '3D視覚化能力', color: 'purple', gradient: 'from-purple-400 to-purple-600' },
              { name: '行列推論', desc: 'パターン認識力', color: 'orange', gradient: 'from-orange-400 to-orange-600' },
              { name: '言語的類推', desc: '言語理解力', color: 'pink', gradient: 'from-pink-400 to-pink-600' },
              { name: '抽象思考', desc: '概念化能力', color: 'indigo', gradient: 'from-indigo-400 to-indigo-600' },
              { name: '作業記憶', desc: '情報処理力', color: 'red', gradient: 'from-red-400 to-red-600' }
            ].map((category, index) => (
              <motion.div 
                key={category.name} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                className="text-center group"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2 text-lg">{category.name}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{category.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3 }}
          className="glass-advanced card-3d border-2 border-white/30 section-spacing center-content"
        >
          <h3 className="font-bold text-white mb-6 text-xl text-display flex items-center justify-center text-spacing">
            <span className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3 text-sm">!</span>
            テスト前の注意事項
          </h3>
          <ul className="text-white/90 space-y-3 text-sm">
            <li className="flex items-start space-x-3">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>静かな環境でテストを受けてください</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>25分間の制限時間内に35問すべてに答えてください</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>各問題には個別の制限時間があります</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>一度答えた問題は後から変更可能です</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>集中力を保つため、途中での休憩は避けてください</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>電卓や外部資料の使用は禁止です</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}