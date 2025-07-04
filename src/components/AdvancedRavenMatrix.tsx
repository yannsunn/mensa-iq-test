'use client';

import React from 'react';

interface AdvancedRavenMatrixProps {
  matrix: (string | null)[][];
  options: string[];
  onSelect: (index: number) => void;
  selectedAnswer: number | null;
  title?: string;
}

// MENSA本番レベルの高品質パターン生成
const renderAdvancedPattern = (pattern: string, size: number = 100) => {
  const strokeWidth = size > 80 ? 3 : 2;
  const fontSize = size * 0.2;

  switch (pattern) {
    // 基本図形パターン
    case 'circle_solid':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <circle cx="50" cy="50" r="35" fill="#1a1a1a" stroke="#000" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'circle_hollow':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'square_solid':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <rect x="15" y="15" width="70" height="70" fill="#1a1a1a" stroke="#000" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'square_hollow':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <rect x="15" y="15" width="70" height="70" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'triangle_solid':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <polygon points="50,15 85,85 15,85" fill="#1a1a1a" stroke="#000" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'triangle_hollow':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <polygon points="50,15 85,85 15,85" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    // 複合パターン
    case 'circle_in_square':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <rect x="15" y="15" width="70" height="70" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'square_in_circle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
          <rect x="25" y="25" width="50" height="50" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'triangle_in_circle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
          <polygon points="50,25 70,65 30,65" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    // 点パターン
    case 'dots_1':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <circle cx="50" cy="50" r="8" fill="#1a1a1a" />
        </svg>
      );

    case 'dots_2':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <circle cx="35" cy="50" r="8" fill="#1a1a1a" />
          <circle cx="65" cy="50" r="8" fill="#1a1a1a" />
        </svg>
      );

    case 'dots_3':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <circle cx="30" cy="50" r="6" fill="#1a1a1a" />
          <circle cx="50" cy="50" r="6" fill="#1a1a1a" />
          <circle cx="70" cy="50" r="6" fill="#1a1a1a" />
        </svg>
      );

    case 'dots_4_corners':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <circle cx="30" cy="30" r="6" fill="#1a1a1a" />
          <circle cx="70" cy="30" r="6" fill="#1a1a1a" />
          <circle cx="30" cy="70" r="6" fill="#1a1a1a" />
          <circle cx="70" cy="70" r="6" fill="#1a1a1a" />
        </svg>
      );

    case 'dots_diagonal':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <circle cx="25" cy="25" r="6" fill="#1a1a1a" />
          <circle cx="50" cy="50" r="6" fill="#1a1a1a" />
          <circle cx="75" cy="75" r="6" fill="#1a1a1a" />
        </svg>
      );

    // 線パターン
    case 'lines_horizontal':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <line x1="20" y1="35" x2="80" y2="35" stroke="#1a1a1a" strokeWidth={strokeWidth} />
          <line x1="20" y1="50" x2="80" y2="50" stroke="#1a1a1a" strokeWidth={strokeWidth} />
          <line x1="20" y1="65" x2="80" y2="65" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'lines_vertical':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <line x1="35" y1="20" x2="35" y2="80" stroke="#1a1a1a" strokeWidth={strokeWidth} />
          <line x1="50" y1="20" x2="50" y2="80" stroke="#1a1a1a" strokeWidth={strokeWidth} />
          <line x1="65" y1="20" x2="65" y2="80" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'lines_diagonal_lr':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <line x1="20" y1="20" x2="80" y2="80" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'lines_diagonal_rl':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <line x1="80" y1="20" x2="20" y2="80" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'cross':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <line x1="50" y1="20" x2="50" y2="80" stroke="#1a1a1a" strokeWidth={strokeWidth} />
          <line x1="20" y1="50" x2="80" y2="50" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    // 矢印パターン
    case 'arrow_up':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <polygon points="50,20 70,50 30,50" fill="#1a1a1a" />
          <rect x="45" y="50" width="10" height="30" fill="#1a1a1a" />
        </svg>
      );

    case 'arrow_down':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <rect x="45" y="20" width="10" height="30" fill="#1a1a1a" />
          <polygon points="30,50 70,50 50,80" fill="#1a1a1a" />
        </svg>
      );

    case 'arrow_left':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <polygon points="20,50 50,30 50,70" fill="#1a1a1a" />
          <rect x="50" y="45" width="30" height="10" fill="#1a1a1a" />
        </svg>
      );

    case 'arrow_right':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <rect x="20" y="45" width="30" height="10" fill="#1a1a1a" />
          <polygon points="50,30 50,70 80,50" fill="#1a1a1a" />
        </svg>
      );

    // 回転パターン
    case 'diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <polygon points="50,15 85,50 50,85 15,50" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'diamond_solid':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <polygon points="50,15 85,50 50,85 15,50" fill="#1a1a1a" stroke="#000" strokeWidth={strokeWidth} />
        </svg>
      );

    // 複雑な組み合わせ
    case 'double_circle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'triple_circle':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
          <circle cx="50" cy="50" r="25" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
          <circle cx="50" cy="50" r="15" fill="none" stroke="#1a1a1a" strokeWidth={strokeWidth} />
        </svg>
      );

    case 'plus_sign':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <rect x="20" y="45" width="60" height="10" fill="#1a1a1a" />
          <rect x="45" y="20" width="10" height="60" fill="#1a1a1a" />
        </svg>
      );

    case 'star':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <polygon 
            points="50,10 61,35 90,35 68,57 79,91 50,70 21,91 32,57 10,35 39,35" 
            fill="none" 
            stroke="#1a1a1a" 
            strokeWidth={strokeWidth} 
          />
        </svg>
      );

    case 'empty':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 bg-white">
          <rect x="0" y="0" width="100" height="100" fill="white" />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300 bg-white">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <text x="50" y="50" textAnchor="middle" dy="0.3em" fontSize={fontSize} fill="#666">
            {pattern}
          </text>
        </svg>
      );
  }
};

