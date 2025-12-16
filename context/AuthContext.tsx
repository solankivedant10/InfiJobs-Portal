/**
 * Auth Context - Supabase Authentication Provider
 * 
 * Provides authentication state and methods using Supabase Auth.
 * Handles real-time session changes and profile synchronization.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { supabase } from '../config/supabase';
import { getCurrentUser } from '../features/auth/authService';
import { getBookmarksSync, toggleBookmark as toggleBookmarkService } from '../services/bookmarkService';

// =============================================================================
// TYPES
// =============================================================================

interface User {
  id: string;
  name: string;
  email?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  bookmarks: string[];
  toggleBookmark: (id: string) => Promise<void>;
  isBookmarked: (id: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// =============================================================================
// AUTH PROVIDER
// =============================================================================

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth and listen for changes
  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (currentUser) {
          setUser(currentUser);
          // Load bookmarks for this user
          const userBookmarks = getBookmarksSync(currentUser.id);
          setBookmarks(userBookmarks);
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Skip if still initializing to prevent race condition
        if (!isInitialized && event !== 'SIGNED_OUT') return;

        if (event === 'SIGNED_IN' && session?.user) {
          // User signed in - fetch their profile
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            const userBookmarks = getBookmarksSync(currentUser.id);
            setBookmarks(userBookmarks);
          }
        } else if (event === 'SIGNED_OUT') {
          // User signed out - clear state
          setUser(null);
          setBookmarks([]);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          // Token refreshed - update user if needed
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          }
        } else if (event === 'USER_UPDATED' && session?.user) {
          // User data updated - refresh profile
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
          }
        }

        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login handler (called after successful auth)
  const login = useCallback((newUser: User) => {
    setUser(newUser);
    const userBookmarks = getBookmarksSync(newUser.id);
    setBookmarks(userBookmarks);
  }, []);

  // Logout handler
  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setBookmarks([]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  // Toggle bookmark
  const toggleBookmark = useCallback(async (id: string) => {
    if (!user) return;

    try {
      const newBookmarks = await toggleBookmarkService(user.id, id);
      setBookmarks(newBookmarks);
      // Note: Toast notifications should be shown in UI components using useToast()
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  }, [user]);

  // Check if bookmarked
  const isBookmarked = useCallback((id: string): boolean => {
    return bookmarks.includes(id);
  }, [bookmarks]);

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      bookmarks,
      toggleBookmark,
      isBookmarked,
    }),
    [user, loading, login, logout, bookmarks, toggleBookmark, isBookmarked]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// =============================================================================
// HOOK
// =============================================================================

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};