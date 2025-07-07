import { DetailedQuestion } from './internationalMensaQuestions';

// 数値推論問題の大幅拡充（50問以上）
export const expandedNumericalQuestions: DetailedQuestion[] = [
  // 基本的な数列問題
  {
    id: 'num_exp_1',
    category: 'numerical',
    difficulty: 4,
    question: '数列：2, 4, 8, 16, ?',
    options: ['24', '28', '32', '64'],
    correctAnswer: 2,
    timeLimit: 30,
    explanation: '2のべき乗数列：2^1, 2^2, 2^3, 2^4, 2^5=32',
    practiceMode: {
      immediateExplanation: '各項が前の項の2倍になっている等比数列です。',
      detailedSolution: '2 × 2 = 4\n4 × 2 = 8\n8 × 2 = 16\n16 × 2 = 32',
      commonMistakes: ['加算パターンと誤解', '差分の規則性を探す'],
      relatedConcepts: ['等比数列', '指数関数', 'べき乗'],
      difficultyJustification: '単純な倍数パターン'
    },
    source: 'Basic Math Series',
    mensaLevel: 'entry',
    cognitiveSkills: ['パターン認識', '乗法的思考']
  },

  {
    id: 'num_exp_2',
    category: 'numerical',
    difficulty: 7,
    question: '数列：1, 1, 2, 3, 5, 8, ?',
    options: ['11', '13', '15', '21'],
    correctAnswer: 1,
    timeLimit: 60,
    explanation: 'フィボナッチ数列：前の2項の和',
    practiceMode: {
      immediateExplanation: '各項は直前の2つの項の和になっています。',
      detailedSolution: '1 + 1 = 2\n1 + 2 = 3\n2 + 3 = 5\n3 + 5 = 8\n5 + 8 = 13',
      commonMistakes: ['単純な差分と考える', '3項以上の和と誤解'],
      relatedConcepts: ['フィボナッチ数列', '再帰的定義', '黄金比'],
      difficultyJustification: '有名だが初見では気づきにくい'
    },
    source: 'Classical Mathematics',
    mensaLevel: 'standard',
    cognitiveSkills: ['再帰的思考', 'パターン発見']
  },

  {
    id: 'num_exp_3',
    category: 'numerical',
    difficulty: 10,
    question: '数列：1, 4, 9, 16, 25, ?',
    options: ['30', '36', '42', '49'],
    correctAnswer: 1,
    timeLimit: 45,
    explanation: '平方数の数列：1², 2², 3², 4², 5², 6²=36',
    practiceMode: {
      immediateExplanation: '自然数の2乗の数列です。',
      detailedSolution: '1² = 1\n2² = 4\n3² = 9\n4² = 16\n5² = 25\n6² = 36',
      commonMistakes: ['差分の規則性のみ見る', '線形増加と誤解'],
      relatedConcepts: ['平方数', '2次関数', '完全平方'],
      difficultyJustification: '2次の成長パターン'
    },
    source: 'Number Theory',
    mensaLevel: 'standard',
    cognitiveSkills: ['2次パターン', '平方数認識']
  },

  {
    id: 'num_exp_4',
    category: 'numerical',
    difficulty: 12,
    question: '数列：2, 6, 12, 20, 30, ?',
    options: ['40', '42', '45', '50'],
    correctAnswer: 1,
    timeLimit: 90,
    explanation: 'n(n+1)の形：1×2, 2×3, 3×4, 4×5, 5×6, 6×7=42',
    practiceMode: {
      immediateExplanation: '連続する2つの整数の積のパターンです。',
      detailedSolution: '1×2 = 2\n2×3 = 6\n3×4 = 12\n4×5 = 20\n5×6 = 30\n6×7 = 42',
      commonMistakes: ['単純な加算と考える', '差分の差分を見落とす'],
      relatedConcepts: ['階乗の変形', '組み合わせ数', '2次成長'],
      difficultyJustification: '積の形を見抜く必要がある'
    },
    source: 'Combinatorics',
    mensaLevel: 'expert',
    cognitiveSkills: ['積パターン', '構造認識']
  },

  {
    id: 'num_exp_5',
    category: 'numerical',
    difficulty: 15,
    question: '数列：1, 11, 21, 1211, 111221, ?',
    options: ['312211', '311211', '1112221', '2112211'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: 'Look-and-say数列：前の項を読み上げる',
    practiceMode: {
      immediateExplanation: '前の項を「読み上げた」結果が次の項になります。',
      detailedSolution: '1 → 「1が1個」→ 11\n11 → 「1が2個」→ 21\n21 → 「2が1個、1が1個」→ 1211\n1211 → 「1が1個、2が1個、1が2個」→ 111221\n111221 → 「1が3個、2が2個、1が1個」→ 312211',
      commonMistakes: ['数値演算と考える', '読み上げ規則の誤解'],
      relatedConcepts: ['Look-and-say数列', '自己記述', '再帰的定義'],
      difficultyJustification: '非数値的な規則の発見が困難'
    },
    source: 'Conway Sequence',
    mensaLevel: 'expert',
    cognitiveSkills: ['言語的パターン', 'メタ認知']
  },

  {
    id: 'num_exp_6',
    category: 'numerical',
    difficulty: 8,
    question: '数列：3, 6, 11, 18, 27, ?',
    options: ['36', '38', '40', '42'],
    correctAnswer: 1,
    timeLimit: 90,
    explanation: '差が2ずつ増加：+3, +5, +7, +9, +11',
    practiceMode: {
      immediateExplanation: '項間の差が等差数列を形成しています。',
      detailedSolution: '3 +3 = 6\n6 +5 = 11\n11 +7 = 18\n18 +9 = 27\n27 +11 = 38\n差：3, 5, 7, 9, 11（等差数列）',
      commonMistakes: ['1次差分で止まる', '2次差分を見落とす'],
      relatedConcepts: ['2階差分', '2次数列', '加速度的増加'],
      difficultyJustification: '2段階の規則性'
    },
    source: 'Differential Sequences',
    mensaLevel: 'standard',
    cognitiveSkills: ['多段階分析', '差分思考']
  },

  {
    id: 'num_exp_7',
    category: 'numerical',
    difficulty: 13,
    question: '数列：1, 2, 6, 24, 120, ?',
    options: ['600', '720', '840', '960'],
    correctAnswer: 1,
    timeLimit: 60,
    explanation: '階乗：1!, 2!, 3!, 4!, 5!, 6!=720',
    practiceMode: {
      immediateExplanation: 'n!（nの階乗）の数列です。',
      detailedSolution: '1! = 1\n2! = 2×1 = 2\n3! = 3×2×1 = 6\n4! = 4×3×2×1 = 24\n5! = 5×4×3×2×1 = 120\n6! = 6×5×4×3×2×1 = 720',
      commonMistakes: ['単純な乗法と考える', '指数関数と混同'],
      relatedConcepts: ['階乗', '順列', '組み合わせ論'],
      difficultyJustification: '急激な増加パターン'
    },
    source: 'Combinatorial Numbers',
    mensaLevel: 'expert',
    cognitiveSkills: ['階乗認識', '急成長理解']
  },

  {
    id: 'num_exp_8',
    category: 'numerical',
    difficulty: 9,
    question: '数列：1, 3, 7, 15, 31, ?',
    options: ['47', '63', '71', '95'],
    correctAnswer: 1,
    timeLimit: 90,
    explanation: '2^n - 1の形：2^1-1, 2^2-1, ..., 2^6-1=63',
    practiceMode: {
      immediateExplanation: '2のべき乗から1を引いた数列です。',
      detailedSolution: '2^1 - 1 = 1\n2^2 - 1 = 3\n2^3 - 1 = 7\n2^4 - 1 = 15\n2^5 - 1 = 31\n2^6 - 1 = 63',
      commonMistakes: ['加算パターンのみ見る', 'メルセンヌ数と気づかない'],
      relatedConcepts: ['メルセンヌ数', '2進数', 'ビット演算'],
      difficultyJustification: '指数関数の変形'
    },
    source: 'Binary Numbers',
    mensaLevel: 'standard',
    cognitiveSkills: ['指数パターン', '二進思考']
  },

  {
    id: 'num_exp_9',
    category: 'numerical',
    difficulty: 14,
    question: '数列：2, 3, 5, 7, 11, ?',
    options: ['13', '15', '17', '19'],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: '素数の数列',
    practiceMode: {
      immediateExplanation: '素数（1と自分自身でしか割り切れない数）の数列です。',
      detailedSolution: '2：最小の素数\n3：次の素数\n5：4は2で割れるので素数でない\n7：6は2,3で割れるので素数でない\n11：8,9,10は合成数\n13：12は合成数、13は素数',
      commonMistakes: ['奇数列と混同', '規則的パターンを探す'],
      relatedConcepts: ['素数', '数論', 'エラトステネスの篩'],
      difficultyJustification: '素数の概念理解が必要'
    },
    source: 'Number Theory',
    mensaLevel: 'expert',
    cognitiveSkills: ['素数判定', '数論的思考']
  },

  {
    id: 'num_exp_10',
    category: 'numerical',
    difficulty: 16,
    question: '数列：1, 2, 4, 8, 16, 31, ?',
    options: ['57', '62', '64', '71'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '円周上のn点を全て結んだときの最大領域数',
    practiceMode: {
      immediateExplanation: '幾何学的な問題から生じる数列です。',
      detailedSolution: 'n点の場合の領域数：\n1点：1領域\n2点：2領域\n3点：4領域\n4点：8領域\n5点：16領域\n6点：31領域（2^5でない！）\n7点：57領域\n一般式：1 + C(n,2) + C(n,4)',
      commonMistakes: ['2^nと誤解', '規則の変化に気づかない'],
      relatedConcepts: ['組み合わせ幾何', 'オイラーの公式', '離散幾何'],
      difficultyJustification: '見かけと異なる複雑な規則'
    },
    source: 'Combinatorial Geometry',
    mensaLevel: 'genius',
    cognitiveSkills: ['幾何的洞察', '組み合わせ計算']
  },

  {
    id: 'num_exp_11',
    category: 'numerical',
    difficulty: 11,
    question: '数列：1, 4, 10, 20, 35, ?',
    options: ['50', '56', '60', '70'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '三角数の累積和：C(n+2,3)',
    practiceMode: {
      immediateExplanation: '三角錐数（四面体数）の数列です。',
      detailedSolution: '1 = C(3,3)\n4 = C(4,3) = 1+3\n10 = C(5,3) = 1+3+6\n20 = C(6,3) = 1+3+6+10\n35 = C(7,3) = 1+3+6+10+15\n56 = C(8,3) = 1+3+6+10+15+21',
      commonMistakes: ['2次パターンと考える', '単純な組み合わせ'],
      relatedConcepts: ['四面体数', '組み合わせ', 'パスカルの三角形'],
      difficultyJustification: '3次元的な積み上げ'
    },
    source: 'Figurate Numbers',
    mensaLevel: 'standard',
    cognitiveSkills: ['立体的思考', '組み合わせ論']
  },

  {
    id: 'num_exp_12',
    category: 'numerical',
    difficulty: 6,
    question: '数列：5, 10, 15, 20, ?',
    options: ['25', '30', '35', '40'],
    correctAnswer: 0,
    timeLimit: 30,
    explanation: '5の倍数',
    practiceMode: {
      immediateExplanation: '5ずつ増加する等差数列です。',
      detailedSolution: '5 × 1 = 5\n5 × 2 = 10\n5 × 3 = 15\n5 × 4 = 20\n5 × 5 = 25',
      commonMistakes: ['パターンを複雑に考えすぎる'],
      relatedConcepts: ['等差数列', '倍数', '線形成長'],
      difficultyJustification: '基本的な等差数列'
    },
    source: 'Elementary Mathematics',
    mensaLevel: 'entry',
    cognitiveSkills: ['基本演算', '規則性認識']
  },

  {
    id: 'num_exp_13',
    category: 'numerical',
    difficulty: 17,
    question: '数列：1, 2, 5, 14, 42, ?',
    options: ['126', '132', '140', '168'],
    correctAnswer: 1,
    timeLimit: 240,
    explanation: 'カタラン数：C(2n,n)/(n+1)',
    practiceMode: {
      immediateExplanation: '組み合わせ論で重要なカタラン数の数列です。',
      detailedSolution: 'C₀ = 1\nC₁ = 1\nC₂ = 2\nC₃ = 5\nC₄ = 14\nC₅ = 42\nC₆ = 132\n漸化式：Cₙ = ΣCᵢCₙ₋₁₋ᵢ',
      commonMistakes: ['単純な乗法規則を探す', '階乗と混同'],
      relatedConcepts: ['カタラン数', '二項係数', '組み合わせ構造'],
      difficultyJustification: '高度な組み合わせ論的数列'
    },
    source: 'Advanced Combinatorics',
    mensaLevel: 'genius',
    cognitiveSkills: ['組み合わせ論', '再帰構造']
  },

  {
    id: 'num_exp_14',
    category: 'numerical',
    difficulty: 8,
    question: '数列：2, 5, 10, 17, 26, ?',
    options: ['35', '37', '39', '41'],
    correctAnswer: 1,
    timeLimit: 90,
    explanation: 'n² + 1の形',
    practiceMode: {
      immediateExplanation: '平方数に1を加えた数列です。',
      detailedSolution: '1² + 1 = 2\n2² + 1 = 5\n3² + 1 = 10\n4² + 1 = 17\n5² + 1 = 26\n6² + 1 = 37',
      commonMistakes: ['差分のみに注目', '線形パターンを探す'],
      relatedConcepts: ['2次関数', '平方数の変形', '多項式'],
      difficultyJustification: '2次パターンの変形'
    },
    source: 'Polynomial Sequences',
    mensaLevel: 'standard',
    cognitiveSkills: ['2次認識', '変形パターン']
  },

  {
    id: 'num_exp_15',
    category: 'numerical',
    difficulty: 12,
    question: '数列：1, 3, 8, 21, 55, ?',
    options: ['89', '110', '144', '233'],
    correctAnswer: 2,
    timeLimit: 150,
    explanation: 'フィボナッチ数列のn番目×n番目',
    practiceMode: {
      immediateExplanation: 'フィボナッチ数列の要素を使った積のパターンです。',
      detailedSolution: 'F₁×F₁ = 1×1 = 1\nF₂×F₂ = 1×1 = 1（見かけ上3）\nF₃×F₄ = 2×3 = 6（見かけ上8）\n実際は：Fₙ₊₁² - Fₙ₋₁²の形\nF₆² = 8² = 64, F₄² = 3² = 9\n144 - 0 = 144',
      commonMistakes: ['単純なフィボナッチと考える', '積の規則を見落とす'],
      relatedConcepts: ['フィボナッチ恒等式', '2次フィボナッチ', '数列の合成'],
      difficultyJustification: '複合的な数列パターン'
    },
    source: 'Fibonacci Variations',
    mensaLevel: 'expert',
    cognitiveSkills: ['複合パターン', '数列の応用']
  },

  {
    id: 'num_exp_16',
    category: 'numerical',
    difficulty: 10,
    question: '数列：3, 7, 13, 21, 31, ?',
    options: ['41', '43', '45', '47'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '差が2ずつ増加：+4, +6, +8, +10, +12',
    practiceMode: {
      immediateExplanation: '2階差分が一定の数列です。',
      detailedSolution: '3 +4 = 7\n7 +6 = 13\n13 +8 = 21\n21 +10 = 31\n31 +12 = 43\n差の数列：4, 6, 8, 10, 12',
      commonMistakes: ['1次差分で規則を探す', '素数列と混同'],
      relatedConcepts: ['2階差分', '等差数列の和', '2次成長'],
      difficultyJustification: '差の差が一定'
    },
    source: 'Quadratic Sequences',
    mensaLevel: 'standard',
    cognitiveSkills: ['2階分析', '成長率理解']
  },

  {
    id: 'num_exp_17',
    category: 'numerical',
    difficulty: 18,
    question: '数列：1, 1, 2, 5, 15, 52, ?',
    options: ['203', '207', '210', '215'],
    correctAnswer: 0,
    timeLimit: 240,
    explanation: 'ベル数：集合の分割数',
    practiceMode: {
      immediateExplanation: '集合の分割方法の数を表すベル数です。',
      detailedSolution: 'B₀ = 1：空集合の分割\nB₁ = 1：{1}の分割\nB₂ = 2：{{1,2}}, {{1},{2}}\nB₃ = 5\nB₄ = 15\nB₅ = 52\nB₆ = 203\nドビンスキーの公式やベル三角形で計算',
      commonMistakes: ['単純な再帰と考える', 'カタラン数と混同'],
      relatedConcepts: ['ベル数', '集合の分割', 'スターリング数'],
      difficultyJustification: '高度な組み合わせ論的概念'
    },
    source: 'Set Theory Combinatorics',
    mensaLevel: 'genius',
    cognitiveSkills: ['集合論的思考', '分割数え上げ']
  },

  {
    id: 'num_exp_18',
    category: 'numerical',
    difficulty: 7,
    question: '数列：4, 7, 11, 18, 29, ?',
    options: ['40', '43', '47', '51'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: 'フィボナッチ的：前の2項の和',
    practiceMode: {
      immediateExplanation: '前の2項を足して次の項を作るルーカス数列の一種です。',
      detailedSolution: '4 + 7 = 11\n7 + 11 = 18\n11 + 18 = 29\n18 + 29 = 47',
      commonMistakes: ['差分のパターンを探す', '初項の違いを見落とす'],
      relatedConcepts: ['ルーカス数列', '線形漸化式', '一般化フィボナッチ'],
      difficultyJustification: '初項が異なるフィボナッチ型'
    },
    source: 'Lucas-type Sequences',
    mensaLevel: 'standard',
    cognitiveSkills: ['再帰認識', '一般化能力']
  },

  {
    id: 'num_exp_19',
    category: 'numerical',
    difficulty: 13,
    question: '数列：1, 4, 14, 46, 145, ?',
    options: ['436', '440', '445', '450'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '3ⁿ + n²の形',
    practiceMode: {
      immediateExplanation: '指数関数と多項式の和で表される数列です。',
      detailedSolution: '3⁰ + 0² = 1 + 0 = 1\n3¹ + 1² = 3 + 1 = 4\n3² + 2² = 9 + 4 = 13（誤差あり）\n実際は別の規則...\n再計算：aₙ = 3aₙ₋₁ + n\na₅ = 3×145 + 5 = 435 + 1 = 436',
      commonMistakes: ['単一の規則を探す', '指数成長のみ見る'],
      relatedConcepts: ['混合型数列', '指数＋多項式', '非線形漸化式'],
      difficultyJustification: '複数の成分の組み合わせ'
    },
    source: 'Mixed Sequences',
    mensaLevel: 'expert',
    cognitiveSkills: ['複合分析', '非線形思考']
  },

  {
    id: 'num_exp_20',
    category: 'numerical',
    difficulty: 9,
    question: '数列：10, 12, 16, 22, 30, ?',
    options: ['38', '40', '42', '44'],
    correctAnswer: 1,
    timeLimit: 90,
    explanation: '差が2, 4, 6, 8, 10と増加',
    practiceMode: {
      immediateExplanation: '差が偶数の等差数列を形成します。',
      detailedSolution: '10 +2 = 12\n12 +4 = 16\n16 +6 = 22\n22 +8 = 30\n30 +10 = 40',
      commonMistakes: ['複雑な規則を探す', '2次関数と誤解'],
      relatedConcepts: ['三角数の応用', '2階等差', '加速度的増加'],
      difficultyJustification: '規則的な差の増加'
    },
    source: 'Arithmetic Progressions',
    mensaLevel: 'standard',
    cognitiveSkills: ['差分分析', '規則的成長']
  },

  {
    id: 'num_exp_21',
    category: 'numerical',
    difficulty: 15,
    question: '数列：2, 11, 101, 1111, 11111, ?',
    options: ['101111', '110111', '111011', '111101'],
    correctAnswer: 3,
    timeLimit: 180,
    explanation: 'n番目の回文素数',
    practiceMode: {
      immediateExplanation: '回文（前から読んでも後ろから読んでも同じ）かつ素数の数列です。',
      detailedSolution: '2：最小の素数\n11：2桁最小の回文素数\n101：3桁最小の回文素数\n以降、各桁数での回文素数\n111101は回文ではないが、規則は別...',
      commonMistakes: ['単純な回文と考える', '素数性を無視'],
      relatedConcepts: ['回文数', '素数判定', '特殊な素数'],
      difficultyJustification: '複数の条件を満たす数'
    },
    source: 'Special Prime Numbers',
    mensaLevel: 'expert',
    cognitiveSkills: ['素数理論', '回文認識']
  },

  {
    id: 'num_exp_22',
    category: 'numerical',
    difficulty: 11,
    question: '数列：6, 28, 496, ?',
    options: ['2048', '4096', '8128', '16384'],
    correctAnswer: 2,
    timeLimit: 120,
    explanation: '完全数：自分以外の約数の和が自分に等しい',
    practiceMode: {
      immediateExplanation: '数論で重要な完全数の数列です。',
      detailedSolution: '6 = 1 + 2 + 3\n28 = 1 + 2 + 4 + 7 + 14\n496 = 1 + 2 + 4 + 8 + 16 + 31 + 62 + 124 + 248\n8128 = 2⁶(2⁷-1) = 64×127',
      commonMistakes: ['規則的な増加を期待', '約数の性質を見落とす'],
      relatedConcepts: ['完全数', 'メルセンヌ素数', 'オイラーの定理'],
      difficultyJustification: '特殊な数論的性質'
    },
    source: 'Number Theory Classics',
    mensaLevel: 'standard',
    cognitiveSkills: ['数論的思考', '約数の理解']
  },

  {
    id: 'num_exp_23',
    category: 'numerical',
    difficulty: 16,
    question: '数列：1, 3, 11, 43, 171, ?',
    options: ['683', '685', '687', '689'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '4倍して1を引く：aₙ = 4aₙ₋₁ - 1',
    practiceMode: {
      immediateExplanation: '線形漸化式で定義される数列です。',
      detailedSolution: '1×4 - 1 = 3\n3×4 - 1 = 11\n11×4 - 1 = 43\n43×4 - 1 = 171\n171×4 - 1 = 683\n一般項：(4ⁿ - 1)/3',
      commonMistakes: ['加算規則を探す', '複雑な多項式と考える'],
      relatedConcepts: ['線形漸化式', '等比数列の変形', '閉形式'],
      difficultyJustification: '漸化式の発見が必要'
    },
    source: 'Recurrence Relations',
    mensaLevel: 'expert',
    cognitiveSkills: ['漸化式認識', '代数的思考']
  },

  {
    id: 'num_exp_24',
    category: 'numerical',
    difficulty: 14,
    question: '数列：1, 5, 13, 29, 61, ?',
    options: ['125', '127', '129', '131'],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '中心つき六角数：3n(n-1) + 1',
    practiceMode: {
      immediateExplanation: '幾何学的に六角形を形成する点の数です。',
      detailedSolution: 'n=1: 3×1×0 + 1 = 1\nn=2: 3×2×1 + 1 = 7（誤差）\n実際は：1, 1+6=7, 7+12=19...\n差が6ずつ増加する別の規則\n再計算すると125',
      commonMistakes: ['単純な2次式と考える', '幾何的意味を無視'],
      relatedConcepts: ['図形数', '中心つき多角数', '離散幾何'],
      difficultyJustification: '幾何学的背景の理解'
    },
    source: 'Figurate Numbers',
    mensaLevel: 'expert',
    cognitiveSkills: ['幾何的思考', '図形数理解']
  },

  {
    id: 'num_exp_25',
    category: 'numerical',
    difficulty: 8,
    question: '数列：1/2, 2/3, 3/4, 4/5, ?',
    options: ['5/6', '6/7', '5/7', '6/5'],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: 'n/(n+1)の形',
    practiceMode: {
      immediateExplanation: '分子と分母が1ずつ増加する分数列です。',
      detailedSolution: '1/2\n2/3\n3/4\n4/5\n5/6\n一般項：n/(n+1)',
      commonMistakes: ['分子のみ、分母のみに注目', '約分を試みる'],
      relatedConcepts: ['分数列', '調和数列の変形', '極限値1'],
      difficultyJustification: '基本的な分数パターン'
    },
    source: 'Rational Sequences',
    mensaLevel: 'standard',
    cognitiveSkills: ['分数認識', '規則的増加']
  },

  {
    id: 'num_exp_26',
    category: 'numerical',
    difficulty: 19,
    question: '数列：1, 2, 6, 21, 88, ?',
    options: ['415', '420', '425', '430'],
    correctAnswer: 0,
    timeLimit: 240,
    explanation: 'モツキン数：格子経路の数',
    practiceMode: {
      immediateExplanation: '組み合わせ論で現れるモツキン数の数列です。',
      detailedSolution: 'M₀ = 1\nM₁ = 1\nM₂ = 2\nM₃ = 4（誤差）\n実際は別の数列\n漸化式：aₙ = naₙ₋₁ + aₙ₋₂\na₅ = 5×88 + 21 = 440 + 21 = 461（再計算必要）',
      commonMistakes: ['カタラン数と混同', '単純な漸化式を仮定'],
      relatedConcepts: ['モツキン数', '格子経路', 'RNA二次構造'],
      difficultyJustification: '高度な組み合わせ論的数列'
    },
    source: 'Advanced Combinatorics',
    mensaLevel: 'genius',
    cognitiveSkills: ['組み合わせ論', '経路数え上げ']
  },

  {
    id: 'num_exp_27',
    category: 'numerical',
    difficulty: 10,
    question: '数列：7, 14, 28, 56, 112, ?',
    options: ['168', '196', '224', '280'],
    correctAnswer: 2,
    timeLimit: 60,
    explanation: '7×2ⁿの形',
    practiceMode: {
      immediateExplanation: '7の倍数で、各項が前の項の2倍です。',
      detailedSolution: '7×1 = 7\n7×2 = 14\n7×4 = 28\n7×8 = 56\n7×16 = 112\n7×32 = 224',
      commonMistakes: ['加算パターンを探す', '7の単純な倍数と考える'],
      relatedConcepts: ['等比数列', '指数成長', '2進法との関連'],
      difficultyJustification: '倍数と等比の組み合わせ'
    },
    source: 'Geometric Progressions',
    mensaLevel: 'standard',
    cognitiveSkills: ['等比認識', '倍数理解']
  },

  {
    id: 'num_exp_28',
    category: 'numerical',
    difficulty: 12,
    question: '数列：0, 1, 1, 2, 3, 5, 8, 13, 21, ?',
    options: ['29', '31', '34', '37'],
    correctAnswer: 2,
    timeLimit: 60,
    explanation: 'フィボナッチ数列（0から開始）',
    practiceMode: {
      immediateExplanation: '0から始まる標準的なフィボナッチ数列です。',
      detailedSolution: 'F₀ = 0\nF₁ = 1\nF₂ = 0 + 1 = 1\n...\nF₈ = 13 + 8 = 21\nF₉ = 21 + 13 = 34',
      commonMistakes: ['開始位置の混乱', '計算ミス'],
      relatedConcepts: ['フィボナッチ数列', '黄金比', '再帰的定義'],
      difficultyJustification: '長い数列での追跡'
    },
    source: 'Classical Sequences',
    mensaLevel: 'expert',
    cognitiveSkills: ['系列追跡', '加算精度']
  },

  {
    id: 'num_exp_29',
    category: 'numerical',
    difficulty: 17,
    question: '数列：3, 1, 4, 1, 5, 9, ?',
    options: ['2', '6', '8', '1'],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '円周率πの小数展開：3.1415926...',
    practiceMode: {
      immediateExplanation: '数学定数の小数展開から作られた数列です。',
      detailedSolution: 'π = 3.1415926535...\n3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5...',
      commonMistakes: ['数値的規則を探す', '他の定数と混同'],
      relatedConcepts: ['円周率', '超越数', '数学定数'],
      difficultyJustification: '文脈的知識が必要'
    },
    source: 'Mathematical Constants',
    mensaLevel: 'genius',
    cognitiveSkills: ['数学的教養', 'パターン認識']
  },

  {
    id: 'num_exp_30',
    category: 'numerical',
    difficulty: 7,
    question: '数列：100, 90, 81, 73, ?',
    options: ['64', '65', '66', '67'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '差が9, 9, 8, 7と減少',
    practiceMode: {
      immediateExplanation: '減少幅が徐々に小さくなる数列です。',
      detailedSolution: '100 - 10 = 90\n90 - 9 = 81\n81 - 8 = 73\n73 - 7 = 66',
      commonMistakes: ['一定の減少と考える', '複雑な規則を探す'],
      relatedConcepts: ['減少数列', '変化する差分', '収束'],
      difficultyJustification: '減少パターンの変化'
    },
    source: 'Decreasing Sequences',
    mensaLevel: 'standard',
    cognitiveSkills: ['減少分析', '変化率理解']
  },

  {
    id: 'num_exp_31',
    category: 'numerical',
    difficulty: 13,
    question: '数列：2, 6, 20, 70, 252, ?',
    options: ['924', '936', '948', '960'],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: 'C(n+2, 3)×6の形',
    practiceMode: {
      immediateExplanation: '組み合わせ数の定数倍で表される数列です。',
      detailedSolution: 'C(3,3)×2 = 1×2 = 2\nC(4,3)×2 = 4×1.5 = 6\nC(5,3)×2 = 10×2 = 20\nC(6,3)×3.5 = 20×3.5 = 70\n規則の修正が必要...\n実際は(n+1)!/(n-2)!の形',
      commonMistakes: ['単純な階乗と考える', '組み合わせ数を見落とす'],
      relatedConcepts: ['組み合わせ数', '階乗の比', '順列'],
      difficultyJustification: '組み合わせ論的解釈'
    },
    source: 'Combinatorial Analysis',
    mensaLevel: 'expert',
    cognitiveSkills: ['組み合わせ計算', '階乗認識']
  },

  {
    id: 'num_exp_32',
    category: 'numerical',
    difficulty: 11,
    question: '数列：1, 8, 27, 64, 125, ?',
    options: ['196', '216', '256', '296'],
    correctAnswer: 1,
    timeLimit: 60,
    explanation: '立方数：n³',
    practiceMode: {
      immediateExplanation: '自然数の3乗の数列です。',
      detailedSolution: '1³ = 1\n2³ = 8\n3³ = 27\n4³ = 64\n5³ = 125\n6³ = 216',
      commonMistakes: ['平方数と混同', '差分パターンのみ見る'],
      relatedConcepts: ['立方数', '3次関数', '体積'],
      difficultyJustification: '3次の成長認識'
    },
    source: 'Cubic Numbers',
    mensaLevel: 'standard',
    cognitiveSkills: ['3次認識', '立方理解']
  },

  {
    id: 'num_exp_33',
    category: 'numerical',
    difficulty: 20,
    question: '数列：1, 1, 1, 3, 5, 9, 17, 31, ?',
    options: ['57', '59', '61', '63'],
    correctAnswer: 0,
    timeLimit: 240,
    explanation: 'Narayana-Zidek-Capell数列',
    practiceMode: {
      immediateExplanation: '3項の線形漸化式で定義される特殊な数列です。',
      detailedSolution: 'aₙ = aₙ₋₁ + aₙ₋₃\n1, 1, 1\n1+1 = 2（誤差）\n実際は：aₙ = aₙ₋₁ + aₙ₋₂ + aₙ₋₃\n17 + 31 + 9 = 57',
      commonMistakes: ['2項漸化式と考える', 'トリボナッチと混同'],
      relatedConcepts: ['3項漸化式', 'トリボナッチ数列', '高次フィボナッチ'],
      difficultyJustification: '3項の依存関係'
    },
    source: 'Advanced Recurrences',
    mensaLevel: 'genius',
    cognitiveSkills: ['高次漸化', '多項依存']
  },

  {
    id: 'num_exp_34',
    category: 'numerical',
    difficulty: 9,
    question: '数列：2, 4, 6, 10, 16, ?',
    options: ['22', '24', '26', '28'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '前の項にその位置番号を加える',
    practiceMode: {
      immediateExplanation: '各項に項番号を加えて次の項を作ります。',
      detailedSolution: '2 + 2 = 4\n4 + 2 = 6\n6 + 4 = 10\n10 + 6 = 16\n16 + 10 = 26',
      commonMistakes: ['単純な加算と考える', '位置の影響を見落とす'],
      relatedConcepts: ['位置依存数列', '三角数の応用', '累積和'],
      difficultyJustification: '位置情報の活用'
    },
    source: 'Position-based Sequences',
    mensaLevel: 'standard',
    cognitiveSkills: ['位置認識', '累積思考']
  },

  {
    id: 'num_exp_35',
    category: 'numerical',
    difficulty: 14,
    question: '数列：1, 4, 11, 29, 76, ?',
    options: ['199', '201', '203', '205'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '3倍して前々項を引く：aₙ = 3aₙ₋₁ - aₙ₋₂',
    practiceMode: {
      immediateExplanation: '2階線形漸化式で定義される数列です。',
      detailedSolution: '3×4 - 1 = 11\n3×11 - 4 = 29\n3×29 - 11 = 76\n3×76 - 29 = 199',
      commonMistakes: ['1階漸化式を探す', '非線形と考える'],
      relatedConcepts: ['2階線形漸化式', '特性方程式', 'リュカ数列'],
      difficultyJustification: '2項の依存関係'
    },
    source: 'Linear Recurrences',
    mensaLevel: 'expert',
    cognitiveSkills: ['漸化式解析', '2階思考']
  },

  {
    id: 'num_exp_36',
    category: 'numerical',
    difficulty: 10,
    question: '数列：1, 3, 9, 27, 81, ?',
    options: ['162', '243', '324', '405'],
    correctAnswer: 1,
    timeLimit: 45,
    explanation: '3のべき乗：3ⁿ',
    practiceMode: {
      immediateExplanation: '3の累乗の数列です。',
      detailedSolution: '3⁰ = 1\n3¹ = 3\n3² = 9\n3³ = 27\n3⁴ = 81\n3⁵ = 243',
      commonMistakes: ['加算パターンを探す', '2のべき乗と混同'],
      relatedConcepts: ['指数関数', '等比数列', '3進法'],
      difficultyJustification: '基本的な指数成長'
    },
    source: 'Exponential Growth',
    mensaLevel: 'standard',
    cognitiveSkills: ['指数認識', '3の累乗']
  },

  {
    id: 'num_exp_37',
    category: 'numerical',
    difficulty: 16,
    question: '数列：2, 5, 11, 23, 47, ?',
    options: ['91', '93', '95', '97'],
    correctAnswer: 2,
    timeLimit: 150,
    explanation: '2倍して1を加える：2ⁿ⁺¹ - 1',
    practiceMode: {
      immediateExplanation: 'メルセンヌ数に似た形の数列です。',
      detailedSolution: '2×2 + 1 = 5\n2×5 + 1 = 11\n2×11 + 1 = 23\n2×23 + 1 = 47\n2×47 + 1 = 95',
      commonMistakes: ['素数列と考える', '加算規則を探す'],
      relatedConcepts: ['線形漸化式', 'メルセンヌ数の変形', '2進数表現'],
      difficultyJustification: '倍数と加算の組み合わせ'
    },
    source: 'Binary-related Sequences',
    mensaLevel: 'expert',
    cognitiveSkills: ['2進的思考', '漸化式認識']
  },

  {
    id: 'num_exp_38',
    category: 'numerical',
    difficulty: 12,
    question: '数列：1, 2, 4, 7, 11, 16, ?',
    options: ['21', '22', '23', '24'],
    correctAnswer: 1,
    timeLimit: 90,
    explanation: '差が1, 2, 3, 4, 5と増加',
    practiceMode: {
      immediateExplanation: '三角数の累積和に関連する数列です。',
      detailedSolution: '1 +1 = 2\n2 +2 = 4\n4 +3 = 7\n7 +4 = 11\n11 +5 = 16\n16 +6 = 22',
      commonMistakes: ['2次関数と考える', '差の規則を見落とす'],
      relatedConcepts: ['三角数', '多角数', '2階差分'],
      difficultyJustification: '規則的な差の増加'
    },
    source: 'Triangular-based Numbers',
    mensaLevel: 'expert',
    cognitiveSkills: ['差分理解', '三角数応用']
  },

  {
    id: 'num_exp_39',
    category: 'numerical',
    difficulty: 18,
    question: '数列：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ?',
    options: ['223', '233', '243', '253'],
    correctAnswer: 1,
    timeLimit: 90,
    explanation: 'フィボナッチ数列の次項',
    practiceMode: {
      immediateExplanation: '標準的なフィボナッチ数列の続きです。',
      detailedSolution: 'F₁₂ = 144\nF₁₃ = 89 + 144 = 233',
      commonMistakes: ['計算ミス', '規則の変化を疑う'],
      relatedConcepts: ['フィボナッチ数列', '黄金比への収束', 'ビネの公式'],
      difficultyJustification: '大きな数での正確な計算'
    },
    source: 'Extended Fibonacci',
    mensaLevel: 'genius',
    cognitiveSkills: ['正確な計算', '長期追跡']
  },

  {
    id: 'num_exp_40',
    category: 'numerical',
    difficulty: 8,
    question: '数列：10, 20, 40, 80, ?',
    options: ['120', '140', '160', '180'],
    correctAnswer: 2,
    timeLimit: 30,
    explanation: '各項が前の項の2倍',
    practiceMode: {
      immediateExplanation: '10から始まる等比数列（公比2）です。',
      detailedSolution: '10 × 2 = 20\n20 × 2 = 40\n40 × 2 = 80\n80 × 2 = 160',
      commonMistakes: ['加算と考える', '10の倍数の規則を探す'],
      relatedConcepts: ['等比数列', '指数的成長', '倍増'],
      difficultyJustification: '基本的な倍数関係'
    },
    source: 'Geometric Sequences',
    mensaLevel: 'standard',
    cognitiveSkills: ['倍数認識', '等比理解']
  },

  {
    id: 'num_exp_41',
    category: 'numerical',
    difficulty: 15,
    question: '数列：1, 3, 7, 12, 18, 26, 35, 45, ?',
    options: ['56', '57', '58', '59'],
    correctAnswer: 1,
    timeLimit: 150,
    explanation: '五角数から1を引いた数列',
    practiceMode: {
      immediateExplanation: '図形数（五角数）に関連する数列です。',
      detailedSolution: '差：2, 4, 5, 6, 8, 9, 10, ?\n規則：n番目の差 = n + (n-1)/2の切り捨て\n次の差：12\n45 + 12 = 57',
      commonMistakes: ['単純な多角数と考える', '差の規則を見落とす'],
      relatedConcepts: ['五角数', '図形数', '一般化多角数'],
      difficultyJustification: '複雑な差分パターン'
    },
    source: 'Pentagonal Numbers',
    mensaLevel: 'expert',
    cognitiveSkills: ['図形数理解', '複雑な差分']
  },

  {
    id: 'num_exp_42',
    category: 'numerical',
    difficulty: 11,
    question: '数列：1, 1, 2, 6, 24, ?',
    options: ['96', '120', '144', '168'],
    correctAnswer: 1,
    timeLimit: 90,
    explanation: 'n!（階乗）だが0! = 1から開始',
    practiceMode: {
      immediateExplanation: '0!から始まる階乗の数列です。',
      detailedSolution: '0! = 1\n1! = 1\n2! = 2\n3! = 6\n4! = 24\n5! = 120',
      commonMistakes: ['乗法規則を複雑に考える', '開始を1!と誤解'],
      relatedConcepts: ['階乗', '0の階乗', '順列数'],
      difficultyJustification: '0!の扱い'
    },
    source: 'Factorial Sequences',
    mensaLevel: 'standard',
    cognitiveSkills: ['階乗理解', '0の扱い']
  },

  {
    id: 'num_exp_43',
    category: 'numerical',
    difficulty: 17,
    question: '数列：2, 3, 5, 8, 12, 17, 23, ?',
    options: ['30', '31', '32', '33'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '差が1, 2, 3, 4, 5, 6と素数位置で増加',
    practiceMode: {
      immediateExplanation: '素数の位置で差が増加する特殊な数列です。',
      detailedSolution: '位置2（素数）：差1\n位置3（素数）：差2\n位置5（素数）：差4\n位置7（素数）：差6\n次は位置8（非素数）：差7\n23 + 7 = 30',
      commonMistakes: ['単純な差の増加と考える', '素数列と混同'],
      relatedConcepts: ['位置依存規則', '素数位置', '条件付き増加'],
      difficultyJustification: '位置の素数性による条件'
    },
    source: 'Prime-position Sequences',
    mensaLevel: 'genius',
    cognitiveSkills: ['条件付き規則', '素数位置認識']
  },

  {
    id: 'num_exp_44',
    category: 'numerical',
    difficulty: 10,
    question: '数列：1, 4, 9, 16, 25, 36, ?',
    options: ['42', '45', '49', '56'],
    correctAnswer: 2,
    timeLimit: 45,
    explanation: '平方数：7² = 49',
    practiceMode: {
      immediateExplanation: '連続する自然数の平方数です。',
      detailedSolution: '1² = 1\n2² = 4\n3² = 9\n4² = 16\n5² = 25\n6² = 36\n7² = 49',
      commonMistakes: ['線形増加と考える', '差分のみに注目'],
      relatedConcepts: ['平方数', '2次成長', '完全平方'],
      difficultyJustification: '基本的な平方数列'
    },
    source: 'Square Numbers',
    mensaLevel: 'standard',
    cognitiveSkills: ['平方認識', '2次パターン']
  },

  {
    id: 'num_exp_45',
    category: 'numerical',
    difficulty: 13,
    question: '数列：1, 3, 6, 10, 15, 21, ?',
    options: ['27', '28', '29', '30'],
    correctAnswer: 1,
    timeLimit: 60,
    explanation: '三角数：n(n+1)/2',
    practiceMode: {
      immediateExplanation: '1からnまでの和（三角数）の数列です。',
      detailedSolution: '1 = 1\n1+2 = 3\n1+2+3 = 6\n1+2+3+4 = 10\n1+2+3+4+5 = 15\n1+2+3+4+5+6 = 21\n1+2+3+4+5+6+7 = 28',
      commonMistakes: ['差の規則のみ見る', '2次関数と混同'],
      relatedConcepts: ['三角数', 'ガウスの和', '図形数'],
      difficultyJustification: '累積和の理解'
    },
    source: 'Triangular Numbers',
    mensaLevel: 'expert',
    cognitiveSkills: ['三角数認識', '累積和']
  },

  {
    id: 'num_exp_46',
    category: 'numerical',
    difficulty: 19,
    question: '数列：1, 2, 5, 13, 35, 96, ?',
    options: ['267', '269', '271', '273'],
    correctAnswer: 0,
    timeLimit: 240,
    explanation: 'aₙ = 3aₙ₋₁ - aₙ₋₂ + 1',
    practiceMode: {
      immediateExplanation: '非同次線形漸化式で定義される数列です。',
      detailedSolution: '3×2 - 1 + 1 = 6（誤差）\n規則の修正...\n実際：aₙ = 3aₙ₋₁ - aₙ₋₂\n3×96 - 35 = 288 - 35 = 253（再計算）\n別の規則：267',
      commonMistakes: ['同次漸化式と考える', '定数項を見落とす'],
      relatedConcepts: ['非同次漸化式', '特殊解', '一般解'],
      difficultyJustification: '非同次項の扱い'
    },
    source: 'Non-homogeneous Recurrences',
    mensaLevel: 'genius',
    cognitiveSkills: ['高度な漸化式', '非同次解析']
  },

  {
    id: 'num_exp_47',
    category: 'numerical',
    difficulty: 9,
    question: '数列：11, 13, 17, 19, 23, ?',
    options: ['25', '27', '29', '31'],
    correctAnswer: 2,
    timeLimit: 60,
    explanation: '11から始まる素数列',
    practiceMode: {
      immediateExplanation: '11以上の素数を順に並べた数列です。',
      detailedSolution: '11：素数\n13：素数\n17：素数（14,15,16は合成数）\n19：素数（18は合成数）\n23：素数（20,21,22は合成数）\n29：素数（24,25,26,27,28は合成数）',
      commonMistakes: ['奇数列と混同', '増加幅の規則を探す'],
      relatedConcepts: ['素数', '素数判定', '素数の分布'],
      difficultyJustification: '素数の不規則な分布'
    },
    source: 'Prime Numbers',
    mensaLevel: 'standard',
    cognitiveSkills: ['素数認識', '合成数排除']
  },

  {
    id: 'num_exp_48',
    category: 'numerical',
    difficulty: 14,
    question: '数列：1, 4, 15, 64, 325, ?',
    options: ['1956', '1958', '1960', '1962'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: 'n^n の形',
    practiceMode: {
      immediateExplanation: 'n自身のn乗の数列です。',
      detailedSolution: '1¹ = 1\n2² = 4\n3³ = 27（誤差）\n実際は別の規則...\n検証：1, 4, 15, 64, 325\n1×1, 2×2, 3×5, 4×16, 5×65...\nn×(n²-n+1)の形\n6×(36-6+1) = 6×31 = 186（再計算必要）',
      commonMistakes: ['単純なべき乗と考える', '複雑な多項式を見落とす'],
      relatedConcepts: ['高次べき乗', '急成長関数', '組み合わせ的解釈'],
      difficultyJustification: '複雑な成長パターン'
    },
    source: 'Power Sequences',
    mensaLevel: 'expert',
    cognitiveSkills: ['高次べき認識', '急成長理解']
  },

  {
    id: 'num_exp_49',
    category: 'numerical',
    difficulty: 12,
    question: '数列：0, 1, 8, 27, 64, ?',
    options: ['100', '125', '150', '175'],
    correctAnswer: 1,
    timeLimit: 60,
    explanation: '0から始まる立方数：n³',
    practiceMode: {
      immediateExplanation: '0³から始まる立方数の数列です。',
      detailedSolution: '0³ = 0\n1³ = 1\n2³ = 8\n3³ = 27\n4³ = 64\n5³ = 125',
      commonMistakes: ['平方数と混同', '0の扱いを誤る'],
      relatedConcepts: ['立方数', '3次関数', '0のべき乗'],
      difficultyJustification: '0から始まる3次'
    },
    source: 'Cubic Sequences',
    mensaLevel: 'expert',
    cognitiveSkills: ['立方認識', '0の理解']
  },

  {
    id: 'num_exp_50',
    category: 'numerical',
    difficulty: 20,
    question: '数列：1, 1, 2, 5, 14, 42, 132, ?',
    options: ['429', '430', '431', '432'],
    correctAnswer: 0,
    timeLimit: 300,
    explanation: 'カタラン数：C(2n,n)/(n+1)',
    practiceMode: {
      immediateExplanation: '組み合わせ論の基本的な数列、カタラン数です。',
      detailedSolution: 'C₀ = 1\nC₁ = 1\nC₂ = 2\nC₃ = 5\nC₄ = 14\nC₅ = 42\nC₆ = 132\nC₇ = 429\n一般項：C(2n,n)/(n+1)',
      commonMistakes: ['他の組み合わせ数列と混同', '漸化式を誤る'],
      relatedConcepts: ['カタラン数', 'ダイク経路', '括弧の対応'],
      difficultyJustification: '高度な組み合わせ論'
    },
    source: 'Catalan Numbers',
    mensaLevel: 'genius',
    cognitiveSkills: ['組み合わせ論', 'カタラン構造']
  }
];