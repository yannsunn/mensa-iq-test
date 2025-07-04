import { Question } from '@/types';

// 拡張した視覚問題タイプ
export interface AdvancedVisualQuestion extends Question {
  visualType: 'raven_matrix' | 'cube_spatial' | 'pattern_sequence' | 'rotation' | 'text_only';
  visualData?: {
    matrix?: (string | null)[][];
    cubeType?: 'cube_net' | 'cube_rotation' | 'spatial_visualization';
    sequenceType?: 'numeric' | 'geometric' | 'logical' | 'alphabetic';
    sequence?: (string | number | null)[];
    netType?: 'cross' | 'L_shape' | 'T_shape';
    faceLabels?: string[];
    originalFaces?: { [key: string]: string };
    pattern?: string;
    rotations?: number[];
  };
}

// MENSA本番レベルの高品質視覚問題
export const advancedVisualQuestions: AdvancedVisualQuestion[] = [
  // レイヴン行列問題 - レベル1（基本）
  {
    id: 'advanced_raven_1',
    category: '行列推論',
    difficulty: 8,
    visualType: 'raven_matrix',
    question: '3×3行列のパターンを分析して、?に入る図形を選んでください',
    options: ['circle_solid', 'square_solid', 'triangle_solid', 'diamond_solid'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '各行で図形の種類が円→四角→三角の順番で変化し、各列でも同じパターンが繰り返されます。',
    visualData: {
      matrix: [
        ['circle_solid', 'square_solid', 'triangle_solid'],
        ['triangle_solid', 'circle_solid', 'square_solid'],
        ['square_solid', null, 'circle_solid']
      ]
    }
  },

  // レイヴン行列問題 - レベル2（中級）
  {
    id: 'advanced_raven_2',
    category: '行列推論',
    difficulty: 12,
    visualType: 'raven_matrix',
    question: '複雑なパターンを分析して、?に入る正しい図形を選んでください',
    options: ['dots_diagonal', 'double_circle', 'cross', 'plus_sign'],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '各行で点のパターンが1個→2個→3個（対角線）と増加し、各列でも同様のパターンです。',
    visualData: {
      matrix: [
        ['dots_1', 'dots_2', 'dots_diagonal'],
        ['dots_2', 'dots_diagonal', 'dots_4_corners'],
        ['dots_diagonal', null, 'triple_circle']
      ]
    }
  },

  // レイヴン行列問題 - レベル3（上級）
  {
    id: 'advanced_raven_3',
    category: '行列推論',
    difficulty: 16,
    visualType: 'raven_matrix',
    question: '高度なパターン認識：論理的関係を見つけて?を決定してください',
    options: ['square_in_circle', 'triangle_in_circle', 'circle_in_square', 'star'],
    correctAnswer: 2,
    timeLimit: 180,
    explanation: '各行で外側と内側の図形が交互に変化し、第3行では円が内側に来るパターンです。',
    visualData: {
      matrix: [
        ['circle_in_square', 'square_in_circle', 'triangle_in_circle'],
        ['square_in_circle', 'triangle_in_circle', 'circle_in_square'],
        ['triangle_in_circle', null, 'square_in_circle']
      ]
    }
  },

  // 空間認識問題 - 立方体展開図
  {
    id: 'spatial_cube_1',
    category: '空間認識',
    difficulty: 10,
    visualType: 'cube_spatial',
    question: 'この展開図を折りたたんだ時にできる立方体はどれですか？',
    options: [
      '{"front":"A","top":"B","right":"C"}',
      '{"front":"B","top":"A","right":"F"}', 
      '{"front":"C","top":"A","right":"B"}',
      '{"front":"A","top":"C","right":"B"}'
    ],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '展開図の隣接関係から、正面がA、上面がB、右面がCになります。',
    visualData: {
      cubeType: 'cube_net',
      netType: 'cross',
      faceLabels: ['A', 'B', 'C', 'D', 'E', 'F']
    }
  },

  // 空間認識問題 - 立方体回転
  {
    id: 'spatial_cube_2',
    category: '空間認識',
    difficulty: 14,
    visualType: 'cube_spatial',
    question: 'この立方体を回転させた時の見え方として正しいのはどれですか？',
    options: [
      '{"front":"C","top":"A","right":"B"}',
      '{"front":"B","top":"C","right":"A"}',
      '{"front":"A","top":"B","right":"C"}',
      '{"front":"C","top":"B","right":"A"}'
    ],
    correctAnswer: 1,
    timeLimit: 150,
    explanation: '90度右回転すると、各面の位置関係が変化します。',
    visualData: {
      cubeType: 'cube_rotation',
      originalFaces: { front: 'A', top: 'B', right: 'C' }
    }
  },

  // 数列パターン問題
  {
    id: 'pattern_numeric_1',
    category: '数列推論',
    difficulty: 6,
    visualType: 'pattern_sequence',
    question: 'この数列のパターンを見つけて、?に入る数字を選んでください',
    options: [13, 15, 17, 21],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '各項が前の項に3を加えた等差数列です：1, 4, 7, 10, 13',
    visualData: {
      sequenceType: 'numeric',
      sequence: [1, 4, 7, 10, null]
    }
  },

  // 図形パターン問題
  {
    id: 'pattern_geometric_1',
    category: '図形推論',
    difficulty: 10,
    visualType: 'pattern_sequence',
    question: 'この図形の並びのパターンを見つけて、?に入る図形を選んでください',
    options: ['arrow_left', 'arrow_up', 'arrow_right', 'arrow_down'],
    correctAnswer: 2,
    timeLimit: 120,
    explanation: '矢印が時計回りに90度ずつ回転しています：上→右→下→左→上→右',
    visualData: {
      sequenceType: 'geometric',
      sequence: ['arrow_up', 'arrow_right', 'arrow_down', 'arrow_left', 'arrow_up', null]
    }
  },

  // 論理パターン問題
  {
    id: 'pattern_logical_1',
    category: '論理推論',
    difficulty: 12,
    visualType: 'pattern_sequence',
    question: 'この論理的パターンを分析して、?に入る要素を選んでください',
    options: ['red_triangle', 'blue_circle', 'green_square', 'red_circle'],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '色と形が交互に変化：赤円→青四角→緑三角→赤円→青四角→緑三角',
    visualData: {
      sequenceType: 'logical',
      sequence: ['red_circle', 'blue_square', 'green_triangle', 'red_circle', 'blue_square', null]
    }
  },

  // 複雑な数列問題
  {
    id: 'pattern_numeric_2',
    category: '数列推論',
    difficulty: 14,
    visualType: 'pattern_sequence',
    question: '高度な数列パターン：隠れた規則を見つけてください',
    options: [55, 89, 144, 233],
    correctAnswer: 2,
    timeLimit: 180,
    explanation: 'フィボナッチ数列です：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144',
    visualData: {
      sequenceType: 'numeric',
      sequence: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, null]
    }
  },

  // 複雑な図形回転問題
  {
    id: 'pattern_geometric_2',
    category: '図形推論',
    difficulty: 16,
    visualType: 'pattern_sequence',
    question: '複雑な図形変化パターン：次にくる図形は？',
    options: ['triangle_2', 'square_2', 'circle_3', 'triangle_1'],
    correctAnswer: 0,
    timeLimit: 200,
    explanation: '図形の数が1→2→3→1→2と循環し、形状も円→四角→三角→円→四角→三角と変化します。',
    visualData: {
      sequenceType: 'geometric',
      sequence: ['circle_1', 'square_2', 'triangle_1', 'circle_2', 'square_1', null]
    }
  },

  // 文字パターン問題
  {
    id: 'pattern_alphabetic_1',
    category: '文字推論',
    difficulty: 8,
    visualType: 'pattern_sequence',
    question: 'このアルファベットのパターンを見つけて、?に入る文字を選んでください',
    options: ['G', 'H', 'I', 'J'],
    correctAnswer: 0,
    timeLimit: 100,
    explanation: 'アルファベットを2つ飛ばしで進んでいます：A, D, G, J',
    visualData: {
      sequenceType: 'alphabetic',
      sequence: ['A', 'D', null, 'J']
    }
  },

  // 立方体の対面問題
  {
    id: 'spatial_cube_3',
    category: '空間認識',
    difficulty: 18,
    visualType: 'cube_spatial',
    question: 'この立方体で、面Aの反対側にある面はどれですか？',
    options: [
      '{"front":"F","top":"A","right":"D"}',
      '{"front":"D","top":"F","right":"A"}',
      '{"front":"A","top":"D","right":"F"}',
      '{"front":"F","top":"D","right":"A"}'
    ],
    correctAnswer: 0,
    timeLimit: 240,
    explanation: '展開図の配置から、Aの対面はF、BとE、CとDがそれぞれ対面関係にあります。',
    visualData: {
      cubeType: 'cube_net',
      netType: 'L_shape',
      faceLabels: ['A', 'B', 'C', 'D', 'E', 'F']
    }
  }
];

// 問題の難易度別分類
export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard' | 'expert') => {
  const ranges = {
    easy: [1, 8],
    medium: [8, 12],
    hard: [12, 16],
    expert: [16, 20]
  };
  
  const [min, max] = ranges[difficulty];
  return advancedVisualQuestions.filter(q => q.difficulty >= min && q.difficulty <= max);
};

// カテゴリ別問題取得
export const getQuestionsByCategory = (category: string) => {
  return advancedVisualQuestions.filter(q => q.category === category);
};

// ランダム問題選択
export const getRandomVisualQuestions = (count: number = 5, maxDifficulty: number = 20) => {
  const filtered = advancedVisualQuestions.filter(q => q.difficulty <= maxDifficulty);
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};