export default function AdvancedRavenMatrix({ 
  matrix, 
  options, 
  onSelect, 
  selectedAnswer, 
  title = "下の3×3のマトリックスのパターンを分析し、?に入る正しい図形を選択してください" 
}: AdvancedRavenMatrixProps) {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 p-6">
      {/* タイトル */}
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-relaxed">
          {title}
        </h3>
        <p className="text-lg sm:text-xl text-white/90">
          各行と各列のパターンの規則性を見つけてください
        </p>
      </div>

      {/* メイン3x3行列 */}
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-white/30">
        <div className="grid grid-cols-3 gap-4 w-fit mx-auto">
          {matrix.flat().map((pattern, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center p-4 bg-white border-2 border-gray-300 rounded-lg shadow-md"
              style={{ width: '120px', height: '120px' }}
            >
              {pattern === null ? (
                <div className="w-full h-full border-4 border-dashed border-blue-500 bg-blue-50 flex items-center justify-center rounded-lg">
                  <span className="text-blue-600 text-4xl font-bold">?</span>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  {renderAdvancedPattern(pattern, 100)}
                </div>
              )}
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
              style={{ minHeight: '100px' }}
            >
              <div className="flex items-center justify-center w-full h-full">
                {renderAdvancedPattern(option, 80)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ヒント */}
      <div className="bg-blue-500/20 backdrop-blur-sm p-6 rounded-xl border border-blue-300/50">
        <div className="flex items-start space-x-3">
          <div className="text-blue-400 text-2xl">💡</div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">解答のヒント：</h5>
            <ul className="text-white/90 space-y-1 text-base">
              <li>• 各行の左から右へのパターンの変化を観察してください</li>
              <li>• 各列の上から下へのパターンの変化を確認してください</li>
              <li>• 図形の形状、大きさ、位置、数の変化に注目してください</li>
              <li>• 回転、反転、重複などの変換規則を探してください</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}