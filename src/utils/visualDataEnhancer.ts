// 問題データにvisualDataを自動追加するユーティリティ

import { UnifiedQuestion, VisualData } from '@/types/question';

// 問題内容から適切なvisualDataを生成
export const enhanceQuestionWithVisualData = (question: UnifiedQuestion): UnifiedQuestion => {
  // すでにvisualDataがある場合はそのまま返す
  if (question.visualData) {
    return question;
  }

  const visualData = generateVisualData(question);
  if (visualData) {
    return {
      ...question,
      visualData
    };
  }

  return question;
};

// 問題タイプに応じたvisualDataを生成
const generateVisualData = (question: UnifiedQuestion): VisualData | null => {
  const { category, question: questionText } = question;
  const lowerText = questionText.toLowerCase();

  // 空間認識問題
  if (category === 'spatial') {
    if (lowerText.includes('立方体') || lowerText.includes('cube')) {
      if (lowerText.includes('展開図') || lowerText.includes('net')) {
        return {
          type: 'cube',
          visualType: 'net_to_cube',
          cubeData: {
            netLabels: extractNetLabels(questionText)
          }
        };
      } else if (lowerText.includes('回転') || lowerText.includes('rotation')) {
        return {
          type: 'cube',
          visualType: 'cube_rotation',
          cubeData: {
            initialState: extractCubeFaces(questionText),
            rotation: extractRotation(questionText)
          }
        };
      } else if (lowerText.includes('対面') || lowerText.includes('opposite')) {
        return {
          type: 'cube',
          visualType: 'opposite_faces',
          cubeData: {
            initialState: extractCubeFaces(questionText)
          }
        };
      }
    }
    
    // その他の3D図形
    if (lowerText.includes('四面体') || lowerText.includes('tetrahedron')) {
      return {
        type: 'geometric',
        data: { shape: 'tetrahedron' }
      };
    }
  }

  // 行列問題
  if (category === 'matrix') {
    if (lowerText.includes('3×3') || lowerText.includes('3x3')) {
      return {
        type: 'matrix',
        data: { size: '3x3', pattern: extractMatrixPattern(questionText) }
      };
    } else if (lowerText.includes('4×4') || lowerText.includes('4x4')) {
      return {
        type: 'matrix',
        data: { size: '4x4', pattern: extractMatrixPattern(questionText) }
      };
    }
  }

  // パターン問題
  if (category === 'pattern') {
    return {
      type: 'pattern',
      data: { 
        sequence: extractSequenceType(questionText),
        elements: extractPatternElements(questionText)
      }
    };
  }

  return null;
};

// ヘルパー関数群
const extractNetLabels = (text: string): string[] => {
  // 色や記号を抽出
  const colorPattern = /[赤青緑黄紫橙白黒]/g;
  const symbolPattern = /[○△□◇☆★]/g;
  const numberPattern = /[1-6]/g;
  
  const colors = text.match(colorPattern) || [];
  const symbols = text.match(symbolPattern) || [];
  const numbers = text.match(numberPattern) || [];
  
  if (colors.length >= 6) return colors.slice(0, 6);
  if (symbols.length >= 6) return symbols.slice(0, 6);
  if (numbers.length >= 6) return numbers.slice(0, 6);
  
  // デフォルト
  return ['1', '2', '3', '4', '5', '6'];
};

interface CubeFaceData {
  readonly front: string;
  readonly top: string;
  readonly right: string;
  readonly back?: string;
  readonly bottom?: string;
  readonly left?: string;
}

const extractCubeFaces = (text: string): CubeFaceData => {
  let front = 'A';
  let top = 'B';
  let right = 'C';
  let back: string | undefined;
  let bottom: string | undefined;
  let left: string | undefined;
  
  // 面の情報を抽出
  if (text.includes('前面') || text.includes('front')) {
    front = extractFaceValue(text);
  }
  if (text.includes('上面') || text.includes('top')) {
    top = extractFaceValue(text);
  }
  if (text.includes('右面') || text.includes('right')) {
    right = extractFaceValue(text);
  }
  if (text.includes('後面') || text.includes('back')) {
    back = extractFaceValue(text);
  }
  if (text.includes('下面') || text.includes('bottom')) {
    bottom = extractFaceValue(text);
  }
  if (text.includes('左面') || text.includes('left')) {
    left = extractFaceValue(text);
  }
  
  // 必須プロパティを含むオブジェクトを返す
  return {
    front,
    top,
    right,
    ...(back && { back }),
    ...(bottom && { bottom }),
    ...(left && { left })
  } as CubeFaceData;
};

const extractFaceValue = (text: string): string => {
  // 実装を簡略化
  const patterns = ['○', '△', '□', '◇', '☆', 'A', 'B', 'C', 'D'];
  for (const pattern of patterns) {
    if (text.includes(pattern)) {
      return pattern;
    }
  }
  return 'X';
};

const extractRotation = (text: string): string => {
  if (text.includes('90度') || text.includes('90°')) return '90deg';
  if (text.includes('180度') || text.includes('180°')) return '180deg';
  if (text.includes('270度') || text.includes('270°')) return '270deg';
  if (text.includes('時計回り')) return 'clockwise';
  if (text.includes('反時計回り')) return 'counterclockwise';
  return '90deg';
};

const extractMatrixPattern = (text: string): string => {
  if (text.includes('回転')) return 'rotation';
  if (text.includes('対称')) return 'symmetry';
  if (text.includes('論理')) return 'logical';
  if (text.includes('数') || text.includes('合計')) return 'numerical';
  return 'pattern';
};

const extractSequenceType = (text: string): string => {
  if (text.includes('次')) return 'next';
  if (text.includes('欠け')) return 'missing';
  if (text.includes('規則')) return 'rule';
  return 'sequence';
};

const extractPatternElements = (text: string): string[] => {
  const elements = [];
  const shapes = ['○', '△', '□', '◇', '☆', '●', '▲', '■'];
  
  for (const shape of shapes) {
    if (text.includes(shape)) {
      elements.push(shape);
    }
  }
  
  return elements.length > 0 ? elements : ['○', '△', '□'];
};