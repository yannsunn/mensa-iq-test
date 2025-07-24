// 改善された質問データの遅延読み込みシステム（型安全性強化版）
import { UnifiedQuestion, RawQuestionData, QuestionCategory } from '@/types/question';

// 高性能キャッシュ管理システム
const questionCache = new Map<string, UnifiedQuestion[]>();
const loadingPromises = new Map<string, Promise<UnifiedQuestion[]>>();
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1時間（延長）
const cacheTimestamps = new Map<string, number>();
const accessCounts = new Map<string, number>();
const MAX_CACHE_SIZE = 10; // 最大キャッシュ項目数

// メモリ使用量監視用
let totalCachedQuestions = 0;
const MAX_TOTAL_QUESTIONS = 1000; // メモリ保護用の上限

// カテゴリ別の動的インポート（完全な型安全性）
async function loadCategoryData(category: QuestionCategory): Promise<UnifiedQuestion[]> {
  try {
    switch (category) {
      case 'logical': {
        const [{ expandedLogicalQuestions }, { logicalReasoningQuestions }] = await Promise.all([
          import('@/data/expandedLogicalQuestions'),
          import('@/data/internationalMensaQuestions')
        ]);
        return normalizeQuestions([...expandedLogicalQuestions, ...logicalReasoningQuestions], category);
      }
      
      case 'numerical': {
        const [{ expandedNumericalQuestions }, { numericalReasoningQuestions }] = await Promise.all([
          import('@/data/expandedNumericalQuestions'),
          import('@/data/internationalMensaQuestions')
        ]);
        return normalizeQuestions([...expandedNumericalQuestions, ...numericalReasoningQuestions], category);
      }
      
      case 'spatial': {
        const [{ expandedSpatialQuestions }, { spatialReasoningQuestions }] = await Promise.all([
          import('@/data/expandedSpatialQuestions'),
          import('@/data/internationalMensaQuestions')
        ]);
        return normalizeQuestions([...expandedSpatialQuestions, ...spatialReasoningQuestions], category);
      }
      
      case 'matrix': {
        const { expandedMatrixQuestions } = await import('@/data/expandedMatrixQuestions');
        return normalizeQuestions(expandedMatrixQuestions, category);
      }
      
      case 'visual': {
        const { visualQuestions } = await import('@/data/visualQuestions');
        return normalizeQuestions(visualQuestions, category);
      }
      
      case 'verbal': {
        const { verbalReasoningQuestions } = await import('@/data/internationalMensaQuestions');
        return normalizeQuestions(verbalReasoningQuestions, category);
      }
      
      case 'abstract': {
        const { abstractReasoningQuestions } = await import('@/data/internationalMensaQuestions');
        return normalizeQuestions(abstractReasoningQuestions, category);
      }
      
      default:
        return [];
    }
  } catch (error) {
    console.error(`Failed to load category data for ${category}:`, error);
    return [];
  }
}

// 質問データの正規化処理（完全な型安全性を保証）
function normalizeQuestions(questions: RawQuestionData[], category: QuestionCategory): UnifiedQuestion[] {
  return questions.map((q, index) => {
    // 必須フィールドのバリデーション
    const id = q.id || `${category}-${index}`;
    const question = q.question || '';
    const options = q.options || [];
    const correctAnswer = q.correctAnswer ?? 0;
    const difficulty = q.difficulty ?? 10;
    const timeLimit = q.timeLimit ?? 60;
    const explanation = q.explanation || q.practiceMode?.immediateExplanation || '';
    
    // 型安全な変換
    const unifiedQuestion: UnifiedQuestion = {
      id,
      category,
      difficulty,
      question,
      options,
      correctAnswer,
      timeLimit,
      explanation,
      practiceDetails: q.practiceMode,
      mensaInfo: {
        source: q.source || 'MENSA International',
        mensaLevel: (q.mensaLevel as any) || 'standard',
        cognitiveSkills: q.cognitiveSkills || []
      }
    };
    
    // ビジュアルデータの型安全な処理
    if (q.visualData || q.visualType || q.cubeType) {
      unifiedQuestion.visualData = {
        type: (q.visualData as any)?.type || (q.cubeType ? 'cube' : 'pattern'),
        data: (q.visualData as any)?.data || q.visualData,
        visualType: q.visualType as any || q.cubeType as any,
        cubeData: q.cubeData as any || (q.netLabels ? { netLabels: q.netLabels } : undefined)
      };
    }
    
    return unifiedQuestion;
  });
}

