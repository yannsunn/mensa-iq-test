'use client';

import React from 'react';
import { PatternBox } from './GeometricShapes';

interface RavenMatrixProps {
  matrix: (string | null)[][];
  options: string[];
  onSelect: (index: number) => void;
  selectedAnswer: number | null;
  title?: string;
}

export default function RavenMatrix({ 
  matrix, 
  options, 
  onSelect, 
  selectedAnswer, 
  title = "パターンを分析して、?に入る図形を選んでください" 
}: RavenMatrixProps) {
  return (
    <div className="space-y-6">
      {/* タイトル */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>

      {/* 3x3 行列 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
          {matrix.flat().map((pattern, index) => (
            <div key={index} className="flex items-center justify-center">
              {pattern === null ? (
                <div className="w-20 h-20 border-2 border-dashed border-gray-400 bg-gray-100 flex items-center justify-center rounded">
                  <span className="text-gray-400 text-2xl font-bold">?</span>
                </div>
              ) : (
                <PatternBox pattern={pattern} size={80} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 選択肢 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h4 className="text-md font-semibold mb-4 text-center">選択肢：</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`
                p-3 border-2 rounded-lg transition-all duration-200 flex items-center justify-center
                ${selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50 shadow-md transform scale-105'
                  : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                }
              `}
            >
              <PatternBox pattern={option} size={60} />
            </button>
          ))}
        </div>
      </div>

      {/* ヒント */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 <strong>ヒント：</strong> 各行と各列のパターンを分析してください。
          回転、反転、要素の追加・削除、位置の変化などの規則性を探しましょう。
        </p>
      </div>
    </div>
  );
}