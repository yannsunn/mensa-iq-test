'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UnifiedQuestion } from '@/types/question';
import CubeQuestion from '../CubeQuestion';

interface QuestionDisplayProps {
  question: UnifiedQuestion;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  showExplanation?: boolean;
  isCorrect?: boolean;
}

const QuestionDisplay = React.memo(function QuestionDisplay({
  question,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false,
  isCorrect = false
}: QuestionDisplayProps) {
  // ビジュアル問題の特別な表示
  if (question.visualData) {
    if (question.visualData.type === 'cube' && question.visualData.visualType) {
      return (
        <CubeQuestion
          type={question.visualData.visualType}
          question={question.question}
          options={question.options}
          onSelect={onAnswerSelect}
          selectedAnswer={selectedAnswer}
          cubeViews={generateCubeViews(question)}
        />
      );
    }
    
    // マトリックス問題は将来的に実装
    // if (question.visualData.type === 'matrix') {
    //   return <MatrixQuestion ... />
    // }
  }

  // 通常の問題表示
  return (
    <>
      {/* 問題文 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="question-text text-xl md:text-2xl font-semibold text-white mb-6 leading-relaxed whitespace-pre-line">
          {question.question}
        </h2>
      </motion.div>

      {/* 選択肢 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-responsive-md"
      >
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswerSelect(index)}
            disabled={showExplanation}
            className={`
              option-button p-responsive-lg text-left border-2 rounded-2xl transition-all duration-300
              ${getOptionStyle(index, selectedAnswer, showExplanation, isCorrect, question.correctAnswer)}
            `}
          >
            <div className="flex items-center space-x-4">
              <div className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold
                ${getOptionIconStyle(index, selectedAnswer, showExplanation, isCorrect, question.correctAnswer)}
              `}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-responsive flex-1">{option}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* 説明表示 */}
      {showExplanation && question.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-responsive-lg bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
        >
          <h3 className="text-lg font-semibold text-white mb-2">解説:</h3>
          <p className="text-white/80">{question.explanation}</p>
        </motion.div>
      )}
    </>
  );
});

export default QuestionDisplay;

// 選択肢のスタイルを取得
function getOptionStyle(
  index: number,
  selectedAnswer: number | null,
  showExplanation: boolean,
  isCorrect: boolean,
  correctAnswer: number
): string {
  if (showExplanation) {
    if (index === correctAnswer) {
      return 'border-green-400 bg-green-400/20 text-white';
    }
    if (index === selectedAnswer && !isCorrect) {
      return 'border-red-400 bg-red-400/20 text-white';
    }
    return 'border-white/20 bg-white/5 text-white/50';
  }

  if (selectedAnswer === index) {
    return 'border-blue-400 bg-blue-400/20 text-white shadow-xl backdrop-blur-sm';
  }

  return 'border-white/20 bg-white/5 text-white/90 hover:border-white/30 hover:bg-white/10 backdrop-blur-sm';
}

// 選択肢アイコンのスタイルを取得
function getOptionIconStyle(
  index: number,
  selectedAnswer: number | null,
  showExplanation: boolean,
  isCorrect: boolean,
  correctAnswer: number
): string {
  if (showExplanation) {
    if (index === correctAnswer) {
      return 'border-green-400 bg-green-400 text-white';
    }
    if (index === selectedAnswer && !isCorrect) {
      return 'border-red-400 bg-red-400 text-white';
    }
    return 'border-white/20 text-white/50';
  }

  if (selectedAnswer === index) {
    return 'border-blue-400 bg-blue-400 text-white';
  }

  return 'border-white/40 text-white/60';
}

// キューブビューの生成（空間問題用）
interface CubeView {
  showFaces: string[];
  colors: { [key: string]: string };
}

function generateCubeViews(question: UnifiedQuestion): CubeView[] {
  if (!question.visualData?.cubeData) return [];
  
  // 実際のキューブデータに基づいてビューを生成
  // この部分は質問の内容に応じてカスタマイズ可能
  return [
    {
      showFaces: ['front', 'top', 'right'],
      colors: {
        front: '#ff6b6b',
        top: '#4ecdc4',
        right: '#45b7d1'
      }
    }
    // 他のビューも追加
  ];
}