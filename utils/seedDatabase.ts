/**
 * Database Seeding Utility
 * 
 * Seeds the Supabase database with initial data from mockData and mlTutorialData.
 * Uses upsert operations to prevent duplicates on repeated runs.
 */

import { supabase } from '../config/supabase';
import { learningCards, quizData, roadmapData } from '../data/mockData';
import { mlTutorialData, pipelineStages } from '../data/mlTutorialData';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const logSuccess = (table: string, count: number) => {
    console.log(`✓ Seeded ${count} records to ${table}`);
};

const logError = (table: string, error: any) => {
    console.error(`✗ Error seeding ${table}:`, error.message || error);
};

// =============================================================================
// SEED LEARNING RESOURCES
// =============================================================================

async function seedLearningResources() {
    console.log('Seeding learning resources...');

    const resources = learningCards.map(card => ({
        id: card.id,
        title: card.title,
        course_link: card.courseLink,
        materials_link: card.materialsLink,
        video_tutorial_link: card.VideoTutorialLink,
        description: card.description || null,
        category: null,
        difficulty: null,
        duration_hours: null,
        tags: [],
        is_featured: false
    }));

    const { error } = await supabase
        .from('learning_resources')
        .upsert(resources, { onConflict: 'id' });

    if (error) {
        logError('learning_resources', error);
        return false;
    }

    logSuccess('learning_resources', resources.length);
    return true;
}

// =============================================================================
// SEED QUIZZES AND QUESTIONS
// =============================================================================

async function seedQuizzes() {
    console.log('Seeding quizzes...');

    const quizzes = Object.entries(quizData).map(([id, quiz]) => ({
        id,
        title: quiz.title,
        description: quiz.description,
        category: null,
        difficulty: null,
        time_limit_minutes: null,
        passing_score: 70,
        is_active: true
    }));

    const { error: quizError } = await supabase
        .from('quizzes')
        .upsert(quizzes, { onConflict: 'id' });

    if (quizError) {
        logError('quizzes', quizError);
        return false;
    }

    logSuccess('quizzes', quizzes.length);

    // Seed quiz questions
    console.log('Seeding quiz questions...');

    let totalQuestions = 0;
    for (const [quizId, quiz] of Object.entries(quizData)) {
        const questions = quiz.questions.map((q, index) => ({
            quiz_id: quizId,
            question: q.q,
            options: q.o, // JSONB array
            correct_answer: q.a,
            explanation: null,
            order_index: index
        }));

        // Delete existing questions for this quiz first (to handle updates)
        await supabase
            .from('quiz_questions')
            .delete()
            .eq('quiz_id', quizId);

        const { error: questionError } = await supabase
            .from('quiz_questions')
            .insert(questions);

        if (questionError) {
            logError(`quiz_questions for ${quizId}`, questionError);
            continue;
        }

        totalQuestions += questions.length;
    }

    logSuccess('quiz_questions', totalQuestions);
    return true;
}

// =============================================================================
// SEED ML TOPICS
// =============================================================================

async function seedMlTopics() {
    console.log('Seeding ML topics...');

    const topics = mlTutorialData.map(topic => ({
        id: topic.id,
        title: topic.title,
        icon: topic.icon,
        icon_bg: topic.iconBg,
        description: topic.description,
        highlight_words: topic.highlightWords || [],
        alert: topic.alert || null, // JSONB
        table_data: topic.table || null, // JSONB
        code_example: topic.codeExample || null, // JSONB
        pipeline: topic.pipeline || false,
        benefits: topic.benefits || null, // JSONB
        examples: topic.examples || null, // JSONB
        info_boxes: topic.infoBoxes || null, // JSONB
        role_scenarios: topic.roleScenarios || null // JSONB
    }));

    const { error } = await supabase
        .from('ml_topics')
        .upsert(topics, { onConflict: 'id' });

    if (error) {
        logError('ml_topics', error);
        return false;
    }

    logSuccess('ml_topics', topics.length);
    return true;
}

// =============================================================================
// SEED PIPELINE STAGES
// =============================================================================

async function seedPipelineStages() {
    console.log('Seeding pipeline stages...');

    const stages = pipelineStages.map((stage, index) => ({
        id: stage.id,
        label: stage.label,
        icon: stage.icon,
        color: stage.color,
        order_index: index
    }));

    const { error } = await supabase
        .from('pipeline_stages')
        .upsert(stages, { onConflict: 'id' });

    if (error) {
        logError('pipeline_stages', error);
        return false;
    }

    logSuccess('pipeline_stages', stages.length);
    return true;
}

// =============================================================================
// SEED ROADMAPS
// =============================================================================

async function seedRoadmaps() {
    console.log('Seeding roadmaps...');

    const roadmaps: Array<{
        id: string;
        role_id: string;
        step_title: string;
        description: string;
        order_index: number;
    }> = [];

    for (const [roleId, steps] of Object.entries(roadmapData)) {
        steps.forEach((step, index) => {
            roadmaps.push({
                id: step.id,
                role_id: roleId,
                step_title: step.step,
                description: step.desc,
                order_index: index
            });
        });
    }

    const { error } = await supabase
        .from('roadmaps')
        .upsert(roadmaps, { onConflict: 'id' });

    if (error) {
        logError('roadmaps', error);
        return false;
    }

    logSuccess('roadmaps', roadmaps.length);
    return true;
}

// =============================================================================
// MAIN SEED FUNCTION
// =============================================================================

export async function seedDatabase(): Promise<{
    success: boolean;
    message: string;
    details: Record<string, boolean>;
}> {
    console.log('🌱 Starting database seeding...');
    console.log('=====================================');

    const results: Record<string, boolean> = {};

    try {
        // Test connection first
        const { error: connectionError } = await supabase
            .from('profiles')
            .select('count')
            .limit(1);

        if (connectionError) {
            return {
                success: false,
                message: 'Failed to connect to Supabase. Check your environment variables.',
                details: {}
            };
        }

        // Seed all tables
        results.learningResources = await seedLearningResources();
        results.quizzes = await seedQuizzes();
        results.mlTopics = await seedMlTopics();
        results.pipelineStages = await seedPipelineStages();
        results.roadmaps = await seedRoadmaps();

        console.log('=====================================');

        const allSuccessful = Object.values(results).every(r => r === true);

        if (allSuccessful) {
            console.log('✅ Database seeding completed successfully!');
            return {
                success: true,
                message: 'All data seeded successfully!',
                details: results
            };
        } else {
            console.log('⚠️ Database seeding completed with some errors');
            return {
                success: false,
                message: 'Some tables failed to seed. Check console for details.',
                details: results
            };
        }
    } catch (error: any) {
        console.error('❌ Fatal error during seeding:', error);
        return {
            success: false,
            message: `Fatal error: ${error.message}`,
            details: results
        };
    }
}

// Export individual seed functions for granular control
export {
    seedLearningResources,
    seedQuizzes,
    seedMlTopics,
    seedPipelineStages,
    seedRoadmaps
};
