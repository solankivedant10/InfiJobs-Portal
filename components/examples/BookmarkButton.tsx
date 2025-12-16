/**
 * Example: Using Toast Notifications with Bookmarks
 * 
 * This file shows how to integrate toast notifications in your components
 * when users bookmark/unbookmark items.
 */

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Bookmark } from 'lucide-react';

interface BookmarkButtonProps {
    itemId: string;
    itemTitle: string;
}

export const BookmarkButton: React.FC<BookmarkButtonProps> = ({ itemId, itemTitle }) => {
    const { isBookmarked, toggleBookmark } = useAuth();
    const toast = useToast();
    const bookmarked = isBookmarked(itemId);

    const handleToggle = async () => {
        try {
            await toggleBookmark(itemId);

            if (bookmarked) {
                toast.info(`Removed "${itemTitle}" from bookmarks`);
            } else {
                toast.success(`Added "${itemTitle}" to bookmarks`);
            }
        } catch (error) {
            toast.error('Failed to update bookmark. Please try again.');
        }
    };

    return (
        <button
            onClick={handleToggle}
            className={`p-2 rounded-lg transition-colors ${bookmarked
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
            title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
            <Bookmark size={20} fill={bookmarked ? 'currentColor' : 'none'} />
        </button>
    );
};

/**
 * Example Usage in a Learning Card Component:
 * 
 * import { BookmarkButton } from './BookmarkButton';
 * 
 * const LearningCard = ({ card }) => {
 *   return (
 *     <div className="card">
 *       <h3>{card.title}</h3>
 *       <BookmarkButton itemId={card.id} itemTitle={card.title} />
 *     </div>
 *   );
 * };
 */
