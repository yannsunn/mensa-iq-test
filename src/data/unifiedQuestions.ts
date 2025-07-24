// UPDATED - Now imports from consolidated questions
import { CONSOLIDATED_MENSA_QUESTIONS } from './consolidatedQuestions';

// Re-export for backward compatibility
export const UNIFIED_QUESTIONS = CONSOLIDATED_MENSA_QUESTIONS;

// Legacy exports
export const logicalReasoningQuestions = CONSOLIDATED_MENSA_QUESTIONS.filter(q => q.category === 'logical');
export const numericalReasoningQuestions = CONSOLIDATED_MENSA_QUESTIONS.filter(q => q.category === 'numerical');
export const spatialReasoningQuestions = CONSOLIDATED_MENSA_QUESTIONS.filter(q => q.category === 'spatial');
export const matrixReasoningQuestions = CONSOLIDATED_MENSA_QUESTIONS.filter(q => q.category === 'matrix');
export const patternRecognitionQuestions = CONSOLIDATED_MENSA_QUESTIONS.filter(q => q.category === 'pattern');
