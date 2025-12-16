import { User } from './types';

const SESSION_KEY = 'infijobs_current_user';

// Simulate network delay for "Backend Connected" feel
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Session Service - Abstracts session management
 * Ready for backend migration: Replace localStorage with JWT/cookies
 */

export const getCurrentSession = async (): Promise<User | null> => {
    await delay(200); // Simulate API call
    try {
        const stored = localStorage.getItem(SESSION_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
};

export const saveSession = async (user: User): Promise<void> => {
    await delay(200);
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const clearSession = async (): Promise<void> => {
    await delay(200);
    localStorage.removeItem(SESSION_KEY);
};

// Synchronous version for initialization (will be removed in backend migration)
export const getCurrentSessionSync = (): User | null => {
    try {
        const stored = localStorage.getItem(SESSION_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
};
