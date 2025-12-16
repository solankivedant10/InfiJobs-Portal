import { learningCards, quizData, roadmapData, LearningCard, Quiz, RoadmapStep } from '../data/mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Content Service - Abstracts content data access
 * Ready for backend migration: Replace mock data with API calls
 */

export const getLearningCards = async (): Promise<LearningCard[]> => {
    await delay(300); // Simulate API call
    return learningCards;
};

export const getQuizData = async (quizId: string): Promise<Quiz | null> => {
    await delay(200);
    return quizData[quizId] || null;
};

export const getRoadmapData = async (pathId: string): Promise<RoadmapStep[]> => {
    await delay(200);
    return roadmapData[pathId] || [];
};

export const getAllQuizzes = async (): Promise<Record<string, Quiz>> => {
    await delay(300);
    return quizData;
};

export const getAllRoadmaps = async (): Promise<Record<string, RoadmapStep[]>> => {
    await delay(300);
    return roadmapData;
};
