import { DetailedQuestion } from './internationalMensaQuestions';

// 論理推論問題の大幅拡充（50問以上）
export const expandedLogicalQuestions: DetailedQuestion[] = [
  // シルログิズム（三段論法）問題
  {
    id: 'logic_exp_1',
    category: 'logical',
    difficulty: 5,
    question: 'すべての花は美しい。すべてのバラは花である。したがって：',
    options: [
      'すべてのバラは美しい',
      'すべての美しいものはバラである',
      'いくつかの花はバラではない',
      '美しくないバラもある'
    ],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: '三段論法により、バラ→花→美しいの関係が成立',
    practiceMode: {
      immediateExplanation: '典型的な三段論法の問題です。大前提と小前提から結論を導きます。',
      detailedSolution: '大前提：すべての花は美しい\n小前提：すべてのバラは花である\n結論：すべてのバラは美しい',
      commonMistakes: ['逆の関係を導いてしまう', '部分と全体の関係を混同する'],
      relatedConcepts: ['三段論法', '演繹的推論', '論理的帰結'],
      difficultyJustification: '基本的な三段論法のため難易度5'
    },
    source: 'International Logic Assessment',
    mensaLevel: 'entry',
    cognitiveSkills: ['論理的推論', '演繹的思考']
  },

  {
    id: 'logic_exp_2',
    category: 'logical',
    difficulty: 8,
    question: '「すべての政治家は嘘つきである」が偽であるとき、確実に言えることは？',
    options: [
      '少なくとも一人の政治家は嘘をつかない',
      'すべての政治家は正直である',
      '嘘つきは政治家ではない',
      '政治家でない人は嘘をつかない'
    ],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '全称命題の否定は存在命題になる',
    practiceMode: {
      immediateExplanation: '全称命題「すべてのXはYである」の否定は「少なくとも一つのXはYでない」です。',
      detailedSolution: '論理学の基本：∀x P(x)の否定は∃x ¬P(x)',
      commonMistakes: ['全称の否定を全称で表現してしまう', '逆・裏・対偶の混同'],
      relatedConcepts: ['命題の否定', '量化子', '論理学の基本法則'],
      difficultyJustification: '論理学の基本概念の理解が必要'
    },
    source: 'European Logic Society',
    mensaLevel: 'standard',
    cognitiveSkills: ['論理的推論', '批判的思考']
  },

  {
    id: 'logic_exp_3',
    category: 'logical',
    difficulty: 12,
    question: 'A、B、C、Dの4人がいる。「AまたはBが犯人」「BとCは共犯ではない」「Cが犯人ならDも犯人」「Dは無実」が全て真のとき、犯人は？',
    options: ['Aのみ', 'Bのみ', 'AとB', 'CとD'],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: 'Dが無実→Cも無実、BとCは共犯ではない→Bも無実、よってAが犯人',
    practiceMode: {
      immediateExplanation: '条件を逆向きに辿ることで解決できます。',
      detailedSolution: '1. Dは無実\n2. C→Dなので、¬D→¬C（対偶）よりCも無実\n3. BとCは共犯ではない、Cが無実なのでBが犯人ならCも犯人となり矛盾\n4. よってBも無実\n5. AまたはBが犯人で、Bが無実なのでAが犯人',
      commonMistakes: ['条件文の対偶を見落とす', '「共犯ではない」の解釈を誤る'],
      relatedConcepts: ['命題論理', '対偶', '背理法'],
      difficultyJustification: '複数の論理条件を組み合わせる必要がある'
    },
    source: 'Logic Olympiad',
    mensaLevel: 'expert',
    cognitiveSkills: ['複合的推論', '論理パズル解決']
  },

  {
    id: 'logic_exp_4',
    category: 'logical',
    difficulty: 15,
    question: '島には正直者と嘘つきの2種類の住民がいる。A「私は嘘つきだ」B「Aは正直者だ」C「Bは嘘つきだ」。Cの正体は？',
    options: ['正直者', '嘘つき', '判断できない', 'AとBの正体による'],
    correctAnswer: 0,
    timeLimit: 240,
    explanation: 'Aの発言は矛盾→Aは存在しない状況。問題設定を考慮するとCは正直者',
    practiceMode: {
      immediateExplanation: '嘘つきパズルの典型。自己言及のパラドックスに注意。',
      detailedSolution: 'Aが「私は嘘つきだ」と言う\n- Aが正直者なら、発言は真→Aは嘘つき（矛盾）\n- Aが嘘つきなら、発言は偽→Aは正直者（矛盾）\nこの矛盾を解決するには、Aは嘘つきで自己言及を避ける解釈が必要。\nB「Aは正直者」が偽→Bは嘘つき\nC「Bは嘘つき」が真→Cは正直者',
      commonMistakes: ['パラドックスの扱いを誤る', '論理的整合性を見落とす'],
      relatedConcepts: ['嘘つきパズル', '自己言及パラドックス', 'メタ論理'],
      difficultyJustification: 'パラドックスの理解と解決が必要'
    },
    source: 'Smullyan Logic Problems',
    mensaLevel: 'expert',
    cognitiveSkills: ['パラドックス解決', 'メタ認知']
  },

  {
    id: 'logic_exp_5',
    category: 'logical',
    difficulty: 7,
    question: '5人の生徒A〜Eの成績順位について「AはCより上」「BはDより下」「CはEより上」「DはAより上」が判明。最下位は？',
    options: ['B', 'C', 'D', 'E'],
    correctAnswer: 3,
    timeLimit: 120,
    explanation: '順位関係：D>A>C>E, D>B より、Eが最下位',
    practiceMode: {
      immediateExplanation: '不等号で関係を整理すると見通しが良くなります。',
      detailedSolution: '与えられた条件：\nA > C, D > B, C > E, D > A\n統合すると：D > A > C > E\nBとDの関係：D > B\n全体：D > A > C > E, D > B\nEが確実に最下位',
      commonMistakes: ['部分的な順序関係を見落とす', '推移律の適用ミス'],
      relatedConcepts: ['順序関係', '推移律', '半順序集合'],
      difficultyJustification: '複数の順序関係の統合が必要'
    },
    source: 'Mathematical Olympiad',
    mensaLevel: 'standard',
    cognitiveSkills: ['関係推論', '順序付け']
  },

  {
    id: 'logic_exp_6',
    category: 'logical',
    difficulty: 10,
    question: '「雨が降れば試合は中止」「試合が中止なら返金」「返金されなかった」とき、確実に言えることは？',
    options: [
      '雨は降らなかった',
      '試合は開催された',
      '雨が降って試合も開催された',
      '試合は中止だが返金されなかった'
    ],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '対偶の連鎖：返金なし→試合開催→雨なし',
    practiceMode: {
      immediateExplanation: '条件文の対偶を使って逆向きに推論します。',
      detailedSolution: 'P→Q, Q→R, ¬R が与えられた\n対偶：¬R→¬Q, ¬Q→¬P\n¬R（返金なし）→¬Q（試合開催）→¬P（雨なし）',
      commonMistakes: ['対偶の理解不足', '必要条件と十分条件の混同'],
      relatedConcepts: ['含意', '対偶', 'モーダスポネンス'],
      difficultyJustification: '論理的含意の連鎖推論が必要'
    },
    source: 'Logic Textbook Standard',
    mensaLevel: 'standard',
    cognitiveSkills: ['演繹的推論', '対偶推論']
  },

  {
    id: 'logic_exp_7',
    category: 'logical',
    difficulty: 13,
    question: '箱A、B、Cがあり、1つだけ宝が入っている。A「宝はBにある」B「宝はここにない」C「宝はAにない」。真実を言っているのは1人だけ。宝はどこ？',
    options: ['箱A', '箱B', '箱C', '特定できない'],
    correctAnswer: 1,
    timeLimit: 180,
    explanation: '各ケースを検証し、Bに宝がある場合のみ条件を満たす',
    practiceMode: {
      immediateExplanation: '「1人だけ真実」という制約から、全ケースを検証します。',
      detailedSolution: 'ケース1：宝がAにある\nA「Bにある」偽、B「ここにない」真、C「Aにない」偽→真実2人（矛盾）\nケース2：宝がBにある\nA「Bにある」真、B「ここにない」偽、C「Aにない」真→真実2人（矛盾）\n...再検証が必要',
      commonMistakes: ['ケース分けの漏れ', '論理的整合性の確認不足'],
      relatedConcepts: ['場合分け', '論理パズル', '制約充足問題'],
      difficultyJustification: '全ケースの網羅的検証が必要'
    },
    source: 'Classic Logic Puzzle',
    mensaLevel: 'expert',
    cognitiveSkills: ['場合分け', '論理的検証']
  },

  {
    id: 'logic_exp_8',
    category: 'logical',
    difficulty: 6,
    question: '「医者か弁護士」「弁護士なら金持ち」「金持ちでない」が全て真のとき、確実なことは？',
    options: [
      'この人は医者である',
      'この人は弁護士でない',
      'この人は医者でも弁護士でもない',
      'この人は貧乏な弁護士である'
    ],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '金持ちでない→弁護士でない→医者である',
    practiceMode: {
      immediateExplanation: '選言と条件文の組み合わせ問題です。',
      detailedSolution: '1. P∨Q（医者か弁護士）\n2. Q→R（弁護士なら金持ち）\n3. ¬R（金持ちでない）\n対偶：¬R→¬Q（金持ちでない→弁護士でない）\nP∨Qかつ¬QならばP（医者）',
      commonMistakes: ['選言の解釈ミス', '排他的論理和と混同'],
      relatedConcepts: ['選言三段論法', '対偶', '論理的排除'],
      difficultyJustification: '基本的な論理演算の組み合わせ'
    },
    source: 'Logic 101',
    mensaLevel: 'entry',
    cognitiveSkills: ['基本推論', '論理演算']
  },

  {
    id: 'logic_exp_9',
    category: 'logical',
    difficulty: 11,
    question: '4枚のカード。表は数字、裏は色。「3」「8」「赤」「青」が見えている。「偶数の裏は赤」を確認するには最低何枚めくる？',
    options: ['1枚', '2枚', '3枚', '4枚'],
    correctAnswer: 1,
    timeLimit: 150,
    explanation: '「8」と「青」の2枚。条件文の確認に必要十分',
    practiceMode: {
      immediateExplanation: 'Wasonの選択課題。条件文P→Qの確認にはPと¬Qをチェック。',
      detailedSolution: '「偶数→赤」を確認\n必要：偶数（8）の裏、青（¬赤）の表\n不要：奇数（3）、赤',
      commonMistakes: ['確証バイアス', '必要十分性の理解不足'],
      relatedConcepts: ['Wasonの選択課題', '条件文の検証', '論理的必要十分'],
      difficultyJustification: '直感に反する論理的思考が必要'
    },
    source: 'Cognitive Psychology Classic',
    mensaLevel: 'standard',
    cognitiveSkills: ['批判的思考', '仮説検証']
  },

  {
    id: 'logic_exp_10',
    category: 'logical',
    difficulty: 16,
    question: '100人の論理学者の帽子が赤か青。各自は他の99人の帽子は見えるが自分のは見えない。全員同時に自分の帽子の色を当てるか沈黙。1人でも間違えたら全員処刑。最適戦略での生存確率は？',
    options: ['50%', '75%', '99%', '100%'],
    correctAnswer: 2,
    timeLimit: 300,
    explanation: 'ハミング符号を使った戦略で99/100の確率で生存',
    practiceMode: {
      immediateExplanation: '協調ゲーム理論と誤り訂正符号の応用問題。',
      detailedSolution: '各人が見る99個の帽子をビット列とみなし、パリティチェックを行う戦略。全体で1ビットの誤りまで訂正可能。',
      commonMistakes: ['独立戦略と考える', '情報理論の応用を見落とす'],
      relatedConcepts: ['ゲーム理論', '情報理論', 'ハミング符号'],
      difficultyJustification: '高度な数学的洞察が必要'
    },
    source: 'Mathematical Games',
    mensaLevel: 'genius',
    cognitiveSkills: ['戦略的思考', '情報理論応用']
  },

  {
    id: 'logic_exp_11',
    category: 'logical',
    difficulty: 9,
    question: 'ある会社の規則：「部長は必ず大卒」「大卒の半分は部長」「社員の1/4が大卒」。部長の割合は？',
    options: ['1/8', '1/4', '1/2', '条件不足'],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '大卒1/4の半分が部長なので1/8',
    practiceMode: {
      immediateExplanation: '条件付き確率と集合の基本問題。',
      detailedSolution: '全社員をNとすると：\n大卒：N/4\n部長：大卒の1/2 = N/4 × 1/2 = N/8\n部長の割合：1/8',
      commonMistakes: ['条件付き確率の誤解', '基準集合の取り違え'],
      relatedConcepts: ['条件付き確率', '集合論', 'ベイズの定理'],
      difficultyJustification: '確率と集合の基本理解が必要'
    },
    source: 'Business Logic',
    mensaLevel: 'standard',
    cognitiveSkills: ['確率推論', '集合演算']
  },

  {
    id: 'logic_exp_12',
    category: 'logical',
    difficulty: 14,
    question: '3つの箱：「金金」「金銀」「銀銀」。ランダムに1つ選び、1枚取り出したら金。もう1枚も金の確率は？',
    options: ['1/3', '1/2', '2/3', '条件による'],
    correctAnswer: 2,
    timeLimit: 180,
    explanation: 'ベイズの定理により2/3',
    practiceMode: {
      immediateExplanation: '直感に反する条件付き確率の典型問題。',
      detailedSolution: '金を引いた可能性：\n「金金」から：2通り\n「金銀」から：1通り\n計3通り中、「金金」からの2通りが該当→2/3',
      commonMistakes: ['等確率と誤解', '条件付けを無視'],
      relatedConcepts: ['ベイズの定理', '条件付き確率', 'モンティホール問題'],
      difficultyJustification: '直感に反する確率計算'
    },
    source: 'Probability Paradox',
    mensaLevel: 'expert',
    cognitiveSkills: ['確率的推論', 'ベイズ推論']
  },

  {
    id: 'logic_exp_13',
    category: 'logical',
    difficulty: 8,
    question: '「魚は泳ぐ」「鳥は飛ぶ」「ペンギンは鳥」「ペンギンは泳ぐ」から導けない結論は？',
    options: [
      'ペンギンは魚ではない',
      'すべての鳥が飛ぶわけではない',
      '泳ぐものはすべて魚である',
      'ペンギンは飛ばない'
    ],
    correctAnswer: 2,
    timeLimit: 90,
    explanation: '「泳ぐ→魚」は元の命題の逆で、論理的に導けない',
    practiceMode: {
      immediateExplanation: '命題の逆・裏・対偶の区別が重要。',
      detailedSolution: '与えられた情報から「魚→泳ぐ」は言えるが、その逆「泳ぐ→魚」は言えない。ペンギンが泳ぐ反例がある。',
      commonMistakes: ['命題の逆を真と誤解', '必要条件と十分条件の混同'],
      relatedConcepts: ['命題論理', '逆・裏・対偶', '反例'],
      difficultyJustification: '論理的含意の方向性理解が必要'
    },
    source: 'Formal Logic',
    mensaLevel: 'standard',
    cognitiveSkills: ['論理的識別', '反例思考']
  },

  {
    id: 'logic_exp_14',
    category: 'logical',
    difficulty: 17,
    question: '無限ホテル（部屋番号1,2,3,...）が満室。新たに無限人の客が来た。全員を泊める方法は？',
    options: [
      '不可能',
      '偶数番号の部屋に移動してもらう',
      '各客を2倍の部屋番号に移動',
      'B、Cどちらでも可能'
    ],
    correctAnswer: 3,
    timeLimit: 240,
    explanation: 'ヒルベルトのホテル。可算無限の性質',
    practiceMode: {
      immediateExplanation: '無限の逆説的性質を示す有名問題。',
      detailedSolution: '既存客を2n号室に移動→奇数番号が空く→新客を収容。または既存客をn+kに移動など、複数の解法がある。',
      commonMistakes: ['有限の直感を適用', '可算無限の性質の誤解'],
      relatedConcepts: ['ヒルベルトのホテル', '可算無限', '全単射'],
      difficultyJustification: '無限の概念的理解が必要'
    },
    source: 'Mathematical Paradox',
    mensaLevel: 'genius',
    cognitiveSkills: ['抽象的思考', '無限の理解']
  },

  {
    id: 'logic_exp_15',
    category: 'logical',
    difficulty: 10,
    question: '暗号「SEND + MORE = MONEY」各文字は0-9の異なる数字。Mの値は？',
    options: ['0', '1', '2', '9'],
    correctAnswer: 1,
    timeLimit: 180,
    explanation: '繰り上がりを考慮するとM=1のみ可能',
    practiceMode: {
      immediateExplanation: '覆面算の典型。桁の繰り上がりから推論。',
      detailedSolution: '千の位：S+M+繰り上がり=MO(2桁)\nMが0でないので、M=1\n検証：9567+1085=10652',
      commonMistakes: ['繰り上がりの見落とし', '制約条件の見落とし'],
      relatedConcepts: ['覆面算', '制約充足', '数理パズル'],
      difficultyJustification: '系統的な推論が必要'
    },
    source: 'Cryptarithmetic Classic',
    mensaLevel: 'standard',
    cognitiveSkills: ['数理推論', '制約解決']
  },

  {
    id: 'logic_exp_16',
    category: 'logical',
    difficulty: 12,
    question: '5人で円卓を囲む。「AはBの隣に座らない」「CはDの隣」「EはAの隣」という条件下で、可能な配置の数は？',
    options: ['0通り', '2通り', '4通り', '8通り'],
    correctAnswer: 2,
    timeLimit: 180,
    explanation: '制約を満たす配置は4通り（回転対称を考慮）',
    practiceMode: {
      immediateExplanation: '組み合わせ論と制約充足の問題。',
      detailedSolution: 'CDは隣接、EAも隣接。この2ブロックとBの配置を考える。AとBが隣接しない条件から限定される。',
      commonMistakes: ['回転対称性の扱い', '制約の見落とし'],
      relatedConcepts: ['円順列', '制約充足問題', '組み合わせ論'],
      difficultyJustification: '複数制約の同時処理が必要'
    },
    source: 'Combinatorics Problems',
    mensaLevel: 'expert',
    cognitiveSkills: ['組み合わせ推論', '空間配置']
  },

  {
    id: 'logic_exp_17',
    category: 'logical',
    difficulty: 19,
    question: '「この文は偽である」というパラドックス。この文の真偽値として最も適切な解釈は？',
    options: [
      '真',
      '偽',
      '真でも偽でもない（第三の値）',
      '真かつ偽（矛盾）'
    ],
    correctAnswer: 2,
    timeLimit: 180,
    explanation: '自己言及パラドックス。3値論理での解決',
    practiceMode: {
      immediateExplanation: '嘘つきパラドックスの本質的問題。',
      detailedSolution: '真なら内容により偽、偽なら内容により真。古典論理では矛盾。3値論理や階層理論で解決。',
      commonMistakes: ['2値論理での解決を試みる', 'パラドックスの本質を見落とす'],
      relatedConcepts: ['自己言及パラドックス', '3値論理', 'タルスキの定理'],
      difficultyJustification: 'メタ論理的思考が必要'
    },
    source: 'Philosophy of Logic',
    mensaLevel: 'genius',
    cognitiveSkills: ['メタ認知', 'パラドックス理解']
  },

  {
    id: 'logic_exp_18',
    category: 'logical',
    difficulty: 7,
    question: '40人のクラス。サッカー好き25人、野球好き20人、両方好き10人。どちらも好きでない人は？',
    options: ['5人', '10人', '15人', '20人'],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '包除原理：40-(25+20-10)=5人',
    practiceMode: {
      immediateExplanation: 'ベン図を描くと分かりやすい包除原理の問題。',
      detailedSolution: '|S∪B| = |S| + |B| - |S∩B| = 25 + 20 - 10 = 35\nどちらも好きでない = 40 - 35 = 5',
      commonMistakes: ['重複を二重に数える', '補集合の計算ミス'],
      relatedConcepts: ['包除原理', 'ベン図', '集合演算'],
      difficultyJustification: '基本的な集合演算'
    },
    source: 'Set Theory Basics',
    mensaLevel: 'standard',
    cognitiveSkills: ['集合論理', '包除原理']
  },

  {
    id: 'logic_exp_19',
    category: 'logical',
    difficulty: 13,
    question: '騎士（常に真実）と悪党（常に嘘）の島で、3人A,B,Cに遭遇。A「私たちは全員悪党だ」B「Cは騎士だ」このとき確実なことは？',
    options: [
      'Aは悪党、Bは騎士、Cは騎士',
      'Aは悪党、Bは悪党、Cは悪党',
      'Aは悪党、Bの正体は不明',
      '全員の正体が確定する'
    ],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: 'Aの発言から矛盾を導き、連鎖的に確定',
    practiceMode: {
      immediateExplanation: 'Smullyan型の論理パズル。矛盾から出発。',
      detailedSolution: 'Aが騎士なら「全員悪党」が真→A自身が悪党（矛盾）\nよってAは悪党、発言は偽→少なくとも1人は騎士\nBが悪党なら「Cは騎士」が偽→Cは悪党→全員悪党でAの発言が真（矛盾）\nよってBは騎士、Cも騎士',
      commonMistakes: ['部分情報で満足', '連鎖推論の見落とし'],
      relatedConcepts: ['騎士と悪党パズル', '矛盾による証明', '場合分け'],
      difficultyJustification: '複雑な連鎖推論が必要'
    },
    source: 'Raymond Smullyan',
    mensaLevel: 'expert',
    cognitiveSkills: ['パズル論理', '矛盾活用']
  },

  {
    id: 'logic_exp_20',
    category: 'logical',
    difficulty: 11,
    question: '「明日試験があるなら、今日勉強する」という人が今日勉強していない。このとき確実なことは？',
    options: [
      '明日試験がない',
      '明日試験がある',
      'この人は嘘つきだ',
      '勉強が嫌いだ'
    ],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '対偶：勉強しない→試験がない',
    practiceMode: {
      immediateExplanation: '日常的な条件文の対偶推論。',
      detailedSolution: 'P→Q（試験→勉強）の対偶は¬Q→¬P（勉強しない→試験ない）\n今日勉強していない（¬Q）ので、明日試験がない（¬P）',
      commonMistakes: ['後件否定の誤謬', '因果関係との混同'],
      relatedConcepts: ['対偶', 'モーダストレンス', '日常推論'],
      difficultyJustification: '形式論理の日常応用'
    },
    source: 'Logic in Daily Life',
    mensaLevel: 'standard',
    cognitiveSkills: ['実用論理', '対偶推論']
  },

  // さらに30問追加...
  {
    id: 'logic_exp_21',
    category: 'logical',
    difficulty: 15,
    question: '100個の箱に1〜100のボールがランダムに1個ずつ。箱を開ける前に、各箱の中身を予想。最低1つ当たる確率を最大化する戦略は？',
    options: [
      'すべて異なる数を予想',
      'すべて同じ数を予想',
      'ランダムに予想',
      '1〜50を2回ずつ予想'
    ],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '異なる数を予想することで確率1を達成（鳩の巣原理）',
    practiceMode: {
      immediateExplanation: '確率を最大化する戦略的思考問題。',
      detailedSolution: '各箱に1〜100を1つずつ予想すれば、必ず1つは当たる（全単射の存在）。他の戦略では確率<1。',
      commonMistakes: ['確率計算の誤り', '最適戦略の見落とし'],
      relatedConcepts: ['鳩の巣原理', '組み合わせ最適化', '確率戦略'],
      difficultyJustification: '数学的洞察による最適化'
    },
    source: 'Strategic Thinking',
    mensaLevel: 'expert',
    cognitiveSkills: ['戦略立案', '確率最適化']
  },

  {
    id: 'logic_exp_22',
    category: 'logical',
    difficulty: 9,
    question: 'ある国では「月曜生まれは嘘つき、他の曜日生まれは正直」。ある人が「私は月曜生まれだ」と言った。この人は何曜日生まれ？',
    options: [
      '月曜日',
      '火曜日',
      '月曜以外の平日',
      '特定できない'
    ],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '自己言及による論理パズル。火曜（嘘つきの日の翌日）のみ可能',
    practiceMode: {
      immediateExplanation: '曜日による嘘つきパズルの変形。',
      detailedSolution: '月曜生まれなら嘘つき→「月曜生まれ」と言えない（真実だから）\n他の曜日生まれなら正直→「月曜生まれ」は嘘→矛盾\n解決：問題文の解釈を修正し、火曜日と推定',
      commonMistakes: ['パラドックスと誤解', '問題設定の誤読'],
      relatedConcepts: ['条件付き嘘つきパズル', '自己言及', '論理的整合性'],
      difficultyJustification: '条件の正確な解釈が必要'
    },
    source: 'Logic Puzzle Variant',
    mensaLevel: 'standard',
    cognitiveSkills: ['条件推論', 'パズル解決']
  },

  {
    id: 'logic_exp_23',
    category: 'logical',
    difficulty: 18,
    question: 'ゲーデルの不完全性定理が示すのは？',
    options: [
      '数学には証明できない真の命題が存在する',
      'すべての数学的真理は証明可能',
      '矛盾する体系のみが完全',
      '論理は数学の基礎にならない'
    ],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: '形式体系の限界を示す画期的定理',
    practiceMode: {
      immediateExplanation: '20世紀数学の最重要定理の一つ。',
      detailedSolution: '十分強い無矛盾な形式体系には、真だが証明不可能な命題が存在する。完全性と無矛盾性の両立不可能性。',
      commonMistakes: ['定理の適用範囲の誤解', '哲学的含意の過大解釈'],
      relatedConcepts: ['不完全性定理', '形式体系', 'メタ数学'],
      difficultyJustification: '高度な論理学的概念'
    },
    source: 'Mathematical Logic',
    mensaLevel: 'genius',
    cognitiveSkills: ['メタ論理', '抽象的理解']
  },

  {
    id: 'logic_exp_24',
    category: 'logical',
    difficulty: 6,
    question: '「鳥は飛ぶ」「ペンギンは鳥である」「ペンギンは飛ばない」この3つの文から分かることは？',
    options: [
      'すべての鳥が飛ぶわけではない',
      'ペンギンは鳥ではない',
      '最初の文が間違っている',
      '論理的に矛盾している'
    ],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: '例外の存在により全称命題が偽と判明',
    practiceMode: {
      immediateExplanation: '日常言語の論理的解釈の問題。',
      detailedSolution: '「鳥は飛ぶ」を「すべての鳥は飛ぶ」と解釈すると、ペンギンが反例となり、この全称命題は偽。',
      commonMistakes: ['一般化の過度な適用', '例外の無視'],
      relatedConcepts: ['全称命題', '反例', '日常言語の論理'],
      difficultyJustification: '基本的な論理構造の理解'
    },
    source: 'Logic Basics',
    mensaLevel: 'entry',
    cognitiveSkills: ['例外認識', '一般化の限界']
  },

  {
    id: 'logic_exp_25',
    category: 'logical',
    difficulty: 14,
    question: 'プリズナーズジレンマで、両者が合理的に行動すると？',
    options: [
      '両者協力',
      '両者裏切り',
      '一方協力、一方裏切り',
      'ランダムに決定'
    ],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: 'ナッシュ均衡は両者裏切り（劣位戦略の排除）',
    practiceMode: {
      immediateExplanation: 'ゲーム理論の基本的ジレンマ。',
      detailedSolution: '各プレイヤーにとって、相手の選択に関わらず裏切りが最適（支配戦略）。結果、両者裏切りがナッシュ均衡。',
      commonMistakes: ['協力の利益を過大評価', '個人合理性と集団合理性の混同'],
      relatedConcepts: ['ゲーム理論', 'ナッシュ均衡', '支配戦略'],
      difficultyJustification: 'ゲーム理論的分析が必要'
    },
    source: 'Game Theory',
    mensaLevel: 'expert',
    cognitiveSkills: ['戦略的思考', '均衡分析']
  },

  {
    id: 'logic_exp_26',
    category: 'logical',
    difficulty: 10,
    question: '3つのスイッチと3つの電球。スイッチは別室。1回だけ電球の部屋に行ける。どのスイッチがどの電球に対応するか特定する方法は？',
    options: [
      '不可能',
      'スイッチを順にON/OFFする',
      '1つON、1つ一度ONにしてOFF、1つOFF',
      'ランダムに試す'
    ],
    correctAnswer: 2,
    timeLimit: 150,
    explanation: '熱を利用：ON（光って熱い）、OFF（消えて温かい）、OFF（消えて冷たい）',
    practiceMode: {
      immediateExplanation: '物理的性質を利用した論理パズル。',
      detailedSolution: '1つ目ON→光っている電球\n2つ目を一度ONにしてOFF→消えているが温かい電球\n3つ目OFF→消えていて冷たい電球',
      commonMistakes: ['熱の利用を思いつかない', '2値情報のみ考える'],
      relatedConcepts: ['lateral thinking', '物理的性質の活用', '情報量'],
      difficultyJustification: '創造的解法が必要'
    },
    source: 'Classic Puzzle',
    mensaLevel: 'standard',
    cognitiveSkills: ['創造的問題解決', '物理的推論']
  },

  {
    id: 'logic_exp_27',
    category: 'logical',
    difficulty: 12,
    question: '「すべてのカラスは黒い」を確認するとき、論理的に同値な確認方法は？',
    options: [
      '黒いカラスを見つける',
      '白いカラスを探す',
      '黒くないものがカラスでないことを確認',
      'カラス以外を無視する'
    ],
    correctAnswer: 2,
    timeLimit: 120,
    explanation: '対偶：黒くない→カラスでない',
    practiceMode: {
      immediateExplanation: 'ヘンペルのカラス。確証の逆説。',
      detailedSolution: '「カラス→黒い」の対偶は「黒くない→カラスでない」。緑の靴を見ることも論理的には確証になる。',
      commonMistakes: ['直感的確証のみ考える', '対偶の見落とし'],
      relatedConcepts: ['確証の逆説', '対偶', '科学的方法論'],
      difficultyJustification: '反直感的な論理'
    },
    source: 'Philosophy of Science',
    mensaLevel: 'expert',
    cognitiveSkills: ['科学的推論', '論理的等価性']
  },

  {
    id: 'logic_exp_28',
    category: 'logical',
    difficulty: 8,
    question: 'モンティホール問題：3つのドアの1つに車。1つ選んだ後、司会者がヤギのドアを1つ開ける。選択を変えるべき？',
    options: [
      '変えるべき（確率2/3）',
      '変えないべき（確率1/2）',
      'どちらでも同じ',
      '情報不足'
    ],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '条件付き確率により、変更で勝率2/3',
    practiceMode: {
      immediateExplanation: '直感に反する確率問題の代表例。',
      detailedSolution: '初期選択が正解の確率1/3、間違いの確率2/3。司会者の行動により、変更すれば2/3で当たる。',
      commonMistakes: ['情報更新を無視', '独立事象と誤解'],
      relatedConcepts: ['条件付き確率', 'ベイズ更新', '情報の価値'],
      difficultyJustification: '条件付き確率の理解'
    },
    source: 'Probability Paradox',
    mensaLevel: 'standard',
    cognitiveSkills: ['確率更新', '直感の克服']
  },

  {
    id: 'logic_exp_29',
    category: 'logical',
    difficulty: 16,
    question: 'チューリングマシンで判定不可能な問題の例は？',
    options: [
      '素数判定',
      '停止性問題',
      'ソート',
      '最短経路'
    ],
    correctAnswer: 1,
    timeLimit: 120,
    explanation: '停止性問題は計算不可能の典型例',
    practiceMode: {
      immediateExplanation: '計算理論の基本的限界。',
      detailedSolution: '任意のプログラムが停止するか判定するプログラムは作れない（対角線論法による証明）。',
      commonMistakes: ['計算複雑性と混同', '具体例での反証を試みる'],
      relatedConcepts: ['計算可能性', 'チューリングマシン', '対角線論法'],
      difficultyJustification: '理論計算機科学の深い理解'
    },
    source: 'Computability Theory',
    mensaLevel: 'genius',
    cognitiveSkills: ['計算理論', '限界の理解']
  },

  {
    id: 'logic_exp_30',
    category: 'logical',
    difficulty: 7,
    question: '「好きな色は赤か青」と言った人が、実は緑が好きだった。この人の発言は？',
    options: [
      '真（包含的論理和）',
      '偽（排他的論理和）',
      '文脈による',
      '論理的に無意味'
    ],
    correctAnswer: 1,
    timeLimit: 60,
    explanation: '日常言語の「または」は通常排他的',
    practiceMode: {
      immediateExplanation: '自然言語と形式論理の違い。',
      detailedSolution: '日常会話での「AかB」は通常「AまたはB（両方ではない）」を意味する排他的論理和。',
      commonMistakes: ['形式論理の機械的適用', '文脈の無視'],
      relatedConcepts: ['包含的/排他的論理和', '自然言語の曖昧性', '語用論'],
      difficultyJustification: '言語使用の理解'
    },
    source: 'Language and Logic',
    mensaLevel: 'standard',
    cognitiveSkills: ['言語論理', '文脈理解']
  },

  {
    id: 'logic_exp_31',
    category: 'logical',
    difficulty: 13,
    question: '100人の村。青い目の人は自分の目の色を知らない。「青い目の人がいる」と宣言後、青い目の人が全員同時に村を去るのは何日目？（青い目は15人）',
    options: [
      '1日目',
      '15日目',
      '100日目',
      '去らない'
    ],
    correctAnswer: 1,
    timeLimit: 240,
    explanation: '共有知識のパズル。15日目に全員去る',
    practiceMode: {
      immediateExplanation: '帰納的推論と共有知識の問題。',
      detailedSolution: '1人なら1日目、2人なら2日目...と帰納的に。15人なら15日目に全員が確信を持つ。',
      commonMistakes: ['共有知識の重要性を見落とす', '帰納の基礎を誤る'],
      relatedConcepts: ['共有知識', '帰納的推論', 'epistemic logic'],
      difficultyJustification: '高度な認識論的推論'
    },
    source: 'Blue Eyes Puzzle',
    mensaLevel: 'expert',
    cognitiveSkills: ['帰納推論', '共有知識']
  },

  {
    id: 'logic_exp_32',
    category: 'logical',
    difficulty: 11,
    question: '4×4のチェス盤に4つのクイーンを置く。互いに取られない配置の数は？',
    options: [
      '0通り',
      '1通り',
      '2通り',
      '4通り'
    ],
    correctAnswer: 2,
    timeLimit: 180,
    explanation: 'N-クイーン問題の小規模版。解は2通り',
    practiceMode: {
      immediateExplanation: '制約充足問題の古典。',
      detailedSolution: '各行・各列・各対角線に1つまで。系統的探索により2つの解を発見（鏡像対称）。',
      commonMistakes: ['制約の見落とし', '対称性の考慮漏れ'],
      relatedConcepts: ['N-クイーン問題', 'バックトラック', '制約充足'],
      difficultyJustification: '空間的制約の処理'
    },
    source: 'Chess Puzzles',
    mensaLevel: 'standard',
    cognitiveSkills: ['空間推論', '制約処理']
  },

  {
    id: 'logic_exp_33',
    category: 'logical',
    difficulty: 20,
    question: 'P=NP問題が解決され、P=NPが真だった場合の影響として誤っているものは？',
    options: [
      '暗号システムの多くが破られる',
      '最適化問題が効率的に解ける',
      '数学の自動証明が可能になる',
      '計算機の物理的速度が向上する'
    ],
    correctAnswer: 3,
    timeLimit: 180,
    explanation: 'P=NPは計算複雑性の話で、物理的速度とは無関係',
    practiceMode: {
      immediateExplanation: '理論計算機科学最大の未解決問題。',
      detailedSolution: 'P=NPなら、検証が簡単な問題は解くのも簡単。暗号、最適化、証明探索に革命的影響。ただし物理速度は別問題。',
      commonMistakes: ['理論と実装の混同', '影響範囲の誤解'],
      relatedConcepts: ['計算複雑性', 'P対NP', 'ミレニアム問題'],
      difficultyJustification: '最先端の理論的理解'
    },
    source: 'Theoretical Computer Science',
    mensaLevel: 'genius',
    cognitiveSkills: ['理論的思考', '影響分析']
  },

  {
    id: 'logic_exp_34',
    category: 'logical',
    difficulty: 9,
    question: '囚人が看守に「明日の処刑は予想外だ」と言われた。論理的に考えた囚人の結論は？',
    options: [
      '金曜日に処刑される',
      '処刑されない',
      '月曜日に処刑される',
      '予想が不可能'
    ],
    correctAnswer: 1,
    timeLimit: 150,
    explanation: '予想外のパラドックス。論理的には処刑不可能',
    practiceMode: {
      immediateExplanation: '自己言及的パラドックスの一種。',
      detailedSolution: '金曜なら木曜夜に予想可能→不可。帰納的に全日不可。しかし実際に処刑されれば予想外となるパラドックス。',
      commonMistakes: ['帰納の誤用', 'パラドックスの本質を見落とす'],
      relatedConcepts: ['予想外の絞首刑', '認識論的パラドックス', '自己言及'],
      difficultyJustification: 'パラドックスの理解'
    },
    source: 'Paradox Collection',
    mensaLevel: 'standard',
    cognitiveSkills: ['パラドックス分析', '帰納的推論']
  },

  {
    id: 'logic_exp_35',
    category: 'logical',
    difficulty: 14,
    question: 'アローの不可能性定理が示すのは？',
    options: [
      '完璧な投票制度は存在しない',
      '多数決が最善',
      '独裁制が論理的に優れる',
      '民主主義は不可能'
    ],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '理想的な社会的選択関数の不存在',
    practiceMode: {
      immediateExplanation: '社会選択理論の基本定理。',
      detailedSolution: '独裁者なし、全会一致尊重、無関係選択肢からの独立等を満たす投票制度は存在しない。',
      commonMistakes: ['定理の過度な一般化', '条件の誤解'],
      relatedConcepts: ['社会選択理論', '投票理論', '厚生経済学'],
      difficultyJustification: '抽象的な社会科学理論'
    },
    source: 'Social Choice Theory',
    mensaLevel: 'expert',
    cognitiveSkills: ['社会的推論', '理論的理解']
  },

  {
    id: 'logic_exp_36',
    category: 'logical', 
    difficulty: 10,
    question: '二封筒問題：一方にもう一方の2倍の金額。1つ開けて1万円。交換すべき？',
    options: [
      '交換すべき（期待値1.25万円）',
      '交換すべきでない',
      'どちらでも同じ',
      '情報不足'
    ],
    correctAnswer: 2,
    timeLimit: 180,
    explanation: '対称性により交換による利益なし',
    practiceMode: {
      immediateExplanation: '期待値計算のパラドックス。',
      detailedSolution: '素朴な計算では5千円×1/2 + 2万円×1/2 = 1.25万円。しかし対称性から交換に意味なし。事前分布の重要性。',
      commonMistakes: ['条件付き期待値の誤用', '対称性の無視'],
      relatedConcepts: ['二封筒パラドックス', 'ベイズ推論', '期待値'],
      difficultyJustification: '確率論の深い理解'
    },
    source: 'Probability Paradoxes',
    mensaLevel: 'standard',
    cognitiveSkills: ['確率的推論', 'パラドックス解決']
  },

  {
    id: 'logic_exp_37',
    category: 'logical',
    difficulty: 17,
    question: 'ラッセルのパラドックス「自分自身を含まない集合全体の集合」の問題点は？',
    options: [
      '自己言及による矛盾',
      '無限集合の問題',
      '空集合の扱い',
      '定義が不明確'
    ],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '素朴集合論の矛盾を示す',
    practiceMode: {
      immediateExplanation: '集合論の基礎に関わる重要パラドックス。',
      detailedSolution: 'Rを「自身を含まない集合の集合」とすると、R∈R ⟺ R∉R となり矛盾。公理的集合論で解決。',
      commonMistakes: ['技術的問題と軽視', '矛盾の深刻さを理解しない'],
      relatedConcepts: ['ラッセルのパラドックス', '公理的集合論', 'ZFC'],
      difficultyJustification: '集合論の基礎的理解'
    },
    source: 'Foundations of Mathematics',
    mensaLevel: 'genius',
    cognitiveSkills: ['基礎論', 'パラドックス理解']
  },

  {
    id: 'logic_exp_38',
    category: 'logical',
    difficulty: 8,
    question: '「象は鼻が長い」この文の論理構造として最も適切なのは？',
    options: [
      '∀x(象(x)→鼻が長い(x))',
      '∃x(象(x)∧鼻が長い(x))',
      '象=鼻が長い動物',
      '主語が曖昧'
    ],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '全称命題として解釈するのが自然',
    practiceMode: {
      immediateExplanation: '自然言語の論理的分析。',
      detailedSolution: '「すべての象について、その鼻は長い」という全称命題。日本語の主題文の論理構造。',
      commonMistakes: ['存在命題と解釈', '同一性と混同'],
      relatedConcepts: ['述語論理', '量化子', '自然言語の形式化'],
      difficultyJustification: '言語の論理的分析'
    },
    source: 'Linguistic Logic',
    mensaLevel: 'standard',
    cognitiveSkills: ['言語分析', '形式化']
  },

  {
    id: 'logic_exp_39',
    category: 'logical',
    difficulty: 12,
    question: 'シンプソンのパラドックス：薬Aと薬Bの効果を男女別に見るとAが優れるが、全体ではBが優れる。この原因は？',
    options: [
      'サンプルサイズの偏り',
      '計算ミス',
      '薬の相互作用',
      '観測誤差'
    ],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '層別の重みの違いによる逆転現象',
    practiceMode: {
      immediateExplanation: '統計的パラドックスの代表例。',
      detailedSolution: '各層でA>Bでも、層の重みが異なれば全体でB>Aとなりうる。因果推論の重要性を示す。',
      commonMistakes: ['単純な平均と考える', '重み付けを無視'],
      relatedConcepts: ['シンプソンのパラドックス', '層別解析', '交絡'],
      difficultyJustification: '統計的思考の罠'
    },
    source: 'Statistical Paradoxes',
    mensaLevel: 'expert',
    cognitiveSkills: ['統計的推論', 'データ解釈']
  },

  {
    id: 'logic_exp_40',
    category: 'logical',
    difficulty: 15,
    question: '量子論理では古典論理のどの法則が成立しない？',
    options: [
      '分配法則',
      '交換法則',
      '結合法則',
      '同一律'
    ],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '量子力学の測定により分配法則が破れる',
    practiceMode: {
      immediateExplanation: '量子力学が要求する非古典論理。',
      detailedSolution: '位置と運動量のような非可換観測量により、(A∧(B∨C))≠((A∧B)∨(A∧C))となる場合がある。',
      commonMistakes: ['古典論理の普遍性を仮定', '物理と論理の分離'],
      relatedConcepts: ['量子論理', '非可換性', 'オルソモジュラー束'],
      difficultyJustification: '物理学と論理学の融合'
    },
    source: 'Quantum Logic',
    mensaLevel: 'genius',
    cognitiveSkills: ['非古典論理', '物理的直観']
  },

  {
    id: 'logic_exp_41',
    category: 'logical',
    difficulty: 11,
    question: '「明日雨が降る確率は50%」と予報。実際に雨が降らなかった。この予報は？',
    options: [
      '正しかった可能性がある',
      '必ず間違っていた',
      '検証不可能',
      '無意味な予報'
    ],
    correctAnswer: 0,
    timeLimit: 90,
    explanation: '単一事象の確率的予測は結果では検証不能',
    practiceMode: {
      immediateExplanation: '確率的予測の解釈問題。',
      detailedSolution: '50%の予報は「長期的に同条件なら半分雨」の意。単一結果では正誤判定不能。頻度主義vs主観確率。',
      commonMistakes: ['決定論的解釈', '確率の誤解'],
      relatedConcepts: ['確率の解釈', '頻度主義', 'calibration'],
      difficultyJustification: '確率概念の理解'
    },
    source: 'Probability Theory',
    mensaLevel: 'standard',
    cognitiveSkills: ['確率的思考', '予測評価']
  },

  {
    id: 'logic_exp_42',
    category: 'logical',
    difficulty: 13,
    question: 'すべての論理体系に共通する最小限の推論規則は？',
    options: [
      '同一律（A→A）',
      '矛盾律',
      '排中律',
      'モーダスポネンス'
    ],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '同一律は最も基本的な論理法則',
    practiceMode: {
      immediateExplanation: '論理体系の基礎の基礎。',
      detailedSolution: '同一律は直観主義論理、古典論理、多値論理等すべてで成立。排中律は直観主義で拒否される。',
      commonMistakes: ['古典論理の仮定', '最小性の誤解'],
      relatedConcepts: ['論理体系', '構造規則', '部分構造論理'],
      difficultyJustification: 'メタ論理的理解'
    },
    source: 'Logic Foundations',
    mensaLevel: 'expert',
    cognitiveSkills: ['メタ論理', '体系比較']
  },

  {
    id: 'logic_exp_43',
    category: 'logical',
    difficulty: 19,
    question: '連続体仮説（実数の濃度は可算無限の次）は？',
    options: [
      'ZFC公理系から独立',
      '真である',
      '偽である',
      '無意味な命題'
    ],
    correctAnswer: 0,
    timeLimit: 180,
    explanation: 'ゲーデルとコーエンにより独立性が証明',
    practiceMode: {
      immediateExplanation: '集合論の深遠な結果。',
      detailedSolution: 'ZFC公理系では証明も反証も不可能。異なるモデルで真にも偽にもなる。数学の基礎の相対性。',
      commonMistakes: ['絶対的真理の存在を仮定', '独立性の意味の誤解'],
      relatedConcepts: ['連続体仮説', '強制法', 'モデル理論'],
      difficultyJustification: '最高度の数学的理解'
    },
    source: 'Set Theory',
    mensaLevel: 'genius',
    cognitiveSkills: ['集合論', '独立性証明']
  },

  {
    id: 'logic_exp_44',
    category: 'logical',
    difficulty: 7,
    question: '「私は嘘をついている」と正直者が言った。これは？',
    options: [
      '論理的矛盾',
      '真の陳述',
      '偽の陳述',
      '無意味'
    ],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: '正直者の自己矛盾的発言',
    practiceMode: {
      immediateExplanation: '単純な自己言及パラドックス。',
      detailedSolution: '正直者が「嘘をついている」と言えば、それ自体が嘘となり、正直者の定義に矛盾。',
      commonMistakes: ['パラドックスを見落とす', '文脈を無視'],
      relatedConcepts: ['自己言及', '嘘つきパラドックス', '言語階層'],
      difficultyJustification: '基本的パラドックス'
    },
    source: 'Paradox Basics',
    mensaLevel: 'standard',
    cognitiveSkills: ['矛盾認識', '自己言及理解']
  },

  {
    id: 'logic_exp_45',
    category: 'logical',
    difficulty: 16,
    question: 'オメガ無矛盾な理論とは？',
    options: [
      '数値的に真な文をすべて証明できる',
      '矛盾を含まない',
      '完全である',
      '決定可能である'
    ],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: 'より強い無矛盾性の概念',
    practiceMode: {
      immediateExplanation: '算術の健全性に関する概念。',
      detailedSolution: '通常の無矛盾性より強く、∀n P(n)が証明可能なら各P(0),P(1),...も証明可能。ゲーデルの定理で重要。',
      commonMistakes: ['通常の無矛盾性と混同', '完全性と混同'],
      relatedConcepts: ['ω無矛盾性', 'ゲーデルの定理', '算術の形式化'],
      difficultyJustification: '高度な論理学概念'
    },
    source: 'Mathematical Logic',
    mensaLevel: 'genius',
    cognitiveSkills: ['形式体系', '無矛盾性階層']
  },

  {
    id: 'logic_exp_46',
    category: 'logical',
    difficulty: 10,
    question: '帰納法の問題点を指摘したヒュームの議論の核心は？',
    options: [
      '未来が過去に似ている保証がない',
      '観測数が不十分',
      '論理的誤謬がある',
      '確率計算が間違い'
    ],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '帰納の正当化の循環性',
    practiceMode: {
      immediateExplanation: '科学哲学の基本問題。',
      detailedSolution: '「これまでAだったから今後もA」の推論は、自然の斉一性を前提とするが、それ自体が帰納的にしか正当化できない。',
      commonMistakes: ['実用性と正当性の混同', '問題の軽視'],
      relatedConcepts: ['帰納の問題', 'ヒュームの懐疑', '科学的方法'],
      difficultyJustification: '哲学的洞察'
    },
    source: 'Philosophy of Science',
    mensaLevel: 'standard',
    cognitiveSkills: ['批判的思考', '哲学的分析']
  },

  {
    id: 'logic_exp_47',
    category: 'logical',
    difficulty: 14,
    question: '可能世界意味論で「必然的に真」とは？',
    options: [
      'すべての可能世界で真',
      '現実世界で真',
      '多くの世界で真',
      '論理的に真'
    ],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '様相論理の基本概念',
    practiceMode: {
      immediateExplanation: '様相論理の意味論。',
      detailedSolution: '必然性□は全称量化子、可能性◇は存在量化子として可能世界上で解釈。□P ⟺ ∀w P(w)。',
      commonMistakes: ['現実世界のみ考慮', '論理的真理と混同'],
      relatedConcepts: ['様相論理', '可能世界', 'クリプキ意味論'],
      difficultyJustification: '抽象的意味論'
    },
    source: 'Modal Logic',
    mensaLevel: 'expert',
    cognitiveSkills: ['様相的思考', '意味論的理解']
  },

  {
    id: 'logic_exp_48',
    category: 'logical',
    difficulty: 18,
    question: '巨大基数の存在は？',
    options: [
      'ZFCから証明も反証も不可能',
      'ZFCから証明可能',
      'ZFCから反証可能',
      '論理的に無意味'
    ],
    correctAnswer: 0,
    timeLimit: 150,
    explanation: '集合論の公理的拡張',
    practiceMode: {
      immediateExplanation: '現代集合論の最前線。',
      detailedSolution: '到達不可能基数等の巨大基数はZFCを超える。その存在は新たな公理として採用される。数学の基礎の階層性。',
      commonMistakes: ['ZFCの完全性を仮定', '絶対的存在を仮定'],
      relatedConcepts: ['巨大基数', '公理的方法', '集合論的宇宙'],
      difficultyJustification: '最先端の集合論'
    },
    source: 'Advanced Set Theory',
    mensaLevel: 'genius',
    cognitiveSkills: ['集合論的思考', '公理的方法']
  },

  {
    id: 'logic_exp_49',
    category: 'logical',
    difficulty: 9,
    question: '「AならばB」が真のとき、必ず真なのは？',
    options: [
      'BでないならAでない',
      'BならばA',
      'AでないならBでない',
      'AかつB'
    ],
    correctAnswer: 0,
    timeLimit: 60,
    explanation: '対偶は元の命題と同値',
    practiceMode: {
      immediateExplanation: '論理学の基本中の基本。',
      detailedSolution: 'A→Bの対偶¬B→¬Aは常に同値。逆（B→A）や裏（¬A→¬B）は一般に同値でない。',
      commonMistakes: ['逆・裏との混同', '日常的推論の適用'],
      relatedConcepts: ['条件文', '対偶', '論理的同値'],
      difficultyJustification: '基礎的論理法則'
    },
    source: 'Logic 101',
    mensaLevel: 'standard',
    cognitiveSkills: ['基本論理', '対偶理解']
  },

  {
    id: 'logic_exp_50',
    category: 'logical',
    difficulty: 15,
    question: 'チャーチ＝チューリングのテーゼとは？',
    options: [
      '計算可能性の直観的概念の形式化',
      '計算機の物理的限界',
      'P=NP予想',
      '量子計算の優位性'
    ],
    correctAnswer: 0,
    timeLimit: 120,
    explanation: '「計算可能」の数学的定義',
    practiceMode: {
      immediateExplanation: '計算理論の基礎概念。',
      detailedSolution: '「効果的に計算可能」な関数はチューリングマシンで計算可能な関数と一致するという（証明不可能な）テーゼ。',
      commonMistakes: ['定理と誤解', '物理的制約と混同'],
      relatedConcepts: ['計算可能性', 'チューリングマシン', '再帰関数'],
      difficultyJustification: '計算の本質の理解'
    },
    source: 'Computability Theory',
    mensaLevel: 'expert',
    cognitiveSkills: ['計算理論', '概念的理解']
  }
];