'use client';

import React from 'react';

interface AdvancedPatternSequenceProps {
  sequenceType: 'numeric' | 'geometric' | 'logical' | 'alphabetic';
  sequence: (string | number | null)[];
  options: (string | number)[];
  onSelect: (index: number) => void;
  selectedAnswer: number | null;
  title?: string;
}

// 数値パターンの視覚的表現
const renderNumericPattern = (value: number | string | null, size: number = 80) => {
  if (value === null) {
    return (
      <div className={`w-${size/4} h-${size/4} border-4 border-dashed border-blue-500 bg-blue-50 flex items-center justify-center rounded-lg`}
           style={{ width: `${size}px`, height: `${size}px` }}>
        <span className="text-blue-600 text-3xl font-bold">?</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 rounded-lg shadow-md"
         style={{ width: `${size}px`, height: `${size}px` }}>
      <span className="text-2xl sm:text-3xl font-bold text-gray-800">{value}</span>
    </div>
  );
};

// 幾何学的パターンの表現
const renderGeometricPattern = (pattern: string | null, size: number = 80) => {
  if (pattern === null) {
    return (
      <div className={`border-4 border-dashed border-blue-500 bg-blue-50 flex items-center justify-center rounded-lg`}
           style={{ width: `${size}px`, height: `${size}px` }}>
        <span className="text-blue-600 text-3xl font-bold">?</span>
      </div>
    );
  }

  const strokeWidth = size > 60 ? 3 : 2;

  switch (pattern) {
    case 'circle_1':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <circle cx="50" cy="50" r="20" fill="none" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );
    
    case 'circle_2':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <circle cx="35" cy="50" r="15" fill="none" stroke="#333" strokeWidth={strokeWidth} />
          <circle cx="65" cy="50" r="15" fill="none" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );
    
    case 'circle_3':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <circle cx="30" cy="50" r="12" fill="none" stroke="#333" strokeWidth={strokeWidth} />
          <circle cx="50" cy="50" r="12" fill="none" stroke="#333" strokeWidth={strokeWidth} />
          <circle cx="70" cy="50" r="12" fill="none" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'triangle_1':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <polygon points="50,25 70,65 30,65" fill="none" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'triangle_2':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <polygon points="35,25 50,55 20,55" fill="none" stroke="#333" strokeWidth={strokeWidth} />
          <polygon points="65,25 80,55 50,55" fill="none" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'square_1':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <rect x="30" y="30" width="40" height="40" fill="none" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'square_2':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <rect x="20" y="35" width="25" height="25" fill="none" stroke="#333" strokeWidth={strokeWidth} />
          <rect x="55" y="35" width="25" height="25" fill="none" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'arrow_up':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <polygon points="50,20 35,50 45,50 45,80 55,80 55,50 65,50" fill="#333" />
        </svg>
      );

    case 'arrow_right':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <polygon points="80,50 50,35 50,45 20,45 20,55 50,55 50,65" fill="#333" />
        </svg>
      );

    case 'arrow_down':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <polygon points="50,80 65,50 55,50 55,20 45,20 45,50 35,50" fill="#333" />
        </svg>
      );

    case 'arrow_left':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <polygon points="20,50 50,65 50,55 80,55 80,45 50,45 50,35" fill="#333" />
        </svg>
      );

    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <polygon points="50,15 58,35 80,35 63,50 70,72 50,60 30,72 37,50 20,35 42,35" fill="#333" />
        </svg>
      );

    case 'plus':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <rect x="20" y="45" width="60" height="10" fill="#333" />
          <rect x="45" y="20" width="10" height="60" fill="#333" />
        </svg>
      );

    default:
      return (
        <div className="flex items-center justify-center w-full h-full bg-white border-2 border-gray-300 rounded-lg"
             style={{ width: `${size}px`, height: `${size}px` }}>
          <span className="text-lg font-medium text-gray-600">{pattern}</span>
        </div>
      );
  }
};

// 論理的パターンの表現（色や形の組み合わせ）
const renderLogicalPattern = (pattern: string | null, size: number = 80) => {
  if (pattern === null) {
    return (
      <div className={`border-4 border-dashed border-blue-500 bg-blue-50 flex items-center justify-center rounded-lg`}
           style={{ width: `${size}px`, height: `${size}px` }}>
        <span className="text-blue-600 text-3xl font-bold">?</span>
      </div>
    );
  }

  const strokeWidth = size > 60 ? 3 : 2;

  switch (pattern) {
    case 'red_circle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <circle cx="50" cy="50" r="25" fill="#e53e3e" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'blue_circle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <circle cx="50" cy="50" r="25" fill="#3182ce" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'green_circle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <circle cx="50" cy="50" r="25" fill="#38a169" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'red_square':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <rect x="25" y="25" width="50" height="50" fill="#e53e3e" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'blue_square':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <rect x="25" y="25" width="50" height="50" fill="#3182ce" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'green_square':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <rect x="25" y="25" width="50" height="50" fill="#38a169" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'red_triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <polygon points="50,20 75,70 25,70" fill="#e53e3e" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'blue_triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <polygon points="50,20 75,70 25,70" fill="#3182ce" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'green_triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 rounded-lg bg-white">
          <polygon points="50,20 75,70 25,70" fill="#38a169" stroke="#333" strokeWidth={strokeWidth} />
        </svg>
      );

    default:
      return (
        <div className="flex items-center justify-center w-full h-full bg-white border-2 border-gray-300 rounded-lg"
             style={{ width: `${size}px`, height: `${size}px` }}>
          <span className="text-lg font-medium text-gray-600">{pattern}</span>
        </div>
      );
  }
};

