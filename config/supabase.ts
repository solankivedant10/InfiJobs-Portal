/**
 * Supabase Client Configuration
 * 
 * Initializes the Supabase client for database and auth operations.
 * Requires environment variables:
 * - VITE_SUPABASE_URL: Your Supabase project URL
 * - VITE_SUPABASE_ANON_KEY: Your Supabase anonymous/public key
 */

import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
const isProduction = import.meta.env.MODE === 'production';

if (!supabaseUrl || !supabaseAnonKey) {
    const message = 'Missing required environment variables: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY';
    if (isProduction) {
        throw new Error(message);
    }
    console.error(message + '. Add them to .env.local for local development.');
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});

// Helper function to check connection
export const testConnection = async (): Promise<boolean> => {
    try {
        const { error } = await supabase.from('profiles').select('count').limit(1);
        if (error) {
            console.error('Supabase connection test failed:', error.message);
            return false;
        }
        console.log('✓ Supabase connection successful');
        return true;
    } catch (err) {
        console.error('Supabase connection error:', err);
        return false;
    }
};
