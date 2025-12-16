/**
 * User Service - Mock/LocalStorage User Profile & Preferences
 * 
 * Handles user profile data, bookmarks, and preferences.
 * Currently uses localStorage - ready for backend integration.
 */

// =============================================================================
// TYPES
// =============================================================================

export interface UserProfile {
    id: string;
    full_name?: string;
    email?: string;
    role: string;
    avatar_url?: string;
    bookmarks: string[];
    created_at: string;
    updated_at: string;
}

// =============================================================================
// STORAGE KEYS
// =============================================================================

const USER_PROFILES_KEY = 'infijobs_user_profiles';
const USER_PROGRESS_KEY = 'infijobs_user_progress';
const QUIZ_RESULTS_KEY = 'infijobs_quiz_results';

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

const getStoredProfiles = (): Record<string, UserProfile> => {
    try {
        const stored = localStorage.getItem(USER_PROFILES_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
};

const saveProfiles = (profiles: Record<string, UserProfile>): void => {
    localStorage.setItem(USER_PROFILES_KEY, JSON.stringify(profiles));
};

// =============================================================================
// PROFILE OPERATIONS
// =============================================================================

/**
 * Get user profile from localStorage
 */
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    await new Promise(resolve => setTimeout(resolve, 50));

    const profiles = getStoredProfiles();
    return profiles[userId] || null;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (
    userId: string,
    updates: Partial<Pick<UserProfile, 'full_name' | 'avatar_url'>>
): Promise<boolean> => {
    try {
        const profiles = getStoredProfiles();

        if (!profiles[userId]) {
            // Create a new profile if it doesn't exist
            profiles[userId] = {
                id: userId,
                role: 'user',
                bookmarks: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                ...updates
            };
        } else {
            profiles[userId] = {
                ...profiles[userId],
                ...updates,
                updated_at: new Date().toISOString()
            };
        }

        saveProfiles(profiles);
        return true;
    } catch {
        console.error('Failed to update profile');
        return false;
    }
};

// =============================================================================
// BOOKMARKS
// =============================================================================

/**
 * Get user's bookmarks from localStorage
 */
export const getBookmarks = async (userId: string): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 50));

    const profiles = getStoredProfiles();
    return profiles[userId]?.bookmarks || [];
};

/**
 * Toggle a bookmark (add if not exists, remove if exists)
 */
export const toggleBookmark = async (userId: string, resourceId: string): Promise<string[]> => {
    try {
        const profiles = getStoredProfiles();

        if (!profiles[userId]) {
            profiles[userId] = {
                id: userId,
                role: 'user',
                bookmarks: [resourceId],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
        } else {
            const currentBookmarks = profiles[userId].bookmarks || [];

            if (currentBookmarks.includes(resourceId)) {
                profiles[userId].bookmarks = currentBookmarks.filter(id => id !== resourceId);
            } else {
                profiles[userId].bookmarks = [...currentBookmarks, resourceId];
            }

            profiles[userId].updated_at = new Date().toISOString();
        }

        saveProfiles(profiles);
        return profiles[userId].bookmarks;
    } catch {
        return [];
    }
};

/**
 * Add a bookmark
 */
export const addBookmark = async (userId: string, resourceId: string): Promise<string[]> => {
    const currentBookmarks = await getBookmarks(userId);

    if (currentBookmarks.includes(resourceId)) {
        return currentBookmarks; // Already bookmarked
    }

    const profiles = getStoredProfiles();

    if (!profiles[userId]) {
        profiles[userId] = {
            id: userId,
            role: 'user',
            bookmarks: [resourceId],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
    } else {
        profiles[userId].bookmarks = [...currentBookmarks, resourceId];
        profiles[userId].updated_at = new Date().toISOString();
    }

    saveProfiles(profiles);
    return profiles[userId].bookmarks;
};

/**
 * Remove a bookmark
 */
export const removeBookmark = async (userId: string, resourceId: string): Promise<string[]> => {
    const currentBookmarks = await getBookmarks(userId);
    const updatedBookmarks = currentBookmarks.filter(id => id !== resourceId);

    const profiles = getStoredProfiles();

    if (profiles[userId]) {
        profiles[userId].bookmarks = updatedBookmarks;
        profiles[userId].updated_at = new Date().toISOString();
        saveProfiles(profiles);
    }

    return updatedBookmarks;
};

// =============================================================================
// USER PROGRESS
// =============================================================================

interface ProgressEntry {
    userId: string;
    stepId: string;
    completed: boolean;
    completedAt: string | null;
}

/**
 * Get user's learning progress
 */
export const getUserProgress = async (userId: string): Promise<Record<string, boolean>> => {
    try {
        const stored = localStorage.getItem(USER_PROGRESS_KEY);
        const allProgress: ProgressEntry[] = stored ? JSON.parse(stored) : [];

        const userProgress: Record<string, boolean> = {};
        allProgress
            .filter(p => p.userId === userId)
            .forEach(p => {
                userProgress[p.stepId] = p.completed;
            });

        return userProgress;
    } catch {
        return {};
    }
};

/**
 * Update a step's completion status
 */
export const updateStepProgress = async (
    userId: string,
    stepId: string,
    completed: boolean
): Promise<boolean> => {
    try {
        const stored = localStorage.getItem(USER_PROGRESS_KEY);
        const allProgress: ProgressEntry[] = stored ? JSON.parse(stored) : [];

        // Find existing entry
        const existingIndex = allProgress.findIndex(
            p => p.userId === userId && p.stepId === stepId
        );

        const entry: ProgressEntry = {
            userId,
            stepId,
            completed,
            completedAt: completed ? new Date().toISOString() : null
        };

        if (existingIndex >= 0) {
            allProgress[existingIndex] = entry;
        } else {
            allProgress.push(entry);
        }

        localStorage.setItem(USER_PROGRESS_KEY, JSON.stringify(allProgress));
        return true;
    } catch {
        console.error('Failed to update progress');
        return false;
    }
};

/**
 * Get user statistics
 */
export const getUserStats = async (userId: string) => {
    try {
        // Get quiz results
        const quizStored = localStorage.getItem(QUIZ_RESULTS_KEY);
        const quizResults: { userId: string; score: number; passed: boolean; totalQuestions: number }[] =
            quizStored ? JSON.parse(quizStored) : [];

        const userQuizResults = quizResults.filter(r => r.userId === userId);

        // Get progress
        const progressStored = localStorage.getItem(USER_PROGRESS_KEY);
        const allProgress: ProgressEntry[] = progressStored ? JSON.parse(progressStored) : [];
        const completedSteps = allProgress.filter(p => p.userId === userId && p.completed).length;

        const totalQuizzes = userQuizResults.length;
        const passedQuizzes = userQuizResults.filter(r => r.passed).length;
        const avgScore = totalQuizzes > 0
            ? Math.round(userQuizResults.reduce((sum, r) => sum + r.score, 0) / totalQuizzes)
            : 0;

        return {
            totalQuizzes,
            passedQuizzes,
            avgScore,
            completedSteps
        };
    } catch {
        return {
            totalQuizzes: 0,
            passedQuizzes: 0,
            avgScore: 0,
            completedSteps: 0
        };
    }
};
