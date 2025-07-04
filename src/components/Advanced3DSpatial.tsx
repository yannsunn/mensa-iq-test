'use client';

import React from 'react';

interface Advanced3DSpatialProps {
  questionType: 'cube_net' | 'cube_rotation' | 'spatial_visualization';
  questionData: any;
  options: string[];
  onSelect: (index: number) => void;
  selectedAnswer: number | null;
  title?: string;
}

// 高品質な3D立方体レンダリング
const render3DCube = (
  faces: { front?: string; top?: string; right?: string; left?: string; bottom?: string; back?: string },
  size: number = 120,
  rotation: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 }
) => {
  const { front = 'A', top = 'B', right = 'C', left = 'D', bottom = 'E', back = 'F' } = faces;
  
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className="drop-shadow-lg">
      <defs>
        <linearGradient id="frontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0f0f0" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </linearGradient>
        <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f5f5f5" />
        </linearGradient>
        <linearGradient id="rightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8e8e8" />
          <stop offset="100%" stopColor="#d0d0d0" />
        </linearGradient>
      </defs>
      
      {/* Front face */}
      <polygon
        points="50,70 50,150 130,150 130,70"
        fill="url(#frontGrad)"
        stroke="#333"
        strokeWidth="2"
      />
      <text x="90" y="115" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">
        {front}
      </text>
      
      {/* Top face */}
      <polygon
        points="50,70 75,45 155,45 130,70"
        fill="url(#topGrad)"
        stroke="#333"
        strokeWidth="2"
      />
      <text x="115" y="62" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#333">
        {top}
      </text>
      
      {/* Right face */}
      <polygon
        points="130,70 155,45 155,125 130,150"
        fill="url(#rightGrad)"
        stroke="#333"
        strokeWidth="2"
      />
      <text x="142" y="90" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#333">
        {right}
      </text>
    </svg>
  );
};

// 高品質な展開図レンダリング
const renderCubeNet = (
  netType: string = 'cross',
  faceLabels: string[] = ['A', 'B', 'C', 'D', 'E', 'F'],
  size: number = 300
) => {
  const cellSize = size / 6;
  const strokeWidth = 2;
  
  return (
    <svg width={size} height={size * 0.8} viewBox="0 0 360 240" className="drop-shadow-lg">
      <defs>
        <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f8f8f8" />
        </linearGradient>
      </defs>
      
      {netType === 'cross' && (
        <>
          {/* 十字型展開図 */}
          {/* 上面 */}
          <rect x="60" y="0" width="60" height="60" fill="url(#faceGrad)" stroke="#333" strokeWidth={strokeWidth} />
          <text x="90" y="35" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">{faceLabels[0]}</text>
          
          {/* 中央行 - 左面 */}
          <rect x="0" y="60" width="60" height="60" fill="url(#faceGrad)" stroke="#333" strokeWidth={strokeWidth} />
          <text x="30" y="95" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">{faceLabels[1]}</text>
          
          {/* 中央行 - 前面 */}
          <rect x="60" y="60" width="60" height="60" fill="url(#faceGrad)" stroke="#333" strokeWidth={strokeWidth} />
          <text x="90" y="95" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">{faceLabels[2]}</text>
          
          {/* 中央行 - 右面 */}
          <rect x="120" y="60" width="60" height="60" fill="url(#faceGrad)" stroke="#333" strokeWidth={strokeWidth} />
          <text x="150" y="95" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">{faceLabels[3]}</text>
          
          {/* 中央行 - 後面 */}
          <rect x="180" y="60" width="60" height="60" fill="url(#faceGrad)" stroke="#333" strokeWidth={strokeWidth} />
          <text x="210" y="95" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">{faceLabels[4]}</text>
          
          {/* 下面 */}
          <rect x="60" y="120" width="60" height="60" fill="url(#faceGrad)" stroke="#333" strokeWidth={strokeWidth} />
          <text x="90" y="155" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">{faceLabels[5]}</text>
        </>
      )}
      
      {netType === 'L_shape' && (
        <>
          {/* L字型展開図 */}
          <rect x="0" y="0" width="60" height="60" fill="url(#faceGrad)" stroke="#333" strokeWidth={strokeWidth} />
          <text x="30" y="35" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">{faceLabels[0]}</text>
          
          <rect x="60" y="0" width="60" height="60" fill="url(#faceGrad)" stroke="#333" strokeWidth={strokeWidth} />
          <text x="90" y="35" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">{faceLabels[1]}</text>
          
          <rect x="120" y="0" width="60" height="60" fill="url(#faceGrad)" stroke="#333" strokeWidth={strokeWidth} />
          <text x="150" y="35" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">{faceLabels[2]}</text>
          
          <rect x="180" y="0" width="60" height="60" fill="url(#faceGrad)" stroke="#333" strokeWidth={strokeWidth} />
          <text x="210" y="35" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">{faceLabels[3]}</text>
          
          <rect x="0" y="60" width="60" height="60" fill="url(#faceGrad)" stroke="#333" strokeWidth={strokeWidth} />
          <text x="30" y="95" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">{faceLabels[4]}</text>
          
          <rect x="0" y="120" width="60" height="60" fill="url(#faceGrad)" stroke="#333" strokeWidth={strokeWidth} />
          <text x="30" y="155" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">{faceLabels[5]}</text>
        </>
      )}
    </svg>
  );
};

