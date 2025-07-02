import { Question } from '@/types';

export const sampleQuestions: Question[] = [
  // Logical Reasoning (Easy)
  {
    id: 'logical_1',
    category: 'logical',
    difficulty: 3,
    question: 'もしすべての鳥が飛べるなら、そしてペンギンが鳥なら、ペンギンは飛べますか？',
    options: ['はい', 'いいえ', '不明', '条件による'],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: '論理的には「はい」です。前提が真であれば結論も真になります。'
  },
  
  // Numerical Pattern (Medium)
  {
    id: 'numerical_1',
    category: 'numerical',
    difficulty: 7,
    question: '次の数列の次の数字は？ 2, 6, 12, 20, 30, ?',
    options: ['42', '40', '38', '44'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '差の数列: 4, 6, 8, 10, 12 → 次は42'
  },

  // Spatial Intelligence (Medium)
  {
    id: 'spatial_1',
    category: 'spatial',
    difficulty: 8,
    question: '立方体を展開図にしたとき、対面にある面の組み合わせはどれですか？\n[図: 展開図が表示される想定]',
    options: ['A-D, B-E, C-F', 'A-F, B-D, C-E', 'A-C, B-F, D-E', 'A-E, B-C, D-F'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '立方体の展開図では、隣接しない面が対面になります。'
  },

  // Matrix Reasoning (Hard)
  {
    id: 'matrix_1',
    category: 'matrix',
    difficulty: 12,
    question: '3×3の図形マトリックスで、右下の図形は？\n[パターン: 各行・列で図形が回転・変化]',
    options: ['図形A', '図形B', '図形C', '図形D'],
    correctAnswer: 2,
    timeLimit: 150,
    explanation: '行と列のパターンを分析すると、図形Cが正解です。'
  },

  // Verbal Analogies (Medium)
  {
    id: 'verbal_1',
    category: 'verbal',
    difficulty: 6,
    question: '医者：病院 = 教師：？',
    options: ['学校', '生徒', '授業', '教育'],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: '職業と勤務場所の関係性です。'
  },

  // Abstract Reasoning (Hard)
  {
    id: 'abstract_1',
    category: 'abstract',
    difficulty: 14,
    question: '抽象的なパターンシーケンスで、次に来る図形は？\n[複雑な幾何学的変換パターン]',
    options: ['パターンA', 'パターンB', 'パターンC', 'パターンD'],
    correctAnswer: 3,
    timeLimit: 180,
    explanation: '回転、反転、色変化の複合パターンです。'
  },

  // Working Memory (Medium)
  {
    id: 'memory_1',
    category: 'memory',
    difficulty: 9,
    question: '次の数字列を逆順で答えてください: 7, 3, 9, 1, 5, 8, 2',
    options: ['2, 8, 5, 1, 9, 3, 7', '7, 3, 9, 1, 5, 8, 2', '2, 8, 5, 9, 1, 3, 7', '7, 2, 8, 5, 1, 9, 3'],
    correctAnswer: 0,
    timeLimit: 45,
    explanation: '作業記憶の能力を測定します。'
  },

  // Additional High-Difficulty Questions
  {
    id: 'logical_2',
    category: 'logical',
    difficulty: 15,
    question: 'A > B, B > C, C > D の関係で、AとDの関係は？',
    options: ['A > D', 'A = D', 'A < D', '判定不可'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '推移律により A > D が成立します。'
  },

  {
    id: 'numerical_2',
    category: 'numerical',
    difficulty: 16,
    question: '次の複雑な数列: 1, 4, 9, 16, 25, 36, ? の規則性は？',
    options: ['49', '48', '50', '47'],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '完全平方数の数列: 1², 2², 3², 4², 5², 6², 7² = 49'
  },

  {
    id: 'spatial_2',
    category: 'spatial',
    difficulty: 17,
    question: '4次元立方体を3次元に投影した場合の頂点数は？',
    options: ['16', '14', '12', '18'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '4次元立方体（テッセラクト）の頂点数は16個です。'
  }
];

export const getQuestionsByDifficulty = (minDifficulty: number, maxDifficulty: number): Question[] => {
  return sampleQuestions.filter(
    q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty
  );
};

export const getQuestionsByCategory = (category: Question['category']): Question[] => {
  return sampleQuestions.filter(q => q.category === category);
};