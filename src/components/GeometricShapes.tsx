'use client';

import React from 'react';

// 基本図形コンポーネント
export const Circle = ({ 
  size = 40, 
  filled = false, 
  color = 'black', 
  strokeWidth = 2 
}: {
  size?: number;
  filled?: boolean;
  color?: string;
  strokeWidth?: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle
      cx="50"
      cy="50"
      r="40"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  </svg>
);

export const Square = ({ 
  size = 40, 
  filled = false, 
  color = 'black', 
  strokeWidth = 2 
}: {
  size?: number;
  filled?: boolean;
  color?: string;
  strokeWidth?: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <rect
      x="10"
      y="10"
      width="80"
      height="80"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  </svg>
);

export const Triangle = ({ 
  size = 40, 
  filled = false, 
  color = 'black', 
  strokeWidth = 2 
}: {
  size?: number;
  filled?: boolean;
  color?: string;
  strokeWidth?: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <polygon
      points="50,10 90,80 10,80"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  </svg>
);

export const Diamond = ({ 
  size = 40, 
  filled = false, 
  color = 'black', 
  strokeWidth = 2 
}: {
  size?: number;
  filled?: boolean;
  color?: string;
  strokeWidth?: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <polygon
      points="50,10 90,50 50,90 10,50"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  </svg>
);

export const Star = ({ 
  size = 40, 
  filled = false, 
  color = 'black', 
  strokeWidth = 2 
}: {
  size?: number;
  filled?: boolean;
  color?: string;
  strokeWidth?: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <polygon
      points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  </svg>
);

export const Hexagon = ({ 
  size = 40, 
  filled = false, 
  color = 'black', 
  strokeWidth = 2 
}: {
  size?: number;
  filled?: boolean;
  color?: string;
  strokeWidth?: number;
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <polygon
      points="50,5 85,27.5 85,72.5 50,95 15,72.5 15,27.5"
      fill={filled ? color : 'none'}
      stroke={color}
      strokeWidth={strokeWidth}
    />
  </svg>
);

// 矢印コンポーネント
export const Arrow = ({ 
  direction = 'up', 
  size = 40, 
  color = 'black' 
}: {
  direction?: 'up' | 'down' | 'left' | 'right';
  size?: number;
  color?: string;
}) => {
  const rotationMap = {
    up: 0,
    right: 90,
    down: 180,
    left: 270
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <g transform={`rotate(${rotationMap[direction]} 50 50)`}>
        <polygon
          points="50,20 70,60 30,60"
          fill={color}
        />
      </g>
    </svg>
  );
};

// 複合図形
export const CrossedShapes = ({ 
  size = 60, 
  shape1 = 'circle', 
  shape2 = 'square',
  color = 'black' 
}: {
  size?: number;
  shape1?: string;
  shape2?: string;
  color?: string;
}) => {
  const renderShape = (shape: string, offset: number) => {
    switch (shape) {
      case 'circle':
        return <circle cx={50 + offset} cy={50 + offset} r="20" fill="none" stroke={color} strokeWidth="2" />;
      case 'square':
        return <rect x={30 + offset} y={30 + offset} width="40" height="40" fill="none" stroke={color} strokeWidth="2" />;
      case 'triangle':
        return <polygon points={`${40 + offset},${35 + offset} ${60 + offset},${65 + offset} ${20 + offset},${65 + offset}`} fill="none" stroke={color} strokeWidth="2" />;
      default:
        return null;
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {renderShape(shape1, -10)}
      {renderShape(shape2, 10)}
    </svg>
  );
};

// 回転図形
export const RotatedShape = ({ 
  shape = 'triangle', 
  rotation = 0, 
  size = 40, 
  color = 'black' 
}: {
  shape?: string;
  rotation?: number;
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <g transform={`rotate(${rotation} 50 50)`}>
      {shape === 'triangle' && (
        <polygon
          points="50,20 70,70 30,70"
          fill={color}
        />
      )}
      {shape === 'square' && (
        <rect
          x="30"
          y="30"
          width="40"
          height="40"
          fill={color}
        />
      )}
      {shape === 'diamond' && (
        <polygon
          points="50,20 70,50 50,80 30,50"
          fill={color}
        />
      )}
    </g>
  </svg>
);

// パターン図形（レイヴン行列用）
export const PatternBox = ({ 
  pattern, 
  size = 80 
}: {
  pattern: string;
  size?: number;
}) => {
  const renderPattern = () => {
    switch (pattern) {
      case 'dots_3':
        return (
          <>
            <circle cx="25" cy="25" r="4" fill="black" />
            <circle cx="50" cy="25" r="4" fill="black" />
            <circle cx="75" cy="25" r="4" fill="black" />
          </>
        );
      case 'dots_diagonal':
        return (
          <>
            <circle cx="20" cy="20" r="4" fill="black" />
            <circle cx="50" cy="50" r="4" fill="black" />
            <circle cx="80" cy="80" r="4" fill="black" />
          </>
        );
      case 'lines_horizontal':
        return (
          <>
            <line x1="10" y1="30" x2="90" y2="30" stroke="black" strokeWidth="2" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="black" strokeWidth="2" />
            <line x1="10" y1="70" x2="90" y2="70" stroke="black" strokeWidth="2" />
          </>
        );
      case 'lines_vertical':
        return (
          <>
            <line x1="30" y1="10" x2="30" y2="90" stroke="black" strokeWidth="2" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="black" strokeWidth="2" />
            <line x1="70" y1="10" x2="70" y2="90" stroke="black" strokeWidth="2" />
          </>
        );
      case 'circle_in_square':
        return (
          <>
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="black" strokeWidth="2" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="black" strokeWidth="2" />
          </>
        );
      case 'triangle_up':
        return <polygon points="50,20 70,70 30,70" fill="black" />;
      case 'triangle_down':
        return <polygon points="50,80 30,30 70,30" fill="black" />;
      case 'cross':
        return (
          <>
            <line x1="50" y1="20" x2="50" y2="80" stroke="black" strokeWidth="4" />
            <line x1="20" y1="50" x2="80" y2="50" stroke="black" strokeWidth="4" />
          </>
        );
      case 'empty':
        return null;
      default:
        return <text x="50" y="50" textAnchor="middle" dy="0.3em" fontSize="12">{pattern}</text>;
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="border border-gray-300">
      <rect x="0" y="0" width="100" height="100" fill="white" />
      {renderPattern()}
    </svg>
  );
};

// 3D立方体（等角投影）
export const Cube3D = ({ 
  size = 80, 
  showFaces = ['front', 'top', 'right'],
  colors = { front: '#e0e0e0', top: '#f0f0f0', right: '#d0d0d0' }
}: {
  size?: number;
  showFaces?: string[];
  colors?: { [key: string]: string };
}) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    {/* Front face */}
    {showFaces.includes('front') && (
      <polygon
        points="20,30 20,80 70,80 70,30"
        fill={colors.front}
        stroke="black"
        strokeWidth="1"
      />
    )}
    {/* Top face */}
    {showFaces.includes('top') && (
      <polygon
        points="20,30 35,15 85,15 70,30"
        fill={colors.top}
        stroke="black"
        strokeWidth="1"
      />
    )}
    {/* Right face */}
    {showFaces.includes('right') && (
      <polygon
        points="70,30 85,15 85,65 70,80"
        fill={colors.right}
        stroke="black"
        strokeWidth="1"
      />
    )}
  </svg>
);

// 展開図
export const CubeNet = ({ 
  size = 120, 
  faceLabels = ['A', 'B', 'C', 'D', 'E', 'F'] 
}: {
  size?: number;
  faceLabels?: string[];
}) => (
  <svg width={size} height={size} viewBox="0 0 240 180">
    {/* 十字型展開図 */}
    {/* 上面 */}
    <rect x="60" y="0" width="60" height="60" fill="white" stroke="black" strokeWidth="2" />
    <text x="90" y="35" textAnchor="middle" fontSize="20" fontWeight="bold">{faceLabels[0]}</text>
    
    {/* 中央行 */}
    <rect x="0" y="60" width="60" height="60" fill="white" stroke="black" strokeWidth="2" />
    <text x="30" y="95" textAnchor="middle" fontSize="20" fontWeight="bold">{faceLabels[1]}</text>
    
    <rect x="60" y="60" width="60" height="60" fill="white" stroke="black" strokeWidth="2" />
    <text x="90" y="95" textAnchor="middle" fontSize="20" fontWeight="bold">{faceLabels[2]}</text>
    
    <rect x="120" y="60" width="60" height="60" fill="white" stroke="black" strokeWidth="2" />
    <text x="150" y="95" textAnchor="middle" fontSize="20" fontWeight="bold">{faceLabels[3]}</text>
    
    <rect x="180" y="60" width="60" height="60" fill="white" stroke="black" strokeWidth="2" />
    <text x="210" y="95" textAnchor="middle" fontSize="20" fontWeight="bold">{faceLabels[4]}</text>
    
    {/* 下面 */}
    <rect x="60" y="120" width="60" height="60" fill="white" stroke="black" strokeWidth="2" />
    <text x="90" y="155" textAnchor="middle" fontSize="20" fontWeight="bold">{faceLabels[5]}</text>
  </svg>
);