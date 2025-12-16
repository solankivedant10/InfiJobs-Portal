/**
 * Bookmark Sync Indicator Component
 * 
 * Shows sync status for bookmarks (syncing, synced, error)
 */

import React, { useState, useEffect } from 'react';
import { CloudOff, Loader2, Check } from 'lucide-react';
import { subscribeSyncStatus, getSyncStatus, BookmarkSyncStatus } from '../services/bookmarkService';

export const BookmarkSyncIndicator: React.FC = () => {
    const [syncStatus, setSyncStatus] = useState<BookmarkSyncStatus>(getSyncStatus());

    useEffect(() => {
        // Subscribe to sync status changes
        const unsubscribe = subscribeSyncStatus(setSyncStatus);
        return unsubscribe;
    }, []);

    if (!syncStatus.isSyncing && !syncStatus.error && !syncStatus.lastSyncTime) {
        return null; // Don't show anything if never synced
    }

    return (
        <div className="fixed bottom-4 left-4 z-50">
            {syncStatus.isSyncing ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg animate-in slide-in-from-left-5 fade-in">
                    <Loader2 className="animate-spin" size={16} />
                    <span className="text-sm font-medium">Syncing...</span>
                </div>
            ) : syncStatus.error ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-red-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg animate-in slide-in-from-left-5 fade-in">
                    <CloudOff size={16} />
                    <span className="text-sm font-medium">Sync failed</span>
                </div>
            ) : syncStatus.lastSyncTime ? (
                <div className="flex items-center gap-2 px-3 py-2 bg-green-500/90 backdrop-blur-sm text-white rounded-lg shadow-lg animate-in slide-in-from-left-5 fade-in">
                    <Check size={16} />
                    <span className="text-sm font-medium">Synced</span>
                </div>
            ) : null}
        </div>
    );
};
