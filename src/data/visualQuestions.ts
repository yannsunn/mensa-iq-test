import { Question } from '@/types';

// 拡張した質問タイプ
export interface VisualQuestion extends Question {
  visualType: 'raven_matrix' | 'cube_spatial' | 'pattern_sequence' | 'rotation' | 'text_only';
  visualData?: {
    matrix?: (string | null)[][];
    cubeType?: 'net_to_cube' | 'cube_rotation' | 'opposite_faces';
    netLabels?: string[];
    cubeViews?: Array<{
      showFaces: string[];
      colors: { [key: string]: string };
    }>;
    patterns?: string[];
    rotations?: number[];
  };
}

// 実際の視覚的MENSA/IQテスト問題
export const visualMensaQuestions: VisualQuestion[] = [
  // レイヴン行列タイプの問題
  {
    id: 'raven_1',
    category: 'matrix',
    difficulty: 8,
    visualType: 'raven_matrix',
    question: '3×3行列のパターンを分析して、右下の?に入る図形を選んでください',
    options: ['dots_3', 'circle_in_square', 'triangle_up', 'cross'],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '各行で点の数が3個で一定のパターンです',
    visualData: {
      matrix: [
        ['dots_3', 'lines_horizontal', 'circle_in_square'],
        ['triangle_up', 'dots_3', 'lines_horizontal'],
        ['circle_in_square', 'triangle_up', null]
      ]
    }
  },

  {
    id: 'raven_2',
    category: 'matrix',
    difficulty: 12,
    visualType: 'raven_matrix',
    question: 'パターンの変化を分析して、?に入る図形を特定してください',
    options: ['triangle_down', 'triangle_up', 'empty', 'cross'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '各行で図形が上向き→十字→下向きの順番で変化します',
    visualData: {
      matrix: [
        ['triangle_up', 'cross', 'triangle_down'],
        ['triangle_down', 'triangle_up', 'cross'],
        ['cross', 'triangle_down', null]
      ]
    }
  },

  {
    id: 'raven_3',
    category: 'matrix',
    difficulty: 15,
    visualType: 'raven_matrix',
    question: '複雑なパターン変化を解析してください',
    options: ['lines_vertical', 'dots_diagonal', 'circle_in_square', 'empty'],
    correctAnswer: 1,
    timeLimit: 200,
    explanation: '対角線上の要素は diagonal パターンで統一されています',
    visualData: {
      matrix: [
        ['dots_diagonal', 'lines_horizontal', 'circle_in_square'],
        ['lines_vertical', 'dots_diagonal', 'lines_horizontal'],
        ['circle_in_square', 'lines_vertical', null]
      ]
    }
  },

  // 立方体・空間認識問題
  {
    id: 'cube_1',
    category: 'spatial',
    difficulty: 9,
    visualType: 'cube_spatial',
    question: 'この展開図を組み立てて立方体にした時、面Aの向かい側にある面はどれですか？',
    options: ['面B', '面D', '面E', '面F'],
    correctAnswer: 2,
    timeLimit: 120,
    explanation: '十字型展開図では、中央から2つ離れた面が向かい合います',
    visualData: {
      cubeType: 'opposite_faces',
      netLabels: ['A', 'B', 'C', 'D', 'E', 'F']
    }
  },

  {
    id: 'cube_2',
    category: 'spatial',
    difficulty: 13,
    visualType: 'cube_spatial',
    question: '立方体の回転：左の立方体を時計回りに90度回転させると、どの向きになりますか？',
    options: ['選択肢A', '選択肢B', '選択肢C', '選択肢D'],
    correctAnswer: 1,
    timeLimit: 180,
    explanation: '時計回りに90度回転により、右面が前面に移動します',
    visualData: {
      cubeType: 'cube_rotation',
      cubeViews: [
        {
          showFaces: ['front', 'top', 'right'],
          colors: { front: '#ff6b6b', top: '#4ecdc4', right: '#ffe66d' }
        },
        {
          showFaces: ['front', 'top', 'right'],
          colors: { front: '#ff6b6b', top: '#4ecdc4', right: '#ffe66d' }
        },
        {
          showFaces: ['front', 'top', 'right'],
          colors: { front: '#ffe66d', top: '#4ecdc4', right: '#95e1d3' }
        },
        {
          showFaces: ['front', 'top', 'right'],
          colors: { front: '#a8e6cf', top: '#4ecdc4', right: '#ff6b6b' }
        },
        {
          showFaces: ['front', 'top', 'right'],
          colors: { front: '#ffd93d', top: '#4ecdc4', right: '#ff8b94' }
        },
        {
          showFaces: ['front', 'top', 'right'],
          colors: { front: '#74b9ff', top: '#4ecdc4', right: '#fd79a8' }
        }
      ]
    }
  },

  {
    id: 'cube_3',
    category: 'spatial',
    difficulty: 16,
    visualType: 'cube_spatial',
    question: 'この展開図で、向かい合う面のペアとして正しいのはどれですか？',
    options: [
      'A-D, B-E, C-F',
      'A-F, B-D, C-E', 
      'A-E, B-F, C-D',
      'A-C, B-D, E-F'
    ],
    correctAnswer: 1,
    timeLimit: 200,
    explanation: '十字型展開図の向かい合う面の法則により A-F, B-D, C-E が正解',
    visualData: {
      cubeType: 'opposite_faces',
      netLabels: ['A', 'B', 'C', 'D', 'E', 'F']
    }
  },

  // 数値パターン（視覚的表現付き）
  {
    id: 'visual_numerical_1',
    category: 'numerical',
    difficulty: 7,
    visualType: 'pattern_sequence',
    question: '図形の数の変化パターンを見つけて、次に来る数字を選んでください',
    options: ['8', '13', '21', '34'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: 'フィボナッチ数列: 1, 1, 2, 3, 5, 8...',
    visualData: {
      patterns: ['1個の○', '1個の○', '2個の○', '3個の○', '5個の○', '?個の○']
    }
  },

  {
    id: 'visual_numerical_2',
    category: 'numerical',
    difficulty: 11,
    visualType: 'pattern_sequence',
    question: '図形の配置パターンから次の数を推測してください',
    options: ['16', '25', '36', '49'],
    correctAnswer: 2,
    timeLimit: 120,
    explanation: '完全平方数の数列: 1², 2², 3², 4², 5², 6² = 36',
    visualData: {
      patterns: ['1×1の正方形', '2×2の正方形', '3×3の正方形', '4×4の正方形', '5×5の正方形', '?×?の正方形']
    }
  },

  // 論理推論（視覚的補助付き）
  {
    id: 'visual_logical_1',
    category: 'logical',
    difficulty: 10,
    visualType: 'text_only',
    question: 'ベン図を想像してください：すべての猫は哺乳類です。すべての哺乳類は動物です。タマは猫です。タマについて確実に言えることは？',
    options: [
      'タマは動物である',
      'タマは鳥である',
      'タマは魚である',
      '判断できない'
    ],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '三段論法により、タマ→猫→哺乳類→動物'
  },

  {
    id: 'visual_logical_2',
    category: 'logical',
    difficulty: 14,
    visualType: 'text_only',
    question: '論理的推論：AはBより背が高い。CはAより背が低い。DはCより背が高いがBより背が低い。身長の順序は？',
    options: [
      'A > B > D > C',
      'A > D > B > C',
      'A > C > B > D',
      'B > A > D > C'
    ],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '与えられた条件を整理すると A > B > D > C の順序になります'
  },

  // 抽象的パターン認識
  {
    id: 'abstract_visual_1',
    category: 'abstract',
    difficulty: 12,
    visualType: 'raven_matrix',
    question: '抽象的なパターンの変化を認識してください',
    options: ['empty', 'dots_3', 'cross', 'triangle_up'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '各行で要素が1つずつ減少していくパターンです',
    visualData: {
      matrix: [
        ['cross', 'triangle_up', 'dots_3'],
        ['triangle_up', 'dots_3', 'empty'],
        ['dots_3', 'empty', null]
      ]
    }
  },

  {
    id: 'abstract_visual_2',
    category: 'abstract',
    difficulty: 17,
    visualType: 'raven_matrix',
    question: '高次のパターン認識：複数の変換ルールが同時に適用されています',
    options: ['lines_vertical', 'circle_in_square', 'dots_diagonal', 'triangle_down'],
    correctAnswer: 2,
    timeLimit: 220,
    explanation: '回転と位置移動の複合変換パターンです',
    visualData: {
      matrix: [
        ['triangle_up', 'lines_horizontal', 'circle_in_square'],
        ['circle_in_square', 'triangle_up', 'lines_horizontal'],
        ['lines_horizontal', 'circle_in_square', null]
      ]
    }
  },

  // 作業記憶（視覚的記憶課題）
  {
    id: 'visual_memory_1',
    category: 'memory',
    difficulty: 9,
    visualType: 'text_only',
    question: '次の図形の順番を覚えて、3番目の図形を答えてください：○, △, □, ◇, ★, ♠, ♥',
    options: ['○', '△', '□', '◇'],
    correctAnswer: 2,
    timeLimit: 60,
    explanation: '3番目の図形は□（四角形）です'
  },

  {
    id: 'visual_memory_2',
    category: 'memory',
    difficulty: 13,
    visualType: 'text_only',
    question: 'N-back視覚記憶：この図形列で2つ前と同じ図形はどれ？ ○, △, ○, □, △, ◇, □',
    options: ['位置3の○', '位置5の△', '位置7の□', '該当なし'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '位置7の□は位置4の□の2つ後（N-back記憶）'
  },

  // 最高難易度問題
  {
    id: 'ultimate_visual',
    category: 'matrix',
    difficulty: 20,
    visualType: 'raven_matrix',
    question: '最高難易度：4層の複合変換パターンを解析してください',
    options: ['dots_diagonal', 'empty', 'cross', 'circle_in_square'],
    correctAnswer: 0,
    timeLimit: 300,
    explanation: '回転、反転、位置移動、要素変化の4層変換の結果です',
    visualData: {
      matrix: [
        ['triangle_up', 'lines_horizontal', 'circle_in_square'],
        ['circle_in_square', 'cross', 'triangle_down'],
        ['lines_vertical', 'triangle_down', null]
      ]
    }
  }
];

// 視覚問題のフィルタリング関数
export const getVisualQuestionsByType = (visualType: VisualQuestion['visualType']): VisualQuestion[] => {
  return visualMensaQuestions.filter(q => q.visualType === visualType);
};

export const getVisualQuestionsByDifficulty = (min: number, max: number): VisualQuestion[] => {
  return visualMensaQuestions.filter(q => q.difficulty >= min && q.difficulty <= max);
};

// MENSA標準の視覚問題セット生成
export const generateVisualMensaTestSet = (): VisualQuestion[] => {
  const testSet: VisualQuestion[] = [];
  
  // 各タイプから均等に選択
  const types: VisualQuestion['visualType'][] = ['raven_matrix', 'cube_spatial', 'text_only'];
  
  types.forEach(type => {
    const typeQuestions = getVisualQuestionsByType(type);
    const sortedQuestions = typeQuestions.sort((a, b) => a.difficulty - b.difficulty);
    
    // 各タイプから3-4問選択
    const count = type === 'raven_matrix' ? 4 : 3;
    for (let i = 0; i < count && i < sortedQuestions.length; i++) {
      testSet.push(sortedQuestions[i]);
    }
  });
  
  // 残りの問題を難易度でバランス
  const remainingQuestions = visualMensaQuestions
    .filter(q => !testSet.includes(q))
    .sort((a, b) => a.difficulty - b.difficulty);
  
  const needed = Math.max(0, 15 - testSet.length); // 15問の視覚問題を目標
  for (let i = 0; i < needed && i < remainingQuestions.length; i++) {
    testSet.push(remainingQuestions[i]);
  }
  
  return testSet.sort((a, b) => a.difficulty - b.difficulty);
};

// エクスポート
export const visualQuestions = visualMensaQuestions;