import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getLearningCards } from '../services/contentService';
import { LearningCard } from '../data/mockData'; // Type only
import Modal from './common/Modal';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, logout, bookmarks } = useAuth();
  const [allCards, setAllCards] = useState<LearningCard[]>([]);

  useEffect(() => {
    if (isOpen) {
      getLearningCards().then(setAllCards).catch(console.error);
    }
  }, [isOpen]);

  // Memoize the lookup logic to avoid recalculating on every render
  const bookmarkedItems = useMemo(() => {
    return bookmarks.map(id => {
      // Try to find in known data sources (add more arrays here as needed)
      // Currently checking fetched learningCards
      const learning = allCards?.find((c) => `learning-${c.id}` === id);
      if (learning) return { id, title: learning.title, type: 'Learning Path' };

      // Fallback for generic or unknown IDs
      return { id, title: `Resource ${id.replace(/-/, ' ')}`, type: 'Bookmark' };
    });
  }, [bookmarks, allCards]);

  if (!user) return null;

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      logout();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md" showCloseButton={false}>
      <div className="relative overflow-hidden -m-6">
        {/* Header Background */}
        <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl font-bold z-10"
          >
            &times;
          </button>
        </div>

        {/* Avatar & Info */}
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-10 mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-gray-800 bg-gray-700 flex items-center justify-center text-3xl text-white shadow-lg">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">{user.name}</h3>
            <p className="text-blue-400 text-sm">{user.email}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-700">
              <span className="block text-xl font-bold text-white">5</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Quizzes</span>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-700">
              <span className="block text-xl font-bold text-white">85%</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Avg Score</span>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-700">
              <span className="block text-xl font-bold text-white">{bookmarks.length}</span>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Saved</span>
            </div>
          </div>

          {/* Saved Resources */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 tracking-wider">Saved Resources</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-2">
              {bookmarkedItems.length === 0 ? (
                <div className="text-sm text-gray-500 italic text-center py-4 bg-gray-800/50 rounded-lg border border-gray-700 border-dashed">
                  No bookmarks saved yet.
                </div>
              ) : (
                bookmarkedItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-700/30 hover:bg-gray-700/60 p-3 rounded-lg transition-colors cursor-pointer group border border-transparent hover:border-gray-600">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-200 font-medium truncate max-w-[200px]">{item.title}</span>
                      <span className="text-[10px] text-gray-500">{item.type}</span>
                    </div>
                    <i className="fa-solid fa-chevron-right text-xs text-gray-600 group-hover:text-blue-400"></i>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4 border-t border-gray-700">
            <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600 transition-colors text-gray-200 group">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <i className="fa-solid fa-file-arrow-down"></i>
                </div>
                <span className="font-medium">Download Resume</span>
              </div>
            </button>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-between p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition-colors text-red-400 hover:text-red-300 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center text-red-400">
                  <i className="fa-solid fa-right-from-bracket"></i>
                </div>
                <span className="font-medium">Sign Out</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;