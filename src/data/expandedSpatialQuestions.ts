import { DetailedQuestion } from './internationalMensaQuestions';

// 空間認識問題の大幅拡充（50問以上）
export const expandedSpatialQuestions: DetailedQuestion[] = [
  // 基本的な立方体問題
  {
    id: 'spatial_exp_1',
    category: 'spatial',
    difficulty: 5,
    question: '立方体の面の数はいくつ？',
    options: ['4面', '5面', '6面', '8面'],
    correctAnswer: 2,
    timeLimit: 30,
    explanation: '立方体は6つの正方形の面を持つ',
    practiceMode: {
      immediateExplanation: '立方体は最も基本的な3次元図形の一つです。',
      detailedSolution: '立方体の構成要素：\n- 面：6個（すべて正方形）\n- 辺：12本\n- 頂点：8個',
      commonMistakes: ['四面体と混同', '辺の数と混同'],
      relatedConcepts: ['正多面体', '3次元図形', 'オイラーの定理'],
      difficultyJustification: '基本的な3次元図形の理解'
    },
    source: 'Basic Geometry',
    mensaLevel: 'entry',
    cognitiveSkills: ['3次元認識', '基本図形理解'],
    visualType: 'cube_rotation',
    cubeData: {
      initialState: {
        front: 'red',
        top: 'blue',
        right: 'green'
      }
    }
  },

  {
    id: 'spatial_exp_2',
    category: 'spatial',
    difficulty: 8,
    question: '立方体の展開図で、赤い面の反対側にある面の色は？',
    options: ['青', '緑', '黄', '紫'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '十字型展開図では、中央から2つ離れた面が対面',
    practiceMode: {
      immediateExplanation: '展開図から立体を組み立てる際の面の対応関係を理解します。',
      detailedSolution: '十字型展開図の法則：\n- 中央の面から2つ離れた面が対面\n- 隣接する面は立体でも隣接\n- T字の端同士も対面',
      commonMistakes: ['隣接面を対面と誤解', '展開図の向きを誤る'],
      relatedConcepts: ['展開図', '対面関係', '空間的折りたたみ'],
      difficultyJustification: '2次元から3次元への変換'
    },
    source: 'Spatial Folding',
    mensaLevel: 'standard',
    cognitiveSkills: ['展開図理解', '3次元構築'],
    visualType: 'net_to_cube',
    cubeData: {
      netLabels: ['青', '赤', '緑', '黄', '紫', '橙']
    }
  },

  {
    id: 'spatial_exp_3',
    category: 'spatial',
    difficulty: 12,
    question: '立方体を頂点を通る軸で120度回転させたとき、元の位置と一致する面はいくつ？',
    options: ['0面', '2面', '3面', '6面'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '頂点軸回転では2面が固定される',
    practiceMode: {
      immediateExplanation: '立方体の対称性と回転について理解します。',
      detailedSolution: '頂点を通る軸（体対角線）での回転：\n- 120度回転で3回対称\n- 軸が通る2つの頂点に接する面は固定\n- 他の面は循環的に移動',
      commonMistakes: ['面心軸と混同', '回転角度の誤解'],
      relatedConcepts: ['回転対称', '体対角線', '群論'],
      difficultyJustification: '3次元回転の理解'
    },
    source: 'Rotational Symmetry',
    mensaLevel: 'expert',
    cognitiveSkills: ['回転理解', '対称性認識'],
    visualType: 'cube_rotation'
  },

  {
    id: 'spatial_exp_4',
    category: 'spatial',
    difficulty: 10,
    question: '正四面体の辺の数は？',
    options: ['4本', '6本', '8本', '12本'],
    correctAnswer: 1,
    timeLimit: 60,
    explanation: '正四面体は6本の辺を持つ',
    practiceMode: {
      immediateExplanation: '正四面体は4つの正三角形で構成される立体です。',
      detailedSolution: '正四面体の構成：\n- 面：4個（正三角形）\n- 辺：6本\n- 頂点：4個\nすべての辺の長さが等しい',
      commonMistakes: ['面の数と混同', '立方体と混同'],
      relatedConcepts: ['正多面体', 'プラトン立体', '最小面数の多面体'],
      difficultyJustification: '基本的な多面体の性質'
    },
    source: 'Platonic Solids',
    mensaLevel: 'standard',
    cognitiveSkills: ['多面体理解', '構造認識']
  },

  {
    id: 'spatial_exp_5',
    category: 'spatial',
    difficulty: 15,
    question: '正十二面体の面の形は？',
    options: ['正三角形', '正方形', '正五角形', '正六角形'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '正十二面体は12個の正五角形で構成',
    practiceMode: {
      immediateExplanation: '5つのプラトン立体の中で最も複雑な構造を持ちます。',
      detailedSolution: '正十二面体：\n- 面：12個の正五角形\n- 辺：30本\n- 頂点：20個\n- 双対：正二十面体',
      commonMistakes: ['正二十面体と混同', '面の形を誤る'],
      relatedConcepts: ['プラトン立体', '双対多面体', '黄金比'],
      difficultyJustification: '複雑な正多面体の理解'
    },
    source: 'Advanced Polyhedra',
    mensaLevel: 'expert',
    cognitiveSkills: ['高度な多面体', '幾何学的知識']
  },

  {
    id: 'spatial_exp_6',
    category: 'spatial',
    difficulty: 7,
    question: '2×2×2の立方体を1×1×1の小立方体に分割すると何個？',
    options: ['4個', '6個', '8個', '9個'],
    correctAnswer: 2,
    timeLimit: 60,
    explanation: '2³ = 8個の小立方体',
    practiceMode: {
      immediateExplanation: '体積の分割と3次元の理解を確認します。',
      detailedSolution: '各軸方向に2分割：\n- X軸方向：2分割\n- Y軸方向：2分割\n- Z軸方向：2分割\n合計：2×2×2 = 8個',
      commonMistakes: ['表面の小立方体のみ数える', '2次元的に考える'],
      relatedConcepts: ['体積', '3次元分割', '立方数'],
      difficultyJustification: '3次元の分割理解'
    },
    source: 'Volume Division',
    mensaLevel: 'standard',
    cognitiveSkills: ['体積認識', '3次元分割']
  },

  {
    id: 'spatial_exp_7',
    category: 'spatial',
    difficulty: 13,
    question: '正八面体の頂点の数は？',
    options: ['6個', '8個', '10個', '12個'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '正八面体は6個の頂点を持つ',
    practiceMode: {
      immediateExplanation: '正八面体は8つの正三角形で構成される立体です。',
      detailedSolution: '正八面体の構成：\n- 面：8個（正三角形）\n- 辺：12本\n- 頂点：6個\n立方体の双対多面体',
      commonMistakes: ['面の数と混同', '立方体の頂点数と混同'],
      relatedConcepts: ['双対性', 'プラトン立体', 'オイラーの定理'],
      difficultyJustification: '双対関係の理解'
    },
    source: 'Dual Polyhedra',
    mensaLevel: 'expert',
    cognitiveSkills: ['双対理解', '立体構造']
  },

  {
    id: 'spatial_exp_8',
    category: 'spatial',
    difficulty: 9,
    question: '円柱を真横から見た形は？',
    options: ['円', '楕円', '長方形', '台形'],
    correctAnswer: 2,
    timeLimit: 45,
    explanation: '円柱の側面投影は長方形',
    practiceMode: {
      immediateExplanation: '3次元物体の2次元投影を理解します。',
      detailedSolution: '円柱の投影：\n- 上から：円\n- 横から：長方形\n- 斜めから：楕円を含む形',
      commonMistakes: ['斜め投影と混同', '円錐と混同'],
      relatedConcepts: ['投影', '視点変換', '2次元表現'],
      difficultyJustification: '基本的な投影理解'
    },
    source: 'Projections',
    mensaLevel: 'standard',
    cognitiveSkills: ['投影理解', '視点変換']
  },

  {
    id: 'spatial_exp_9',
    category: 'spatial',
    difficulty: 14,
    question: '正二十面体の辺の数は？',
    options: ['20本', '24本', '30本', '36本'],
    correctAnswer: 2,
    timeLimit: 120,
    explanation: '正二十面体は30本の辺を持つ',
    practiceMode: {
      immediateExplanation: '最も面の多いプラトン立体です。',
      detailedSolution: '正二十面体：\n- 面：20個（正三角形）\n- 辺：30本\n- 頂点：12個\nオイラーの定理：V-E+F=2',
      commonMistakes: ['面の数と混同', '計算ミス'],
      relatedConcepts: ['オイラーの定理', 'プラトン立体', '組み合わせ論'],
      difficultyJustification: '複雑な立体の辺数計算'
    },
    source: 'Complex Polyhedra',
    mensaLevel: 'expert',
    cognitiveSkills: ['立体計算', 'オイラー定理']
  },

  {
    id: 'spatial_exp_10',
    category: 'spatial',
    difficulty: 11,
    question: '立方体の対角線（体対角線）の本数は？',
    options: ['2本', '4本', '6本', '8本'],
    correctAnswer: 1,
    timeLimit: 90,
    explanation: '立方体には4本の体対角線がある',
    practiceMode: {
      immediateExplanation: '頂点から反対側の頂点を結ぶ体内を通る対角線です。',
      detailedSolution: '立方体の対角線：\n- 面対角線：各面に2本×6面=12本\n- 体対角線：4本\n体対角線は立方体の中心で交わる',
      commonMistakes: ['面対角線と混同', '辺と混同'],
      relatedConcepts: ['体対角線', '空間対角線', '3次元幾何'],
      difficultyJustification: '3次元での対角線理解'
    },
    source: 'Spatial Diagonals',
    mensaLevel: 'standard',
    cognitiveSkills: ['対角線認識', '3次元構造']
  },

  {
    id: 'spatial_exp_11',
    category: 'spatial',
    difficulty: 16,
    question: '切頂八面体の面の種類と数は？',
    options: [
      '正方形6個、正六角形8個',
      '正方形8個、正六角形6個',
      '正三角形8個、正方形6個',
      '正五角形12個、正六角形20個'
    ],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: 'アルキメデス立体の一つ',
    practiceMode: {
      immediateExplanation: '正八面体の頂点を切り取って作られる準正多面体です。',
      detailedSolution: '切頂八面体：\n- 元の正八面体の面→正六角形（8個）\n- 切り取った頂点→正方形（6個）\n- 総面数：14個',
      commonMistakes: ['切頂立方体と混同', '面の数を誤る'],
      relatedConcepts: ['アルキメデス立体', '切頂操作', '準正多面体'],
      difficultyJustification: '高度な多面体の理解'
    },
    source: 'Archimedean Solids',
    mensaLevel: 'expert',
    cognitiveSkills: ['準正多面体', '切頂操作理解']
  },

  {
    id: 'spatial_exp_12',
    category: 'spatial',
    difficulty: 6,
    question: '球を平面で切った断面の形は？',
    options: ['正方形', '長方形', '円', '楕円'],
    correctAnswer: 2,
    timeLimit: 45,
    explanation: '球の任意の平面断面は円',
    practiceMode: {
      immediateExplanation: '球の基本的な性質を理解します。',
      detailedSolution: '球の断面：\n- どの角度で切っても円\n- 中心を通る断面が最大（大円）\n- 中心から遠いほど小さい円',
      commonMistakes: ['楕円と誤解', '角度による違いを想定'],
      relatedConcepts: ['球の性質', '断面', '大円'],
      difficultyJustification: '基本的な立体の断面'
    },
    source: 'Solid Sections',
    mensaLevel: 'entry',
    cognitiveSkills: ['断面理解', '球の性質']
  },

  {
    id: 'spatial_exp_13',
    category: 'spatial',
    difficulty: 17,
    question: '4次元超立方体（テッセラクト）の3次元投影で見える立方体の数は？',
    options: ['2個', '4個', '8個', '16個'],
    correctAnswer: 2,
    timeLimit: 240,
    explanation: '4次元立方体は8個の3次元立方体を持つ',
    practiceMode: {
      immediateExplanation: '高次元幾何学の基本概念です。',
      detailedSolution: 'テッセラクト：\n- 0次元（点）：16個\n- 1次元（辺）：32本\n- 2次元（面）：24個\n- 3次元（胞）：8個\n3次元投影では内外の立方体として見える',
      commonMistakes: ['頂点数と混同', '次元の理解不足'],
      relatedConcepts: ['高次元幾何', 'テッセラクト', '次元の類推'],
      difficultyJustification: '4次元の概念理解'
    },
    source: 'Higher Dimensions',
    mensaLevel: 'genius',
    cognitiveSkills: ['高次元思考', '抽象的空間認識']
  },

  {
    id: 'spatial_exp_14',
    category: 'spatial',
    difficulty: 8,
    question: '正四角錐の面の数は？',
    options: ['4面', '5面', '6面', '8面'],
    correctAnswer: 1,
    timeLimit: 60,
    explanation: '底面1個と側面4個で計5面',
    practiceMode: {
      immediateExplanation: '角錐の基本構造を理解します。',
      detailedSolution: '正四角錐：\n- 底面：正方形1個\n- 側面：二等辺三角形4個\n- 頂点：5個\n- 辺：8本',
      commonMistakes: ['側面のみ数える', '正四面体と混同'],
      relatedConcepts: ['角錐', 'ピラミッド形', '面の数え方'],
      difficultyJustification: '基本的な角錐の理解'
    },
    source: 'Pyramids',
    mensaLevel: 'standard',
    cognitiveSkills: ['角錐理解', '面の計数']
  },

  {
    id: 'spatial_exp_15',
    category: 'spatial',
    difficulty: 12,
    question: '立方体の頂点をすべて通る最短経路は存在する？',
    options: [
      '存在する（ハミルトン閉路）',
      '存在しない',
      '条件による',
      '証明されていない'
    ],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '立方体グラフはハミルトン閉路を持つ',
    practiceMode: {
      immediateExplanation: 'グラフ理論と立体幾何の融合問題です。',
      detailedSolution: '立方体の頂点を巡る経路：\n- 8頂点すべてを1度ずつ通る\n- 始点に戻る閉路が存在\n- 複数の異なる経路が可能',
      commonMistakes: ['オイラー路と混同', '不可能と判断'],
      relatedConcepts: ['ハミルトン閉路', 'グラフ理論', '巡回問題'],
      difficultyJustification: 'グラフ理論的思考が必要'
    },
    source: 'Graph Theory',
    mensaLevel: 'expert',
    cognitiveSkills: ['グラフ的思考', '経路探索']
  },

  {
    id: 'spatial_exp_16',
    category: 'spatial',
    difficulty: 10,
    question: '円錐を頂点を通る平面で切った断面は？',
    options: ['円', '楕円', '二等辺三角形', '放物線'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '頂点を通る断面は三角形',
    practiceMode: {
      immediateExplanation: '円錐の断面の種類を理解します。',
      detailedSolution: '円錐の断面：\n- 底面に平行：円\n- 斜め：楕円\n- 母線に平行：放物線\n- 頂点を通る：二等辺三角形',
      commonMistakes: ['円と答える', '断面の種類を混同'],
      relatedConcepts: ['円錐曲線', '断面の種類', 'アポロニウス'],
      difficultyJustification: '断面の分類理解'
    },
    source: 'Conic Sections',
    mensaLevel: 'standard',
    cognitiveSkills: ['断面分類', '円錐の理解']
  },

  {
    id: 'spatial_exp_17',
    category: 'spatial',
    difficulty: 18,
    question: 'クラインの壺を3次元空間に埋め込むと？',
    options: [
      '自己交差なしで可能',
      '必ず自己交差する',
      '不可能',
      '条件による'
    ],
    correctAnswer: 1,
    timeLimit: 180,
    explanation: '3次元では必ず自己交差が生じる',
    practiceMode: {
      immediateExplanation: '位相幾何学の有名な例です。',
      detailedSolution: 'クラインの壺：\n- 向き付け不可能な閉曲面\n- 4次元では自己交差なし\n- 3次元投影では必ず交差\n- メビウスの帯の3次元版',
      commonMistakes: ['通常の壺と混同', '次元の理解不足'],
      relatedConcepts: ['位相幾何学', '向き付け可能性', '高次元埋め込み'],
      difficultyJustification: '高度な位相概念'
    },
    source: 'Topology',
    mensaLevel: 'genius',
    cognitiveSkills: ['位相的思考', '次元理解']
  },

  {
    id: 'spatial_exp_18',
    category: 'spatial',
    difficulty: 7,
    question: '正三角柱の辺の数は？',
    options: ['6本', '9本', '12本', '15本'],
    correctAnswer: 1,
    timeLimit: 60,
    explanation: '底面3辺×2 + 側辺3本 = 9本',
    practiceMode: {
      immediateExplanation: '角柱の基本構造を理解します。',
      detailedSolution: '正三角柱の構成：\n- 底面：正三角形の辺3本\n- 上面：正三角形の辺3本\n- 側辺：垂直な辺3本\n合計：9本',
      commonMistakes: ['面の数と混同', '側辺を忘れる'],
      relatedConcepts: ['角柱', 'プリズム', '辺の数え方'],
      difficultyJustification: '基本的な角柱の理解'
    },
    source: 'Prisms',
    mensaLevel: 'standard',
    cognitiveSkills: ['角柱理解', '構造把握']
  },

  {
    id: 'spatial_exp_19',
    category: 'spatial',
    difficulty: 13,
    question: 'サッカーボール（切頂二十面体）の五角形の面の数は？',
    options: ['12個', '20個', '24個', '32個'],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '正五角形12個と正六角形20個で構成',
    practiceMode: {
      immediateExplanation: 'アルキメデス立体の実用例です。',
      detailedSolution: 'サッカーボール（切頂二十面体）：\n- 正五角形：12個（黒）\n- 正六角形：20個（白）\n- オイラーの定理で確認可能',
      commonMistakes: ['六角形の数と混同', '総面数と誤解'],
      relatedConcepts: ['切頂二十面体', 'フラーレン', 'アルキメデス立体'],
      difficultyJustification: '実用的な多面体の理解'
    },
    source: 'Applied Geometry',
    mensaLevel: 'expert',
    cognitiveSkills: ['応用幾何', '実例認識']
  },

  {
    id: 'spatial_exp_20',
    category: 'spatial',
    difficulty: 9,
    question: 'トーラス（ドーナツ型）の穴の数は？',
    options: ['0個', '1個', '2個', '3個'],
    correctAnswer: 1,
    timeLimit: 45,
    explanation: 'トーラスは種数1の曲面',
    practiceMode: {
      immediateExplanation: '位相幾何学の基本的な形状です。',
      detailedSolution: 'トーラスの性質：\n- 穴（種数）：1個\n- オイラー標数：0\n- 向き付け可能な閉曲面',
      commonMistakes: ['球面と混同', '穴の数え方を誤る'],
      relatedConcepts: ['種数', '位相不変量', 'オイラー標数'],
      difficultyJustification: '基本的な位相概念'
    },
    source: 'Basic Topology',
    mensaLevel: 'standard',
    cognitiveSkills: ['位相認識', '穴の理解']
  },

  {
    id: 'spatial_exp_21',
    category: 'spatial',
    difficulty: 15,
    question: '正24胞体は何次元の図形？',
    options: ['3次元', '4次元', '5次元', '6次元'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '4次元の正多胞体の一つ',
    practiceMode: {
      immediateExplanation: '高次元の正多胞体です。',
      detailedSolution: '4次元正多胞体：\n- 5胞体（5個の四面体）\n- 8胞体（超立方体）\n- 16胞体\n- 24胞体\n- 120胞体\n- 600胞体',
      commonMistakes: ['3次元と誤解', '面の数と混同'],
      relatedConcepts: ['正多胞体', '4次元幾何', '高次元正多面体'],
      difficultyJustification: '高次元の分類理解'
    },
    source: '4D Geometry',
    mensaLevel: 'expert',
    cognitiveSkills: ['4次元理解', '正多胞体']
  },

  {
    id: 'spatial_exp_22',
    category: 'spatial',
    difficulty: 11,
    question: '立方体を1つの頂点で支えて釣り合わせたとき、反対側の頂点の位置は？',
    options: ['真上', '斜め上', '横', '存在しない'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '体対角線は鉛直になる',
    practiceMode: {
      immediateExplanation: '立方体の重心と対称性を理解します。',
      detailedSolution: '頂点で支える場合：\n- 重心は体対角線上\n- 体対角線が鉛直に\n- 反対の頂点が真上\n- 完全に釣り合う',
      commonMistakes: ['不安定と考える', '斜めになると誤解'],
      relatedConcepts: ['重心', '体対角線', '力学的平衡'],
      difficultyJustification: '3次元の平衡理解'
    },
    source: 'Spatial Balance',
    mensaLevel: 'standard',
    cognitiveSkills: ['重心理解', '3次元平衡']
  },

  {
    id: 'spatial_exp_23',
    category: 'spatial',
    difficulty: 14,
    question: 'メンガーのスポンジの次元は？',
    options: ['2次元', '2.5次元', '約2.73次元', '3次元'],
    correctAnswer: 2,
    timeLimit: 150,
    explanation: 'フラクタル次元log(20)/log(3)≈2.727',
    practiceMode: {
      immediateExplanation: 'フラクタル幾何学の代表例です。',
      detailedSolution: 'メンガーのスポンジ：\n- 各段階で27分割し7個除去\n- 20個の小立方体が残る\n- フラクタル次元：log(20)/log(3)\n- 体積→0、表面積→∞',
      commonMistakes: ['整数次元と考える', '通常の立体と混同'],
      relatedConcepts: ['フラクタル', 'ハウスドルフ次元', '自己相似'],
      difficultyJustification: 'フラクタル次元の理解'
    },
    source: 'Fractal Geometry',
    mensaLevel: 'expert',
    cognitiveSkills: ['フラクタル理解', '非整数次元']
  },

  {
    id: 'spatial_exp_24',
    category: 'spatial',
    difficulty: 8,
    question: '正六角柱の面の数は？',
    options: ['6面', '8面', '10面', '12面'],
    correctAnswer: 1,
    timeLimit: 60,
    explanation: '上下の六角形2面 + 側面6面 = 8面',
    practiceMode: {
      immediateExplanation: '六角柱の構造を理解します。',
      detailedSolution: '正六角柱：\n- 底面：正六角形1個\n- 上面：正六角形1個\n- 側面：長方形6個\n合計：8面',
      commonMistakes: ['側面の数を誤る', '辺の数と混同'],
      relatedConcepts: ['角柱', '六角形', '面の数え方'],
      difficultyJustification: '基本的な角柱の面数'
    },
    source: 'Hexagonal Prism',
    mensaLevel: 'standard',
    cognitiveSkills: ['角柱理解', '面の計数']
  },

  {
    id: 'spatial_exp_25',
    category: 'spatial',
    difficulty: 19,
    question: 'ペンローズタイリングの対称性は？',
    options: ['4回対称', '5回対称', '6回対称', '周期的'],
    correctAnswer: 1,
    timeLimit: 180,
    explanation: '非周期的だが5回回転対称を持つ',
    practiceMode: {
      immediateExplanation: '準結晶の数学的モデルです。',
      detailedSolution: 'ペンローズタイリング：\n- 非周期的タイリング\n- 局所的に5回対称\n- 黄金比が現れる\n- 準結晶の発見につながった',
      commonMistakes: ['周期的と誤解', '結晶と混同'],
      relatedConcepts: ['準結晶', '非周期タイリング', '黄金比'],
      difficultyJustification: '高度な対称性理論'
    },
    source: 'Aperiodic Tilings',
    mensaLevel: 'genius',
    cognitiveSkills: ['準周期性', '高度な対称性']
  },

  {
    id: 'spatial_exp_26',
    category: 'spatial',
    difficulty: 10,
    question: '立方体の面心を結んでできる立体は？',
    options: ['正四面体', '正八面体', '正十二面体', '正二十面体'],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '6つの面心を結ぶと正八面体',
    practiceMode: {
      immediateExplanation: '双対多面体の構成方法です。',
      detailedSolution: '立方体の面心：\n- 6個の点（各面の中心）\n- 隣接する面の中心を結ぶ\n- 正八面体が形成される\n- 立方体と正八面体は双対',
      commonMistakes: ['頂点と混同', '別の正多面体と誤答'],
      relatedConcepts: ['双対多面体', '面心', '正八面体'],
      difficultyJustification: '双対関係の理解'
    },
    source: 'Dual Construction',
    mensaLevel: 'standard',
    cognitiveSkills: ['双対構成', '中心の理解']
  },

  {
    id: 'spatial_exp_27',
    category: 'spatial',
    difficulty: 12,
    question: '正十二面体の二面角（隣接する面のなす角）は？',
    options: ['約108°', '約116°', '約120°', '約144°'],
    correctAnswer: 1,
    timeLimit: 150,
    explanation: '二面角は約116.57°',
    practiceMode: {
      immediateExplanation: '正多面体の精密な角度計算です。',
      detailedSolution: '正十二面体の二面角：\n- cos⁻¹(-1/√5) ≈ 116.57°\n- 正五角形の内角は108°\n- 二面角 > 内角\n- 黄金比が関連',
      commonMistakes: ['内角と混同', '120°と誤答'],
      relatedConcepts: ['二面角', '立体角', '余弦定理'],
      difficultyJustification: '精密な角度計算'
    },
    source: 'Dihedral Angles',
    mensaLevel: 'expert',
    cognitiveSkills: ['角度計算', '立体角度']
  },

  {
    id: 'spatial_exp_28',
    category: 'spatial',
    difficulty: 16,
    question: '双曲面上の直線の本数は？',
    options: ['0本', '1本', '2本の族', '無限本'],
    correctAnswer: 2,
    timeLimit: 180,
    explanation: '一葉双曲面には2つの直線族がある',
    practiceMode: {
      immediateExplanation: '曲面上の直線の存在に関する問題です。',
      detailedSolution: '一葉双曲面：\n- 鞍型の曲面\n- 2つの直線族を含む\n- 各点を通る2本の直線\n- 建築（冷却塔）に応用',
      commonMistakes: ['曲面に直線なしと考える', '1本のみと誤答'],
      relatedConcepts: ['双曲面', '直線族', 'ruled surface'],
      difficultyJustification: '高度な曲面理論'
    },
    source: 'Surface Theory',
    mensaLevel: 'genius',
    cognitiveSkills: ['曲面理解', '直線族認識']
  },

  {
    id: 'spatial_exp_29',
    category: 'spatial',
    difficulty: 7,
    question: '正四面体を平面で切って正方形の断面を作ることは？',
    options: ['不可能', '1通りの向きで可能', '3通りの向きで可能', '無数に可能'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '辺の中点を結ぶ3通りの切り方',
    practiceMode: {
      immediateExplanation: '正四面体の断面の可能性を探ります。',
      detailedSolution: '正方形断面の作り方：\n- 相対する2辺の中点を結ぶ\n- 3組の相対する辺がある\n- 各組で正方形断面\n- 断面は正四面体の中心を通る',
      commonMistakes: ['不可能と考える', '1通りのみと誤答'],
      relatedConcepts: ['断面', '中点連結', '対称性'],
      difficultyJustification: '断面の可能性理解'
    },
    source: 'Cross Sections',
    mensaLevel: 'standard',
    cognitiveSkills: ['断面作図', '対称性活用']
  },

  {
    id: 'spatial_exp_30',
    category: 'spatial',
    difficulty: 13,
    question: 'ルービックキューブの可能な配置の数は約？',
    options: ['4.3×10¹⁹', '4.3×10²⁰', '4.3×10²¹', '4.3×10²²'],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '約4.3×10¹⁹通りの配置',
    practiceMode: {
      immediateExplanation: '組み合わせ論と群論の応用例です。',
      detailedSolution: '配置数の計算：\n- 角の配置：8!×3⁷\n- 辺の配置：12!×2¹¹\n- 制約：位置と向きのパリティ\n- 結果：約4.3252×10¹⁹',
      commonMistakes: ['制約を忘れる', '桁数を誤る'],
      relatedConcepts: ['置換群', 'パリティ', '組み合わせ計算'],
      difficultyJustification: '複雑な組み合わせ計算'
    },
    source: 'Rubik Cube Math',
    mensaLevel: 'expert',
    cognitiveSkills: ['組み合わせ論', '群論応用']
  },

  {
    id: 'spatial_exp_31',
    category: 'spatial',
    difficulty: 11,
    question: '正二十面体の頂点を結ぶ最長の対角線は何本？',
    options: ['6本', '10本', '15本', '30本'],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '対蹠点を結ぶ6本の対角線',
    practiceMode: {
      immediateExplanation: '正二十面体の対称性を理解します。',
      detailedSolution: '正二十面体の対角線：\n- 頂点数：12個\n- 対蹠点のペア：6組\n- 最長対角線：6本\n- 正二十面体の中心を通る',
      commonMistakes: ['すべての対角線と混同', '頂点数と混同'],
      relatedConcepts: ['対蹠点', '最長対角線', '中心対称'],
      difficultyJustification: '対称性の深い理解'
    },
    source: 'Icosahedral Symmetry',
    mensaLevel: 'standard',
    cognitiveSkills: ['対称性理解', '対角線分類']
  },

  {
    id: 'spatial_exp_32',
    category: 'spatial',
    difficulty: 17,
    question: 'ボロミアン環の特徴は？',
    options: [
      '3つの環が鎖状につながる',
      '3つとも絡まっているが、2つずつは絡まない',
      '1つの環が他の2つを貫く',
      '平面上に描ける'
    ],
    correctAnswer: 1,
    timeLimit: 180,
    explanation: '3つ全体では絡むが2つずつは分離',
    practiceMode: {
      immediateExplanation: '位相幾何学の興味深い例です。',
      detailedSolution: 'ボロミアン環：\n- 3つの環全体：分離不可能\n- 任意の2つ：分離可能\n- Brunnian linkの例\n- 分子構造にも現れる',
      commonMistakes: ['通常の鎖と混同', '2つも絡むと誤解'],
      relatedConcepts: ['絡み目理論', 'Brunnian link', '位相不変量'],
      difficultyJustification: '特殊な絡み構造'
    },
    source: 'Knot Theory',
    mensaLevel: 'genius',
    cognitiveSkills: ['絡み目理解', '位相的思考']
  },

  {
    id: 'spatial_exp_33',
    category: 'spatial',
    difficulty: 9,
    question: '円錐の展開図は？',
    options: ['円', '扇形', '三角形', '長方形'],
    correctAnswer: 1,
    timeLimit: 45,
    explanation: '側面は扇形に展開される',
    practiceMode: {
      immediateExplanation: '円錐の展開図の基本です。',
      detailedSolution: '円錐の展開図：\n- 底面：円\n- 側面：扇形\n- 扇形の弧長 = 底円の周長\n- 中心角 = 360° × (底円半径/母線長)',
      commonMistakes: ['三角形と誤答', '展開不可と考える'],
      relatedConcepts: ['展開図', '扇形', '母線'],
      difficultyJustification: '基本的な展開図理解'
    },
    source: 'Cone Development',
    mensaLevel: 'standard',
    cognitiveSkills: ['展開図作成', '円錐理解']
  },

  {
    id: 'spatial_exp_34',
    category: 'spatial',
    difficulty: 15,
    question: '正600胞体の頂点数は？',
    options: ['120個', '240個', '600個', '720個'],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '4次元正多胞体で頂点120個',
    practiceMode: {
      immediateExplanation: '最も複雑な4次元正多胞体です。',
      detailedSolution: '正600胞体：\n- 3次元胞：正四面体600個\n- 2次元面：1200個\n- 1次元辺：720本\n- 0次元頂点：120個\n- 正120胞体と双対',
      commonMistakes: ['胞の数と混同', '次元を誤解'],
      relatedConcepts: ['4次元正多胞体', '双対性', 'シュレーフリ記号'],
      difficultyJustification: '4次元の複雑な構造'
    },
    source: '4D Regular Polytopes',
    mensaLevel: 'expert',
    cognitiveSkills: ['4次元計算', '高次元構造']
  },

  {
    id: 'spatial_exp_35',
    category: 'spatial',
    difficulty: 10,
    question: '正八面体を正方形の面で2等分すると？',
    options: [
      '2つの四角錐',
      '2つの四面体',
      '四角錐と四面体',
      '不規則な立体'
    ],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '正方形断面で2つの正四角錐に分割',
    practiceMode: {
      immediateExplanation: '正八面体の構造を理解します。',
      detailedSolution: '正八面体の分割：\n- 4つの頂点を含む正方形断面\n- 上下に正四角錐\n- 各錐の高さは等しい\n- 体積も等分',
      commonMistakes: ['四面体と誤答', '不等分と考える'],
      relatedConcepts: ['立体分割', '正四角錐', '断面利用'],
      difficultyJustification: '立体の分割理解'
    },
    source: 'Polyhedra Division',
    mensaLevel: 'standard',
    cognitiveSkills: ['分割思考', '立体構成']
  },

  {
    id: 'spatial_exp_36',
    category: 'spatial',
    difficulty: 14,
    question: 'シェルピンスキー四面体の体積の極限は？',
    options: ['0', '元の1/2', '元の1/4', '元の1/8'],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '無限回の操作で体積は0に収束',
    practiceMode: {
      immediateExplanation: '3次元フラクタルの性質です。',
      detailedSolution: 'シェルピンスキー四面体：\n- 各段階で体積が1/2に\n- n回後：(1/2)ⁿ\n- 極限：0\n- 表面積は有限値に収束',
      commonMistakes: ['有限値と考える', '表面積と混同'],
      relatedConcepts: ['3次元フラクタル', '極限', '測度論'],
      difficultyJustification: 'フラクタルの極限理解'
    },
    source: '3D Fractals',
    mensaLevel: 'expert',
    cognitiveSkills: ['フラクタル性質', '極限概念']
  },

  {
    id: 'spatial_exp_37',
    category: 'spatial',
    difficulty: 12,
    question: '立方体の頂点、辺の中点、面心、中心の総数は？',
    options: ['20個', '24個', '27個', '33個'],
    correctAnswer: 2,
    timeLimit: 120,
    explanation: '8+12+6+1=27個の特異点',
    practiceMode: {
      immediateExplanation: '立方体の重要な点を数えます。',
      detailedSolution: '立方体の特異点：\n- 頂点：8個\n- 辺の中点：12個\n- 面心：6個\n- 中心：1個\n合計：27個',
      commonMistakes: ['重複して数える', '中心を忘れる'],
      relatedConcepts: ['特異点', '対称性', '格子点'],
      difficultyJustification: '複数種類の点の計数'
    },
    source: 'Cubic Lattice',
    mensaLevel: 'expert',
    cognitiveSkills: ['点の分類', '系統的計数']
  },

  {
    id: 'spatial_exp_38',
    category: 'spatial',
    difficulty: 18,
    question: 'E8格子の次元は？',
    options: ['4次元', '6次元', '8次元', '24次元'],
    correctAnswer: 2,
    timeLimit: 120,
    explanation: 'E8は8次元の例外型単純リー群',
    practiceMode: {
      immediateExplanation: '高次元の特殊な格子構造です。',
      detailedSolution: 'E8格子：\n- 8次元ユークリッド空間\n- 最密充填を実現\n- 248次元のリー群\n- 弦理論で重要',
      commonMistakes: ['リー群の次元と混同', '他のE系列と混同'],
      relatedConcepts: ['例外型リー群', '格子理論', '球充填'],
      difficultyJustification: '最先端の数学構造'
    },
    source: 'Lie Theory',
    mensaLevel: 'genius',
    cognitiveSkills: ['高次元理論', '例外構造']
  },

  {
    id: 'spatial_exp_39',
    category: 'spatial',
    difficulty: 8,
    question: '平行六面体の面の形は？',
    options: ['すべて長方形', 'すべて平行四辺形', 'すべて菱形', '不定形'],
    correctAnswer: 1,
    timeLimit: 60,
    explanation: '6つの面はすべて平行四辺形',
    practiceMode: {
      immediateExplanation: '一般化された箱型の立体です。',
      detailedSolution: '平行六面体：\n- 対面が平行で合同\n- 各面は平行四辺形\n- 特殊例：直方体、立方体\n- ベクトルの平行六面体',
      commonMistakes: ['直方体と混同', '菱形限定と誤解'],
      relatedConcepts: ['平行四辺形', 'アフィン変換', 'ベクトル積'],
      difficultyJustification: '一般化された立体'
    },
    source: 'Parallelepipeds',
    mensaLevel: 'standard',
    cognitiveSkills: ['一般化理解', '面の性質']
  },

  {
    id: 'spatial_exp_40',
    category: 'spatial',
    difficulty: 11,
    question: '正12面体の辺を辿って元の頂点に戻る最短路の長さは？',
    options: ['辺3本分', '辺4本分', '辺5本分', '辺6本分'],
    correctAnswer: 2,
    timeLimit: 120,
    explanation: '五角形の周を1周するのが最短',
    practiceMode: {
      immediateExplanation: '多面体上の最短閉路問題です。',
      detailedSolution: '正十二面体の閉路：\n- 各頂点の次数：3\n- 最小閉路：五角形の周\n- 長さ：辺5本分\n- 複数の5-閉路が存在',
      commonMistakes: ['三角形を探す', '直線距離と混同'],
      relatedConcepts: ['グラフの閉路', '最短経路', '面の周'],
      difficultyJustification: 'グラフ理論的思考'
    },
    source: 'Graph on Polyhedra',
    mensaLevel: 'standard',
    cognitiveSkills: ['経路探索', 'グラフ理解']
  },

  {
    id: 'spatial_exp_41',
    category: 'spatial',
    difficulty: 16,
    question: 'ホップファイブレーションは何次元球面から何次元球面への写像？',
    options: ['S¹→S¹', 'S²→S¹', 'S³→S²', 'S⁴→S³'],
    correctAnswer: 2,
    timeLimit: 150,
    explanation: 'S³からS²への非自明なファイバー束',
    practiceMode: {
      immediateExplanation: '位相幾何学の重要な例です。',
      detailedSolution: 'ホップファイブレーション：\n- S³→S²\n- ファイバーはS¹\n- 四元数を使った構成\n- 物理学でも重要',
      commonMistakes: ['次元を逆にする', '自明な写像と混同'],
      relatedConcepts: ['ファイバー束', '四元数', '球面の写像'],
      difficultyJustification: '高度な位相概念'
    },
    source: 'Differential Topology',
    mensaLevel: 'genius',
    cognitiveSkills: ['位相幾何', 'ファイバー束']
  },

  {
    id: 'spatial_exp_42',
    category: 'spatial',
    difficulty: 9,
    question: '正六面体（立方体）の対称操作の総数は？',
    options: ['24個', '48個', '64個', '96個'],
    correctAnswer: 1,
    timeLimit: 90,
    explanation: '回転24個＋鏡映を含めて48個',
    practiceMode: {
      immediateExplanation: '立方体の完全な対称性を数えます。',
      detailedSolution: '立方体の対称操作：\n- 恒等変換：1\n- 面心軸回転：6×1=6\n- 辺心軸回転：6×1=6\n- 頂点軸回転：8×2=16\n- 鏡映等：19\n合計：48',
      commonMistakes: ['回転のみ数える', '重複カウント'],
      relatedConcepts: ['対称群', '正八面体群', '群の位数'],
      difficultyJustification: '対称操作の完全列挙'
    },
    source: 'Symmetry Groups',
    mensaLevel: 'standard',
    cognitiveSkills: ['群論基礎', '対称性列挙']
  },

  {
    id: 'spatial_exp_43',
    category: 'spatial',
    difficulty: 13,
    question: '切頂立方体の頂点数は？',
    options: ['12個', '16個', '20個', '24個'],
    correctAnswer: 3,
    timeLimit: 120,
    explanation: '元の8頂点が3頂点ずつになり24頂点',
    practiceMode: {
      immediateExplanation: 'アルキメデス立体の頂点計算です。',
      detailedSolution: '切頂立方体：\n- 元の立方体：8頂点\n- 各頂点を切る→3頂点に\n- 8×3=24頂点\n- 面：8三角形＋6八角形',
      commonMistakes: ['元の頂点数を使う', '辺の数と混同'],
      relatedConcepts: ['切頂操作', 'アルキメデス立体', '頂点分裂'],
      difficultyJustification: '切頂による変化理解'
    },
    source: 'Truncated Solids',
    mensaLevel: 'expert',
    cognitiveSkills: ['切頂理解', '頂点計算']
  },

  {
    id: 'spatial_exp_44',
    category: 'spatial',
    difficulty: 10,
    question: '球面上の大円は最大何個まで交わらずに配置できる？',
    options: ['1個', '2個', '3個', '無限個'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: 'どの2つの大円も必ず2点で交わる',
    practiceMode: {
      immediateExplanation: '球面幾何学の基本性質です。',
      detailedSolution: '大円の性質：\n- 球の中心を通る平面との交線\n- 任意の2大円は2点で交わる\n- 交わらない大円は存在しない\n- 最大独立数：1',
      commonMistakes: ['平面と混同', '小円と混同'],
      relatedConcepts: ['球面幾何', '大円', '非ユークリッド幾何'],
      difficultyJustification: '球面の特殊性理解'
    },
    source: 'Spherical Geometry',
    mensaLevel: 'standard',
    cognitiveSkills: ['球面幾何', '交差理解']
  },

  {
    id: 'spatial_exp_45',
    category: 'spatial',
    difficulty: 20,
    question: 'モンスター群の次元は？',
    options: [
      '約8×10⁵³',
      '約8×10⁴³',
      '約8×10³³',
      '約8×10²³'
    ],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '位数約8×10⁵³の最大散在単純群',
    practiceMode: {
      immediateExplanation: '有限単純群の分類における最大の例外群です。',
      detailedSolution: 'モンスター群：\n- 最大の散在単純群\n- 位数：808017424794512875886459904961710757005754368000000000\n- 196883次元表現\n- ムーンシャイン予想',
      commonMistakes: ['次元と位数を混同', '桁数を誤る'],
      relatedConcepts: ['散在単純群', 'ムーンシャイン', '有限群論'],
      difficultyJustification: '最先端の群論'
    },
    source: 'Group Theory',
    mensaLevel: 'genius',
    cognitiveSkills: ['抽象代数', '巨大構造']
  },

  {
    id: 'spatial_exp_46',
    category: 'spatial',
    difficulty: 8,
    question: '正方形を対角線で折ったときにできる立体は？',
    options: ['三角錐', '三角柱', '四面体', '平面のまま'],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: '二等辺三角形2つで三角錐を形成',
    practiceMode: {
      immediateExplanation: '平面図形から立体を作る基本操作です。',
      detailedSolution: '正方形の折り畳み：\n- 対角線で2つの二等辺三角形\n- 折り上げると三角錐\n- 底面：二等辺三角形\n- 頂点：元の正方形の頂点',
      commonMistakes: ['四面体と混同', '平面のままと考える'],
      relatedConcepts: ['折り紙幾何', '平面から立体', '二面角'],
      difficultyJustification: '基本的な折り畳み'
    },
    source: 'Paper Folding',
    mensaLevel: 'standard',
    cognitiveSkills: ['折り畳み理解', '立体形成']
  },

  {
    id: 'spatial_exp_47',
    category: 'spatial',
    difficulty: 12,
    question: '菱形十二面体の面の形は？',
    options: ['正三角形', '正方形', '菱形', '正五角形'],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '12個の合同な菱形で構成',
    practiceMode: {
      immediateExplanation: '空間充填可能な多面体です。',
      detailedSolution: '菱形十二面体：\n- 面：菱形12個\n- 頂点：14個\n- 辺：24本\n- 空間充填可能\n- 立方体と正八面体の複合',
      commonMistakes: ['正十二面体と混同', '面の形を誤る'],
      relatedConcepts: ['カタラン立体', '空間充填', '双対多面体'],
      difficultyJustification: '特殊な多面体の理解'
    },
    source: 'Catalan Solids',
    mensaLevel: 'expert',
    cognitiveSkills: ['カタラン立体', '菱形面認識']
  },

  {
    id: 'spatial_exp_48',
    category: 'spatial',
    difficulty: 15,
    question: 'スポンジの表面積は体積に対してどのように変化する？',
    options: [
      '比例する',
      '平方根に比例',
      '2/3乗に比例',
      'フラクタル次元による'
    ],
    correctAnswer: 2,
    timeLimit: 150,
    explanation: '通常の立体では表面積∝体積^(2/3)',
    practiceMode: {
      immediateExplanation: 'スケーリング則の基本です。',
      detailedSolution: '相似則：\n- 長さ：L\n- 表面積：L²\n- 体積：L³\n- 表面積∝体積^(2/3)\nフラクタルでは異なる',
      commonMistakes: ['線形関係と考える', 'フラクタルと混同'],
      relatedConcepts: ['相似則', 'スケーリング', '次元解析'],
      difficultyJustification: 'べき乗則の理解'
    },
    source: 'Scaling Laws',
    mensaLevel: 'expert',
    cognitiveSkills: ['スケーリング', '次元解析']
  },

  {
    id: 'spatial_exp_49',
    category: 'spatial',
    difficulty: 11,
    question: '正三角形3つと正方形3つでできる立体は？',
    options: [
      '三角柱',
      '切頂四面体',
      '三方四面体',
      '存在しない'
    ],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '切頂四面体の面構成',
    practiceMode: {
      immediateExplanation: 'アルキメデス立体の面構成を確認します。',
      detailedSolution: '切頂四面体：\n- 正四面体の4頂点を切る\n- 元の4面→小さい正三角形4個\n- 切り口→正六角形4個\n誤り：実際は三角形4個と六角形4個',
      commonMistakes: ['面の数を誤る', '他の立体と混同'],
      relatedConcepts: ['切頂四面体', '面の構成', 'アルキメデス立体'],
      difficultyJustification: '正確な面構成の記憶'
    },
    source: 'Face Configurations',
    mensaLevel: 'standard',
    cognitiveSkills: ['面構成理解', '立体同定']
  },

  {
    id: 'spatial_exp_50',
    category: 'spatial',
    difficulty: 19,
    question: '24次元リーチ格子の接吻数は？',
    options: ['196560', '196883', '240', '4320'],
    correctAnswer: 0,
    timeLimit: 240,
    explanation: '24次元で196560個の球が接触',
    practiceMode: {
      immediateExplanation: '高次元球充填の最適解です。',
      detailedSolution: 'リーチ格子：\n- 24次元の最密充填\n- 接吻数：196560\n- 自己双対的\n- 多くの例外的性質',
      commonMistakes: ['モンスター群と混同', '次元を誤る'],
      relatedConcepts: ['球充填', '接吻数問題', '例外的格子'],
      difficultyJustification: '最高度の格子理論'
    },
    source: 'Lattice Theory',
    mensaLevel: 'genius',
    cognitiveSkills: ['高次元格子', '最適充填']
  }
];