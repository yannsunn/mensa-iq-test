// 問題カテゴリーに応じた画像プロンプト生成ユーティリティ

import { UnifiedQuestion } from '@/types/question';

// CubeDataからCubeStateへの変換関数
interface CubeState {
  front: { label: string };
  top: { label: string };
  right: { label: string };
  back?: { label: string };
  bottom?: { label: string };
  left?: { label: string };
}

interface CubeDataInput {
  front?: string | { label: string };
  top?: string | { label: string };
  right?: string | { label: string };
  back?: string | { label: string };
  bottom?: string | { label: string };
  left?: string | { label: string };
}

const transformCubeDataToState = (cubeData: CubeDataInput | undefined): CubeState | null => {
  if (!cubeData) return null;
  
  const result: Partial<CubeState> = {};
  
  if (typeof cubeData.front === 'string') {
    result.front = { label: cubeData.front };
  } else if (cubeData.front?.label) {
    result.front = cubeData.front;
  }
  
  if (typeof cubeData.top === 'string') {
    result.top = { label: cubeData.top };
  } else if (cubeData.top?.label) {
    result.top = cubeData.top;
  }
  
  if (typeof cubeData.right === 'string') {
    result.right = { label: cubeData.right };
  } else if (cubeData.right?.label) {
    result.right = cubeData.right;
  }
  
  if (typeof cubeData.back === 'string') {
    result.back = { label: cubeData.back };
  } else if (cubeData.back?.label) {
    result.back = cubeData.back;
  }
  
  if (typeof cubeData.bottom === 'string') {
    result.bottom = { label: cubeData.bottom };
  } else if (cubeData.bottom?.label) {
    result.bottom = cubeData.bottom;
  }
  
  if (typeof cubeData.left === 'string') {
    result.left = { label: cubeData.left };
  } else if (cubeData.left?.label) {
    result.left = cubeData.left;
  }
  
  // 必須プロパティが存在するか確認
  if (!result.front || !result.top || !result.right) {
    return null;
  }
  
  return result as CubeState;
};

// SVGまたはAI画像生成の判定と実行
export const generateVisualContent = async (question: UnifiedQuestion): Promise<{
  type: 'svg' | 'ai';
  content: string;
  prompt?: string;
}> => {
  // まずSVG生成を試みる（コスト削減）
  if (canGenerateWithSVG(question)) {
    try {
      const svgContent = await generateSVGForQuestion(question);
      if (svgContent) {
        return {
          type: 'svg',
          content: svgContent
        };
      }
    } catch (error) {
      console.error('SVG generation failed:', error);
    }
  }

  // SVG生成できない場合はAI画像生成用プロンプトを返す
  return {
    type: 'ai',
    content: generateImagePrompt(question),
    prompt: generateImagePrompt(question)
  };
};

// SVGで問題の図形を生成
const generateSVGForQuestion = async (question: UnifiedQuestion): Promise<string | null> => {
  const { category, question: questionText, visualData } = question;

  // 立方体問題のSVG生成
  if (category === 'spatial' && visualData?.type === 'cube') {
    const { generateCubeSVG } = await import('@/lib/svgCubeGenerator');
    
    if (visualData.visualType === 'cube_rotation') {
      return generateCubeSVG('rotation', {
        state: transformCubeDataToState(visualData.cubeData?.initialState) || {
          front: { label: 'A' },
          top: { label: 'B' },
          right: { label: 'C' }
        },
        rotationX: 0,
        rotationY: 90
      });
    } else if (visualData.visualType === 'net_to_cube') {
      const labels = visualData.cubeData?.netLabels || ['1', '2', '3', '4', '5', '6'];
      return generateCubeSVG('net', {
        faces: labels.map(label => ({ label }))
      });
    } else {
      return generateCubeSVG('isometric', {
        state: transformCubeDataToState(visualData.cubeData?.initialState) || {
          front: { label: '前' },
          top: { label: '上' },
          right: { label: '右' }
        }
      });
    }
  }

  // 行列問題のSVG生成
  if (category === 'matrix' && visualData?.data) {
    const data = visualData.data as { size?: string; pattern?: string };
    if (data.size === '3x3') {
      return generateMatrixSVG(3, 3, data.pattern || 'pattern');
    } else if (data.size === '4x4') {
      return generateMatrixSVG(4, 4, data.pattern || 'pattern');
    }
  }

  // パターン問題のSVG生成
  if (category === 'pattern' && visualData?.data) {
    const data = visualData.data as { elements?: string[]; sequence?: string };
    return generatePatternSVG(data.elements || []);
  }

  // 数値問題のSVG生成
  if (category === 'numerical' && questionText.includes('数列')) {
    return generateNumberSequenceSVG(question.options);
  }

  return null;
};

