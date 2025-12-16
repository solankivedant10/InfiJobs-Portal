
export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export interface CodingQuestion {
  title: string;
  description: string;
  difficulty: Difficulty;
  topic: string;
  starterCode: string;
  testCases: string[];
  hints: string[];
}

export interface EvaluationResult {
  passed: boolean;
  score: number; // 0-100
  feedback: string;
  optimizedCode: string;
  explanation: string;
}

export type AppState = 'AUTH' | 'SETUP' | 'LOADING_QUESTION' | 'PRACTICE' | 'EVALUATING' | 'RESULTS' | 'DASHBOARD' | 'ADMIN_DASHBOARD';

export interface QuizConfig {
  topic: string;
  difficulty: Difficulty;
  language: string;
}

export interface SolvedProblem {
  id: string;
  timestamp: number;
  questionTitle: string;
  difficulty: Difficulty;
  topic: string;
  score: number;
  passed: boolean;
  language: string;
}

export interface UserStats {
  totalAttempts: number;
  passedCount: number;
  averageScore: number;
  history: SolvedProblem[];
  roadmapProgress?: Record<string, boolean>; // Track completed roadmap steps
}

export interface User {
  id: string;
  // Human-friendly name (displayed in UI)
  name: string;
  // Contact identifier - kept separate so we never assume email is the stable id
  email?: string;
  isAdmin?: boolean;
  createdAt?: number;
}

export interface AdminUserView extends User {
  stats: UserStats;
}

// Separate interface for login/register forms (backend-ready)
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
