'use client';

import React from 'react';
import { Cube3D, CubeNet } from './GeometricShapes';

interface CubeQuestionProps {
  type: 'net_to_cube' | 'cube_rotation' | 'opposite_faces';
  question: string;
  options: string[];
  onSelect: (index: number) => void;
  selectedAnswer: number | null;
  netLabels?: string[];
  cubeViews?: Array<{
    showFaces: string[];
    colors: { [key: string]: string };
  }>;
}

export default function CubeQuestion({
  type,
  options,
  onSelect,
  selectedAnswer,
  netLabels = ['A', 'B', 'C', 'D', 'E', 'F'],
  cubeViews = []
}: CubeQuestionProps) {
  
  const renderQuestionVisual = () => {
    switch (type) {
      case 'net_to_cube':
        return (
          <div className="flex flex-col items-center space-y-4">
            <h4 className="font-semibold text-white">立方体の展開図：</h4>
            <CubeNet faceLabels={netLabels} />
          </div>
        );
      
      case 'cube_rotation':
        return (
          <div className="flex flex-col items-center space-y-4">
            <h4 className="font-semibold text-white">立方体の回転：</h4>
            <div className="flex space-x-8">
              {cubeViews.slice(0, 2).map((view, index) => (
                <div key={index} className="text-center">
                  <Cube3D 
                    showFaces={view.showFaces} 
                    colors={view.colors}
                    size={100}
                  />
                  <p className="text-sm mt-2 text-white">視点 {index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'opposite_faces':
        return (
          <div className="flex flex-col items-center space-y-4">
            <h4 className="font-semibold text-white">立方体の展開図：</h4>
            <CubeNet faceLabels={netLabels} />
            <div className="text-sm text-gray-300 max-w-md text-center">
              この展開図を組み立てて立方体にした時の、向かい合う面のペアを考えてください。
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderOptions = () => {
    if (type === 'cube_rotation') {
      return (
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`
                p-responsive-md border-2 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2
                ${selectedAnswer === index
                  ? 'border-blue-400 bg-blue-400/20 shadow-md'
                  : 'border-white/20 hover:border-white/40 hover:bg-white/10'
                }
              `}
            >
              {cubeViews[index + 2] && (
                <Cube3D 
                  showFaces={cubeViews[index + 2].showFaces} 
                  colors={cubeViews[index + 2].colors}
                  size={80}
                />
              )}
              <span className="text-sm font-medium text-white">{option}</span>
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`
              p-responsive-md text-left border-2 rounded-lg transition-all duration-200
              ${selectedAnswer === index
                ? 'border-blue-400 bg-blue-400/20 text-white'
                : 'border-white/20 hover:border-white/30 hover:bg-white/10 text-white/90'
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 視覚的要素 */}
      <div className="bg-white/10 backdrop-blur-md p-responsive-lg rounded-lg border border-white/20">
        {renderQuestionVisual()}
      </div>

      {/* 選択肢 */}
      <div className="bg-white/10 backdrop-blur-md p-responsive-lg rounded-lg border border-white/20">
        <h4 className="text-md font-semibold mb-4 text-white">選択肢：</h4>
        {renderOptions()}
      </div>

      {/* 空間認識のヒント */}
      <div className="bg-purple-500/20 p-responsive-md rounded-lg border border-purple-400/30">
        <p className="text-sm text-purple-200">
          🎲 <strong>空間認識のヒント：</strong> 
          {type === 'net_to_cube' && '展開図を頭の中で折りたたんで立方体を想像してみましょう。'}
          {type === 'cube_rotation' && '立方体の各面の位置関係を3次元的に考えてみましょう。'}
          {type === 'opposite_faces' && '向かい合う面は展開図では離れた位置にあることが多いです。'}
        </p>
      </div>
    </div>
  );
}