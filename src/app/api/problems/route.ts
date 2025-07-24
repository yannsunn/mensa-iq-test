import { NextRequest, NextResponse } from 'next/server';
import { CONSOLIDATED_MENSA_QUESTIONS, getProblemsByCategory, getProblemsByDifficulty } from '@/data/consolidatedQuestions';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Query parameters
    const category = searchParams.get('category');
    const minDifficulty = searchParams.get('minDifficulty');
    const maxDifficulty = searchParams.get('maxDifficulty');
    const subtype = searchParams.get('subtype');
    const limit = searchParams.get('limit');
    const random = searchParams.get('random');
    const search = searchParams.get('search');

    let problems = CONSOLIDATED_MENSA_QUESTIONS;

    // Filter by category
    if (category && category !== 'all') {
      problems = getProblemsByCategory(category);
    }

    // Filter by difficulty range
    if (minDifficulty || maxDifficulty) {
      const min = minDifficulty ? parseInt(minDifficulty) : 1;
      const max = maxDifficulty ? parseInt(maxDifficulty) : 20;
      problems = getProblemsByDifficulty(min, max);
    }

    // Filter by subtype
    if (subtype && subtype !== 'all') {
      problems = problems.filter(p => p.subtype === subtype);
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      problems = problems.filter(p => 
        p.question.toLowerCase().includes(searchLower) ||
        p.title.toLowerCase().includes(searchLower) ||
        p.explanation.toLowerCase().includes(searchLower)
      );
    }

    // Randomize if requested
    if (random === 'true') {
      problems = problems.sort(() => 0.5 - Math.random());
    }

    // Limit results
    if (limit) {
      const limitNum = parseInt(limit);
      problems = problems.slice(0, limitNum);
    }

    // Return response with metadata
    return NextResponse.json({
      problems,
      metadata: {
        total: problems.length,
        filters: {
          category,
          minDifficulty: minDifficulty ? parseInt(minDifficulty) : null,
          maxDifficulty: maxDifficulty ? parseInt(maxDifficulty) : null,
          subtype,
          search,
          limit: limit ? parseInt(limit) : null,
          random: random === 'true'
        }
      }
    });

  } catch (error) {
    console.error('Problems API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch problems' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'analytics':
        return handleAnalytics();
      
      case 'progress':
        return handleProgress(data);
      
      case 'generateTest':
        return handleGenerateTest(data);
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Problems API POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

async function handleAnalytics() {
  // Calculate comprehensive analytics
  const stats = {
    totalProblems: CONSOLIDATED_MENSA_QUESTIONS.length,
    
    byCategory: CONSOLIDATED_MENSA_QUESTIONS.reduce((acc, q) => {
      acc[q.category] = (acc[q.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    
    byDifficulty: CONSOLIDATED_MENSA_QUESTIONS.reduce((acc, q) => {
      const level = q.difficulty <= 7 ? 'easy' : 
                   q.difficulty <= 14 ? 'medium' : 
                   q.difficulty <= 18 ? 'hard' : 'expert';
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    
    bySubtype: CONSOLIDATED_MENSA_QUESTIONS.reduce((acc, q) => {
      acc[q.subtype] = (acc[q.subtype] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    
    averageDifficulty: CONSOLIDATED_MENSA_QUESTIONS.reduce((sum, q) => 
      sum + q.difficulty, 0) / CONSOLIDATED_MENSA_QUESTIONS.length,
    
    difficultyDistribution: CONSOLIDATED_MENSA_QUESTIONS.reduce((acc, q) => {
      acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<number, number>),
    
    timeEstimates: {
      total: CONSOLIDATED_MENSA_QUESTIONS.reduce((sum, q) => sum + q.timeLimit, 0),
      average: CONSOLIDATED_MENSA_QUESTIONS.reduce((sum, q) => sum + q.timeLimit, 0) / CONSOLIDATED_MENSA_QUESTIONS.length,
      byCategory: CONSOLIDATED_MENSA_QUESTIONS.reduce((acc, q) => {
        if (!acc[q.category]) acc[q.category] = { total: 0, count: 0 };
        acc[q.category].total += q.timeLimit;
        acc[q.category].count += 1;
        return acc;
      }, {} as Record<string, { total: number, count: number }>)
    }
  };

  return NextResponse.json({
    analytics: stats,
    generatedAt: new Date().toISOString()
  });
}

async function handleProgress(data: { userId: string; problemId?: string; answer?: number; correct?: boolean; timeSpent?: number }) {
  // Mock user progress tracking (in real app, would use database)
  const { userId } = data;
  
  // Here you would save to database
  // For now, return mock progress data
  const progress = {
    userId,
    totalAttempted: 15,
    totalCorrect: 12,
    accuracy: 80,
    averageTime: 75,
    categoryProgress: {
      logical: { attempted: 5, correct: 4, accuracy: 80 },
      numerical: { attempted: 4, correct: 3, accuracy: 75 },
      spatial: { attempted: 3, correct: 3, accuracy: 100 },
      matrix: { attempted: 2, correct: 1, accuracy: 50 },
      pattern: { attempted: 1, correct: 1, accuracy: 100 }
    },
    difficultyProgress: {
      easy: { attempted: 8, correct: 7, accuracy: 87.5 },
      medium: { attempted: 5, correct: 4, accuracy: 80 },
      hard: { attempted: 2, correct: 1, accuracy: 50 },
      expert: { attempted: 0, correct: 0, accuracy: 0 }
    },
    strengths: ['spatial', 'pattern'],
    weaknesses: ['matrix'],
    recommendations: [
      'Focus more on matrix reasoning problems',
      'Practice harder difficulty levels',
      'Review logical deduction techniques'
    ]
  };

  return NextResponse.json({
    progress,
    updatedAt: new Date().toISOString()
  });
}

async function handleGenerateTest(data: { 
  count?: number; 
  categories?: string[]; 
  difficultRange?: { min: number; max: number }; 
  randomize?: boolean 
}) {
  const { 
    count = 20, 
    categories, 
    difficultRange, 
    randomize = true 
  } = data;

  let problems = CONSOLIDATED_MENSA_QUESTIONS;

  // Filter by categories if specified
  if (categories && categories.length > 0) {
    problems = problems.filter(p => categories.includes(p.category));
  }

  // Filter by difficulty range if specified
  if (difficultRange) {
    const { min = 1, max = 20 } = difficultRange;
    problems = problems.filter(p => p.difficulty >= min && p.difficulty <= max);
  }

  // Randomize if requested
  if (randomize) {
    problems = problems.sort(() => 0.5 - Math.random());
  }

  // Select specified count
  const testProblems = problems.slice(0, count);

  // Calculate test metadata
  const testMetadata = {
    id: `test_${Date.now()}`,
    problemCount: testProblems.length,
    estimatedTime: testProblems.reduce((sum, p) => sum + p.timeLimit, 0),
    difficultyRange: {
      min: Math.min(...testProblems.map(p => p.difficulty)),
      max: Math.max(...testProblems.map(p => p.difficulty)),
      average: testProblems.reduce((sum, p) => sum + p.difficulty, 0) / testProblems.length
    },
    categoryDistribution: testProblems.reduce((acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    generatedAt: new Date().toISOString()
  };

  return NextResponse.json({
    test: {
      problems: testProblems,
      metadata: testMetadata
    }
  });
}