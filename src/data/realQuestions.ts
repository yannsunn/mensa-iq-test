import { BaseQuestion } from '@/types/question';

// 実際のMENSA/IQテストパターンに基づいた本格的な問題データベース
export const realMensaQuestions: BaseQuestion[] = [
  // ===== 論理推論 (実際のMENSAパターン) =====
  {
    id: 'logical_real_1',
    category: 'logical',
    difficulty: 5,
    question: 'もしすべてのフライパンが金属製で、すべての金属製品が電気を通すなら、フライパンについて何が言えますか？',
    options: [
      'フライパンは電気を通す',
      'フライパンは電気を通さない', 
      'フライパンは時々電気を通す',
      '判断できない'
    ],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '三段論法: フライパン→金属製→電気を通す、よってフライパンは電気を通す'
  },

  {
    id: 'logical_real_2', 
    category: 'logical',
    difficulty: 8,
    question: '「すべてのQはRである」「いくつかのPはQである」この2つが真の時、以下のうち必ず真となるのは？',
    options: [
      'すべてのPはRである',
      'いくつかのPはRである',
      'すべてのRはPである', 
      'いくつかのRはPである'
    ],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: 'いくつかのP→Q、すべてのQ→Rより、いくつかのP→Rが導かれる'
  },

  {
    id: 'logical_real_3',
    category: 'logical', 
    difficulty: 12,
    question: 'AはBよりも背が高い。CはAよりも背が低い。DはCよりも背が高いがBよりも背が低い。身長順序として正しいのは？',
    options: [
      'A > D > C > B',
      'A > B > D > C', 
      'A > C > D > B',
      'A > D > B > C'
    ],
    correctAnswer: 1,
    timeLimit: 150,
    explanation: 'A > B、A > C、B < D < A、C < Dから A > B > D > C'
  },

  // ===== 数値パターン (実際のレイヴン行列レベル) =====
  {
    id: 'numerical_real_1',
    category: 'numerical',
    difficulty: 6,
    question: '次の数列の法則を見つけて、?に入る数字を答えてください: 1, 4, 9, 16, 25, ?',
    options: ['30', '36', '35', '49'],
    correctAnswer: 1,
    timeLimit: 90,
    explanation: '完全平方数: 1², 2², 3², 4², 5², 6² = 36'
  },

  {
    id: 'numerical_real_2',
    category: 'numerical', 
    difficulty: 10,
    question: '数列: 2, 6, 12, 20, 30, ? の次の数は？',
    options: ['40', '42', '38', '44'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '差の数列が4, 6, 8, 10, 12...、次の差は12なので30+12=42'
  },

  {
    id: 'numerical_real_3',
    category: 'numerical',
    difficulty: 14,
    question: '3, 7, 15, 31, 63, ? この数列の次の項は？',
    options: ['95', '127', '120', '135'],
    correctAnswer: 1,
    timeLimit: 180,
    explanation: '各項 = 2^(n+1) - 1。次は2^7 - 1 = 127'
  },

  {
    id: 'numerical_real_4',
    category: 'numerical',
    difficulty: 16,
    question: 'フィボナッチ変形数列: 1, 1, 3, 5, 11, 21, ? 次の数は？',
    options: ['43', '45', '41', '47'],
    correctAnswer: 0,
    timeLimit: 200,
    explanation: 'F(n) = F(n-1) + F(n-2) + 偶数項の場合+1。21+11+1=43'
  },

  // ===== 空間認識 (実際の3D回転問題) =====
  {
    id: 'spatial_real_1',
    category: 'spatial',
    difficulty: 7,
    question: '立方体を展開した図で、面Aの向かい側にある面はどれですか？\n[A][B]\n[C][D][E][F]',
    options: ['面D', '面E', '面F', '面B'],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '十字型展開図では、中央からの距離が2の面同士が向かい合う'
  },

  {
    id: 'spatial_real_2',
    category: 'spatial',
    difficulty: 11,
    question: '正四面体を上から見た時の影の形は？',
    options: ['正三角形', '正方形', '円', '六角形'],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '正四面体を上から投影すると、底面の正三角形となる'
  },

  {
    id: 'spatial_real_3',
    category: 'spatial',
    difficulty: 15,
    question: '4次元立方体（テッセラクト）の頂点数は？',
    options: ['8', '12', '16', '24'],
    correctAnswer: 2,
    timeLimit: 200,
    explanation: '4D立方体の頂点数 = 2^4 = 16個'
  },

  // ===== 行列推論 (レイヴン行列パターン) =====
  {
    id: 'matrix_real_1',
    category: 'matrix',
    difficulty: 8,
    question: '3×3行列で各行に○△□が1つずつ、各列に大中小が1つずつ含まれる。右下に入るのは？\n○大 △中 ？\n□中 ○小 △大\n△小 □大 ○中',
    options: ['□小', '○大', '△中', '□中'],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '第3行第3列は□かつ小。各行各列に全種類が1つずつの制約より□小'
  },

  {
    id: 'matrix_real_2',
    category: 'matrix',
    difficulty: 12,
    question: 'パターン行列：左上から時計回りに90度ずつ回転。最後のパターンは？\n↑ → ？\n← ↓ ↑\n？ ← ↓',
    options: ['↓', '→', '↑', '←'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '時計回りに90度回転パターン。→の次は↓'
  },

  {
    id: 'matrix_real_3',
    category: 'matrix',
    difficulty: 16,
    question: '複合変換行列：図形が右に移動+拡大+回転の複合変換。次の変換は？',
    options: ['移動のみ', '拡大のみ', '回転のみ', '3つの複合'],
    correctAnswer: 3,
    timeLimit: 220,
    explanation: '複合変換パターンの継続により、3つすべての変換が適用される'
  },

  // ===== 言語的類推 (実際のMENSA verbal pattern) =====
  {
    id: 'verbal_real_1',
    category: 'verbal',
    difficulty: 6,
    question: '医者：病院 = 教師：？',
    options: ['学校', '生徒', '授業', '教科書'],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: '職業と勤務場所の関係'
  },

  {
    id: 'verbal_real_2',
    category: 'verbal',
    difficulty: 9,
    question: '原因：結果 = 種：？',
    options: ['土', '水', '植物', '収穫'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '因果関係のアナロジー。種→植物'
  },

  {
    id: 'verbal_real_3',
    category: 'verbal',
    difficulty: 13,
    question: '「TOKYO」を「YOJKT」と変換する規則で「OSAKA」はどうなる？',
    options: ['AKASO', 'ASAKO', 'AKAOS', 'SAOAK'],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '逆順+2文字目と4文字目交換。AKASO'
  },

  // ===== 抽象思考 (高次パターン認識) =====
  {
    id: 'abstract_real_1',
    category: 'abstract',
    difficulty: 10,
    question: '概念の包含関係：「すべてのバラは花である」「すべての花は植物である」から導けるのは？',
    options: [
      'すべてのバラは植物である',
      'すべての植物はバラである', 
      'いくつかの植物は花である',
      '判断できない'
    ],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '推移律によりバラ→花→植物'
  },

  {
    id: 'abstract_real_2',
    category: 'abstract',
    difficulty: 14,
    question: 'メタパターン認識：A→B→C、D→E→F、G→？→I の？に入るのは？',
    options: ['H', 'J', 'F', 'K'],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: 'アルファベット順で連続する3文字パターン'
  },

  {
    id: 'abstract_real_3',
    category: 'abstract',
    difficulty: 18,
    question: '高次関数的思考：f(x) = x+1, g(x) = 2x とすると f(g(3)) = ?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 1,
    timeLimit: 180,
    explanation: 'g(3) = 6, f(6) = 7'
  },

  // ===== 作業記憶 (実際のワーキングメモリテスト) =====
  {
    id: 'memory_real_1',
    category: 'memory',
    difficulty: 7,
    question: '次の数字を逆順で答えてください：7, 2, 9, 4, 1, 6',
    options: ['6, 1, 4, 9, 2, 7', '7, 2, 9, 4, 1, 6', '1, 4, 9, 2, 7, 6', '6, 2, 1, 4, 9, 7'],
    correctAnswer: 0,
    timeLimit: 45,
    explanation: '逆順：6, 1, 4, 9, 2, 7'
  },

  {
    id: 'memory_real_2',
    category: 'memory',
    difficulty: 11,
    question: '次の文字列を覚えて、2文字目、4文字目、6文字目を順に答えてください：PQRSTU',
    options: ['Q, S, U', 'P, R, T', 'R, T, U', 'Q, T, S'],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: '2文字目=Q, 4文字目=S, 6文字目=U'
  },

  {
    id: 'memory_real_3',
    category: 'memory',
    difficulty: 15,
    question: 'N-back記憶課題：この数列で2つ前と同じ数字はどれ？ 3, 7, 3, 9, 7, 1, 9',
    options: ['位置3の3', '位置5の7', '位置7の9', '該当なし'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '位置7の9は位置4の9の2つ後'
  },

  // ===== 高難易度問題 (IQ 140+レベル) =====
  {
    id: 'advanced_1',
    category: 'logical',
    difficulty: 17,
    question: '論理パズル：A、B、C、Dの4人がいて、正直者と嘘つきがいる。A:「Bは嘘つき」、B:「Cは正直者」、C:「Dは嘘つき」、D:「Aは正直者」。正直者は何人？',
    options: ['1人', '2人', '3人', '4人'],
    correctAnswer: 1,
    timeLimit: 300,
    explanation: 'AとCが正直者、BとDが嘘つき。矛盾のない組み合わせを見つける。'
  },

  {
    id: 'advanced_2',
    category: 'numerical',
    difficulty: 18,
    question: '数学的帰納法パターン：1, 8, 27, 64, 125, ? (各項の関係性を見つけて)',
    options: ['186', '196', '216', '256'],
    correctAnswer: 2,
    timeLimit: 240,
    explanation: '立方数の数列：1³, 2³, 3³, 4³, 5³, 6³ = 216'
  },

  {
    id: 'advanced_3',
    category: 'spatial',
    difficulty: 19,
    question: '超立方体（5次元）の面の数は？',
    options: ['10', '32', '40', '80'],
    correctAnswer: 2,
    timeLimit: 300,
    explanation: '5次元立方体の4次元面の数は2×5 = 10、3次元面は40個'
  },

  {
    id: 'advanced_4',
    category: 'abstract',
    difficulty: 20,
    question: 'メタ論理：「この文は偽である」という文の真偽は？',
    options: ['真', '偽', '不定', 'パラドックス'],
    correctAnswer: 3,
    timeLimit: 300,
    explanation: '嘘つきのパラドックス。真とも偽とも決定できない自己言及的矛盾'
  },

  // ===== 中間難易度の充実 =====
  {
    id: 'medium_1',
    category: 'numerical',
    difficulty: 9,
    question: '2, 3, 5, 8, 13, ? この数列の次の項は？',
    options: ['18', '21', '20', '19'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: 'フィボナッチ数列：各項は前2項の和'
  },

  {
    id: 'medium_2',
    category: 'logical',
    difficulty: 10,
    question: '条件推論：「雨が降れば試合は中止」「試合は中止になった」から導けるのは？',
    options: ['雨が降った', '雨は降らなかった', '判断できない', '試合は開催された'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '後件肯定の誤謬。試合中止の原因は雨以外の可能性もある'
  },

  {
    id: 'medium_3',
    category: 'spatial',
    difficulty: 9,
    question: 'サイコロの相対する面の数の和は常に7。1の向かいが6、2の向かいが5なら、3の向かいは？',
    options: ['4', '5', '6', '1'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '7-3=4。相対する面の和は7のルール'
  },

  {
    id: 'medium_4',
    category: 'verbal',
    difficulty: 8,
    question: '語彙の関係：「楽観的」の反対語として最も適切なのは？',
    options: ['悲観的', '現実的', '慎重', '消極的'],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: '楽観的↔悲観的は直接的な対義語関係'
  },

  {
    id: 'final_challenge',
    category: 'matrix',
    difficulty: 20,
    question: '最終チャレンジ：4×4行列での複合パターン認識。右下の要素は？\n○● ●○ ○● ？\n●○ ○● ●○ ○●\n○● ●○ ○● ●○\n●○ ○● ●○ ？',
    options: ['○●', '●○', '○○', '●●'],
    correctAnswer: 1,
    timeLimit: 400,
    explanation: 'チェスボードパターンの変形。対角線で反転する規則'
  }
];

// 難易度別に問題を取得する関数
export const getQuestionsByDifficultyRange = (min: number, max: number): BaseQuestion[] => {
  return realMensaQuestions.filter(q => q.difficulty >= min && q.difficulty <= max);
};

// カテゴリ別に問題を取得する関数
export const getQuestionsByCategory = (category: BaseQuestion['category']): BaseQuestion[] => {
  return realMensaQuestions.filter(q => q.category === category);
};

// MENSA標準の35問テストセットを生成
export const generateMensaTestSet = (): BaseQuestion[] => {
  const categories: BaseQuestion['category'][] = ['logical', 'numerical', 'spatial', 'matrix', 'verbal', 'abstract', 'memory'];
  const testSet: BaseQuestion[] = [];
  
  // 各カテゴリから5問ずつ、難易度を段階的に上げて選択
  categories.forEach(category => {
    const categoryQuestions = getQuestionsByCategory(category);
    const sortedQuestions = categoryQuestions.sort((a, b) => a.difficulty - b.difficulty);
    
    // 各カテゴリから異なる難易度レベルの5問を選択
    for (let i = 0; i < 5 && i < sortedQuestions.length; i++) {
      testSet.push(sortedQuestions[i]);
    }
  });
  
  // 難易度順にソートして段階的な上昇を実現
  return testSet.sort((a, b) => a.difficulty - b.difficulty);
};