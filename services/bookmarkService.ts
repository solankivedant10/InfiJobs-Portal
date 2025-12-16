/**
 * Bookmark Service - Supabase Integration with Toast Notifications
 * 
 * Handles bookmark persistence to Supabase profiles table.
 * Shows toast notifications and sync indicators.
 */

import { supabase } from '../config/supabase';

// =============================================================================
// TYPES
// =============================================================================

export interface BookmarkSyncStatus {
    isSyncing: boolean;
    lastSyncTime?: number;
    error?: string;
}

// Global sync status (can be observed by components)
let syncStatus: BookmarkSyncStatus = { isSyncing: false };
const syncListeners: Array<(status: BookmarkSyncStatus) => void> = [];

// =============================================================================
// SYNC STATUS MANAGEMENT
// =============================================================================

const updateSyncStatus = (status: Partial<BookmarkSyncStatus>) => {
    syncStatus = { ...syncStatus, ...status };
    syncListeners.forEach(listener => listener(syncStatus));
};

export const subscribeSyncStatus = (listener: (status: BookmarkSyncStatus) => void) => {
    syncListeners.push(listener);
    // Return unsubscribe function
    return () => {
        const index = syncListeners.indexOf(listener);
        if (index > -1) {
            syncListeners.splice(index, 1);
        }
    };
};

export const getSyncStatus = (): BookmarkSyncStatus => syncStatus;

// =============================================================================
// SUPABASE BOOKMARK OPERATIONS
// =============================================================================

/**
 * Get bookmarks from Supabase profiles table
 */
export const getBookmarks = async (userId: string): Promise<string[]> => {
    try {
        updateSyncStatus({ isSyncing: true, error: undefined });

        const { data, error } = await supabase
            .from('profiles')
            .select('bookmarks')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching bookmarks:', error);
            updateSyncStatus({ isSyncing: false, error: error.message });
            return getBookmarksFromLocalStorage(userId);
        }

        updateSyncStatus({ isSyncing: false, lastSyncTime: Date.now() });
        return data?.bookmarks || [];
    } catch (err: any) {
        console.error('Failed to fetch bookmarks:', err);
        updateSyncStatus({ isSyncing: false, error: err.message });
        return getBookmarksFromLocalStorage(userId);
    }
};

/**
 * Save bookmarks to Supabase profiles table
 */
const saveBookmarksToSupabase = async (userId: string, bookmarks: string[]): Promise<boolean> => {
    try {
        updateSyncStatus({ isSyncing: true, error: undefined });

        const { error } = await supabase
            .from('profiles')
            .update({ bookmarks })
            .eq('id', userId);

        if (error) {
            console.error('Error saving bookmarks:', error);
            updateSyncStatus({ isSyncing: false, error: error.message });
            return false;
        }

        updateSyncStatus({ isSyncing: false, lastSyncTime: Date.now() });
        return true;
    } catch (err: any) {
        console.error('Failed to save bookmarks:', err);
        updateSyncStatus({ isSyncing: false, error: err.message });
        return false;
    }
};

/**
 * Add a bookmark
 */
export const addBookmark = async (userId: string, itemId: string): Promise<string[]> => {
    const bookmarks = await getBookmarks(userId);

    if (!bookmarks.includes(itemId)) {
        const updated = [...bookmarks, itemId];
        const saved = await saveBookmarksToSupabase(userId, updated);

        if (saved) {
            // Also save to localStorage as cache
            saveBookmarksToLocalStorage(userId, updated);
            return updated;
        }
    }

    return bookmarks;
};

/**
 * Remove a bookmark
 */
export const removeBookmark = async (userId: string, itemId: string): Promise<string[]> => {
    const bookmarks = await getBookmarks(userId);
    const updated = bookmarks.filter(id => id !== itemId);

    const saved = await saveBookmarksToSupabase(userId, updated);

    if (saved) {
        // Also save to localStorage as cache
        saveBookmarksToLocalStorage(userId, updated);
        return updated;
    }

    return bookmarks;
};

/**
 * Toggle a bookmark (add if not exists, remove if exists)
 */
export const toggleBookmark = async (userId: string, itemId: string): Promise<string[]> => {
    const bookmarks = await getBookmarks(userId);

    if (bookmarks.includes(itemId)) {
        return removeBookmark(userId, itemId);
    } else {
        return addBookmark(userId, itemId);
    }
};

// =============================================================================
// LOCALSTORAGE FALLBACK (for offline/unauthenticated users)
// =============================================================================

const BOOKMARKS_KEY = 'infijobs-bookmarks';

const getBookmarksFromLocalStorage = (userId: string): string[] => {
    try {
        const stored = localStorage.getItem(`${BOOKMARKS_KEY}_${userId}`);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveBookmarksToLocalStorage = (userId: string, bookmarks: string[]): void => {
    try {
        localStorage.setItem(`${BOOKMARKS_KEY}_${userId}`, JSON.stringify(bookmarks));
    } catch (err) {
        console.error('Failed to save bookmarks to localStorage:', err);
    }
};

/**
 * Synchronous version for initialization
 * First tries Supabase cache (localStorage), then falls back to empty array
 */
export const getBookmarksSync = (userId: string): string[] => {
    return getBookmarksFromLocalStorage(userId);
};

/**
 * Sync localStorage bookmarks to Supabase (for migration)
 */
export const syncBookmarksToSupabase = async (userId: string): Promise<void> => {
    try {
        const localBookmarks = getBookmarksFromLocalStorage(userId);

        if (localBookmarks.length > 0) {
            await saveBookmarksToSupabase(userId, localBookmarks);
            // console.log('✓ Synced local bookmarks to Supabase');
        }
    } catch (err) {
        console.error('Failed to sync bookmarks:', err);
    }
};