// 行列パターンのSVG生成
const generateMatrixSVG = (rows: number, cols: number, pattern: string): string => {
  const cellSize = 60;
  const width = cols * cellSize + 40;
  const height = rows * cellSize + 40;
  
  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<rect width="${width}" height="${height}" fill="white"/>`;
  
  // グリッドを描画
  for (let i = 0; i <= rows; i++) {
    svg += `<line x1="20" y1="${20 + i * cellSize}" x2="${width - 20}" y2="${20 + i * cellSize}" stroke="black" stroke-width="2"/>`;
  }
  for (let j = 0; j <= cols; j++) {
    svg += `<line x1="${20 + j * cellSize}" y1="20" x2="${20 + j * cellSize}" y2="${height - 20}" stroke="black" stroke-width="2"/>`;
  }
  
  // パターンに応じて図形を配置
  const shapes = ['circle', 'square', 'triangle'];
  const fillPatterns = ['none', 'black', 'striped'];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const centerX = 20 + col * cellSize + cellSize / 2;
      const centerY = 20 + row * cellSize + cellSize / 2;
      const size = cellSize * 0.6;
      
      // パターンに基づいて図形を選択
      let shapeIndex = 0;
      let fillIndex = 0;
      
      switch (pattern) {
        case 'rotation':
          shapeIndex = (row + col) % shapes.length;
          fillIndex = row % fillPatterns.length;
          break;
        case 'symmetry':
          shapeIndex = (row === col) ? 0 : (row < col) ? 1 : 2;
          fillIndex = Math.abs(row - col) % fillPatterns.length;
          break;
        case 'logical':
          shapeIndex = (row * cols + col) % shapes.length;
          fillIndex = ((row + col) % 2 === 0) ? 0 : 1;
          break;
        case 'numerical':
          const value = row * cols + col + 1;
          shapeIndex = (value % 3);
          fillIndex = (value % 5 < 2) ? 0 : 1;
          break;
        default:
          shapeIndex = (row + col) % shapes.length;
          fillIndex = 0;
      }
      
      // 最後のセルを？マークにする（問題用）
      if (row === rows - 1 && col === cols - 1) {
        svg += `<text x="${centerX}" y="${centerY + 10}" text-anchor="middle" font-size="36" font-weight="bold">?</text>`;
      } else {
        // 図形を描画
        const shape = shapes[shapeIndex];
        const fill = fillPatterns[fillIndex];
        
        switch (shape) {
          case 'circle':
            svg += `<circle cx="${centerX}" cy="${centerY}" r="${size/2}" fill="${fill === 'black' ? 'black' : 'none'}" stroke="black" stroke-width="2"`;
            if (fill === 'striped') {
              svg += ` fill="url(#stripes${row}${col})"`;
            }
            svg += '/>';
            break;
          case 'square':
            svg += `<rect x="${centerX - size/2}" y="${centerY - size/2}" width="${size}" height="${size}" fill="${fill === 'black' ? 'black' : 'none'}" stroke="black" stroke-width="2"`;
            if (fill === 'striped') {
              svg += ` fill="url(#stripes${row}${col})"`;
            }
            svg += '/>';
            break;
          case 'triangle':
            const points = `${centerX},${centerY - size/2} ${centerX - size/2},${centerY + size/2} ${centerX + size/2},${centerY + size/2}`;
            svg += `<polygon points="${points}" fill="${fill === 'black' ? 'black' : 'none'}" stroke="black" stroke-width="2"`;
            if (fill === 'striped') {
              svg += ` fill="url(#stripes${row}${col})"`;
            }
            svg += '/>';
            break;
        }
        
        // ストライプパターンの定義
        if (fill === 'striped') {
          svg = `<defs><pattern id="stripes${row}${col}" patternUnits="userSpaceOnUse" width="4" height="4"><line x1="0" y1="0" x2="0" y2="4" stroke="black" stroke-width="1"/></pattern></defs>` + svg;
        }
      }
    }
  }
  
  svg += '</svg>';
  return svg;
};

// パターンシーケンスのSVG生成
const generatePatternSVG = (elements: string[]): string => {
  const elementSize = 50;
  const spacing = 20;
  const width = elements.length * (elementSize + spacing) + spacing;
  const height = elementSize + 40;
  
  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<rect width="${width}" height="${height}" fill="white"/>`;
  
  elements.forEach((element, index) => {
    const x = spacing + index * (elementSize + spacing) + elementSize / 2;
    const y = height / 2;
    
    // 図形を描画
    switch (element) {
      case '○':
        svg += `<circle cx="${x}" cy="${y}" r="${elementSize/2}" fill="none" stroke="black" stroke-width="2"/>`;
        break;
      case '△':
        svg += `<polygon points="${x},${y-elementSize/2} ${x-elementSize/2},${y+elementSize/2} ${x+elementSize/2},${y+elementSize/2}" fill="none" stroke="black" stroke-width="2"/>`;
        break;
      case '□':
        svg += `<rect x="${x-elementSize/2}" y="${y-elementSize/2}" width="${elementSize}" height="${elementSize}" fill="none" stroke="black" stroke-width="2"/>`;
        break;
    }
  });
  
  svg += '</svg>';
  return svg;
};

