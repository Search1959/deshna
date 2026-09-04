import { DifficultyLevel } from '../types';

export interface RawQuestionData {
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  hints: string[];
  type?: 'mcq' | 'numerical' | 'short_answer';
  difficulty?: DifficultyLevel;
  steps?: string[];
}
