/**
 * API Configuration
 * 
 * Centralized API configuration for backend integration.
 * Replace VITE_API_URL in .env for production deployment.
 */

// Base URL for all API calls
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// API Endpoints
export const API_ENDPOINTS = {
    // Auth
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/auth/me',
    },
    // Users
    USERS: {
        BASE: '/users',
        PROFILE: '/users/profile',
        STATS: '/users/stats',
        BOOKMARKS: '/users/bookmarks',
    },
    // Learning
    LEARNING: {
        CARDS: '/learning/cards',
        ROADMAPS: '/learning/roadmaps',
        PROGRESS: '/learning/progress',
    },
    // Quizzes
    QUIZZES: {
        LIST: '/quizzes',
        BY_ID: (id: string) => `/quizzes/${id}`,
        SUBMIT: (id: string) => `/quizzes/${id}/submit`,
    },
    // Coding
    CODING: {
        QUESTIONS: '/coding/questions',
        EVALUATE: '/coding/evaluate',
        HISTORY: '/coding/history',
    },
} as const;

// API Request Configuration
export const API_CONFIG = {
    TIMEOUT: 10000, // 10 seconds
    RETRY_ATTEMPTS: 3,
    HEADERS: {
        'Content-Type': 'application/json',
    },
};

// Helper to build full URL
export const buildUrl = (endpoint: string): string => {
    return `${API_BASE_URL}${endpoint}`;
};