// 複雑な空間パターン
const renderSpatialPattern = (pattern: string, size: number = 100) => {
  switch (pattern) {
    case 'rotating_squares':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <rect x="20" y="20" width="20" height="20" fill="#333" transform="rotate(0 30 30)" />
          <rect x="40" y="20" width="20" height="20" fill="#666" transform="rotate(15 50 30)" />
          <rect x="60" y="20" width="20" height="20" fill="#999" transform="rotate(30 70 30)" />
          <rect x="20" y="40" width="20" height="20" fill="#666" transform="rotate(15 30 50)" />
          <rect x="40" y="40" width="20" height="20" fill="#999" transform="rotate(30 50 50)" />
          <rect x="60" y="40" width="20" height="20" fill="#ccc" transform="rotate(45 70 50)" />
        </svg>
      );
      
    case 'nested_shapes':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="3" />
          <polygon points="50,20 75,65 25,65" fill="none" stroke="#666" strokeWidth="2" />
          <rect x="35" y="40" width="30" height="20" fill="none" stroke="#999" strokeWidth="2" />
        </svg>
      );
      
    case 'mirror_pattern':
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-sm">
          <line x1="50" y1="10" x2="50" y2="90" stroke="#333" strokeWidth="2" strokeDasharray="5,5" />
          <polygon points="25,30 35,20 45,30 35,40" fill="#333" />
          <polygon points="75,30 65,20 55,30 65,40" fill="#333" />
          <circle cx="30" cy="60" r="8" fill="#666" />
          <circle cx="70" cy="60" r="8" fill="#666" />
        </svg>
      );
      
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="border-2 border-gray-300">
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <text x="50" y="50" textAnchor="middle" fontSize="12" fill="#666">{pattern}</text>
        </svg>
      );
  }
};

export default function Advanced3DSpatial({ 
  questionType,
  questionData,
  options, 
  onSelect, 
  selectedAnswer, 
  title 
}: Advanced3DSpatialProps) {
  const getQuestionTitle = () => {
    switch (questionType) {
      case 'cube_net':
        return title || "この展開図を折りたたんだ時にできる立方体はどれですか？";
      case 'cube_rotation':
        return title || "この立方体を回転させた時の見え方として正しいのはどれですか？";
      case 'spatial_visualization':
        return title || "この空間パターンの続きとして正しいのはどれですか？";
      default:
        return title || "空間認識問題";
    }
  };

  const renderMainQuestion = () => {
    switch (questionType) {
      case 'cube_net':
        return (
          <div className="flex justify-center">
            {renderCubeNet(
              questionData.netType || 'cross',
              questionData.faceLabels || ['A', 'B', 'C', 'D', 'E', 'F'],
              300
            )}
          </div>
        );
        
      case 'cube_rotation':
        return (
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <p className="text-lg font-semibold text-white mb-4">元の立方体</p>
              {render3DCube(questionData.originalFaces || {}, 140)}
            </div>
            <div className="flex items-center">
              <div className="text-4xl text-white">→</div>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-white mb-4">回転後</p>
              <div className="w-36 h-36 border-4 border-dashed border-blue-400 bg-blue-50 flex items-center justify-center rounded-lg">
                <span className="text-blue-600 text-4xl font-bold">?</span>
              </div>
            </div>
          </div>
        );
        
      case 'spatial_visualization':
        return (
          <div className="flex justify-center">
            {renderSpatialPattern(questionData.pattern || 'nested_shapes', 200)}
          </div>
        );
        
      default:
        return <div>Unknown question type</div>;
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
          立体的・空間的な思考力を使って正解を見つけてください
        </p>
      </div>

      {/* メイン問題 */}
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-white/30">
        {renderMainQuestion()}
      </div>

      {/* 選択肢 */}
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-white/30">
        <h4 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">
          選択肢から正解を選んでください：
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`
                p-6 border-3 rounded-xl transition-all duration-200 flex items-center justify-center
                aspect-square shadow-lg hover:shadow-xl transform hover:scale-105
                ${selectedAnswer === index
                  ? 'border-blue-500 bg-blue-100 shadow-blue-300 scale-105'
                  : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                }
              `}
              style={{ minHeight: '140px' }}
            >
              <div className="flex items-center justify-center w-full h-full">
                {questionType === 'cube_rotation' ? 
                  render3DCube(JSON.parse(option), 120) :
                  renderSpatialPattern(option, 120)
                }
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ヒント */}
      <div className="bg-purple-500/20 backdrop-blur-sm p-6 rounded-xl border border-purple-300/50">
        <div className="flex items-start space-x-3">
          <div className="text-purple-400 text-2xl">🧠</div>
          <div>
            <h5 className="text-lg font-semibold text-white mb-2">空間認識のコツ：</h5>
            <ul className="text-white/90 space-y-1 text-base">
              <li>• 立体を頭の中で回転させて、異なる角度から観察してください</li>
              <li>• 展開図では、隣接する面の関係性に注目してください</li>
              <li>• 各面の文字や模様の向きを正確に把握してください</li>
              <li>• 段階的に組み立てるプロセスを想像してください</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}