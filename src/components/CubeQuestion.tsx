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
  question,
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
            <h4 className="font-semibold">立方体の展開図：</h4>
            <CubeNet faceLabels={netLabels} />
          </div>
        );
      
      case 'cube_rotation':
        return (
          <div className="flex flex-col items-center space-y-4">
            <h4 className="font-semibold">立方体の回転：</h4>
            <div className="flex space-x-8">
              {cubeViews.slice(0, 2).map((view, index) => (
                <div key={index} className="text-center">
                  <Cube3D 
                    showFaces={view.showFaces} 
                    colors={view.colors}
                    size={100}
                  />
                  <p className="text-sm mt-2">視点 {index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'opposite_faces':
        return (
          <div className="flex flex-col items-center space-y-4">
            <h4 className="font-semibold">立方体の展開図：</h4>
            <CubeNet faceLabels={netLabels} />
            <div className="text-sm text-gray-600 max-w-md text-center">
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
                p-4 border-2 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2
                ${selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
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
              <span className="text-sm font-medium">{option}</span>
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
              p-4 text-left border-2 rounded-lg transition-all duration-200
              ${selectedAnswer === index
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
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
      {/* 質問文 */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{question}</h3>
      </div>

      {/* 視覚的要素 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        {renderQuestionVisual()}
      </div>

      {/* 選択肢 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h4 className="text-md font-semibold mb-4">選択肢：</h4>
        {renderOptions()}
      </div>

      {/* 空間認識のヒント */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <p className="text-sm text-purple-800">
          🎲 <strong>空間認識のヒント：</strong> 
          {type === 'net_to_cube' && '展開図を頭の中で折りたたんで立方体を想像してみましょう。'}
          {type === 'cube_rotation' && '立方体の各面の位置関係を3次元的に考えてみましょう。'}
          {type === 'opposite_faces' && '向かい合う面は展開図では離れた位置にあることが多いです。'}
        </p>
      </div>
    </div>
  );
}