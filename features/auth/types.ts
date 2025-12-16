/**
 * Auth Feature Module - Types
 * Centralized type definitions for authentication
 */

export interface User {
    id: string;
    name: string;
    email?: string;
    isAdmin?: boolean;
    createdAt?: number;
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    user?: User;
    token?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}
