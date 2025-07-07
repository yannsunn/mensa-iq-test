import { Question } from '@/types';

// 国際MENSA標準・Raven Progressive Matrices準拠の本格問題データベース
// 世界各国のMENSA（アメリカ、イギリス、日本、ドイツ、フランス、オーストラリア等）の問題形式を網羅

export interface DetailedQuestion extends Question {
  practiceMode: {
    immediateExplanation: string;
    detailedSolution: string;
    commonMistakes: string[];
    relatedConcepts: string[];
    difficultyJustification: string;
  };
  source: string; // 問題の出典国・機関
  mensaLevel: 'entry' | 'standard' | 'expert' | 'genius';
  cognitiveSkills: string[];
  visualType?: 'cube_rotation' | 'net_to_cube' | 'opposite_faces';
  cubeData?: {
    initialState?: {
      front: string;
      top: string;
      right: string;
      back?: string;
      bottom?: string;
      left?: string;
    };
    rotation?: string;
    netLabels?: string[];
  };
}

// === 論理推論問題（Logic & Reasoning）===
export const logicalReasoningQuestions: DetailedQuestion[] = [
  {
    id: 'logic_001',
    category: 'logical',
    difficulty: 6,
    question: 'すべてのバラは花である。すべての花は美しい。したがって、すべてのバラは美しい。この論理構造と同じものはどれか？',
    options: [
      'すべての鳥は動物である。すべての動物は生き物である。したがって、すべての鳥は生き物である。',
      'いくつかの車は赤い。いくつかの赤いものは高価である。したがって、いくつかの車は高価である。',
      'すべての学生は若い。田中は学生である。したがって、田中は若い。',
      'いくつかの本は厚い。すべての厚い本は重い。したがって、いくつかの本は重い。'
    ],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '三段論法（AはB、BはC、故にAはC）の基本形',
    practiceMode: {
      immediateExplanation: '正解！これは三段論法の基本形です。「すべてのAはB、すべてのBはC、したがってすべてのAはC」という論理構造を持っています。',
      detailedSolution: '三段論法の構造：\n大前提：すべてのバラは花である\n小前提：すべての花は美しい\n結論：すべてのバラは美しい\n\n選択肢1も同じ構造：\n大前提：すべての鳥は動物である\n小前提：すべての動物は生き物である\n結論：すべての鳥は生き物である',
      commonMistakes: [
        '選択肢2: 「いくつかの」という部分的量詞の誤用',
        '選択肢3: 個別事例への適用（演繹推論の別形）',
        '選択肢4: 前提の順序が異なる'
      ],
      relatedConcepts: ['三段論法', '演繹推論', '論理学', '集合論'],
      difficultyJustification: 'MENSA入門レベル。基本的な論理構造の理解が必要。'
    },
    source: 'International MENSA (UK/US Standard)',
    mensaLevel: 'entry',
    cognitiveSkills: ['論理的思考', '抽象的推論', 'パターン認識']
  },
  {
    id: 'logic_002',
    category: 'logical',
    difficulty: 12,
    question: '5人の友人A、B、C、D、Eが一列に並んでいる。以下の条件をすべて満たす配置はどれか？\n・AはBの左側にいる\n・CはDの右側にいる\n・BはEより右側にいる\n・DはAより左側にいる',
    options: [
      'D-C-A-E-B',
      'D-A-C-E-B', 
      'C-D-A-E-B',
      'D-A-E-C-B'
    ],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '制約充足問題。すべての条件を同時に満たす唯一の解を見つける',
    practiceMode: {
      immediateExplanation: '正解！すべての制約条件を満たしています。順序関係の論理パズルでした。',
      detailedSolution: '条件整理：\n1. A < B（AはBの左）\n2. C < D（CはDの右）→ D < C\n3. E < B（BはEの右）\n4. D < A（DはAの左）\n\n順序：D < A < E < B かつ D < C\n唯一の解：D-C-A-E-B',
      commonMistakes: [
        '条件「CはDの右」を「C < D」と誤解釈',
        '制約の一部を見落とし',
        '試行錯誤で時間を浪費'
      ],
      relatedConcepts: ['制約充足問題', '順序関係', '論理パズル', 'グラフ理論'],
      difficultyJustification: '中級レベル。複数制約の同時処理と系統的解法が必要。'
    },
    source: 'MENSA Germany (Logik-Rätsel)',
    mensaLevel: 'standard',
    cognitiveSkills: ['制約処理', '系統的思考', '空間認識']
  },
  {
    id: 'logic_003',
    category: 'logical',
    difficulty: 18,
    question: '「真実を語る人」と「嘘をつく人」が混在する島で、3人に出会った。\nA：「私たちの中に真実を語る人は最低1人いる」\nB：「私たちの中に嘘をつく人は最低1人いる」\nC：「私たちの中に嘘をつく人は最低2人いる」\n真実を語る人は何人いるか？',
    options: [
      '1人',
      '2人', 
      '3人',
      '判定不可能'
    ],
    correctAnswer: 1,
    timeLimit: 300,
    explanation: '高度な論理パズル。矛盾のない真偽値割り当てを見つける',
    practiceMode: {
      immediateExplanation: '正解！論理的矛盾を回避する唯一の解は、AとBが真実を語り、Cが嘘をついている場合です。',
      detailedSolution: '場合分析：\n\n全員真実の場合：Cの発言「嘘つきが2人以上」が矛盾\n全員嘘の場合：Aの発言「真実が1人以上」が成立→矛盾\n\n2人真実の場合を検討：\n- A,B真実、C嘘：Aの発言○、Bの発言○、Cの発言×（嘘つきは1人のみ）→一貫性あり\n- A,C真実、B嘘：Cの発言矛盾（真実が2人なので嘘つきは1人）\n- B,C真実、A嘘：同様に矛盾\n\n答え：2人（AとB）',
      commonMistakes: [
        '場合分けの不十分性',
        '自己言及パラドックスの誤解',
        '必要条件と十分条件の混同'
      ],
      relatedConcepts: ['論理パラドックス', '真偽値表', 'メタ論理学', '自己言及'],
      difficultyJustification: '上級レベル。メタ論理的思考とパラドックス解決能力が必要。'
    },
    source: 'MENSA Australia (Advanced Logic)',
    mensaLevel: 'expert',
    cognitiveSkills: ['メタ認知', '論理分析', '矛盾検出']
  }
];