export default function AdvancedPatternSequence({ 
  sequenceType,
  sequence,
  options, 
  onSelect, 
  selectedAnswer, 
  title 
}: AdvancedPatternSequenceProps) {
  const getQuestionTitle = () => {
    switch (sequenceType) {
      case 'numeric':
        return title || "この数列のパターンを見つけて、?に入る数字を選んでください";
      case 'geometric':
        return title || "この図形の並びのパターンを見つけて、?に入る図形を選んでください";
      case 'logical':
        return title || "この論理的パターンを分析して、?に入る要素を選んでください";
      case 'alphabetic':
        return title || "この文字列のパターンを見つけて、?に入る文字を選んでください";
      default:
        return title || "パターン認識問題";
    }
  };

  const renderSequenceItem = (item: string | number | null, index: number) => {
    const size = 100;
    
    switch (sequenceType) {
      case 'numeric':
        return renderNumericPattern(item, size);
      case 'geometric':
        return renderGeometricPattern(item as string, size);
      case 'logical':
        return renderLogicalPattern(item as string, size);
      case 'alphabetic':
        return (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-300 rounded-lg shadow-md"
               style={{ width: `${size}px`, height: `${size}px` }}>
            {item === null ? (
              <span className="text-blue-600 text-3xl font-bold">?</span>
            ) : (
              <span className="text-3xl font-bold text-indigo-800">{item}</span>
            )}
          </div>
        );
      default:
        return renderNumericPattern(item, size);
    }
  };

  const renderOptionItem = (option: string | number, index: number) => {
    const size = 80;
    
    switch (sequenceType) {
      case 'numeric':
        return renderNumericPattern(option, size);
      case 'geometric':
        return renderGeometricPattern(option as string, size);
      case 'logical':
        return renderLogicalPattern(option as string, size);
      case 'alphabetic':
        return (
          <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-300 rounded-lg shadow-md"
               style={{ width: `${size}px`, height: `${size}px` }}>
            <span className="text-2xl font-bold text-indigo-800">{option}</span>
          </div>
        );
      default:
        return renderNumericPattern(option, size);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 p-6">
      {/* タイトル */}
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-relaxed">
          {getQuestionTitle()}
        </h3>
        <p className="text-lg sm:text-xl text-white/90">
          パターンの規則性を見つけて、論理的に推理してください
        </p>
      </div>

      {/* メインシーケンス */}
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-white/30">
        <h4 className="text-xl font-bold mb-6 text-center text-gray-800">
          パターンシーケンス：
        </h4>
        <div className="flex justify-center items-center space-x-4 overflow-x-auto pb-4">
          {sequence.map((item, index) => (
            <div key={index} className="flex-shrink-0">
              {renderSequenceItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* 選択肢 */}
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-white/30">
        <h4 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
          選択肢から正解を選んでください：
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`
                p-4 border-3 rounded-xl transition-all duration-200 flex items-center justify-center
                aspect-square shadow-lg hover:shadow-xl transform hover:scale-105
                ${selectedAnswer === index
                  ? 'border-blue-500 bg-blue-100 shadow-blue-300 scale-105'
                  : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                }
              `}
            >
              {renderOptionItem(option, index)}
            </button>
          ))}
        </div>
      </div>

      {/* ヒント */}
      <div className="bg-green-500/20 backdrop-blur-sm p-6 rounded-xl border border-green-300/50">
        <div className="flex items-start space-x-3">
          <div className="text-green-400 text-2xl">🔍</div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">パターン分析のコツ：</h5>
            <ul className="text-white/90 space-y-1 text-base">
              <li>• 数列の場合：差、比、累乗などの数学的関係を探してください</li>
              <li>• 図形の場合：形状、位置、回転、数の変化パターンを観察してください</li>
              <li>• 色や属性の場合：循環、交互、段階的変化を確認してください</li>
              <li>• 複数の要素が変化する場合、各要素の独立したパターンを分析してください</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}