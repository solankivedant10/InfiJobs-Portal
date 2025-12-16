/**
 * Data Service - Supabase Data Layer
 * 
 * This service provides async access to all application data from Supabase.
 * Handles field mapping between database (snake_case) and frontend (camelCase).
 */

import { supabase } from '../config/supabase';
import type { LearningCard, Quiz, RoadmapStep } from '../data/mockData';
import type { MlTopic } from '../data/mlTutorialData';
import { codingProblems, CodingProblem } from './codingData';

// =============================================================================
// TYPES
// =============================================================================

export interface LearningResource {
    id: string;
    title: string;
    description?: string;
    course_link?: string;
    materials_link?: string;
    video_tutorial_link?: string;
    category?: string;
    difficulty?: string;
    duration_hours?: number;
    tags?: string[];
    is_featured?: boolean;
}

export interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correct_answer: number;
    explanation?: string;
}

export interface QuizData {
    id: string;
    title: string;
    description?: string;
    category?: string;
    difficulty?: string;
    time_limit_minutes?: number;
    passing_score?: number;
    questions?: QuizQuestion[];
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Map database learning resource (snake_case) to frontend format (camelCase)
 */
const mapLearningResource = (dbResource: any): LearningCard => ({
    id: dbResource.id,
    title: dbResource.title,
    courseLink: dbResource.course_link,
    materialsLink: dbResource.materials_link,
    VideoTutorialLink: dbResource.video_tutorial_link,
    description: dbResource.description
});

/**
 * Map database quiz question to frontend format
 */
const mapQuizQuestion = (dbQuestion: any): { q: string; o: string[]; a: number } => ({
    q: dbQuestion.question,
    o: dbQuestion.options, // Already JSONB array
    a: dbQuestion.correct_answer
});

/**
 * Map database roadmap to frontend format
 */
const mapRoadmapStep = (dbStep: any): RoadmapStep => ({
    id: dbStep.id,
    step: dbStep.step_title,
    desc: dbStep.description
});

/**
 * Map database ML topic (with JSONB fields) to frontend MlTopic interface
 */
const mapMlTopic = (dbTopic: any): MlTopic => ({
    id: dbTopic.id,
    title: dbTopic.title,
    icon: dbTopic.icon,
    iconBg: dbTopic.icon_bg,
    description: dbTopic.description,
    highlightWords: dbTopic.highlight_words || undefined,
    alert: dbTopic.alert || undefined,
    table: dbTopic.table_data || undefined,
    codeExample: dbTopic.code_example || undefined,
    pipeline: dbTopic.pipeline || undefined,
    benefits: dbTopic.benefits || undefined,
    examples: dbTopic.examples || undefined,
    infoBoxes: dbTopic.info_boxes || undefined,
    roleScenarios: dbTopic.role_scenarios || undefined
});

// =============================================================================
// LEARNING RESOURCES (from Supabase)
// =============================================================================

/**
 * Fetch all learning resources from Supabase
 */
export const getLearningCards = async (): Promise<LearningCard[]> => {
    try {
        const { data, error } = await supabase
            .from('learning_resources')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching learning resources:', error);
            return [];
        }

        return data.map(mapLearningResource);
    } catch (err) {
        console.error('Failed to fetch learning resources:', err);
        return [];
    }
};

/**
 * Fetch a single learning resource by ID
 */
export const getLearningCardById = async (id: string): Promise<LearningCard | undefined> => {
    try {
        const { data, error } = await supabase
            .from('learning_resources')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching learning resource:', error);
            return undefined;
        }

        return mapLearningResource(data);
    } catch (err) {
        console.error('Failed to fetch learning resource:', err);
        return undefined;
    }
};

// =============================================================================
// QUIZZES (from Supabase)
// =============================================================================

/**
 * Fetch all quiz metadata (without questions)
 */
export const getQuizList = async (): Promise<{ id: string; title: string; description: string }[]> => {
    try {
        const { data, error } = await supabase
            .from('quizzes')
            .select('id, title, description')
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching quiz list:', error);
            return [];
        }

        return data.map(quiz => ({
            id: quiz.id,
            title: quiz.title,
            description: quiz.description || ''
        }));
    } catch (err) {
        console.error('Failed to fetch quiz list:', err);
        return [];
    }
};

/**
 * Fetch a specific quiz with all questions
 */
export const getQuizById = async (quizId: string): Promise<Quiz | undefined> => {
    try {
        // Fetch quiz metadata
        const { data: quizData, error: quizError } = await supabase
            .from('quizzes')
            .select('*')
            .eq('id', quizId)
            .single();

        if (quizError) {
            console.error('Error fetching quiz:', quizError);
            return undefined;
        }

        // Fetch quiz questions
        const { data: questionsData, error: questionsError } = await supabase
            .from('quiz_questions')
            .select('*')
            .eq('quiz_id', quizId)
            .order('order_index', { ascending: true });

        if (questionsError) {
            console.error('Error fetching quiz questions:', questionsError);
            return undefined;
        }

        // Map to frontend Quiz format
        return {
            title: quizData.title,
            description: quizData.description || '',
            questions: questionsData.map(mapQuizQuestion)
        };
    } catch (err) {
        console.error('Failed to fetch quiz:', err);
        return undefined;
    }
};

