// 改善された質問データの遅延読み込みシステム
import { UnifiedQuestion } from '@/types/question';

// キャッシュ管理
const questionCache = new Map<string, UnifiedQuestion[]>();
const loadingPromises = new Map<string, Promise<UnifiedQuestion[]>>();

// カテゴリ別の動的インポート
async function loadCategoryData(category: string): Promise<UnifiedQuestion[]> {
  switch (category) {
    case 'logical':
      const [{ expandedLogicalQuestions }, { logicalReasoningQuestions }] = await Promise.all([
        import('@/data/expandedLogicalQuestions'),
        import('@/data/internationalMensaQuestions')
      ]);
      return [...expandedLogicalQuestions, ...logicalReasoningQuestions];
    
    case 'numerical':
      const [{ expandedNumericalQuestions }, { numericalReasoningQuestions }] = await Promise.all([
        import('@/data/expandedNumericalQuestions'),
        import('@/data/internationalMensaQuestions')
      ]);
      return [...expandedNumericalQuestions, ...numericalReasoningQuestions];
    
    case 'spatial':
      const [{ expandedSpatialQuestions }, { spatialReasoningQuestions }] = await Promise.all([
        import('@/data/expandedSpatialQuestions'),
        import('@/data/internationalMensaQuestions')
      ]);
      return [...expandedSpatialQuestions, ...spatialReasoningQuestions];
    
    case 'matrix':
      const { expandedMatrixQuestions } = await import('@/data/expandedMatrixQuestions');
      return expandedMatrixQuestions;
    
    case 'visual':
      const { visualQuestions } = await import('@/data/visualQuestions');
      return visualQuestions;
    
    case 'verbal':
      const { verbalReasoningQuestions } = await import('@/data/internationalMensaQuestions');
      return verbalReasoningQuestions;
    
    case 'abstract':
      const { abstractReasoningQuestions } = await import('@/data/internationalMensaQuestions');
      return abstractReasoningQuestions;
    
    default:
      return [];
  }
}

// カテゴリ別の質問を取得（キャッシュ付き）
export async function loadQuestionsByCategory(category: string): Promise<UnifiedQuestion[]> {
  // キャッシュから取得
  if (questionCache.has(category)) {
    return questionCache.get(category)!;
  }

  // 既に読み込み中の場合は、その Promise を返す
  if (loadingPromises.has(category)) {
    return loadingPromises.get(category)!;
  }

  // 新規読み込み
  const loadPromise = loadCategoryData(category).then(questions => {
    // 統一フォーマットに変換
    const unifiedQuestions = questions.map(q => ({
      ...q,
      category: q.category || category,
      explanation: q.explanation || q.practiceMode?.immediateExplanation || '',
      practiceDetails: q.practiceMode,
      mensaInfo: {
        source: q.source || 'MENSA International',
        mensaLevel: q.mensaLevel || 'standard',
        cognitiveSkills: q.cognitiveSkills || []
      },
      visualData: q.visualData || q.visualType ? {
        type: q.visualData?.type || 'pattern',
        data: q.visualData?.data,
        visualType: q.visualType,
        cubeData: q.cubeData
      } : undefined
    } as UnifiedQuestion));

    // キャッシュに保存
    questionCache.set(category, unifiedQuestions);
    loadingPromises.delete(category);
    
    return unifiedQuestions;
  });

  loadingPromises.set(category, loadPromise);
  return loadPromise;
}

// 練習問題セットの遅延読み込み
export async function loadPracticeQuestions(
  difficulty: 'easy' | 'medium' | 'hard',
  count: number = 10
): Promise<UnifiedQuestion[]> {
  const difficultyRanges = {
    easy: { min: 1, max: 7 },
    medium: { min: 8, max: 14 },
    hard: { min: 15, max: 20 }
  };

  const range = difficultyRanges[difficulty];
  const categories = ['logical', 'numerical', 'spatial', 'matrix', 'visual'];
  
  // 必要なカテゴリのみを読み込み
  const questionsPerCategory = Math.ceil(count / categories.length);
  const categoryPromises = categories.map(async (category) => {
    const questions = await loadQuestionsByCategory(category);
    return questions
      .filter(q => q.difficulty >= range.min && q.difficulty <= range.max)
      .sort(() => Math.random() - 0.5)
      .slice(0, questionsPerCategory);
  });

  const allQuestions = await Promise.all(categoryPromises);
  return allQuestions.flat().slice(0, count);
}

// 試験問題セットの遅延読み込み
export async function loadExamQuestions(count: number = 45): Promise<UnifiedQuestion[]> {
  // MENSA標準の難易度分布
  const distribution = {
    easy: Math.floor(count * 0.2),    // 20%
    medium: Math.floor(count * 0.5),  // 50%
    hard: Math.floor(count * 0.3)     // 30%
  };

  // 必要なカテゴリを並列で読み込み
  const categories = ['logical', 'numerical', 'spatial', 'matrix', 'abstract'];
  const categoryQuestions = await Promise.all(
    categories.map(category => loadQuestionsByCategory(category))
  );

  const allQuestions = categoryQuestions.flat();
  
  // 難易度別に分類
  const easyQuestions = allQuestions
    .filter(q => q.difficulty >= 1 && q.difficulty <= 7)
    .sort(() => Math.random() - 0.5)
    .slice(0, distribution.easy);
    
  const mediumQuestions = allQuestions
    .filter(q => q.difficulty >= 8 && q.difficulty <= 14)
    .sort(() => Math.random() - 0.5)
    .slice(0, distribution.medium);
    
  const hardQuestions = allQuestions
    .filter(q => q.difficulty >= 15 && q.difficulty <= 20)
    .sort(() => Math.random() - 0.5)
    .slice(0, distribution.hard);

  // 難易度順に並べる
  return [...easyQuestions, ...mediumQuestions, ...hardQuestions];
}

// キャッシュをクリア（メモリ管理用）
export function clearQuestionCache(category?: string) {
  if (category) {
    questionCache.delete(category);
  } else {
    questionCache.clear();
  }
}

// プリロード機能（事前読み込み）
export async function preloadCategories(categories: string[]): Promise<void> {
  await Promise.all(categories.map(category => loadQuestionsByCategory(category)));
}