// 事前生成SVG画像を作成するユーティリティ
import fs from 'fs';
import path from 'path';

// 基本的な立方体SVG
export const generateCubeBasicSVG = (): string => {
  return `<svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="300" fill="white"/>
    <!-- 立方体の等角投影図 -->
    <g transform="translate(150,150)">
      <!-- 後面 -->
      <path d="M -50,-50 L 0,-75 L 50,-50 L 50,0 L 0,25 L -50,0 Z" 
            fill="none" stroke="black" stroke-width="2" stroke-dasharray="5,5"/>
      <!-- 前面 -->
      <path d="M -50,0 L 0,-25 L 50,0 L 50,50 L 0,75 L -50,50 Z" 
            fill="none" stroke="black" stroke-width="2"/>
      <!-- 接続線 -->
      <line x1="-50" y1="-50" x2="-50" y2="0" stroke="black" stroke-width="2"/>
      <line x1="0" y1="-75" x2="0" y2="-25" stroke="black" stroke-width="2"/>
      <line x1="50" y1="-50" x2="50" y2="0" stroke="black" stroke-width="2"/>
    </g>
  </svg>`;
};

// 立方体展開図（十字型）
export const generateCubeNetCrossSVG = (): string => {
  return `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="white"/>
    <g transform="translate(50,50)">
      <!-- 十字型展開図 -->
      <rect x="60" y="0" width="60" height="60" fill="none" stroke="black" stroke-width="2"/>
      <text x="90" y="35" text-anchor="middle" font-size="20">上</text>
      
      <rect x="0" y="60" width="60" height="60" fill="none" stroke="black" stroke-width="2"/>
      <text x="30" y="95" text-anchor="middle" font-size="20">左</text>
      
      <rect x="60" y="60" width="60" height="60" fill="none" stroke="black" stroke-width="2"/>
      <text x="90" y="95" text-anchor="middle" font-size="20">前</text>
      
      <rect x="120" y="60" width="60" height="60" fill="none" stroke="black" stroke-width="2"/>
      <text x="150" y="95" text-anchor="middle" font-size="20">右</text>
      
      <rect x="180" y="60" width="60" height="60" fill="none" stroke="black" stroke-width="2"/>
      <text x="210" y="95" text-anchor="middle" font-size="20">後</text>
      
      <rect x="60" y="120" width="60" height="60" fill="none" stroke="black" stroke-width="2"/>
      <text x="90" y="155" text-anchor="middle" font-size="20">下</text>
    </g>
  </svg>`;
};

// 3×3行列の基本パターン
export const generateMatrix3x3BasicSVG = (): string => {
  return `<svg width="220" height="220" xmlns="http://www.w3.org/2000/svg">
    <rect width="220" height="220" fill="white"/>
    <!-- グリッド -->
    <line x1="20" y1="20" x2="200" y2="20" stroke="black" stroke-width="2"/>
    <line x1="20" y1="80" x2="200" y2="80" stroke="black" stroke-width="2"/>
    <line x1="20" y1="140" x2="200" y2="140" stroke="black" stroke-width="2"/>
    <line x1="20" y1="200" x2="200" y2="200" stroke="black" stroke-width="2"/>
    
    <line x1="20" y1="20" x2="20" y2="200" stroke="black" stroke-width="2"/>
    <line x1="80" y1="20" x2="80" y2="200" stroke="black" stroke-width="2"/>
    <line x1="140" y1="20" x2="140" y2="200" stroke="black" stroke-width="2"/>
    <line x1="200" y1="20" x2="200" y2="200" stroke="black" stroke-width="2"/>
    
    <!-- サンプル図形 -->
    <circle cx="50" cy="50" r="20" fill="none" stroke="black" stroke-width="2"/>
    <rect x="90" y="30" width="40" height="40" fill="none" stroke="black" stroke-width="2"/>
    <polygon points="170,30 190,70 150,70" fill="none" stroke="black" stroke-width="2"/>
    
    <rect x="30" y="90" width="40" height="40" fill="black"/>
    <circle cx="110" cy="110" r="20" fill="black"/>
    <polygon points="170,90 190,130 150,130" fill="black"/>
    
    <polygon points="50,150 70,190 30,190" fill="none" stroke="black" stroke-width="2"/>
    <circle cx="110" cy="170" r="20" fill="none" stroke="black" stroke-width="2"/>
    
    <!-- 最後のセルに？ -->
    <text x="170" y="180" text-anchor="middle" font-size="36" font-weight="bold">?</text>
  </svg>`;
};

