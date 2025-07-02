export interface Question {
  id: string;
  category: 'logical' | 'numerical' | 'spatial' | 'matrix' | 'verbal' | 'abstract' | 'memory';
  difficulty: number; // 1-20
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number; // seconds
  explanation?: string;
}

export interface TestSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  questions: Question[];
  answers: (number | null)[];
  currentQuestionIndex: number;
  isCompleted: boolean;
}

export interface TestResult {
  sessionId: string;
  totalScore: number;
  iqScore: number;
  percentile: number;
  categoryScores: {
    [key in Question['category']]: {
      score: number;
      total: number;
      percentage: number;
    };
  };
  timeSpent: number;
  completedAt: Date;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: number | null;
  timeSpent: number;
  isCorrect: boolean;
}