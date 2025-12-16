const ROADMAP_PREFIX = 'infijobs-roadmap-';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Roadmap Progress Service - Abstracts roadmap progress persistence
 * Ready for backend migration: Will be integrated with UserStats API
 */

export const getRoadmapProgress = async (_userId?: string): Promise<Record<string, boolean>> => {
    await delay(200);
    const progress: Record<string, boolean> = {};

    // For now, read from localStorage (will be replaced with API call)
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(ROADMAP_PREFIX)) {
            const stepId = key.replace(ROADMAP_PREFIX, '');
            progress[stepId] = localStorage.getItem(key) === 'true';
        }
    }

    return progress;
};

export const saveRoadmapStep = async (stepId: string, completed: boolean, _userId?: string): Promise<void> => {
    await delay(100);
    // For now, save to localStorage (will be replaced with API call to update UserStats)
    localStorage.setItem(`${ROADMAP_PREFIX}${stepId}`, String(completed));
};

export const clearRoadmapProgress = async (_userId?: string): Promise<void> => {
    await delay(100);
    const keysToRemove: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(ROADMAP_PREFIX)) {
            keysToRemove.push(key);
        }
    }

    keysToRemove.forEach(key => localStorage.removeItem(key));
};

// Synchronous version for initialization (will be removed in backend migration)
export const getRoadmapProgressSync = (): Record<string, boolean> => {
    const progress: Record<string, boolean> = {};

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(ROADMAP_PREFIX)) {
            const stepId = key.replace(ROADMAP_PREFIX, '');
            progress[stepId] = localStorage.getItem(key) === 'true';
        }
    }

    return progress;
};
