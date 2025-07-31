'use client';

import React, { useMemo, useCallback, memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UnifiedQuestion } from '@/types/question';
import CubeQuestion from '../CubeQuestion';
import { generateVisualContent, needsVisualRepresentation } from '@/utils/imagePromptGenerator';
import { getEnhancedQuestion } from '@/lib/questionEnhancer';
import { Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { getPreGeneratedImage } from '@/config/preGeneratedImages';

interface QuestionDisplayProps {
  question: UnifiedQuestion;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  showExplanation?: boolean;
  isCorrect?: boolean;
}

const EnhancedQuestionDisplay = memo(function EnhancedQuestionDisplay({
  question: rawQuestion,
  selectedAnswer,
  onAnswerSelect,
  showExplanation = false,
  isCorrect = false
}: QuestionDisplayProps) {
  
  // 問題を自動拡張
  const question = useMemo(() => getEnhancedQuestion(rawQuestion), [rawQuestion]);
  
  // 画像コンテンツの状態管理
  const [visualContent, setVisualContent] = useState<{
    type: 'svg' | 'ai' | 'image' | 'none';
    content: string;
    loading: boolean;
    error?: string;
  }>({
    type: 'none',
    content: '',
    loading: false
  });

  // 画像生成の実行
  useEffect(() => {
    const loadVisualContent = async () => {
      if (!needsVisualRepresentation(question)) {
        return;
      }

      // まず事前生成画像をチェック
      const preGenerated = getPreGeneratedImage(question.id);
      if (preGenerated) {
        setVisualContent({
          type: 'image',
          content: preGenerated.imageUrl,
          loading: false
        });
        return;
      }

      setVisualContent(prev => ({ ...prev, loading: true }));

      try {
        const result = await generateVisualContent(question);
        
        if (result.type === 'svg') {
          // SVGを直接表示
          setVisualContent({
            type: 'svg',
            content: result.content,
            loading: false
          });
        } else {
          // AI画像生成（実際のAPIコールは GeneratedImageコンポーネントが処理）
          setVisualContent({
            type: 'ai',
            content: result.prompt || '',
            loading: false
          });
        }
      } catch (error) {
        console.error('Visual content generation failed:', error);
        setVisualContent({
          type: 'none',
          content: '',
          loading: false,
          error: '画像の生成に失敗しました'
        });
      }
    };

    loadVisualContent();
  }, [question]);
  
  // 選択肢ハンドラーのメモ化
  const handleAnswerSelect = useCallback((index: number) => {
    if (!showExplanation) {
      onAnswerSelect(index);
    }
  }, [onAnswerSelect, showExplanation]);
  
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

      {/* ビジュアルコンテンツの表示 */}
      {needsVisualRepresentation(question) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-8"
        >
          {visualContent.loading ? (
            <div className="flex items-center justify-center h-64 bg-white/5 rounded-xl">
              <Loader2 className="w-8 h-8 animate-spin text-white/60" />
            </div>
          ) : visualContent.error ? (
            <div className="flex items-center justify-center h-64 bg-red-500/10 rounded-xl border border-red-500/20 p-4">
              <div className="text-center">
                <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <p className="text-red-300">{visualContent.error}</p>
              </div>
            </div>
          ) : visualContent.type === 'image' ? (
            <div className="flex justify-center">
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <Image 
                  src={visualContent.content} 
                  alt="Question visual"
                  width={300}
                  height={300}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          ) : visualContent.type === 'svg' ? (
            <div className="flex justify-center">
              <div 
                className="bg-white rounded-xl p-4 shadow-lg"
                dangerouslySetInnerHTML={{ __html: visualContent.content }}
              />
            </div>
          ) : visualContent.type === 'ai' ? (
            <div className="flex justify-center">
              <GeneratedImage
                questionId={question.id}
                category={question.category}
                description={visualContent.content}
                style={getImageStyle(question.category)}
                className="max-w-md mx-auto"
              />
            </div>
          ) : null}
        </motion.div>
      )}

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
            onClick={() => handleAnswerSelect(index)}
            disabled={showExplanation}
            className={`
              option-button p-responsive-lg text-left border-2 rounded-2xl transition-all duration-300
              ${getOptionStyle(index, selectedAnswer, showExplanation, isCorrect, question.correctAnswer)}
            `}
          >
            <div className="flex items-center space-x-4">
              <div className={getOptionIconStyle(index, selectedAnswer, showExplanation, isCorrect, question.correctAnswer)}>
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

// GeneratedImageコンポーネントのインポート（遅延ロード）
const GeneratedImage = React.lazy(() => import('../ui/GeneratedImage'));

// ヘルパー関数群（既存のコードから移植）
const getOptionStyle = (
  index: number,
  selectedAnswer: number | null,
  showExplanation: boolean,
  isCorrect: boolean,
  correctAnswer: number
): string => {
  const baseClasses = 'border-2 transition-all duration-300 backdrop-blur-sm';
  
  if (showExplanation) {
    if (index === correctAnswer) {
      return `${baseClasses} border-green-400 bg-green-400/20 text-white`;
    } else if (index === selectedAnswer && !isCorrect) {
      return `${baseClasses} border-red-400 bg-red-400/20 text-white`;
    } else {
      return `${baseClasses} border-white/20 bg-white/5 text-white/50`;
    }
  } else if (selectedAnswer === index) {
    return `${baseClasses} border-blue-400 bg-blue-400/20 text-white shadow-xl`;
  } else {
    return `${baseClasses} border-white/20 bg-white/5 text-white/90 hover:border-white/30 hover:bg-white/10`;
  }
};

const getOptionIconStyle = (
  index: number,
  selectedAnswer: number | null,
  showExplanation: boolean,
  isCorrect: boolean,
  correctAnswer: number
): string => {
  const baseClasses = 'w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold';
  
  if (showExplanation) {
    if (index === correctAnswer) {
      return `${baseClasses} border-green-400 bg-green-400 text-white`;
    } else if (index === selectedAnswer && !isCorrect) {
      return `${baseClasses} border-red-400 bg-red-400 text-white`;
    } else {
      return `${baseClasses} border-white/20 text-white/50`;
    }
  } else if (selectedAnswer === index) {
    return `${baseClasses} border-blue-400 bg-blue-400 text-white`;
  } else {
    return `${baseClasses} border-white/40 text-white/60`;
  }
};

interface CubeView {
  showFaces: string[];
  colors: Record<string, string>;
}

const generateCubeViews = (question: UnifiedQuestion): CubeView[] => {
  if (!question.visualData?.cubeData) return [];
  
  return [
    {
      showFaces: ['front', 'top', 'right'],
      colors: {
        front: '#ff6b6b',
        top: '#4ecdc4',
        right: '#45b7d1'
      }
    }
  ];
};

const getImageStyle = (category: string): 'minimal' | 'detailed' | 'abstract' | 'geometric' => {
  switch (category) {
    case 'pattern':
      return 'geometric';
    case 'spatial':
      return 'minimal';
    case 'abstract':
      return 'abstract';
    default:
      return 'minimal';
  }
};

export default EnhancedQuestionDisplay;