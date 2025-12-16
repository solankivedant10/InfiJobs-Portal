-- =====================================================================
-- Supabase Security & Performance Fixes (Minimal Version)
-- =====================================================================
-- Purpose: Fix mutable search paths and optimize RLS policies
-- Date: 2025-12-16
-- Run this script in the Supabase SQL Editor
-- =====================================================================

-- =====================================================================
-- PART 1: FIX MUTABLE SEARCH PATHS (SECURITY)
-- =====================================================================
-- Issue: Functions without explicit search_path are vulnerable to 
-- search path hijacking attacks
-- Fix: Add SET search_path = public to all functions
-- =====================================================================

-- Fix 1: handle_updated_at function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.handle_updated_at() IS 'Automatically updates the updated_at timestamp. SECURITY: search_path set to public.';

-- Fix 2: handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, role, created_at, updated_at)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        NEW.email,
        'user',
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.handle_new_user() IS 'Creates a profile entry when a new user signs up. SECURITY: search_path set to public.';

-- =====================================================================
-- PART 2: OPTIMIZE RLS POLICIES (PERFORMANCE)
-- =====================================================================
-- Issue: auth.uid() is evaluated per row, causing performance bottlenecks
-- Fix: Use (SELECT auth.uid()) to evaluate once per query
-- Note: Only optimizing tables that exist in your schema
-- =====================================================================

-- ---------------------------------------------------------------------
-- Table: profiles
-- ---------------------------------------------------------------------

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Recreate optimized policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles
    FOR SELECT
    USING (id = (SELECT auth.uid()));

CREATE POLICY "Users can update their own profile"
    ON public.profiles
    FOR UPDATE
    USING (id = (SELECT auth.uid()))
    WITH CHECK (id = (SELECT auth.uid()));

-- Optional: Allow users to view other profiles (read-only)
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles
    FOR SELECT
    USING (true);

-- ---------------------------------------------------------------------
-- Table: user_quiz_results (only if exists)
-- ---------------------------------------------------------------------

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_quiz_results') THEN
        -- Drop existing policies
        EXECUTE 'DROP POLICY IF EXISTS "Users can view their own quiz results" ON public.user_quiz_results';
        EXECUTE 'DROP POLICY IF EXISTS "Users can insert their own quiz results" ON public.user_quiz_results';

        -- Recreate optimized policies
        EXECUTE '
            CREATE POLICY "Users can view their own quiz results"
                ON public.user_quiz_results
                FOR SELECT
                USING (user_id = (SELECT auth.uid()));

            CREATE POLICY "Users can insert their own quiz results"
                ON public.user_quiz_results
                FOR INSERT
                WITH CHECK (user_id = (SELECT auth.uid()));
        ';
        
        RAISE NOTICE '✓ user_quiz_results policies optimized';
    ELSE
        RAISE NOTICE '⊘ user_quiz_results table does not exist, skipping';
    END IF;
END $$;

-- ---------------------------------------------------------------------
-- Table: user_progress (only if exists)
-- ---------------------------------------------------------------------

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_progress') THEN
        -- Drop existing policies
        EXECUTE 'DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress';
        EXECUTE 'DROP POLICY IF EXISTS "Users can insert their own progress" ON public.user_progress';
        EXECUTE 'DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress';

        -- Recreate optimized policies
        EXECUTE '
            CREATE POLICY "Users can view their own progress"
                ON public.user_progress
                FOR SELECT
                USING (user_id = (SELECT auth.uid()));

            CREATE POLICY "Users can insert their own progress"
                ON public.user_progress
                FOR INSERT
                WITH CHECK (user_id = (SELECT auth.uid()));

            CREATE POLICY "Users can update their own progress"
                ON public.user_progress
                FOR UPDATE
                USING (user_id = (SELECT auth.uid()))
                WITH CHECK (user_id = (SELECT auth.uid()));
        ';
        
        RAISE NOTICE '✓ user_progress policies optimized';
    ELSE
        RAISE NOTICE '⊘ user_progress table does not exist, skipping';
    END IF;
END $$;

-- ---------------------------------------------------------------------
-- Table: solved_problems (only if exists)
-- ---------------------------------------------------------------------

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'solved_problems') THEN
        -- Drop existing policies
        EXECUTE 'DROP POLICY IF EXISTS "Users can view their own solved problems" ON public.solved_problems';
        EXECUTE 'DROP POLICY IF EXISTS "Users can insert their own solved problems" ON public.solved_problems';
        EXECUTE 'DROP POLICY IF EXISTS "Users can update their own solved problems" ON public.solved_problems';

        -- Recreate optimized policies
        EXECUTE '
            CREATE POLICY "Users can view their own solved problems"
                ON public.solved_problems
                FOR SELECT
                USING (user_id = (SELECT auth.uid()));

            CREATE POLICY "Users can insert their own solved problems"
                ON public.solved_problems
                FOR INSERT
                WITH CHECK (user_id = (SELECT auth.uid()));

            CREATE POLICY "Users can update their own solved problems"
                ON public.solved_problems
                FOR UPDATE
                USING (user_id = (SELECT auth.uid()))
                WITH CHECK (user_id = (SELECT auth.uid()));
        ';
        
        RAISE NOTICE '✓ solved_problems policies optimized';
    ELSE
        RAISE NOTICE '⊘ solved_problems table does not exist, skipping';
    END IF;
END $$;

-- =====================================================================
-- VERIFICATION QUERIES
-- =====================================================================

-- Verify functions have search_path set
SELECT 
    p.proname AS function_name,
    pg_get_function_identity_arguments(p.oid) AS arguments,
    p.prosecdef AS is_security_definer,
    p.proconfig AS config_settings
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
AND p.proname IN ('handle_updated_at', 'handle_new_user')
ORDER BY p.proname;

-- Verify RLS policies exist and are optimized
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- =====================================================================
-- SUCCESS MESSAGE
-- =====================================================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE '✅ Security & Performance Fixes Applied!';
    RAISE NOTICE '========================================';
    RAISE NOTICE '';
    RAISE NOTICE 'SECURITY FIXES:';
    RAISE NOTICE '  ✓ handle_updated_at() - search_path = public';
    RAISE NOTICE '  ✓ handle_new_user() - search_path = public';
    RAISE NOTICE '';
    RAISE NOTICE 'PERFORMANCE OPTIMIZATIONS:';
    RAISE NOTICE '  ✓ profiles - RLS policies optimized';
    RAISE NOTICE '  ✓ Other tables - optimized if they exist';
    RAISE NOTICE '';
    RAISE NOTICE 'Run verification queries above to confirm.';
    RAISE NOTICE '========================================';
END $$;
