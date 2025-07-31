// 問題カテゴリーに応じた画像プロンプト生成ユーティリティ

import { UnifiedQuestion } from '@/types/question';

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