// =============================================================================
// QUIZ RESULTS (Supabase)
// =============================================================================

/**
 * Save quiz result to Supabase
 */
export const saveQuizResult = async (
    userId: string,
    quizId: string,
    score: number,
    totalQuestions: number,
    passed: boolean,
    timeTakenSeconds?: number
): Promise<boolean> => {
    try {
        const { error } = await supabase
            .from('user_quiz_results')
            .insert({
                user_id: userId,
                quiz_id: quizId,
                score,
                total_questions: totalQuestions,
                passed,
                time_taken_seconds: timeTakenSeconds
            });

        if (error) {
            console.error('Error saving quiz result:', error);
            return false;
        }

        return true;
    } catch (err) {
        console.error('Failed to save quiz result:', err);
        return false;
    }
};

/**
 * Get user's quiz history from Supabase
 */
export const getUserQuizHistory = async (userId: string) => {
    try {
        const { data, error } = await supabase
            .from('user_quiz_results')
            .select(`
                *,
                quizzes (
                    title
                )
            `)
            .eq('user_id', userId)
            .order('completed_at', { ascending: false });

        if (error) {
            console.error('Error fetching quiz history:', error);
            return [];
        }

        return data;
    } catch (err) {
        console.error('Failed to fetch quiz history:', err);
        return [];
    }
};

// =============================================================================
// ROADMAPS (from Supabase)
// =============================================================================

/**
 * Fetch roadmap data for a specific role
 */
export const getRoadmapByRole = async (roleId: string): Promise<RoadmapStep[] | undefined> => {
    try {
        const { data, error } = await supabase
            .from('roadmaps')
            .select('*')
            .eq('role_id', roleId)
            .order('order_index', { ascending: true });

        if (error) {
            console.error('Error fetching roadmap:', error);
            return undefined;
        }

        return data.map(mapRoadmapStep);
    } catch (err) {
        console.error('Failed to fetch roadmap:', err);
        return undefined;
    }
};

/**
 * Fetch all available roadmaps
 */
export const getAllRoadmaps = async (): Promise<Record<string, RoadmapStep[]>> => {
    try {
        const { data, error } = await supabase
            .from('roadmaps')
            .select('*')
            .order('role_id', { ascending: true })
            .order('order_index', { ascending: true });

        if (error) {
            console.error('Error fetching all roadmaps:', error);
            return {};
        }

        // Group by role_id
        const grouped: Record<string, RoadmapStep[]> = {};
        data.forEach(step => {
            if (!grouped[step.role_id]) {
                grouped[step.role_id] = [];
            }
            grouped[step.role_id].push(mapRoadmapStep(step));
        });

        return grouped;
    } catch (err) {
        console.error('Failed to fetch all roadmaps:', err);
        return {};
    }
};

// =============================================================================
// ML TOPICS (from Supabase)
// =============================================================================

/**
 * Fetch all ML topics
 */
export const getMlTopics = async (): Promise<MlTopic[]> => {
    try {
        const { data, error } = await supabase
            .from('ml_topics')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching ML topics:', error);
            return [];
        }

        return data.map(mapMlTopic);
    } catch (err) {
        console.error('Failed to fetch ML topics:', err);
        return [];
    }
};

/**
 * Fetch a specific ML topic by ID
 */
export const getMlTopicById = async (id: string): Promise<MlTopic | undefined> => {
    try {
        const { data, error } = await supabase
            .from('ml_topics')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching ML topic:', error);
            return undefined;
        }

        return mapMlTopic(data);
    } catch (err) {
        console.error('Failed to fetch ML topic:', err);
        return undefined;
    }
};

// =============================================================================
// PIPELINE STAGES (from Supabase)
// =============================================================================

/**
 * Fetch all pipeline stages
 */
export const getPipelineStages = async (): Promise<any[]> => {
    try {
        const { data, error } = await supabase
            .from('pipeline_stages')
            .select('*')
            .order('order_index', { ascending: true });

        if (error) {
            console.error('Error fetching pipeline stages:', error);
            return [];
        }

        return data;
    } catch (err) {
        console.error('Failed to fetch pipeline stages:', err);
        return [];
    }
};

// =============================================================================
// CODING PROBLEMS (from local data - not in Supabase yet)
// =============================================================================

/**
 * Fetch all coding problems
 */
export const getCodingProblems = async (): Promise<CodingProblem[]> => {
    return codingProblems;
};

/**
 * Fetch coding problem by ID
 */
export const getCodingProblemById = async (id: string): Promise<CodingProblem | undefined> => {
    return codingProblems.find((q: CodingProblem) => q.id === id);
};

/**
 * Get random coding problem
 */
export const getRandomCodingProblem = async (
    difficulty?: 'Easy' | 'Medium' | 'Hard'
): Promise<CodingProblem | undefined> => {
    let filtered = codingProblems;

    if (difficulty) {
        filtered = filtered.filter((q: CodingProblem) => q.difficulty === difficulty);
    }

    if (filtered.length === 0) return undefined;
    return filtered[Math.floor(Math.random() * filtered.length)];
};
