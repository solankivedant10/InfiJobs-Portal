/**
 * Bookmark Service - User Bookmarks Management
 * Ready for backend migration: Replace localStorage with API calls
 */

const BOOKMARKS_KEY = 'infijobs-bookmarks';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getBookmarks = async (userId: string): Promise<string[]> => {
    await delay(200);
    try {
        const stored = localStorage.getItem(`${BOOKMARKS_KEY}_${userId}`);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

export const addBookmark = async (userId: string, itemId: string): Promise<string[]> => {
    await delay(200);
    const bookmarks = await getBookmarks(userId);
    if (!bookmarks.includes(itemId)) {
        const updated = [...bookmarks, itemId];
        localStorage.setItem(`${BOOKMARKS_KEY}_${userId}`, JSON.stringify(updated));
        return updated;
    }
    return bookmarks;
};

export const removeBookmark = async (userId: string, itemId: string): Promise<string[]> => {
    await delay(200);
    const bookmarks = await getBookmarks(userId);
    const updated = bookmarks.filter(id => id !== itemId);
    localStorage.setItem(`${BOOKMARKS_KEY}_${userId}`, JSON.stringify(updated));
    return updated;
};

export const toggleBookmark = async (userId: string, itemId: string): Promise<string[]> => {
    const bookmarks = await getBookmarks(userId);
    if (bookmarks.includes(itemId)) {
        return removeBookmark(userId, itemId);
    } else {
        return addBookmark(userId, itemId);
    }
};

// Synchronous version for initialization
export const getBookmarksSync = (userId: string): string[] => {
    try {
        const stored = localStorage.getItem(`${BOOKMARKS_KEY}_${userId}`);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};
