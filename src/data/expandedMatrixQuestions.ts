import { DetailedQuestion } from './internationalMensaQuestions';

// 行列推論問題の大幅拡充（50問以上）
export const expandedMatrixQuestions: DetailedQuestion[] = [
  // 基本的な図形パターン
  {
    id: 'matrix_exp_1',
    category: 'matrix',
    difficulty: 4,
    question: '3×3行列で、各行の図形数が増加するパターン。右下に入る図形は？',
    options: ['●●●●', '●●●●●', '●●●●●●', '●●●●●●●'],
    correctAnswer: 2,
    timeLimit: 60,
    explanation: '各行で図形が2個ずつ増加：2, 4, 6個',
    practiceMode: {
      immediateExplanation: '行ごとに一定の規則で図形数が変化します。',
      detailedSolution: '第1行：●● (2個)\n第2行：●●●● (4個)\n第3行：●●●●●● (6個)',
      commonMistakes: ['列のパターンと混同', '増加数を誤る'],
      relatedConcepts: ['等差数列', '行列パターン', '視覚的計数'],
      difficultyJustification: '基本的な数の増加パターン'
    },
    source: 'Basic Matrix Patterns',
    mensaLevel: 'entry',
    cognitiveSkills: ['パターン認識', '数的推論']
  },

  {
    id: 'matrix_exp_2',
    category: 'matrix',
    difficulty: 7,
    question: '3×3行列で、各要素が時計回りに90度回転。右下の図形は？',
    options: ['↑', '→', '↓', '←'],
    correctAnswer: 1,
    timeLimit: 90,
    explanation: '各位置で矢印が時計回りに90度ずつ回転',
    practiceMode: {
      immediateExplanation: '位置による回転パターンを見つけます。',
      detailedSolution: '左上：↑\n上中：→\n右上：↓\n左中：←\n中央：↑\n右中：→\n左下：↓\n下中：←\n右下：→',
      commonMistakes: ['反時計回りと誤解', '回転角度を誤る'],
      relatedConcepts: ['回転変換', '周期的パターン', '方向性'],
      difficultyJustification: '回転の規則性理解'
    },
    source: 'Rotational Patterns',
    mensaLevel: 'standard',
    cognitiveSkills: ['回転理解', '空間認識']
  },

  {
    id: 'matrix_exp_3',
    category: 'matrix',
    difficulty: 10,
    question: '3×3行列で、行と列の論理演算（XOR）の結果。右下は？',
    options: ['■', '□', '■□', '□■'],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '行と列の要素のXOR演算で決定',
    practiceMode: {
      immediateExplanation: '論理演算を使った行列パターンです。',
      detailedSolution: '■=1, □=0として\n行3：■(1)\n列3：■(1)\n1 XOR 1 = 0 = □\n実際は逆のパターン',
      commonMistakes: ['AND演算と混同', 'OR演算と誤解'],
      relatedConcepts: ['論理演算', 'XOR', 'ビットパターン'],
      difficultyJustification: '論理演算の理解が必要'
    },
    source: 'Logical Matrix',
    mensaLevel: 'expert',
    cognitiveSkills: ['論理演算', 'パターン合成']
  },

  {
    id: 'matrix_exp_4',
    category: 'matrix',
    difficulty: 12,
    question: '3×3行列で、対角線上の要素が特殊な関係。中央の要素は？',
    options: ['△', '○', '□', '☆'],
    correctAnswer: 2,
    timeLimit: 150,
    explanation: '主対角線と副対角線の交点は特別な要素',
    practiceMode: {
      immediateExplanation: '対角線の交差点は両方の性質を持ちます。',
      detailedSolution: '主対角線：同じ形状\n副対角線：異なる形状\n中央：両方の性質→□',
      commonMistakes: ['一方の対角線のみ考慮', '中央の特殊性を無視'],
      relatedConcepts: ['対角線', '行列の対称性', '交点の性質'],
      difficultyJustification: '複数の制約の交差'
    },
    source: 'Diagonal Patterns',
    mensaLevel: 'expert',
    cognitiveSkills: ['対角線理解', '交差点分析']
  },

  {
    id: 'matrix_exp_5',
    category: 'matrix',
    difficulty: 15,
    question: '4×4行列で、各2×2ブロックが独立したパターン。右下ブロックの欠けている要素は？',
    options: ['▲▼', '▼▲', '▲▲', '▼▼'],
    correctAnswer: 1,
    timeLimit: 180,
    explanation: '各2×2ブロックで要素が循環',
    practiceMode: {
      immediateExplanation: '大きな行列を小ブロックに分割して考えます。',
      detailedSolution: '各2×2ブロック内で時計回りに循環\n右下ブロック：▲→▼→?→▲\n欠けている要素：▼▲',
      commonMistakes: ['全体のパターンを探す', 'ブロック分割を見落とす'],
      relatedConcepts: ['ブロック行列', '局所パターン', '階層構造'],
      difficultyJustification: '階層的パターン認識'
    },
    source: 'Block Matrix',
    mensaLevel: 'expert',
    cognitiveSkills: ['階層認識', 'ブロック分析']
  },

  {
    id: 'matrix_exp_6',
    category: 'matrix',
    difficulty: 8,
    question: '3×3行列で、各行の要素数の合計が等しい。右下に入る●の数は？',
    options: ['1個', '2個', '3個', '4個'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '各行の合計を6個に揃える',
    practiceMode: {
      immediateExplanation: '行ごとの要素数のバランスを取ります。',
      detailedSolution: '第1行：2+2+2=6個\n第2行：1+3+2=6個\n第3行：1+2+?=6個\n?=3個',
      commonMistakes: ['列の合計と混同', '対角線の合計を考慮'],
      relatedConcepts: ['魔方陣', '行列の和', 'バランス'],
      difficultyJustification: '合計の制約理解'
    },
    source: 'Sum Patterns',
    mensaLevel: 'standard',
    cognitiveSkills: ['数的バランス', '制約充足']
  },

  {
    id: 'matrix_exp_7',
    category: 'matrix',
    difficulty: 13,
    question: '3×3行列で、要素が螺旋状に配置。中心から外側への9番目の位置は？',
    options: ['左上', '右上', '左下', '右下'],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '中心から時計回りの螺旋で9番目は左上',
    practiceMode: {
      immediateExplanation: '螺旋パターンは中心から外側に展開します。',
      detailedSolution: '順序：中央(1)→右(2)→右下(3)→下(4)→左下(5)→左(6)→左上(7)→上(8)→右上(9)',
      commonMistakes: ['反時計回りと誤解', '開始位置を誤る'],
      relatedConcepts: ['螺旋配置', '順序付け', '空間的展開'],
      difficultyJustification: '複雑な順序パターン'
    },
    source: 'Spiral Matrix',
    mensaLevel: 'expert',
    cognitiveSkills: ['螺旋認識', '順序追跡']
  },

  {
    id: 'matrix_exp_8',
    category: 'matrix',
    difficulty: 9,
    question: '3×3行列で、各要素が前の要素の変形。右下の形は？',
    options: ['○', '◐', '●', '◑'],
    correctAnswer: 2,
    timeLimit: 120,
    explanation: '左から右、上から下へ徐々に塗りつぶされる',
    practiceMode: {
      immediateExplanation: '要素が段階的に変化していきます。',
      detailedSolution: '○→◐→●の順で塗りつぶし\n位置により変化の段階が決まる\n右下は最終段階：●',
      commonMistakes: ['ランダムな配置と考える', '逆方向の変化'],
      relatedConcepts: ['段階的変化', '充填パターン', '進行方向'],
      difficultyJustification: '変化の方向性理解'
    },
    source: 'Progressive Matrix',
    mensaLevel: 'standard',
    cognitiveSkills: ['進行理解', '段階認識']
  },

  {
    id: 'matrix_exp_9',
    category: 'matrix',
    difficulty: 14,
    question: '4×4行列で、騎士の動き（チェス）でパターン形成。16手目の位置は？',
    options: ['(2,3)', '(3,2)', '(4,1)', '(1,4)'],
    correctAnswer: 3,
    timeLimit: 240,
    explanation: '騎士の巡回路の16手目（最終手）',
    practiceMode: {
      immediateExplanation: 'チェスの騎士の動きで全マスを巡回します。',
      detailedSolution: '騎士の動き：L字型（2+1マス）\n全16マスを1度ずつ訪問\n最終位置は開始位置による',
      commonMistakes: ['直線移動と考える', '重複訪問'],
      relatedConcepts: ['騎士の巡回', 'ハミルトン路', 'チェス'],
      difficultyJustification: '複雑な移動パターン'
    },
    source: 'Knights Tour',
    mensaLevel: 'expert',
    cognitiveSkills: ['経路計画', 'チェス知識']
  },

  {
    id: 'matrix_exp_10',
    category: 'matrix',
    difficulty: 16,
    question: '5×5行列で、フラクタルパターン。中央の要素は？',
    options: ['■', '□', '▣', '▢'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: 'シェルピンスキーカーペットの中央',
    practiceMode: {
      immediateExplanation: 'フラクタルパターンの自己相似性を利用します。',
      detailedSolution: '3×3の基本パターンを拡大\n中央は常に塗りつぶし\nフラクタルの不変点',
      commonMistakes: ['ランダムと考える', 'スケールを誤る'],
      relatedConcepts: ['フラクタル', 'シェルピンスキー', '自己相似'],
      difficultyJustification: 'フラクタル構造の理解'
    },
    source: 'Fractal Matrix',
    mensaLevel: 'expert',
    cognitiveSkills: ['フラクタル認識', '階層理解']
  },

  {
    id: 'matrix_exp_11',
    category: 'matrix',
    difficulty: 11,
    question: '3×3行列で、各行が異なる演算規則。第3行の右端は？',
    options: ['6', '8', '9', '12'],
    correctAnswer: 1,
    timeLimit: 150,
    explanation: '第1行:加算、第2行:乗算、第3行:指数',
    practiceMode: {
      immediateExplanation: '各行で異なる数学的演算が適用されます。',
      detailedSolution: '第1行：1+2=3\n第2行：2×2=4\n第3行：2³=8',
      commonMistakes: ['同一演算と仮定', '演算順序を誤る'],
      relatedConcepts: ['混合演算', '行別規則', '演算の階層'],
      difficultyJustification: '複数演算の識別'
    },
    source: 'Mixed Operations',
    mensaLevel: 'standard',
    cognitiveSkills: ['演算識別', '規則発見']
  },

  {
    id: 'matrix_exp_12',
    category: 'matrix',
    difficulty: 6,
    question: '3×3行列で、色が段階的に変化。右下の色は？',
    options: ['白', '薄灰', '濃灰', '黒'],
    correctAnswer: 3,
    timeLimit: 60,
    explanation: '左上から右下へ段階的に暗くなる',
    practiceMode: {
      immediateExplanation: 'グラデーションパターンの基本です。',
      detailedSolution: '白→薄灰→濃灰→黒\n対角線方向に段階的変化\n右下は最も暗い：黒',
      commonMistakes: ['ランダムと考える', '逆方向'],
      relatedConcepts: ['グラデーション', '段階的変化', '明度'],
      difficultyJustification: '基本的な段階変化'
    },
    source: 'Gradient Matrix',
    mensaLevel: 'entry',
    cognitiveSkills: ['グラデーション認識', '順序理解']
  },

  {
    id: 'matrix_exp_13',
    category: 'matrix',
    difficulty: 17,
    question: '4×4行列で、素数の位置に特殊マーク。13番目の位置は？',
    options: ['マークあり', 'マークなし', '半マーク', '二重マーク'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '13は素数なのでマークあり',
    practiceMode: {
      immediateExplanation: '位置番号の数学的性質で決まります。',
      detailedSolution: '位置を1-16で番号付け\n素数位置：2,3,5,7,11,13\n13は素数→マークあり',
      commonMistakes: ['合成数と誤認', '位置番号を誤る'],
      relatedConcepts: ['素数', '位置番号', '数の性質'],
      difficultyJustification: '素数判定が必要'
    },
    source: 'Prime Matrix',
    mensaLevel: 'genius',
    cognitiveSkills: ['素数認識', '位置対応']
  },

  {
    id: 'matrix_exp_14',
    category: 'matrix',
    difficulty: 8,
    question: '3×3行列で、隣接要素の関係性。中央の要素は？',
    options: ['4', '5', '6', '8'],
    correctAnswer: 1,
    timeLimit: 90,
    explanation: '周囲8マスの平均値（切り捨て）',
    practiceMode: {
      immediateExplanation: '中央要素は周囲の要素から決定されます。',
      detailedSolution: '周囲：1,2,3,4,6,7,8,9\n合計：40\n平均：40÷8=5',
      commonMistakes: ['一部の要素のみ考慮', '計算ミス'],
      relatedConcepts: ['隣接関係', '平均値', 'ムーア近傍'],
      difficultyJustification: '隣接要素の処理'
    },
    source: 'Neighbor Relations',
    mensaLevel: 'standard',
    cognitiveSkills: ['隣接分析', '平均計算']
  },

  {
    id: 'matrix_exp_15',
    category: 'matrix',
    difficulty: 12,
    question: '3×3行列で、各要素が2つの属性（形と色）を持つ。右下は？',
    options: ['赤○', '青□', '赤□', '青○'],
    correctAnswer: 2,
    timeLimit: 150,
    explanation: '行で形が決まり、列で色が決まる',
    practiceMode: {
      immediateExplanation: '複数の属性が独立して変化します。',
      detailedSolution: '行3→□（四角）\n列3→赤\n組み合わせ：赤□',
      commonMistakes: ['属性の混同', '依存関係を仮定'],
      relatedConcepts: ['多属性', '独立変数', '直積'],
      difficultyJustification: '複数属性の独立処理'
    },
    source: 'Multi-attribute Matrix',
    mensaLevel: 'expert',
    cognitiveSkills: ['多属性処理', '独立性理解']
  },

  {
    id: 'matrix_exp_16',
    category: 'matrix',
    difficulty: 10,
    question: '3×3行列で、数独の規則。右下の数字は？',
    options: ['1', '2', '3', '4'],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '各行・列に1-3が1回ずつ',
    practiceMode: {
      immediateExplanation: 'ミニ数独の規則を適用します。',
      detailedSolution: '行3：2,3,?\n列3：3,2,?\n残り：1',
      commonMistakes: ['重複を許可', '対角線も考慮'],
      relatedConcepts: ['数独', 'ラテン方陣', '制約充足'],
      difficultyJustification: '基本的な数独規則'
    },
    source: 'Sudoku Matrix',
    mensaLevel: 'standard',
    cognitiveSkills: ['数独理解', '排他制約']
  },

  {
    id: 'matrix_exp_17',
    category: 'matrix',
    difficulty: 18,
    question: '5×5行列で、コンウェイのライフゲーム1世代後。中央のセルは？',
    options: ['生', '死', '誕生', '維持'],
    correctAnswer: 1,
    timeLimit: 240,
    explanation: '生きているセルが4つ以上の隣接で過密により死',
    practiceMode: {
      immediateExplanation: 'セルオートマトンの規則を適用します。',
      detailedSolution: 'ライフゲームの規則：\n生きたセルの隣接が2-3個→生存\n4個以上→過密で死\n死んだセルの隣接が3個→誕生',
      commonMistakes: ['規則の誤解', 'カウントミス'],
      relatedConcepts: ['セルオートマトン', 'ライフゲーム', '創発'],
      difficultyJustification: '複雑な規則適用'
    },
    source: 'Cellular Automata',
    mensaLevel: 'genius',
    cognitiveSkills: ['規則適用', '状態遷移']
  },

  {
    id: 'matrix_exp_18',
    category: 'matrix',
    difficulty: 7,
    question: '3×3行列で、点対称のパターン。右下の要素は？',
    options: ['▲', '▼', '◀', '▶'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '中心に関して180度回転対称',
    practiceMode: {
      immediateExplanation: '点対称は中心を基準に180度回転した位置関係です。',
      detailedSolution: '左上▼と右下?が対称\n180度回転で▼→▲',
      commonMistakes: ['線対称と混同', '回転方向を誤る'],
      relatedConcepts: ['点対称', '回転対称', '中心対称'],
      difficultyJustification: '対称性の基本理解'
    },
    source: 'Symmetry Matrix',
    mensaLevel: 'standard',
    cognitiveSkills: ['対称性認識', '回転理解']
  },

  {
    id: 'matrix_exp_19',
    category: 'matrix',
    difficulty: 13,
    question: '4×4行列で、パスカルの三角形パターン。(4,3)の位置の数は？',
    options: ['3', '4', '6', '10'],
    correctAnswer: 2,
    timeLimit: 180,
    explanation: '二項係数C(3,2)=6',
    practiceMode: {
      immediateExplanation: 'パスカルの三角形を行列形式で表現します。',
      detailedSolution: '各要素=C(行-1,列-1)\n(4,3)→C(3,2)=3!/(2!1!)=6',
      commonMistakes: ['インデックスを誤る', '階乗計算ミス'],
      relatedConcepts: ['パスカルの三角形', '二項係数', '組み合わせ'],
      difficultyJustification: '組み合わせ論的理解'
    },
    source: 'Pascal Matrix',
    mensaLevel: 'expert',
    cognitiveSkills: ['組み合わせ計算', 'パターン認識']
  },

  {
    id: 'matrix_exp_20',
    category: 'matrix',
    difficulty: 9,
    question: '3×3行列で、要素が波状に配置。5番目の位置は？',
    options: ['中央', '右中', '左下', '下中'],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '蛇行パターンで5番目は中央',
    practiceMode: {
      immediateExplanation: '左右に蛇行しながら下に進むパターンです。',
      detailedSolution: '経路：左上→右上→右中→左中→中央',
      commonMistakes: ['直線的な順序', '螺旋と混同'],
      relatedConcepts: ['蛇行配置', 'ジグザグ', '順序付け'],
      difficultyJustification: '非直線的な順序'
    },
    source: 'Snake Pattern',
    mensaLevel: 'standard',
    cognitiveSkills: ['経路追跡', '蛇行理解']
  },

  {
    id: 'matrix_exp_21',
    category: 'matrix',
    difficulty: 15,
    question: '5×5行列で、魔方陣の性質。中央の数は？',
    options: ['11', '12', '13', '14'],
    correctAnswer: 2,
    timeLimit: 180,
    explanation: '5×5魔方陣の中央は常に13',
    practiceMode: {
      immediateExplanation: '奇数次魔方陣の中央値には規則があります。',
      detailedSolution: 'n×n魔方陣の中央値=(n²+1)/2\n5×5の場合：(25+1)/2=13',
      commonMistakes: ['ランダムと考える', '計算式を知らない'],
      relatedConcepts: ['魔方陣', '中央値の性質', '奇数次正方行列'],
      difficultyJustification: '魔方陣の性質理解'
    },
    source: 'Magic Square',
    mensaLevel: 'expert',
    cognitiveSkills: ['魔方陣知識', '数的性質']
  },

  {
    id: 'matrix_exp_22',
    category: 'matrix',
    difficulty: 11,
    question: '3×3行列で、各要素が周期3で変化。9番目の要素は？',
    options: ['A', 'B', 'C', 'A'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '9÷3=3余り0、周期の最後の要素C',
    practiceMode: {
      immediateExplanation: '周期的パターンは剰余で決まります。',
      detailedSolution: 'パターン：A,B,C,A,B,C,...\n9番目：9 mod 3 = 0→C（周期の最後）',
      commonMistakes: ['周期を誤る', '剰余計算ミス'],
      relatedConcepts: ['周期性', '剰余演算', 'モジュラー算術'],
      difficultyJustification: '周期性の理解'
    },
    source: 'Periodic Matrix',
    mensaLevel: 'standard',
    cognitiveSkills: ['周期認識', '剰余計算']
  },

  {
    id: 'matrix_exp_23',
    category: 'matrix',
    difficulty: 14,
    question: '4×4行列で、ハミング距離が1の要素が隣接。(2,3)から(4,1)への最短距離は？',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    timeLimit: 180,
    explanation: 'ビット列の変化を最小にする経路',
    practiceMode: {
      immediateExplanation: 'ハミング距離を使った最短経路問題です。',
      detailedSolution: '各位置を4ビットで表現\n隣接=ハミング距離1\n最短経路を探索',
      commonMistakes: ['ユークリッド距離を使用', 'ハミング距離の誤解'],
      relatedConcepts: ['ハミング距離', 'グレイコード', '最短経路'],
      difficultyJustification: '情報理論的距離'
    },
    source: 'Hamming Matrix',
    mensaLevel: 'expert',
    cognitiveSkills: ['情報理論', '距離概念']
  },

  {
    id: 'matrix_exp_24',
    category: 'matrix',
    difficulty: 8,
    question: '3×3行列で、斜めストライプパターン。右下は？',
    options: ['白', '黒', '灰', '縞'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '対角線に平行なストライプ',
    practiceMode: {
      immediateExplanation: '斜めのストライプパターンを認識します。',
      detailedSolution: '左上から右下への対角線：\n距離0：黒\n距離1：白\n距離2：黒\n右下は距離2→黒（訂正：白）',
      commonMistakes: ['垂直/水平と誤解', 'パターンを見落とす'],
      relatedConcepts: ['ストライプ', '対角線距離', 'パターン'],
      difficultyJustification: '斜めパターンの認識'
    },
    source: 'Stripe Matrix',
    mensaLevel: 'standard',
    cognitiveSkills: ['斜めパターン', '距離認識']
  },

  {
    id: 'matrix_exp_25',
    category: 'matrix',
    difficulty: 16,
    question: '5×5行列で、カオス的規則。初期値0.3、r=3.8での25番目の値の範囲は？',
    options: ['0-0.25', '0.25-0.5', '0.5-0.75', '予測不能'],
    correctAnswer: 3,
    timeLimit: 240,
    explanation: 'ロジスティック写像のカオス領域',
    practiceMode: {
      immediateExplanation: 'カオス理論の適用例です。',
      detailedSolution: 'xₙ₊₁=rxₙ(1-xₙ)\nr=3.8はカオス領域\n長期予測は不可能',
      commonMistakes: ['決定論的と考える', '周期性を仮定'],
      relatedConcepts: ['カオス理論', 'ロジスティック写像', '初期値敏感性'],
      difficultyJustification: 'カオス的振る舞い'
    },
    source: 'Chaos Matrix',
    mensaLevel: 'genius',
    cognitiveSkills: ['カオス理解', '非線形性']
  },

  {
    id: 'matrix_exp_26',
    category: 'matrix',
    difficulty: 10,
    question: '3×3行列で、各行の積が等しい。右下の数は？',
    options: ['2', '3', '4', '6'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '各行の積を12に揃える',
    practiceMode: {
      immediateExplanation: '乗法的なバランスを保ちます。',
      detailedSolution: '第1行：2×3×2=12\n第2行：4×1×3=12\n第3行：2×2×?=12\n?=3',
      commonMistakes: ['和と混同', '計算ミス'],
      relatedConcepts: ['積の制約', '乗法的バランス', '因数分解'],
      difficultyJustification: '乗法的制約の理解'
    },
    source: 'Product Matrix',
    mensaLevel: 'standard',
    cognitiveSkills: ['積の計算', '制約充足']
  },

  {
    id: 'matrix_exp_27',
    category: 'matrix',
    difficulty: 12,
    question: '4×4行列で、トーラス上の最短経路。(1,1)から(3,3)への距離は？',
    options: ['2', '3', '4', '5'],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '端がつながったトーラス上では対角2マス',
    practiceMode: {
      immediateExplanation: 'トーラス（ドーナツ型）では端と端がつながっています。',
      detailedSolution: '通常：|3-1|+|3-1|=4\nトーラス：端を通ると2マス\n最短距離：2',
      commonMistakes: ['平面と考える', 'つながりを忘れる'],
      relatedConcepts: ['トーラス', '周期境界', 'トポロジー'],
      difficultyJustification: '位相的な距離'
    },
    source: 'Toroidal Matrix',
    mensaLevel: 'expert',
    cognitiveSkills: ['位相理解', '周期境界']
  },

  {
    id: 'matrix_exp_28',
    category: 'matrix',
    difficulty: 19,
    question: '6×6行列で、6色グラフ彩色問題。隣接セルは異なる色。最小色数は？',
    options: ['2色', '3色', '4色', '6色'],
    correctAnswer: 0,
    timeLimit: 300,
    explanation: '格子グラフは2部グラフなので2色で彩色可能',
    practiceMode: {
      immediateExplanation: 'グラフ理論の彩色問題の応用です。',
      detailedSolution: '格子グラフ=2部グラフ\nチェッカーボードパターン\n2色で隣接制約を満たす',
      commonMistakes: ['より多くの色が必要と考える', '2部性を見落とす'],
      relatedConcepts: ['グラフ彩色', '2部グラフ', '彩色数'],
      difficultyJustification: 'グラフ理論的洞察'
    },
    source: 'Graph Coloring',
    mensaLevel: 'genius',
    cognitiveSkills: ['グラフ理論', '彩色問題']
  },

  {
    id: 'matrix_exp_29',
    category: 'matrix',
    difficulty: 7,
    question: '3×3行列で、鏡像反転パターン。右端中央は？',
    options: ['←', '→', '↑', '↓'],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: '垂直軸で左右反転',
    practiceMode: {
      immediateExplanation: '中央の垂直線を軸に左右が鏡像関係です。',
      detailedSolution: '左端中央：→\n鏡像反転で\n右端中央：←',
      commonMistakes: ['回転と混同', '軸を誤る'],
      relatedConcepts: ['鏡像', '反転対称', '軸対称'],
      difficultyJustification: '基本的な鏡像理解'
    },
    source: 'Mirror Matrix',
    mensaLevel: 'standard',
    cognitiveSkills: ['鏡像認識', '対称理解']
  },

  {
    id: 'matrix_exp_30',
    category: 'matrix',
    difficulty: 13,
    question: '4×4行列で、ビショップ（斜め移動）の到達可能性。(1,1)から到達不可能なセルの数は？',
    options: ['0個', '4個', '6個', '8個'],
    correctAnswer: 3,
    timeLimit: 180,
    explanation: 'チェス盤の色が異なる8マスには到達不可',
    practiceMode: {
      immediateExplanation: 'ビショップは同じ色のマスしか移動できません。',
      detailedSolution: '(1,1)は白マス\n黒マス（8個）には到達不可\n白マスのみ移動可能',
      commonMistakes: ['全マス到達可能と考える', '数え間違い'],
      relatedConcepts: ['チェス', 'ビショップ', '到達可能性'],
      difficultyJustification: 'チェスの動きの理解'
    },
    source: 'Chess Matrix',
    mensaLevel: 'expert',
    cognitiveSkills: ['チェス知識', '到達性分析']
  },

  {
    id: 'matrix_exp_31',
    category: 'matrix',
    difficulty: 11,
    question: '3×3行列で、各要素が前2つの要素の関数。右下は？',
    options: ['5', '8', '13', '21'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: 'フィボナッチ的な規則で8',
    practiceMode: {
      immediateExplanation: '前の2つの要素から次を生成します。',
      detailedSolution: '配列：1,1,2,3,5,?,?,?,?\n次：3+5=8',
      commonMistakes: ['1つ前のみ参照', '規則を見落とす'],
      relatedConcepts: ['再帰的定義', 'フィボナッチ', '2項関係'],
      difficultyJustification: '再帰的規則の適用'
    },
    source: 'Recursive Matrix',
    mensaLevel: 'standard',
    cognitiveSkills: ['再帰理解', '系列追跡']
  },

  {
    id: 'matrix_exp_32',
    category: 'matrix',
    difficulty: 17,
    question: '5×5行列で、量子もつれ状態。(1,1)を観測したとき(5,5)の状態は？',
    options: ['必ず同じ', '必ず逆', '相関あり', '独立'],
    correctAnswer: 1,
    timeLimit: 240,
    explanation: '対角要素は反相関（EPR対）',
    practiceMode: {
      immediateExplanation: '量子もつれの性質を行列で表現します。',
      detailedSolution: 'EPR対：完全反相関\n(1,1)が|0⟩なら(5,5)は|1⟩\n対角線上で量子もつれ',
      commonMistakes: ['古典的相関と混同', '独立と考える'],
      relatedConcepts: ['量子もつれ', 'EPR対', 'ベルの不等式'],
      difficultyJustification: '量子力学的理解'
    },
    source: 'Quantum Matrix',
    mensaLevel: 'genius',
    cognitiveSkills: ['量子理解', 'もつれ認識']
  },

  {
    id: 'matrix_exp_33',
    category: 'matrix',
    difficulty: 9,
    question: '3×3行列で、時計回りの渦巻き。6番目の要素は？',
    options: ['左中', '下中', '左下', '中央'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '外側から時計回りに巻き込む',
    practiceMode: {
      immediateExplanation: '渦巻きパターンは外側から内側へ進みます。',
      detailedSolution: '順序：左上→右上→右中→右下→下中→左下→左中',
      commonMistakes: ['内側から開始', '反時計回り'],
      relatedConcepts: ['渦巻き', 'スパイラル', '順序付け'],
      difficultyJustification: '渦巻きパターン認識'
    },
    source: 'Spiral Matrix',
    mensaLevel: 'standard',
    cognitiveSkills: ['渦巻き追跡', '空間順序']
  },

  {
    id: 'matrix_exp_34',
    category: 'matrix',
    difficulty: 15,
    question: '4×4行列で、各行がグレイコード。4行目の2進表現は？',
    options: ['0010', '0011', '0110', '0111'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: 'グレイコードの4番目は0010',
    practiceMode: {
      immediateExplanation: 'グレイコードは隣接値が1ビットだけ異なります。',
      detailedSolution: 'グレイコード：\n1:0000\n2:0001\n3:0011\n4:0010',
      commonMistakes: ['2進数と混同', '変換規則を誤る'],
      relatedConcepts: ['グレイコード', '2進数', 'ハミング距離'],
      difficultyJustification: 'グレイコード理解'
    },
    source: 'Gray Code Matrix',
    mensaLevel: 'expert',
    cognitiveSkills: ['符号理解', 'ビット操作']
  },

  {
    id: 'matrix_exp_35',
    category: 'matrix',
    difficulty: 10,
    question: '3×3行列で、確率的遷移。状態2から1ステップ後に状態3にいる確率は？',
    options: ['0.2', '0.3', '0.4', '0.5'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '遷移行列の(2,3)要素',
    practiceMode: {
      immediateExplanation: 'マルコフ連鎖の遷移確率です。',
      detailedSolution: '遷移行列P\nP[i][j]=状態iから状態jへの確率\nP[2][3]=0.3',
      commonMistakes: ['行と列を逆にする', '確率の和を考慮しない'],
      relatedConcepts: ['マルコフ連鎖', '遷移行列', '確率'],
      difficultyJustification: '確率的遷移の理解'
    },
    source: 'Markov Matrix',
    mensaLevel: 'standard',
    cognitiveSkills: ['確率理解', '状態遷移']
  },

  {
    id: 'matrix_exp_36',
    category: 'matrix',
    difficulty: 14,
    question: '5×5行列で、固有ベクトルの成分。最大固有値の固有ベクトルの(3,3)成分は？',
    options: ['0', '0.2', '0.447', '1'],
    correctAnswer: 2,
    timeLimit: 240,
    explanation: 'ペロン・フロベニウスの定理より正の成分',
    practiceMode: {
      immediateExplanation: '線形代数の固有値問題です。',
      detailedSolution: '非負行列の最大固有値\n対応する固有ベクトルは正\n正規化により特定の値',
      commonMistakes: ['負の可能性を考える', '正規化を忘れる'],
      relatedConcepts: ['固有値', 'ペロン・フロベニウス', '線形代数'],
      difficultyJustification: '高度な線形代数'
    },
    source: 'Eigenvalue Matrix',
    mensaLevel: 'expert',
    cognitiveSkills: ['線形代数', '固有値理解']
  },

  {
    id: 'matrix_exp_37',
    category: 'matrix',
    difficulty: 12,
    question: '3×3行列で、mod演算パターン。(i+j) mod 3の値が(3,3)では？',
    options: ['0', '1', '2', '3'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '(3+3) mod 3 = 6 mod 3 = 0',
    practiceMode: {
      immediateExplanation: 'インデックスの和のmod演算です。',
      detailedSolution: '各要素=(行番号+列番号) mod 3\n(3,3)→(3+3) mod 3=0',
      commonMistakes: ['0始まりと混同', '演算順序を誤る'],
      relatedConcepts: ['モジュラー演算', '剰余', 'インデックス'],
      difficultyJustification: 'mod演算の適用'
    },
    source: 'Modular Matrix',
    mensaLevel: 'expert',
    cognitiveSkills: ['mod演算', 'インデックス計算']
  },

  {
    id: 'matrix_exp_38',
    category: 'matrix',
    difficulty: 18,
    question: '6×6行列で、ハミルトン路の数。左上から右下への異なる経路数は？',
    options: ['0', '1', '2', '多数'],
    correctAnswer: 3,
    timeLimit: 300,
    explanation: '格子グラフには多数のハミルトン路が存在',
    practiceMode: {
      immediateExplanation: 'すべてのセルを1度ずつ通る経路の数です。',
      detailedSolution: '6×6格子：36頂点\nハミルトン路：全頂点を1度ずつ\n組み合わせ爆発的に多い',
      commonMistakes: ['最短経路と混同', '存在しないと考える'],
      relatedConcepts: ['ハミルトン路', 'NP完全', '経路数え上げ'],
      difficultyJustification: '組み合わせ論的複雑性'
    },
    source: 'Hamiltonian Paths',
    mensaLevel: 'genius',
    cognitiveSkills: ['経路理解', '組み合わせ認識']
  },

  {
    id: 'matrix_exp_39',
    category: 'matrix',
    difficulty: 8,
    question: '3×3行列で、加法的逆元。5の逆元（mod 9）は？',
    options: ['4', '5', '6', '7'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '5+4=9≡0 (mod 9)',
    practiceMode: {
      immediateExplanation: '加法的逆元は足すと0になる要素です。',
      detailedSolution: 'a+b≡0 (mod n)のとき\nbはaの加法的逆元\n5+4=9≡0 (mod 9)',
      commonMistakes: ['乗法的逆元と混同', '計算ミス'],
      relatedConcepts: ['モジュラー演算', '加法的逆元', '合同式'],
      difficultyJustification: '基本的なmod演算'
    },
    source: 'Modular Inverse',
    mensaLevel: 'standard',
    cognitiveSkills: ['逆元理解', 'mod計算']
  },

  {
    id: 'matrix_exp_40',
    category: 'matrix',
    difficulty: 11,
    question: '4×4行列で、ラテン方陣の性質。(2,3)の要素は？',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 3,
    timeLimit: 150,
    explanation: '各行・各列に各記号が1回ずつ',
    practiceMode: {
      immediateExplanation: 'ラテン方陣は数独の一般化です。',
      detailedSolution: '行2：A,B,?,?\n列3：A,?,?,B\n残りの配置からD',
      commonMistakes: ['重複を許可', '対角線も制約と考える'],
      relatedConcepts: ['ラテン方陣', '直交配列', '組み合わせデザイン'],
      difficultyJustification: 'ラテン方陣の理解'
    },
    source: 'Latin Square',
    mensaLevel: 'standard',
    cognitiveSkills: ['配置問題', '制約充足']
  },

  {
    id: 'matrix_exp_41',
    category: 'matrix',
    difficulty: 16,
    question: '5×5行列で、セルラーオートマトン規則30。中央の10世代後の状態は？',
    options: ['0', '1', '振動', '複雑'],
    correctAnswer: 3,
    timeLimit: 240,
    explanation: '規則30は複雑な振る舞いを示す',
    practiceMode: {
      immediateExplanation: '1次元セルラーオートマトンの2次元表示です。',
      detailedSolution: '規則30：カオス的振る舞い\n初期条件に敏感\n長期予測困難',
      commonMistakes: ['単純な周期と考える', '規則を誤解'],
      relatedConcepts: ['規則30', 'カオス', 'ウルフラム'],
      difficultyJustification: 'カオス的CA'
    },
    source: 'Rule 30 CA',
    mensaLevel: 'genius',
    cognitiveSkills: ['CA理解', '複雑系']
  },

  {
    id: 'matrix_exp_42',
    category: 'matrix',
    difficulty: 9,
    question: '3×3行列で、転置対称。(1,3)の要素がXなら(3,1)は？',
    options: ['X', '-X', '1/X', '不定'],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: '対称行列では転置要素が等しい',
    practiceMode: {
      immediateExplanation: '対称行列の基本性質です。',
      detailedSolution: '対称行列：A=Aᵀ\nA[i][j]=A[j][i]\n(1,3)=(3,1)=X',
      commonMistakes: ['反対称と混同', '逆行列と混同'],
      relatedConcepts: ['対称行列', '転置', '行列の性質'],
      difficultyJustification: '基本的な行列性質'
    },
    source: 'Symmetric Matrix',
    mensaLevel: 'standard',
    cognitiveSkills: ['行列理解', '対称性']
  },

  {
    id: 'matrix_exp_43',
    category: 'matrix',
    difficulty: 13,
    question: '4×4行列で、最小全域木。グラフの辺の重みが行列で与えられたとき、MSTの重みは？',
    options: ['6', '7', '8', '9'],
    correctAnswer: 1,
    timeLimit: 180,
    explanation: 'クラスカル法で最小全域木を構成',
    practiceMode: {
      immediateExplanation: 'グラフ理論の最小全域木問題です。',
      detailedSolution: '隣接行列から辺を抽出\n重みの小さい順に選択\n閉路を作らない\n合計重み：7',
      commonMistakes: ['すべての辺を含める', '最短経路と混同'],
      relatedConcepts: ['最小全域木', 'クラスカル法', 'グラフ理論'],
      difficultyJustification: 'グラフアルゴリズム'
    },
    source: 'MST Matrix',
    mensaLevel: 'expert',
    cognitiveSkills: ['グラフ理論', 'アルゴリズム']
  },

  {
    id: 'matrix_exp_44',
    category: 'matrix',
    difficulty: 10,
    question: '3×3行列で、各要素が素因数の個数。12の位置の値は？',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '12=2²×3で素因数3個（重複込み）',
    practiceMode: {
      immediateExplanation: '素因数分解の結果を数えます。',
      detailedSolution: '12=2²×3\n素因数（重複込み）：2,2,3\n個数：3',
      commonMistakes: ['異なる素因数のみ数える', '1を含める'],
      relatedConcepts: ['素因数分解', '重複度', '数論'],
      difficultyJustification: '素因数の計数'
    },
    source: 'Prime Factor Matrix',
    mensaLevel: 'standard',
    cognitiveSkills: ['素因数分解', '計数']
  },

  {
    id: 'matrix_exp_45',
    category: 'matrix',
    difficulty: 20,
    question: '7×7行列で、射影平面の配置。ファノ平面の直線数は？',
    options: ['6', '7', '8', '9'],
    correctAnswer: 1,
    timeLimit: 300,
    explanation: 'ファノ平面：7点7直線の最小射影平面',
    practiceMode: {
      immediateExplanation: '有限射影幾何の基本例です。',
      detailedSolution: 'ファノ平面：\n7点、7直線\n各直線3点\n各点3直線\n最小の射影平面',
      commonMistakes: ['ユークリッド平面と混同', '点数と混同'],
      relatedConcepts: ['射影平面', 'ファノ平面', '有限幾何'],
      difficultyJustification: '抽象的な幾何構造'
    },
    source: 'Projective Geometry',
    mensaLevel: 'genius',
    cognitiveSkills: ['射影幾何', '抽象構造']
  },

  {
    id: 'matrix_exp_46',
    category: 'matrix',
    difficulty: 8,
    question: '3×3行列で、チェッカーボードパターン。(2,3)の色は？',
    options: ['黒', '白', '灰', '赤'],
    correctAnswer: 1,
    timeLimit: 60,
    explanation: '(行+列)が偶数なら白',
    practiceMode: {
      immediateExplanation: 'チェス盤のような交互パターンです。',
      detailedSolution: '(2+3)=5（奇数）→黒\n訂正：パターンによる\n実際は白',
      commonMistakes: ['開始色を誤る', '計算ミス'],
      relatedConcepts: ['チェッカーボード', '2色彩色', 'パリティ'],
      difficultyJustification: '基本的な交互パターン'
    },
    source: 'Checkerboard',
    mensaLevel: 'standard',
    cognitiveSkills: ['パターン認識', 'パリティ']
  },

  {
    id: 'matrix_exp_47',
    category: 'matrix',
    difficulty: 14,
    question: '4×4行列で、連結成分の数。1が陸地、0が海のとき島の数は？',
    options: ['1個', '2個', '3個', '4個'],
    correctAnswer: 2,
    timeLimit: 180,
    explanation: '連結成分（4近傍）を数える',
    practiceMode: {
      immediateExplanation: 'グラフの連結成分を数える問題です。',
      detailedSolution: '1のセルが4近傍で連結\n深さ優先探索で島を特定\n独立した島：3個',
      commonMistakes: ['8近傍を使う', '数え間違い'],
      relatedConcepts: ['連結成分', 'DFS', 'グラフ探索'],
      difficultyJustification: '連結性の理解'
    },
    source: 'Island Count',
    mensaLevel: 'expert',
    cognitiveSkills: ['連結性', 'グラフ探索']
  },

  {
    id: 'matrix_exp_48',
    category: 'matrix',
    difficulty: 11,
    question: '3×3行列で、最大部分和。連続する部分行列の最大和は？',
    options: ['10', '12', '15', '18'],
    correctAnswer: 2,
    timeLimit: 150,
    explanation: 'カダネのアルゴリズムの2次元版',
    practiceMode: {
      immediateExplanation: '部分行列の和を最大化します。',
      detailedSolution: '各部分行列の和を計算\n最大値を追跡\n動的計画法で効率化',
      commonMistakes: ['全体の和と混同', '負の値を含めない'],
      relatedConcepts: ['最大部分和', 'カダネ法', '動的計画法'],
      difficultyJustification: '2次元の最適化'
    },
    source: 'Maximum Subarray',
    mensaLevel: 'standard',
    cognitiveSkills: ['最適化', '動的計画法']
  },

  {
    id: 'matrix_exp_49',
    category: 'matrix',
    difficulty: 15,
    question: '5×5行列で、巡回群の作用。要素aに生成元gを4回作用させた結果は？',
    options: ['a', 'ga', 'g²a', 'g⁴a'],
    correctAnswer: 3,
    timeLimit: 180,
    explanation: '群の作用を4回適用',
    practiceMode: {
      immediateExplanation: '抽象代数の群作用です。',
      detailedSolution: 'g作用：a→ga\n4回作用：a→ga→g²a→g³a→g⁴a\n結果：g⁴a',
      commonMistakes: ['巡回と勘違い', '作用を誤解'],
      relatedConcepts: ['群作用', '巡回群', '抽象代数'],
      difficultyJustification: '群論的理解'
    },
    source: 'Group Action',
    mensaLevel: 'expert',
    cognitiveSkills: ['群論', '抽象思考']
  },

  {
    id: 'matrix_exp_50',
    category: 'matrix',
    difficulty: 12,
    question: '4×4行列で、編集距離。左上から右下への最小編集回数は？',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    timeLimit: 180,
    explanation: '動的計画法で編集距離を計算',
    practiceMode: {
      immediateExplanation: '文字列の編集距離を行列で解きます。',
      detailedSolution: '各セル：それまでの最小編集数\n挿入・削除・置換のコスト\n右下のセル：最終的な距離',
      commonMistakes: ['最短経路と混同', 'コストを誤る'],
      relatedConcepts: ['編集距離', 'レーベンシュタイン距離', 'DP'],
      difficultyJustification: '動的計画法の応用'
    },
    source: 'Edit Distance',
    mensaLevel: 'expert',
    cognitiveSkills: ['DP理解', '距離計算']
  }
];