// 数列表示用SVG
export const generateNumberSequenceBoxesSVG = (): string => {
  return `<svg width="400" height="80" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="80" fill="white"/>
    <!-- 数列ボックス -->
    <rect x="10" y="10" width="60" height="60" fill="white" stroke="black" stroke-width="2" rx="5"/>
    <text x="40" y="45" text-anchor="middle" font-size="24">2</text>
    
    <rect x="80" y="10" width="60" height="60" fill="white" stroke="black" stroke-width="2" rx="5"/>
    <text x="110" y="45" text-anchor="middle" font-size="24">4</text>
    
    <rect x="150" y="10" width="60" height="60" fill="white" stroke="black" stroke-width="2" rx="5"/>
    <text x="180" y="45" text-anchor="middle" font-size="24">8</text>
    
    <rect x="220" y="10" width="60" height="60" fill="white" stroke="black" stroke-width="2" rx="5"/>
    <text x="250" y="45" text-anchor="middle" font-size="24">16</text>
    
    <rect x="290" y="10" width="60" height="60" fill="white" stroke="black" stroke-width="2" rx="5"/>
    <text x="320" y="45" text-anchor="middle" font-size="36" font-weight="bold">?</text>
  </svg>`;
};

// パターンシーケンスSVG
export const generatePatternSequenceShapesSVG = (): string => {
  return `<svg width="350" height="100" xmlns="http://www.w3.org/2000/svg">
    <rect width="350" height="100" fill="white"/>
    <!-- パターンシーケンス -->
    <circle cx="40" cy="50" r="25" fill="none" stroke="black" stroke-width="2"/>
    
    <rect x="90" y="25" width="50" height="50" fill="none" stroke="black" stroke-width="2"/>
    
    <polygon points="190,25 215,75 165,75" fill="none" stroke="black" stroke-width="2"/>
    
    <circle cx="265" cy="50" r="25" fill="black"/>
    
    <text x="315" y="60" text-anchor="middle" font-size="36" font-weight="bold">?</text>
  </svg>`;
};

// デフォルトIQテストSVG
export const generateDefaultIQTestSVG = (): string => {
  return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="white"/>
    <circle cx="100" cy="100" r="80" fill="none" stroke="black" stroke-width="3"/>
    <text x="100" y="110" text-anchor="middle" font-size="48" font-weight="bold">IQ</text>
  </svg>`;
};

// SVGファイルを生成して保存
export const generateAndSavePresetSVGs = () => {
  const outputDir = path.join(process.cwd(), 'public', 'images');
  
  // ディレクトリが存在しない場合は作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const svgFiles = [
    { name: 'cube-basic.svg', content: generateCubeBasicSVG() },
    { name: 'cube-net-cross.svg', content: generateCubeNetCrossSVG() },
    { name: 'cube-rotation-120.svg', content: generateCubeBasicSVG() }, // 簡略化
    { name: 'matrix-3x3-basic.svg', content: generateMatrix3x3BasicSVG() },
    { name: 'matrix-3x3-rotation.svg', content: generateMatrix3x3BasicSVG() }, // 簡略化
    { name: 'number-sequence-boxes.svg', content: generateNumberSequenceBoxesSVG() },
    { name: 'pattern-sequence-shapes.svg', content: generatePatternSequenceShapesSVG() },
    { name: 'default-iq-test.svg', content: generateDefaultIQTestSVG() },
    // カテゴリー別デフォルト画像
    { name: 'default-spatial.svg', content: generateCubeBasicSVG() },
    { name: 'default-matrix.svg', content: generateMatrix3x3BasicSVG() },
    { name: 'default-pattern.svg', content: generatePatternSequenceShapesSVG() },
    { name: 'default-numerical.svg', content: generateNumberSequenceBoxesSVG() },
    { name: 'default-logical.svg', content: generateDefaultIQTestSVG() },
  ];
  
  svgFiles.forEach(({ name, content }) => {
    const filePath = path.join(outputDir, name);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Generated: ${name}`);
  });
  
  console.log(`\nAll SVG files generated successfully in: ${outputDir}`);
};