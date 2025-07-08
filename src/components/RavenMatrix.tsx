'use client';

import React from 'react';
import { PatternBox } from './GeometricShapes';
import { Card } from '@/components/ui';

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
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      </div>

      {/* 3x3 行列 */}
      <Card variant="glass" className="p-6">
        <div className="grid grid-cols-3 gap-2 w-fit mx-auto">
          {matrix.flat().map((pattern, index) => (
            <div key={index} className="flex items-center justify-center">
              {pattern === null ? (
                <div className="w-20 h-20 border-2 border-dashed border-white/30 bg-white/5 flex items-center justify-center rounded-lg backdrop-blur-sm">
                  <span className="text-white/60 text-2xl font-bold">?</span>
                </div>
              ) : (
                <div className="bg-white/5 rounded-lg p-1 border border-white/10">
                  <PatternBox pattern={pattern} size={80} />
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* 選択肢 */}
      <Card variant="glass" className="p-6">
        <h4 className="text-md font-semibold mb-4 text-center text-text-primary">選択肢：</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`
                p-3 border-2 rounded-lg transition-all duration-200 flex items-center justify-center backdrop-blur-sm
                ${selectedAnswer === index
                  ? 'border-primary bg-primary/20 shadow-glow transform scale-105'
                  : 'border-white/20 hover:border-white/40 hover:bg-white/10 bg-white/5'
                }
              `}
            >
              <PatternBox pattern={option} size={60} />
            </button>
          ))}
        </div>
      </Card>

      {/* ヒント */}
      <Card variant="gradient" className="p-4 border-primary/20">
        <p className="text-sm text-text-secondary flex items-start gap-2">
          <span className="text-accent">💡</span>
          <span>
            <strong className="text-text-primary">ヒント：</strong> 各行と各列のパターンを分析してください。
            回転、反転、要素の追加・削除、位置の変化などの規則性を探しましょう。
          </span>
        </p>
      </Card>
    </div>
  );
}