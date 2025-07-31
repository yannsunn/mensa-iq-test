// 問題カテゴリーに応じた画像プロンプト生成ユーティリティ

import { UnifiedQuestion } from '@/types/question';
import { generateSVGDiagram, DiagramType } from '@/lib/svgDiagramGenerator';

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

  // 行列問題のSVG生成
  if (category === 'matrix' && visualData?.data) {
    const data = visualData.data as any;
    if (data.size === '3x3') {
      return generateMatrixSVG(3, 3, data.pattern);
    } else if (data.size === '4x4') {
      return generateMatrixSVG(4, 4, data.pattern);
    }
  }

  // パターン問題のSVG生成
  if (category === 'pattern' && visualData?.data) {
    const data = visualData.data as any;
    return generatePatternSVG(data.elements || [], data.sequence);
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
  // 実装は省略（実際には各セルに図形を配置）
  
  svg += '</svg>';
  return svg;
};

// パターンシーケンスのSVG生成
const generatePatternSVG = (elements: string[], sequence: string): string => {
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
  const visualKeywords = [
    '立方体', '展開図', '回転', '対称', '3×3', '4×4', '行列', 'マトリックス',
    'パターン', '図形', '幾何', 'ベン図', '視覚', '空間', '3D', '断面',
    'cube', 'rotation', 'matrix', 'pattern', 'spatial', 'visual', 'geometric'
  ];

  const questionLower = question.question.toLowerCase();
  
  // カテゴリーで判定
  if (['spatial', 'matrix', 'visual', 'pattern'].includes(question.category)) {
    return true;
  }

  // キーワードで判定
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