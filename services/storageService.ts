
import { SolvedProblem, UserStats, CodingQuestion, EvaluationResult, AdminUserView } from './types';
import { getUsers } from './authService';

const getStorageKey = (userId: string) => `infijobs_stats_${userId}`;

const DEFAULT_STATS: UserStats = {
  totalAttempts: 0,
  passedCount: 0,
  averageScore: 0,
  history: []
};

// Helper to get stats synchronously
const getStatsSync = (userId: string): UserStats => {
  if (!userId) return DEFAULT_STATS;
  try {
    const stored = localStorage.getItem(getStorageKey(userId));
    if (!stored) return DEFAULT_STATS;
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_STATS;
  }
};

export const getStats = async (userId: string): Promise<UserStats> => {
  // Simulate network fetch
  await new Promise(r => setTimeout(r, 400));
  return getStatsSync(userId);
};

export const saveAttempt = async (
  userId: string,
  question: CodingQuestion,
  result: EvaluationResult,
  language: string
): Promise<UserStats> => {
  if (!userId) return DEFAULT_STATS;

  // Simulate DB write
  await new Promise(r => setTimeout(r, 500));

  const stats = getStatsSync(userId);

  const newAttempt: SolvedProblem = {
    id: Date.now().toString(),
    timestamp: Date.now(),
    questionTitle: question.title,
    difficulty: question.difficulty,
    topic: question.topic,
    score: result.score,
    passed: result.passed,
    language: language
  };

  const newHistory = [newAttempt, ...stats.history];
  // Calculate new averages
  const totalScore = stats.history.reduce((acc, curr) => acc + curr.score, 0) + result.score;
  const newAvg = Math.round(totalScore / (stats.history.length + 1));

  const newStats: UserStats = {
    totalAttempts: stats.totalAttempts + 1,
    passedCount: stats.passedCount + (result.passed ? 1 : 0),
    averageScore: newAvg,
    history: newHistory
  };

  localStorage.setItem(getStorageKey(userId), JSON.stringify(newStats));
  return newStats;
};

// Admin Feature: Get all users and their stats
export const getAllUsersData = async (): Promise<AdminUserView[]> => {
  const users = await getUsers(); // This already has a delay

  return users.map(user => {
    const stats = getStatsSync(user.id);
    return {
      ...user,
      stats
    };
  });
};

export const clearStats = (userId: string) => {
  if (!userId) return DEFAULT_STATS;
  localStorage.removeItem(getStorageKey(userId));
  return DEFAULT_STATS;
};
