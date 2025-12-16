/**
 * Auth Service - Supabase Authentication
 * 
 * This service provides authentication using Supabase Auth.
 * Handles login, registration, logout, and profile synchronization.
 */

import { supabase } from '../../config/supabase';
import { User, AuthResponse } from './types';

// =============================================================================
// TYPES
// =============================================================================

interface UserProfile {
    id: string;
    full_name: string;
    email: string;
    role: string;
    avatar_url?: string;
    bookmarks: string[];
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Fetch user profile from profiles table
 */
const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }

        return data;
    } catch (err) {
        console.error('Failed to fetch user profile:', err);
        return null;
    }
};

/**
 * Map Supabase user + profile to app User type
 */
const mapToAppUser = (authUser: any, profile: UserProfile | null): User => {
    return {
        id: authUser.id,
        name: profile?.full_name || authUser.email?.split('@')[0] || 'User',
        email: authUser.email,
        isAdmin: profile?.role === 'admin',
        createdAt: new Date(authUser.created_at).getTime()
    };
};

// =============================================================================
// AUTH OPERATIONS
// =============================================================================

/**
 * Login with email and password
 */
export const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return {
                success: false,
                message: error.message || 'Invalid email or password'
            };
        }

        if (!data.user) {
            return {
                success: false,
                message: 'Login failed. Please try again.'
            };
        }

        // Fetch user profile
        const profile = await fetchUserProfile(data.user.id);
        const appUser = mapToAppUser(data.user, profile);

        return {
            success: true,
            user: appUser,
            token: data.session?.access_token
        };
    } catch (error: any) {
        console.error('Login error:', error);
        return {
            success: false,
            message: error.message || 'An unexpected error occurred'
        };
    }
};

/**
 * Register a new user
 */
export const register = async (
    name: string,
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        // Sign up with Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name
                }
            }
        });

        if (error) {
            return {
                success: false,
                message: error.message || 'Registration failed'
            };
        }

        if (!data.user) {
            return {
                success: false,
                message: 'Registration failed. Please try again.'
            };
        }

        // Note: Profile is auto-created by the database trigger
        // Wait a moment for the trigger to complete
        await new Promise(resolve => setTimeout(resolve, 500));

        // Fetch the newly created profile
        const profile = await fetchUserProfile(data.user.id);
        const appUser = mapToAppUser(data.user, profile);

        return {
            success: true,
            user: appUser,
            token: data.session?.access_token,
            message: 'Registration successful! Please check your email to verify your account.'
        };
    } catch (error: any) {
        console.error('Registration error:', error);
        return {
            success: false,
            message: error.message || 'An unexpected error occurred'
        };
    }
};

/**
 * Logout current user
 */
export const logout = async (): Promise<{ success: boolean; message?: string }> => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Logout error:', error);
            return {
                success: false,
                message: error.message
            };
        }

        return { success: true };
    } catch (error: any) {
        console.error('Logout error:', error);
        return {
            success: false,
            message: error.message || 'Logout failed'
        };
    }
};

/**
 * Get current session user
 */
export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user) {
            return null;
        }

        const profile = await fetchUserProfile(user.id);
        return mapToAppUser(user, profile);
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        return !!session;
    } catch {
        return false;
    }
};

/**
 * Refresh user session
 */
export const refreshSession = async (): Promise<boolean> => {
    try {
        const { data, error } = await supabase.auth.refreshSession();
        return !error && !!data.session;
    } catch {
        return false;
    }
};

/**
 * Update user profile
 */
export const updateProfile = async (
    userId: string,
    updates: Partial<{ full_name: string; avatar_url: string; role: string }>
): Promise<{ success: boolean; message?: string }> => {
    try {
        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId);

        if (error) {
            return {
                success: false,
                message: error.message
            };
        }

        return { success: true };
    } catch (error: any) {
        console.error('Profile update error:', error);
        return {
            success: false,
            message: error.message || 'Failed to update profile'
        };
    }
};

/**
 * Reset password
 */
export const resetPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`
        });

        if (error) {
            return {
                success: false,
                message: error.message
            };
        }

        return {
            success: true,
            message: 'Password reset email sent! Check your inbox.'
        };
    } catch (error: any) {
        console.error('Password reset error:', error);
        return {
            success: false,
            message: error.message || 'Failed to send reset email'
        };
    }
};
