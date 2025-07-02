import { create } from 'zustand';
import { Question, TestSession, TestResult, UserAnswer } from '@/types';
import { sampleQuestions } from '@/data/questions';

interface TestStore {
  currentSession: TestSession | null;
  testResult: TestResult | null;
  isTestActive: boolean;
  timeElapsed: number;
  
  // Actions
  startTest: () => void;
  answerQuestion: (answer: number, timeSpent: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  submitTest: () => void;
  resetTest: () => void;
  calculateResults: () => TestResult;
}

export const useTestStore = create<TestStore>((set, get) => ({
  currentSession: null,
  testResult: null,
  isTestActive: false,
  timeElapsed: 0,

  startTest: () => {
    const sessionId = `session_${Date.now()}`;
    const shuffledQuestions = [...sampleQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 35); // MENSA standard: 35 questions

    const newSession: TestSession = {
      id: sessionId,
      startTime: new Date(),
      questions: shuffledQuestions,
      answers: new Array(shuffledQuestions.length).fill(null),
      currentQuestionIndex: 0,
      isCompleted: false,
    };

    set({
      currentSession: newSession,
      isTestActive: true,
      testResult: null,
      timeElapsed: 0,
    });
  },

  answerQuestion: (answer: number, timeSpent: number) => {
    const { currentSession } = get();
    if (!currentSession) return;

    const updatedAnswers = [...currentSession.answers];
    updatedAnswers[currentSession.currentQuestionIndex] = answer;

    set({
      currentSession: {
        ...currentSession,
        answers: updatedAnswers,
      },
      timeElapsed: get().timeElapsed + timeSpent,
    });
  },

  nextQuestion: () => {
    const { currentSession } = get();
    if (!currentSession) return;

    const nextIndex = currentSession.currentQuestionIndex + 1;
    if (nextIndex >= currentSession.questions.length) {
      get().submitTest();
      return;
    }

    set({
      currentSession: {
        ...currentSession,
        currentQuestionIndex: nextIndex,
      },
    });
  },

  previousQuestion: () => {
    const { currentSession } = get();
    if (!currentSession || currentSession.currentQuestionIndex === 0) return;

    set({
      currentSession: {
        ...currentSession,
        currentQuestionIndex: currentSession.currentQuestionIndex - 1,
      },
    });
  },

  submitTest: () => {
    const { currentSession } = get();
    if (!currentSession) return;

    const completedSession = {
      ...currentSession,
      endTime: new Date(),
      isCompleted: true,
    };

    const result = get().calculateResults();

    set({
      currentSession: completedSession,
      testResult: result,
      isTestActive: false,
    });
  },

  resetTest: () => {
    set({
      currentSession: null,
      testResult: null,
      isTestActive: false,
      timeElapsed: 0,
    });
  },

  calculateResults: (): TestResult => {
    const { currentSession, timeElapsed } = get();
    if (!currentSession) throw new Error('No active session');

    const userAnswers: UserAnswer[] = currentSession.questions.map((question, index) => ({
      questionId: question.id,
      selectedAnswer: currentSession.answers[index],
      timeSpent: 60, // Simplified - in real app, track individual times
      isCorrect: currentSession.answers[index] === question.correctAnswer,
    }));

    const totalCorrect = userAnswers.filter(a => a.isCorrect).length;
    const totalQuestions = currentSession.questions.length;
    const rawScore = (totalCorrect / totalQuestions) * 100;

    // IQ Score calculation (simplified)
    // In reality, this would use statistical normalization
    const iqScore = Math.round(100 + (rawScore - 50) * 0.6);
    const percentile = calculatePercentile(iqScore);

    // Category scores
    const categories: Question['category'][] = ['logical', 'numerical', 'spatial', 'matrix', 'verbal', 'abstract', 'memory'];
    const categoryScores = {} as TestResult['categoryScores'];

    categories.forEach(category => {
      const categoryQuestions = currentSession.questions.filter(q => q.category === category);
      const categoryAnswers = categoryQuestions.map(q => {
        const index = currentSession.questions.findIndex(sq => sq.id === q.id);
        return userAnswers[index];
      });
      
      const categoryCorrect = categoryAnswers.filter(a => a.isCorrect).length;
      const categoryTotal = categoryQuestions.length;
      
      categoryScores[category] = {
        score: categoryCorrect,
        total: categoryTotal,
        percentage: categoryTotal > 0 ? (categoryCorrect / categoryTotal) * 100 : 0,
      };
    });

    return {
      sessionId: currentSession.id,
      totalScore: totalCorrect,
      iqScore,
      percentile,
      categoryScores,
      timeSpent: timeElapsed,
      completedAt: new Date(),
    };
  },
}));

function calculatePercentile(iqScore: number): number {
  // Simplified percentile calculation
  // IQ 100 = 50th percentile, IQ 130 = 98th percentile
  if (iqScore >= 145) return 99.9;
  if (iqScore >= 140) return 99.6;
  if (iqScore >= 135) return 99.0;
  if (iqScore >= 130) return 98.0;
  if (iqScore >= 125) return 95.0;
  if (iqScore >= 120) return 91.0;
  if (iqScore >= 115) return 84.0;
  if (iqScore >= 110) return 75.0;
  if (iqScore >= 105) return 63.0;
  if (iqScore >= 100) return 50.0;
  if (iqScore >= 95) return 37.0;
  if (iqScore >= 90) return 25.0;
  if (iqScore >= 85) return 16.0;
  return Math.max(1, Math.round((iqScore - 55) * 50 / 45));
}