// 数列のSVG生成
const generateNumberSequenceSVG = (numbers: string[]): string => {
  const boxSize = 60;
  const spacing = 10;
  const width = numbers.length * (boxSize + spacing) + spacing;
  const height = boxSize + 20;
  
  let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<rect width="${width}" height="${height}" fill="white"/>`;
  
  numbers.forEach((num, index) => {
    const x = spacing + index * (boxSize + spacing);
    const y = 10;
    
    svg += `<rect x="${x}" y="${y}" width="${boxSize}" height="${boxSize}" fill="white" stroke="black" stroke-width="2" rx="5"/>`;
    svg += `<text x="${x + boxSize/2}" y="${y + boxSize/2 + 5}" text-anchor="middle" font-size="20" font-family="Arial">${num}</text>`;
  });
  
  svg += '</svg>';
  return svg;
};

export const generateImagePrompt = (question: UnifiedQuestion): string => {
  const { category, question: questionText, visualData } = question;

  // 基本的なスタイル設定
  const baseStyle = "clean, minimalist, black and white line drawing, high contrast, educational diagram style";

  switch (category) {
    case 'spatial':
      if (visualData?.visualType === 'cube_rotation') {
        return `3D cube with labeled faces showing rotation, ${baseStyle}, isometric view, clear face labels`;
      } else if (visualData?.visualType === 'net_to_cube') {
        return `Cube net diagram showing unfolded cube with labeled faces, ${baseStyle}, flat layout`;
      } else if (visualData?.visualType === 'opposite_faces') {
        return `Transparent cube showing opposite face relationships, ${baseStyle}, perspective view`;
      }
      return `3D geometric shape visualization for spatial reasoning, ${baseStyle}`;

    case 'matrix':
      if (questionText.includes('3×3')) {
        return `3x3 matrix grid pattern with geometric shapes, ${baseStyle}, clear grid lines`;
      } else if (questionText.includes('4×4')) {
        return `4x4 matrix grid pattern with geometric shapes, ${baseStyle}, clear grid lines`;
      }
      return `Matrix pattern puzzle with missing element marked with ?, ${baseStyle}`;

    case 'pattern':
      if (questionText.includes('回転')) {
        return `Sequence showing rotation pattern of shapes, ${baseStyle}, arrow indicators`;
      } else if (questionText.includes('対称')) {
        return `Symmetrical pattern demonstration, ${baseStyle}, mirror lines shown`;
      }
      return `Abstract pattern sequence for IQ test, ${baseStyle}`;

    case 'numerical':
      if (questionText.includes('数列')) {
        return `Number sequence visualization with boxes, ${baseStyle}, clear numbers`;
      } else if (questionText.includes('幾何')) {
        return `Geometric number pattern visualization, ${baseStyle}`;
      }
      return `Mathematical pattern visualization, ${baseStyle}`;

    case 'logical':
      if (questionText.includes('ベン図')) {
        return `Venn diagram showing logical relationships, ${baseStyle}, clear labels`;
      } else if (questionText.includes('論理')) {
        return `Logic diagram with symbols and connections, ${baseStyle}`;
      }
      return `Logical reasoning diagram, ${baseStyle}`;

    case 'visual':
      return `Visual intelligence test pattern, ${baseStyle}, geometric shapes`;

    default:
      return `Abstract IQ test diagram for ${category} reasoning, ${baseStyle}`;
  }
};

// 特定のキーワードから画像が必要かどうかを判定
export const needsVisualRepresentation = (question: UnifiedQuestion): boolean => {
  // 立方体問題の特別なケースをチェック
  if (question.visualData?.type === 'cube') {
    return true;
  }

  const visualKeywords = [
    '立方体', '展開図', '回転', '対称', '3×3', '4×4', '行列', 'マトリックス',
    'パターン', '図形', '幾何', 'ベン図', '視覚', '空間', '3D', '断面',
    'cube', 'rotation', 'matrix', 'pattern', 'spatial', 'visual', 'geometric',
    '次の図形', '?に入る', '空欄', 'シーケンス'
  ];

  const questionLower = question.question.toLowerCase();
  
  // より具体的な判定
  // 空間認識カテゴリーで立方体関連のキーワードがある場合
  if (question.category === 'spatial' && 
      (questionLower.includes('立方体') || questionLower.includes('展開図') || 
       questionLower.includes('回転') || questionLower.includes('面'))) {
    return true;
  }
  
  // 行列カテゴリーで行列パターンのキーワードがある場合
  if (question.category === 'matrix' && 
      (questionLower.includes('行列') || questionLower.includes('×') || 
       questionLower.includes('パターン') || questionLower.includes('?'))) {
    return true;
  }
  
  // パターンカテゴリーは常に画像が必要
  if (question.category === 'pattern') {
    return true;
  }

  // その他のキーワードで判定
  return visualKeywords.some(keyword => questionLower.includes(keyword.toLowerCase()));
};

// SVGで生成可能な図形かどうかを判定
export const canGenerateWithSVG = (question: UnifiedQuestion): boolean => {
  const svgCompatibleTypes = [
    'matrix', 'pattern', 'geometric', 'numerical'
  ];

  if (question.visualData?.type && svgCompatibleTypes.includes(question.visualData.type)) {
    return true;
  }

  // 単純な幾何学図形の場合
  const svgKeywords = ['円', '三角形', '四角形', '多角形', '線', '点', '矢印'];
  return svgKeywords.some(keyword => question.question.includes(keyword));
};