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
      {/* Ultra-Enhanced Visual Effects Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gentle Particle System */}
        <div className="particle-container">
          <div className="particle-gentle" style={{left: '15%', animationDelay: '0s'}}></div>
          <div className="particle-gentle" style={{left: '35%', animationDelay: '3s'}}></div>
          <div className="particle-gentle" style={{left: '55%', animationDelay: '6s'}}></div>
          <div className="particle-gentle" style={{left: '75%', animationDelay: '9s'}}></div>
        </div>
        
        {/* Gentle floating elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-white/5 rounded-full blur-xl floating-gentle parallax-layer-1"></div>
        <div className="absolute bottom-32 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl floating-gentle parallax-layer-3" style={{animationDelay: '4s'}}></div>
      </div>
      
      <div className="responsive-container relative z-10">
        {/* Hero Section - Device Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mobile-spacing tablet-spacing desktop-spacing mobile-center"
        >
          {/* Desktop Split Layout */}
          <div className="desktop-hero">
            {/* Left Column - Content */}
            <div className="desktop-content-left">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="mb-6 sm:mb-8 lg:mb-12"
              >
                <div className="relative">
                  <Brain className="w-16 h-16 sm:w-20 sm:w-20 lg:w-32 lg:h-32 mx-auto mb-6 text-white drop-shadow-2xl floating" />
                  <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 mx-auto bg-white/20 rounded-full blur-xl"></div>
                </div>
              </motion.div>
          
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 lg:mb-12 text-display"
              >
                <span className="neon-glow-title-readable">MENSA</span>
                <br className="block sm:hidden lg:block" />
                <span className="block sm:inline lg:block mt-2 lg:mt-4">IQテスト</span>
              </motion.h1>
          
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-lg sm:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-10 lg:mb-16 max-w-2xl lg:max-w-none mx-auto lg:mx-0 text-body font-light leading-relaxed px-4 lg:px-0"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}
              >
                <span className="block lg:inline">IQ130以上のMENSA会員レベルの知能を測定する、</span>
                <span className="block lg:inline">科学的に設計された高精度IQテストです</span>
              </motion.p>
          
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex justify-center lg:justify-start"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartTest}
                  className="btn-modern group relative tooltip-modern focus-visible"
                  data-tooltip="最高のIQテスト体験を開始しましょう"
                  aria-label="MENSA IQテストを開始する"
                >
                  <span className="relative z-10 flex items-center space-x-3 text-lg sm:text-xl lg:text-2xl font-semibold">
                    <span>テストを開始</span>
                    <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </motion.button>
              </motion.div>
            </div>
            
            {/* Right Column - Visual Elements (Desktop Only) */}
            <div className="hidden lg:flex desktop-visual-right">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="relative w-full h-96 glass-advanced rounded-3xl overflow-hidden"
              >
                {/* Ultra-Advanced Neural Network Visualization */}
                <div className="absolute inset-0 neural-network-bg quantum-effect">
                  {/* Pulsing Nodes */}
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-pulse cyberpunk-glow"></div>
                  <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-pulse cyberpunk-glow" style={{animationDelay: '0.5s'}}></div>
                  <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-pink-400 rounded-full animate-pulse cyberpunk-glow" style={{animationDelay: '1s'}}></div>
                  <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse cyberpunk-glow" style={{animationDelay: '1.5s'}}></div>
                  
                  {/* Enhanced Connecting Lines with Animation */}
                  <svg className="absolute inset-0 w-full h-full opacity-60">
                    <defs>
                      <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(102, 126, 234, 0.8)" />
                        <stop offset="100%" stopColor="rgba(164, 116, 227, 0.8)" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <line x1="25%" y1="25%" x2="50%" y2="67%" stroke="url(#lineGradient1)" strokeWidth="3" filter="url(#glow)">
                      <animate attributeName="stroke-dasharray" values="0,100;20,80;0,100" dur="3s" repeatCount="indefinite" />
                    </line>
                    <line x1="50%" y1="67%" x2="67%" y2="50%" stroke="url(#lineGradient1)" strokeWidth="3" filter="url(#glow)">
                      <animate attributeName="stroke-dasharray" values="0,100;20,80;0,100" dur="3s" begin="1s" repeatCount="indefinite" />
                    </line>
                    <line x1="67%" y1="50%" x2="75%" y2="33%" stroke="url(#lineGradient1)" strokeWidth="3" filter="url(#glow)">
                      <animate attributeName="stroke-dasharray" values="0,100;20,80;0,100" dur="3s" begin="2s" repeatCount="indefinite" />
                    </line>
                  </svg>
                  
                  {/* DNA Helix Visualization */}
                  <div className="absolute top-4 right-4 dna-helix">
                    <div className="dna-strand"></div>
                    <div className="dna-strand"></div>
                  </div>
                </div>
                
                {/* Enhanced Floating Stats */}
                <div className="absolute bottom-4 left-4 glass-advanced p-4 rounded-xl cyberpunk-glow holographic">
                  <div className="text-white text-base lg:text-lg font-semibold mb-1 neon-glow-subtle">AIパワーで解析</div>
                  <div className="text-white/70 text-sm lg:text-base mb-2">130+ IQ 精度</div>
                  <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" style={{width: '95%', animation: 'progress-shimmer 2s linear infinite'}}></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid - Device Responsive */}
        <div className="mobile-spacing tablet-spacing desktop-spacing">
          <div className="grid grid-cols-1 tablet-grid desktop-grid ultrawide-grid gap-4 sm:gap-6 lg:gap-8 xl:gap-12 px-4 lg:px-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="glass-advanced text-center group mobile-spacing tablet-spacing desktop-spacing"
          >
            <div className="relative mb-4 sm:mb-6">
              <Clock className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-blue-400 mx-auto group-hover:scale-105 transition-transform duration-200" />
              <div className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto bg-blue-400/10 rounded-full blur-md"></div>
            </div>
            <h3 className="font-bold text-white mb-3 text-xl sm:text-2xl lg:text-3xl">25分テスト</h3>
            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed">MENSA標準の25分間で35問を解答</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="glass-advanced text-center group mobile-spacing tablet-spacing desktop-spacing"
          >
            <div className="relative mb-6">
              <Trophy className="w-14 h-14 text-yellow-400 mx-auto group-hover:scale-105 transition-transform duration-200" />
              <div className="absolute inset-0 w-14 h-14 mx-auto bg-yellow-400/10 rounded-full blur-md"></div>
            </div>
            <h3 className="font-bold text-white mb-3 text-xl sm:text-2xl lg:text-3xl">MENSA基準</h3>
            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed">IQ130以上でMENSA適格判定</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="glass-advanced text-center group mobile-spacing tablet-spacing desktop-spacing"
          >
            <div className="relative mb-6">
              <Brain className="w-14 h-14 text-purple-400 mx-auto group-hover:scale-105 transition-transform duration-200" />
              <div className="absolute inset-0 w-14 h-14 mx-auto bg-purple-400/10 rounded-full blur-md"></div>
            </div>
            <h3 className="font-bold text-white mb-3 text-xl sm:text-2xl lg:text-3xl">7分野測定</h3>
            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed">論理・数値・空間など総合評価</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="glass-advanced text-center group mobile-spacing tablet-spacing desktop-spacing"
          >
            <div className="relative mb-6">
              <Users className="w-14 h-14 text-green-400 mx-auto group-hover:scale-105 transition-transform duration-200" />
              <div className="absolute inset-0 w-14 h-14 mx-auto bg-green-400/10 rounded-full blur-md"></div>
            </div>
            <h3 className="font-bold text-white mb-3 text-xl sm:text-2xl lg:text-3xl">上位2%判定</h3>
            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed">統計的に正確な偏差値算出</p>
          </motion.div>
        </div>

        {/* Test Categories */}
        </div>
        
        {/* Test Categories - Enhanced Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="glass-advanced mobile-spacing tablet-spacing desktop-spacing"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-white mb-8 sm:mb-10 lg:mb-16 text-center text-display">
            テスト内容
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 sm:gap-6 lg:gap-8">
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
                <div className={`w-20 h-20 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-200 shadow-lg`}>
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-2 text-lg sm:text-xl lg:text-2xl">{category.name}</h3>
                <p className="text-base sm:text-lg lg:text-xl text-white/90 leading-relaxed">{category.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Instructions */}
        
        {/* Instructions - Compact Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3 }}
          className="glass-advanced border-2 border-white/30 mobile-spacing tablet-spacing desktop-spacing"
        >
          <h3 className="font-bold text-white mb-6 sm:mb-8 text-xl sm:text-2xl lg:text-3xl text-display flex items-center justify-center">
            <span className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3 sm:mr-4 text-base sm:text-lg">!</span>
            テスト前の注意事項
          </h3>
          <ul className="text-white/95 space-y-3 sm:space-y-4 text-base sm:text-lg lg:text-xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            <li className="flex items-start space-x-3">
              <span className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>静かな環境でテストを受けてください</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>25分間の制限時間内に35問すべてに答えてください</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>各問題には個別の制限時間があります</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>一度答えた問題は後から変更可能です</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>集中力を保つため、途中での休憩は避けてください</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>電卓や外部資料の使用は禁止です</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}