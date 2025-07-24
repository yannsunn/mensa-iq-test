'use client';

import React, { useState } from 'react';
import { ConsolidatedMensaQuestion } from '@/data/consolidatedQuestions';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RavenMatrix } from '@/components/RavenMatrix';
import { CubeQuestion } from '@/components/CubeQuestion';

interface DynamicProblemDisplayProps {
  problem: ConsolidatedMensaQuestion;
  showAnswer?: boolean;
  onAnswerSelect?: (answerIndex: number) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  className?: string;
}

interface SequenceDisplayProps {
  sequence: (string | number)[];
  pattern?: string;
}

interface MatrixPatternProps {
  problem: ConsolidatedMensaQuestion;
}

// Sequence Display Component
const SequenceDisplay: React.FC<SequenceDisplayProps> = ({ sequence, pattern }) => {
  return (
    <div className="flex justify-center items-center gap-4 flex-wrap">
      {sequence.map((item, index) => (
        <React.Fragment key={index}>
          <div className={`
            w-16 h-16 border-2 rounded-lg flex items-center justify-center font-bold text-lg
            ${item === '?' 
              ? 'border-dashed border-gray-400 bg-gray-50 text-gray-400' 
              : 'border-blue-300 bg-blue-50 text-blue-700'
            }
          `}>
            {item}
          </div>
          {index < sequence.length - 1 && (
            <span className="text-gray-400 text-xl">→</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Matrix Pattern Component for point-symmetry, rotation, etc.
const MatrixPatternDisplay: React.FC<MatrixPatternProps> = ({ problem }) => {
  const { subtype } = problem;

  // For point-symmetry (like problem 9)
  if (subtype === 'point-symmetry') {
    const matrix = [
      ['▲', '◀', '▼'],
      ['◀', '▲', '▶'],
      ['▼', '▶', '?']
    ];

    return (
      <div className="grid grid-cols-3 gap-2 w-64 h-64 mx-auto">
        {matrix.flat().map((cell, index) => (
          <div
            key={index}
            className={`
              border-2 rounded-lg flex items-center justify-center text-2xl font-bold
              ${cell === '?' 
                ? 'border-dashed border-red-400 bg-red-50 text-red-400' 
                : 'border-gray-300 bg-white text-gray-700'
              }
            `}
          >
            {cell}
          </div>
        ))}
      </div>
    );
  }

  // For rotation patterns
  if (subtype === 'rotation') {
    const matrix = [
      ['△', '▷', '▽'],
      ['◁', '△', '▷'],
      ['▽', '◁', '?']
    ];

    return (
      <div className="grid grid-cols-3 gap-2 w-64 h-64 mx-auto">
        {matrix.flat().map((cell, index) => (
          <div
            key={index}
            className={`
              border-2 rounded-lg flex items-center justify-center text-2xl font-bold
              ${cell === '?' 
                ? 'border-dashed border-purple-400 bg-purple-50 text-purple-400' 
                : 'border-gray-300 bg-white text-gray-700'
              }
            `}
          >
            {cell}
          </div>
        ))}
      </div>
    );
  }

  // For distribution patterns  
  if (subtype === 'distribution') {
    const matrix = [
      ['○', '△', '□'],
      ['□', '○', '△'],
      ['△', '□', '?']
    ];

    return (
      <div className="grid grid-cols-3 gap-2 w-64 h-64 mx-auto">
        {matrix.flat().map((cell, index) => (
          <div
            key={index}
            className={`
              border-2 rounded-lg flex items-center justify-center text-2xl font-bold
              ${cell === '?' 
                ? 'border-dashed border-green-400 bg-green-50 text-green-400' 
                : 'border-gray-300 bg-white text-gray-700'
              }
            `}
          >
            {cell}
          </div>
        ))}
      </div>
    );
  }

  // Default generic matrix
  return (
    <div className="text-center p-8 bg-gray-50 rounded-lg">
      <div className="text-4xl mb-4">🧩</div>
      <p className="text-gray-600">行列パターン問題</p>
      <p className="text-sm text-gray-500 mt-2">{subtype}</p>
    </div>
  );
};

// Spatial Display Component
const SpatialDisplay: React.FC<{ problem: ConsolidatedMensaQuestion }> = ({ problem }) => {
  const { subtype, visualData } = problem;

  // If we have cube data, use the existing CubeQuestion component
  if (visualData?.type === 'cube' || subtype.includes('cube') || subtype.includes('3d')) {
    return (
      <div className="flex justify-center">
        <CubeQuestion 
          cubeData={visualData?.cubeData || {
            initialState: {
              front: 'A', top: 'B', right: 'C',
              back: 'D', bottom: 'E', left: 'F'
            }
          }}
          visualType={visualData?.visualType || 'cube_rotation'}
          onAnswer={() => {}}
        />
      </div>
    );
  }

  // For projection problems
  if (subtype === 'projection') {
    return (
      <div className="text-center space-y-4">
        <div className="relative w-48 h-48 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
          <div className="w-32 h-32 bg-blue-400 rounded-full opacity-50 shadow-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">立体</span>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          上から見た影の形を考えてください
        </div>
      </div>
    );
  }

  // For 4D geometry problems
  if (subtype === '4d-geometry') {
    return (
      <div className="text-center space-y-4">
        <div className="relative w-64 h-64 mx-auto">
          {/* Tesseract-like visualization */}
          <div className="absolute inset-0 border-4 border-blue-400 rounded-lg transform rotate-12"></div>
          <div className="absolute inset-4 border-4 border-purple-400 rounded-lg transform -rotate-12"></div>
          <div className="absolute inset-8 border-4 border-green-400 rounded-lg transform rotate-6"></div>
          <div className="absolute inset-12 flex items-center justify-center">
            <span className="font-bold text-lg">4D</span>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          4次元立方体（テッセラクト）
        </div>
      </div>
    );
  }

  // Default spatial display
  return (
    <div className="text-center p-8 bg-gray-50 rounded-lg">
      <div className="text-4xl mb-4">🎯</div>
      <p className="text-gray-600">空間認識問題</p>
      <p className="text-sm text-gray-500 mt-2">{subtype}</p>
    </div>
  );
};

// Logic Display Component
const LogicDisplay: React.FC<{ problem: ConsolidatedMensaQuestion }> = ({ problem }) => {
  const { subtype, question } = problem;

  // Parse logical statements for visual representation
  if (subtype === 'set-theory' && question.includes('すべて')) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center space-x-8">
          {/* Venn diagram representation */}
          <div className="relative">
            <div className="w-32 h-32 border-4 border-blue-400 rounded-full bg-blue-100 opacity-60 flex items-center justify-center">
              <span className="font-bold text-blue-700">集合A</span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-2xl">⊆</span>
          </div>
          <div className="relative">
            <div className="w-40 h-40 border-4 border-green-400 rounded-full bg-green-100 opacity-60 flex items-center justify-center">
              <span className="font-bold text-green-700">集合B</span>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600">
          集合の包含関係を表す図
        </div>
      </div>
    );
  }

  // For conditional logic
  if (subtype === 'conditional-logic') {
    return (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="font-bold text-blue-800">条件:</div>
          <div className="mt-2 space-y-1 text-sm">
            {question.split('。').filter(s => s.trim()).map((condition, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>{condition.trim()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-sm text-gray-600">
          論理的推論を行ってください
        </div>
      </div>
    );
  }

  // Default logic display
  return (
    <div className="text-center p-8 bg-gray-50 rounded-lg">
      <div className="text-4xl mb-4">🧠</div>
      <p className="text-gray-600">論理推論問題</p>
      <p className="text-sm text-gray-500 mt-2">{subtype}</p>
    </div>
  );
};

export const DynamicProblemDisplay: React.FC<DynamicProblemDisplayProps> = ({
  problem,
  showAnswer = false,
  onAnswerSelect,
  onNext,
  onPrevious,
  className = ''
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    onAnswerSelect?.(index);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 7) return 'success';
    if (difficulty <= 14) return 'warning';
    if (difficulty <= 18) return 'error';
    return 'secondary';
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      logical: '論理推論',
      numerical: '数列完成', 
      spatial: '空間認識',
      matrix: '行列推論',
      pattern: 'パターン認識'
    };
    return names[category] || category;
  };

  const renderVisualization = () => {
    const { category, subtype, visualData } = problem;

    // Matrix reasoning problems
    if (category === 'matrix' || subtype.includes('matrix') || subtype.includes('symmetry') || subtype.includes('rotation') || subtype.includes('distribution')) {
      return <MatrixPatternDisplay problem={problem} />;
    }

    // Numerical/sequence problems
    if (category === 'numerical' || subtype.includes('sequence')) {
      // Extract sequence from question
      const sequenceMatch = problem.question.match(/[\d\s,]+\?/);
      if (sequenceMatch) {
        const sequenceStr = sequenceMatch[0].replace('?', '').trim();
        const sequence = sequenceStr.split(/[,\s]+/).filter(s => s).map(s => {
          const num = parseInt(s);
          return isNaN(num) ? s : num;
        });
        sequence.push('?');
        return <SequenceDisplay sequence={sequence} pattern={subtype} />;
      }
      
      // Default numerical display
      return (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">🔢</div>
          <p className="text-gray-600">数列完成問題</p>
          <p className="text-sm text-gray-500 mt-2">{subtype}</p>
        </div>
      );
    }

    // Spatial reasoning problems  
    if (category === 'spatial') {
      return <SpatialDisplay problem={problem} />;
    }

    // Logical reasoning problems
    if (category === 'logical') {
      return <LogicDisplay problem={problem} />;
    }

    // Pattern recognition problems
    if (category === 'pattern') {
      return (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-600">パターン認識問題</p>
          <p className="text-sm text-gray-500 mt-2">{subtype}</p>
        </div>
      );
    }

    // Default fallback
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <div className="text-4xl mb-4">❓</div>
        <p className="text-gray-600">問題の視覚化</p>
        <p className="text-sm text-gray-500 mt-2">{category} - {subtype}</p>
      </div>
    );
  };

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      {/* Header */}
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge variant="secondary">問題 {problem.problemNumber}</Badge>
              <Badge variant={getDifficultyColor(problem.difficulty)}>
                難易度 {problem.difficulty}/20
              </Badge>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              {problem.title}
            </h1>
            <p className="text-gray-600">
              {getCategoryName(problem.category)} - {problem.subtype}
            </p>
          </div>
          <div className="text-right text-sm text-gray-500">
            制限時間: {problem.timeLimit}秒
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {problem.question}
          </p>
        </div>
      </Card>

      {/* Visualization */}
      <Card className="p-8">
        {renderVisualization()}
      </Card>

      {/* Options */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">選択肢</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {problem.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = showAnswer && index === problem.correctAnswer;
            const isWrong = showAnswer && isSelected && index !== problem.correctAnswer;

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className={`
                  p-4 text-left border-2 rounded-lg transition-all duration-200
                  ${isCorrect 
                    ? 'border-green-500 bg-green-50 text-green-800' 
                    : isWrong 
                    ? 'border-red-500 bg-red-50 text-red-800'
                    : isSelected 
                    ? 'border-blue-500 bg-blue-50 text-blue-800' 
                    : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                    ${isCorrect 
                      ? 'bg-green-500 text-white' 
                      : isWrong 
                      ? 'bg-red-500 text-white'
                      : isSelected 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 text-gray-700'
                    }
                  `}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showAnswer && isCorrect && (
                    <span className="text-green-600">✓</span>
                  )}
                  {showAnswer && isWrong && (
                    <span className="text-red-600">✗</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Answer & Explanation */}
      {showAnswer && (
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-xl">✓</span>
              <h3 className="text-lg font-semibold text-green-800">
                正解: {problem.answerKey} - {problem.options[problem.correctAnswer]}
              </h3>
            </div>
            
            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-green-700 hover:text-green-800 font-medium"
            >
              {showExplanation ? '解説を隠す' : '解説を表示'} 
              <span className="ml-2">{showExplanation ? '▲' : '▼'}</span>
            </button>

            {showExplanation && (
              <div className="pt-4 border-t border-green-200">
                <p className="text-green-800 leading-relaxed">
                  {problem.explanation}
                </p>
                
                {problem.practiceDetails && (
                  <div className="mt-4 space-y-3">
                    <div>
                      <h4 className="font-medium text-green-800 mb-2">詳細解法:</h4>
                      <p className="text-sm text-green-700 whitespace-pre-wrap">
                        {problem.practiceDetails.detailedSolution}
                      </p>
                    </div>
                    
                    {problem.practiceDetails.commonMistakes.length > 0 && (
                      <div>
                        <h4 className="font-medium text-green-800 mb-2">よくある間違い:</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          {problem.practiceDetails.commonMistakes.map((mistake, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span>•</span>
                              <span>{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={!onPrevious}
        >
          ← 前の問題
        </Button>
        
        <div className="space-x-2">
          {!showAnswer && selectedAnswer !== null && (
            <Button 
              variant="primary"
              onClick={() => setShowExplanation(true)}
            >
              答えを確認
            </Button>
          )}
          
          <Button 
            variant="outline"
            onClick={onNext}
            disabled={!onNext}
          >
            次の問題 →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DynamicProblemDisplay;