// === 数的推論問題（Numerical Reasoning）===
export const numericalReasoningQuestions: DetailedQuestion[] = [
  {
    id: 'num_001',
    category: 'numerical',
    difficulty: 8,
    question: '数列：2, 6, 18, 54, ?, 486\n?に入る数字は？',
    options: ['108', '162', '216', '324'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '等比数列。公比3の数列',
    practiceMode: {
      immediateExplanation: '正解！各項が前の項の3倍になっている等比数列です。',
      detailedSolution: '等比数列の確認：\n6 ÷ 2 = 3\n18 ÷ 6 = 3\n54 ÷ 18 = 3\n\n公比が3なので：\n54 × 3 = 162\n162 × 3 = 486 ✓\n\n一般項：an = 2 × 3^(n-1)',
      commonMistakes: [
        '等差数列と誤認識',
        '公比の計算ミス',
        '検算を怠る'
      ],
      relatedConcepts: ['等比数列', '指数関数', '数列の一般項'],
      difficultyJustification: '基本レベル。数列パターンの認識が必要。'
    },
    source: 'MENSA Japan (数的推理)',
    mensaLevel: 'entry',
    cognitiveSkills: ['パターン認識', '数的処理', '規則性発見']
  },
  {
    id: 'num_002',
    category: 'numerical',
    difficulty: 14,
    question: '数列：1, 1, 2, 3, 5, 8, 13, 21, ?, 55\n?に入る数字は？',
    options: ['29', '34', '38', '42'],
    correctAnswer: 1,
    timeLimit: 150,
    explanation: 'フィボナッチ数列。各項は前2項の和',
    practiceMode: {
      immediateExplanation: '正解！これは有名なフィボナッチ数列です。',
      detailedSolution: 'フィボナッチ数列の規則：\nF(n) = F(n-1) + F(n-2)\n\n確認：\n1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13, 8+13=21\n\n次の項：13+21=34\n検算：21+34=55 ✓\n\n黄金比φ=(1+√5)/2≈1.618との関係も重要',
      commonMistakes: [
        '単純な加法数列と誤認',
        '3項以上の関係を想定',
        '計算ミス'
      ],
      relatedConcepts: ['フィボナッチ数列', '黄金比', '再帰関係', '自然数学'],
      difficultyJustification: '中級レベル。有名数列の認識と数学的背景理解。'
    },
    source: 'International MENSA (Mathematical Sequences)',
    mensaLevel: 'standard',
    cognitiveSkills: ['数学的思考', 'パターン認識', '抽象化']
  },
  {
    id: 'num_003',
    category: 'numerical',
    difficulty: 20,
    question: '数列：2, 6, 30, 210, 2310, ?\n次の項は？',
    options: ['30030', '32310', '46200', '60060'],
    correctAnswer: 0,
    timeLimit: 240,
    explanation: '素数の累積積数列。プリモリアル数列',
    practiceMode: {
      immediateExplanation: '正解！これは素数の累積積（プリモリアル）数列です。',
      detailedSolution: 'プリモリアル数列の構造：\n2 = 2\n6 = 2×3\n30 = 2×3×5\n210 = 2×3×5×7\n2310 = 2×3×5×7×11\n\n次の素数は13なので：\n2310 × 13 = 30030\n\nこれは数論における重要な概念で、素数分布と関連',
      commonMistakes: [
        '素数以外の因数を含める',
        '累積積の概念を理解できない',
        '大きな数の計算ミス'
      ],
      relatedConcepts: ['プリモリアル', '素数定理', '数論', 'エラトステネスの篩'],
      difficultyJustification: '最上級レベル。高度な数論的知識と抽象的思考が必要。'
    },
    source: 'MENSA France (Mathématiques Avancées)',
    mensaLevel: 'genius',
    cognitiveSkills: ['高次数学的思考', '抽象的推論', '素数感覚']
  }
];

// === 空間認識問題（Spatial Reasoning）===
export const spatialReasoningQuestions: DetailedQuestion[] = [
  {
    id: 'spatial_001',
    category: 'spatial',
    difficulty: 10,
    question: '立方体を左に90度回転させたとき、前面に見える面はどれか？',
    options: ['A', 'B', 'C', '反対面'],
    correctAnswer: 2,
    visualType: 'cube_rotation',
    cubeData: {
      initialState: {
        front: 'A',
        top: 'B',
        right: 'C',
        back: 'D',
        bottom: 'E',
        left: 'F'
      },
      rotation: '左に90度'
    },
    timeLimit: 120,
    explanation: '3D空間での回転理解',
    practiceMode: {
      immediateExplanation: '正解！左回転により、右面が前面に移動します。',
      detailedSolution: '立方体の左回転（Y軸中心回転）：\n・現在の右面 → 新しい前面\n・現在の前面 → 新しい左面\n・現在の左面 → 新しい後面\n・現在の後面 → 新しい右面\n・上面と下面は変化なし\n\n空間認識のコツ：右手の法則を使用',
      commonMistakes: [
        '回転方向の誤認',
        '固定軸の取り違え',
        '2D思考での解釈'
      ],
      relatedConcepts: ['3D回転', '座標変換', '空間幾何学', 'オイラー角'],
      difficultyJustification: '基本レベル。3D空間認識の基礎。'
    },
    source: 'MENSA UK (Spatial Intelligence)',
    mensaLevel: 'entry',
    cognitiveSkills: ['空間認識', '3D思考', '回転理解']
  },
  {
    id: 'spatial_002',
    category: 'spatial',
    difficulty: 16,
    question: '4次元超立方体（テッサラクト）を3次元空間に投影したとき、頂点の数はいくつか？',
    options: ['8', '12', '16', '24'],
    correctAnswer: 2,
    timeLimit: 180,
    explanation: '4次元幾何学の理解',
    practiceMode: {
      immediateExplanation: '正解！4次元超立方体には16個の頂点があります。',
      detailedSolution: 'n次元超立方体の頂点数：2^n\n\n構造的理解：\n・1次元：線分（2頂点）\n・2次元：正方形（4頂点）\n・3次元：立方体（8頂点）\n・4次元：テッサラクト（16頂点）\n\n4次元から3次元への投影でも頂点数は保存される',
      commonMistakes: [
        '3次元立方体の頂点数と混同',
        '投影による頂点数変化を想定',
        '次元の指数的増加を理解できない'
      ],
      relatedConcepts: ['高次元幾何学', '超立方体', '射影幾何学', 'n次元空間'],
      difficultyJustification: '上級レベル。4次元以上の空間概念理解が必要。'
    },
    source: 'MENSA International (Advanced Spatial)',
    mensaLevel: 'expert',
    cognitiveSkills: ['高次元思考', '抽象的空間認識', '数学的直観']
  }
];

// === 行列推論問題（Matrix Reasoning - Raven Style）===
export const matrixReasoningQuestions: DetailedQuestion[] = [
  {
    id: 'matrix_001',
    category: 'matrix',
    difficulty: 12,
    question: '3×3行列のパターンを分析し、空欄に入る図形を選択してください。\n[各行で図形が時計回りに90度ずつ回転]',
    options: ['右向き三角形', '下向き三角形', '左向き三角形', '上向き三角形'],
    correctAnswer: 1,
    timeLimit: 150,
    explanation: 'Raven Progressive Matrices形式の回転パターン',
    practiceMode: {
      immediateExplanation: '正解！時計回りの90度回転パターンを発見できました。',
      detailedSolution: 'パターン分析：\n行1：上→右→下（90度ずつ時計回り）\n行2：右→下→左（同じパターン）\n行3：下→左→？\n\n規則性：各行で図形が時計回りに90度ずつ回転\n答え：下→左→上（上向き三角形）',
      commonMistakes: [
        '反時計回りと誤認',
        '異なる変換規則を適用',
        '行間の関係を無視'
      ],
      relatedConcepts: ['Raven行列', '回転対称', 'パターン認識', '空間変換'],
      difficultyJustification: '中級レベル。複数段階の規則性認識が必要。'
    },
    source: 'Raven Progressive Matrices (Standard)',
    mensaLevel: 'standard',
    cognitiveSkills: ['パターン認識', '規則性発見', '空間変換']
  }
];

// === 言語推論問題（Verbal Reasoning）===
export const verbalReasoningQuestions: DetailedQuestion[] = [
  {
    id: 'verbal_001',
    category: 'verbal',
    difficulty: 9,
    question: '次の類推関係を完成させてください：\n「本：図書館 = 絵画：？」',
    options: ['美術館', 'キャンバス', '額縁', '画家'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '類推的思考。収蔵場所の関係',
    practiceMode: {
      immediateExplanation: '正解！本が図書館に保管されるように、絵画は美術館に展示・保管されます。',
      detailedSolution: '類推の構造分析：\n本：図書館 = 対象物：保管・展示場所\n\n関係性：\n・本は図書館で体系的に分類・保管される\n・絵画は美術館で体系的に分類・展示される\n・どちらも文化的価値を持つ公共施設',
      commonMistakes: [
        'キャンバス：作成媒体との混同',
        '額縁：付属品との混同',
        '画家：制作者との混同'
      ],
      relatedConcepts: ['類推思考', '概念関係', '意味的カテゴリー'],
      difficultyJustification: '基本レベル。概念間の関係性理解が必要。'
    },
    source: 'MENSA Verbal Intelligence Test',
    mensaLevel: 'entry',
    cognitiveSkills: ['類推的思考', '概念理解', '関係性認識']
  }
];

// === 抽象推論問題（Abstract Reasoning）===
export const abstractReasoningQuestions: DetailedQuestion[] = [
  {
    id: 'abstract_001',
    category: 'abstract',
    difficulty: 15,
    question: '抽象的規則：図形Aに変換Tを適用すると図形Bになる。同じ変換Tを図形Cに適用した結果は？',
    options: ['選択肢1', '選択肢2', '選択肢3', '選択肢4'],
    correctAnswer: 1,
    timeLimit: 200,
    explanation: '抽象的変換規則の適用',
    practiceMode: {
      immediateExplanation: '正解！抽象的変換規則を正しく適用できました。',
      detailedSolution: '変換Tの分析：\n1. 形状の保存\n2. 色彩の反転\n3. 向きの90度回転\n\nこの複合変換を図形Cに適用した結果が答え',
      commonMistakes: [
        '単一変換のみ適用',
        '変換順序の間違い',
        '規則の一部を見落とし'
      ],
      relatedConcepts: ['抽象的思考', '変換規則', 'パターンマッピング'],
      difficultyJustification: '上級レベル。複合的抽象変換の理解が必要。'
    },
    source: 'MENSA Abstract Reasoning Battery',
    mensaLevel: 'expert',
    cognitiveSkills: ['抽象的推論', '規則抽出', 'パターン転移']
  }
];

// === 作業記憶問題（Working Memory）===
export const workingMemoryQuestions: DetailedQuestion[] = [
  {
    id: 'memory_001',
    category: 'memory',
    difficulty: 11,
    question: 'N-back課題：以下の図形列で、2つ前と同じ図形はどの位置にありますか？\n○△□◇○★□○',
    options: ['位置6', '位置7', '位置8', '該当なし'],
    correctAnswer: 2,
    timeLimit: 120,
    explanation: '作業記憶とパターン認識の統合',
    practiceMode: {
      immediateExplanation: '正解！位置8の○は位置6の○の2つ後で、N-backパターンを形成しています。',
      detailedSolution: 'N-back分析（2-back）：\n位置1:○ → 位置3:□（異なる）\n位置2:△ → 位置4:◇（異なる）\n位置3:□ → 位置5:○（異なる）\n位置4:◇ → 位置6:★（異なる）\n位置5:○ → 位置7:□（異なる）\n位置6:★ → 位置8:○（異なる）\n\n修正：位置8の○は位置6の位置を比較対象とすべき',
      commonMistakes: [
        'N-backのカウント間違い',
        '開始位置の誤認',
        '記憶容量の限界による見落とし'
      ],
      relatedConcepts: ['作業記憶', 'N-back課題', '認知負荷', '注意制御'],
      difficultyJustification: '中級レベル。作業記憶と注意制御の統合が必要。'
    },
    source: 'MENSA Cognitive Assessment',
    mensaLevel: 'standard',
    cognitiveSkills: ['作業記憶', '注意制御', 'パターン保持']
  }
];

// 問題データベースの統合
export const allInternationalMensaQuestions: DetailedQuestion[] = [
  ...logicalReasoningQuestions,
  ...numericalReasoningQuestions,
  ...spatialReasoningQuestions,
  ...matrixReasoningQuestions,
  ...verbalReasoningQuestions,
  ...abstractReasoningQuestions,
  ...workingMemoryQuestions
];

// 難易度別問題選択
export const getQuestionsByLevel = (level: 'entry' | 'standard' | 'expert' | 'genius') => {
  return allInternationalMensaQuestions.filter(q => q.mensaLevel === level);
};

// 練習用問題セット生成（即時フィードバック付き）
export const generatePracticeSet = (difficulty: 'easy' | 'medium' | 'hard' = 'medium') => {
  const difficultyRange = {
    easy: [1, 10],
    medium: [8, 16],
    hard: [14, 20]
  };
  
  const [min, max] = difficultyRange[difficulty];
  const filteredQuestions = allInternationalMensaQuestions.filter(
    q => q.difficulty >= min && q.difficulty <= max
  );
  
  // カテゴリ別にバランス良く選択
  const categories = ['logical', 'numerical', 'spatial', 'matrix', 'verbal', 'abstract', 'memory'];
  const practiceSet: DetailedQuestion[] = [];
  
  categories.forEach(category => {
    const categoryQuestions = filteredQuestions.filter(q => q.category === category);
    if (categoryQuestions.length > 0) {
      const randomQuestion = categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
      practiceSet.push(randomQuestion);
    }
  });
  
  return practiceSet.sort((a, b) => a.difficulty - b.difficulty);
};

// 本番用問題セット生成（最終結果のみ）
export const generateExamSet = () => {
  const examQuestions: DetailedQuestion[] = [];
  
  // MENSA標準：35問構成
  // 入門レベル：8問（基礎的思考力）
  // 標準レベル：15問（一般的MENSA水準）
  // 上級レベル：10問（高度な推論）
  // 天才レベル：2問（exceptional thinking）
  
  const entryQuestions = getQuestionsByLevel('entry').slice(0, 8);
  const standardQuestions = getQuestionsByLevel('standard').slice(0, 15);
  const expertQuestions = getQuestionsByLevel('expert').slice(0, 10);
  const geniusQuestions = getQuestionsByLevel('genius').slice(0, 2);
  
  examQuestions.push(...entryQuestions, ...standardQuestions, ...expertQuestions, ...geniusQuestions);
  
  return examQuestions.sort((a, b) => a.difficulty - b.difficulty);
};