// カテゴリ別の質問を取得（キャッシュ付き・型安全）
export async function loadQuestionsByCategory(category: QuestionCategory): Promise<UnifiedQuestion[]> {
  // 高効率キャッシュ取得（アクセスカウント付き）
  if (questionCache.has(category)) {
    const timestamp = cacheTimestamps.get(category);
    if (timestamp && Date.now() - timestamp < CACHE_EXPIRATION) {
      // アクセス回数を増加
      accessCounts.set(category, (accessCounts.get(category) || 0) + 1);
      return questionCache.get(category)!;
    } else {
      // キャッシュが期限切れの場合はクリア
      const questions = questionCache.get(category);
      if (questions) {
        totalCachedQuestions -= questions.length;
      }
      questionCache.delete(category);
      cacheTimestamps.delete(category);
      accessCounts.delete(category);
    }
  }

  // 既に読み込み中の場合は、その Promise を返す
  if (loadingPromises.has(category)) {
    return loadingPromises.get(category)!;
  }

  // 新規読み込み（改善版）
  const loadPromise = loadCategoryData(category).then(questions => {
    // メモリ使用量チェック
    evictLeastUsedCache();
    
    // キャッシュに保存（最適化）
    questionCache.set(category, questions);
    cacheTimestamps.set(category, Date.now());
    accessCounts.set(category, 1);
    totalCachedQuestions += questions.length;
    loadingPromises.delete(category);
    
    console.log(`Loaded ${questions.length} questions for category: ${category}`);
    return questions;
  }).catch(error => {
    console.error(`Failed to load questions for category ${category}:`, error);
    loadingPromises.delete(category);
    return [];
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
    const questions = await loadQuestionsByCategory(category as QuestionCategory);
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
    categories.map(category => loadQuestionsByCategory(category as QuestionCategory))
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

// LRUベースのキャッシュ削除（メモリ効率化）
function evictLeastUsedCache(): void {
  if (totalCachedQuestions > MAX_TOTAL_QUESTIONS || questionCache.size >= MAX_CACHE_SIZE) {
    // アクセス頻度の低いカテゴリを特定
    const entries = Array.from(accessCounts.entries());
    entries.sort((a, b) => a[1] - b[1]); // 昇順ソート（アクセス頻度の低い順）
    
    const toEvict = entries.slice(0, Math.ceil(entries.length * 0.3)); // 30%を削除
    
    toEvict.forEach(([category]) => {
      const questions = questionCache.get(category);
      if (questions) {
        totalCachedQuestions -= questions.length;
      }
      questionCache.delete(category);
      cacheTimestamps.delete(category);
      accessCounts.delete(category);
    });
    
    console.log(`Evicted ${toEvict.length} cache entries, remaining: ${questionCache.size}`);
  }
}

// 手動キャッシュクリア（改善版）
export function clearQuestionCache(category?: string) {
  if (category) {
    const questions = questionCache.get(category);
    if (questions) {
      totalCachedQuestions -= questions.length;
    }
    questionCache.delete(category);
    cacheTimestamps.delete(category);
    accessCounts.delete(category);
  } else {
    questionCache.clear();
    cacheTimestamps.clear();
    accessCounts.clear();
    totalCachedQuestions = 0;
  }
}

// 詳細なキャッシュ統計（メモリ使用量含む）
export function getCacheStats(): {
  categories: number;
  totalQuestions: number;
  memoryUsage: number;
  oldestCache?: string;
  mostAccessedCategory?: string;
  hitRate?: number;
} {
  const oldestTimestamp = Math.min(...Array.from(cacheTimestamps.values()));
  const mostAccessed = Array.from(accessCounts.entries())
    .sort((a, b) => b[1] - a[1])[0];
  
  // 推定メモリ使用量（KB）
  const estimatedMemoryKB = Math.round(totalCachedQuestions * 0.5); // 1問あたり約0.5KB
  
  return {
    categories: questionCache.size,
    totalQuestions: totalCachedQuestions,
    memoryUsage: estimatedMemoryKB,
    oldestCache: oldestTimestamp !== Infinity ? new Date(oldestTimestamp).toISOString() : undefined,
    mostAccessedCategory: mostAccessed?.[0],
    hitRate: questionCache.size > 0 ? 
      Array.from(accessCounts.values()).reduce((sum, count) => sum + count, 0) / questionCache.size :
      0
  };
}

// プリロード機能（事前読み込み・型安全）
export async function preloadCategories(categories: QuestionCategory[]): Promise<void> {
  await Promise.all(categories.map(category => loadQuestionsByCategory(category)));
}

// 型安全なカテゴリバリデーション
export function isValidCategory(category: string): category is QuestionCategory {
  const validCategories: QuestionCategory[] = [
    'logical', 'numerical', 'spatial', 'pattern', 'verbal', 'abstract', 'memory', 'matrix'
  ];
  return validCategories.includes(category as QuestionCategory);
}

// 型安全なキャッシュクリア
export function clearQuestionCacheTyped(category?: QuestionCategory) {
  clearQuestionCache(category);
}