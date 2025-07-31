// 事前生成された画像のマッピング（API使用料削減のため）

interface PreGeneratedImage {
  questionId: string;
  imageUrl: string;
  description: string;
  category: string;
}

// 頻出問題の事前生成画像マッピング
export const preGeneratedImages: Record<string, PreGeneratedImage> = {
  // 立方体問題
  'spatial_exp_1': {
    questionId: 'spatial_exp_1',
    imageUrl: '/images/cube-basic.svg',
    description: '基本的な立方体の図',
    category: 'spatial'
  },
  'spatial_exp_2': {
    questionId: 'spatial_exp_2',
    imageUrl: '/images/cube-net-cross.svg',
    description: '十字型立方体展開図',
    category: 'spatial'
  },
  'spatial_exp_3': {
    questionId: 'spatial_exp_3',
    imageUrl: '/images/cube-rotation-120.svg',
    description: '立方体の120度回転',
    category: 'spatial'
  },
  
  // 行列問題
  'matrix_001': {
    questionId: 'matrix_001',
    imageUrl: '/images/matrix-3x3-rotation.svg',
    description: '3×3行列の回転パターン',
    category: 'matrix'
  },
  'matrix_exp_1': {
    questionId: 'matrix_exp_1',
    imageUrl: '/images/matrix-3x3-basic.svg',
    description: '3×3行列の基本パターン',
    category: 'matrix'
  },
  
  // パターン問題
  'pattern_001': {
    questionId: 'pattern_001',
    imageUrl: '/images/pattern-sequence-shapes.svg',
    description: '図形の連続パターン',
    category: 'pattern'
  },
  
  // その他の頻出パターン
  'numerical_exp_1': {
    questionId: 'numerical_exp_1',
    imageUrl: '/images/number-sequence-boxes.svg',
    description: '数列のボックス表示',
    category: 'numerical'
  }
};

// 画像URLを取得する関数
export const getPreGeneratedImage = (questionId: string): PreGeneratedImage | null => {
  return preGeneratedImages[questionId] || null;
};

// カテゴリー別のデフォルト画像
export const defaultCategoryImages: Record<string, string> = {
  spatial: '/images/default-spatial.svg',
  matrix: '/images/default-matrix.svg',
  pattern: '/images/default-pattern.svg',
  numerical: '/images/default-numerical.svg',
  logical: '/images/default-logical.svg'
};

// フォールバック画像の取得
export const getFallbackImage = (category: string): string => {
  return defaultCategoryImages[category] || '/images/default-iq-test.svg';
};