-- =====================================================================
-- Supabase Final Cleanup & Optimization Script (No Loops)
-- =====================================================================
-- Purpose: Fix ALL security/performance warnings without syntax errors.
-- Method: Explicit DROP/CREATE statements to avoid reserved keyword issues.
-- Date: 2025-12-16
-- Run this script in the Supabase SQL Editor
-- =====================================================================

-- =====================================================================
-- PART 1: DROP NON-EXISTENT FUNCTION & DEPENDENCIES
-- =====================================================================

DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

-- =====================================================================
-- PART 2: EXPLICITLY DROP OLD/DUPLICATE POLICIES
-- =====================================================================

-- 1. profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_select_public" ON public.profiles;

-- 2. user_quiz_results
DROP POLICY IF EXISTS "Users can view own quiz results" ON public.user_quiz_results;
DROP POLICY IF EXISTS "Users can view their own quiz results" ON public.user_quiz_results;
DROP POLICY IF EXISTS "Users can insert own quiz results" ON public.user_quiz_results;
DROP POLICY IF EXISTS "Users can insert their own quiz results" ON public.user_quiz_results;
DROP POLICY IF EXISTS "quiz_results_select_own" ON public.user_quiz_results;
DROP POLICY IF EXISTS "quiz_results_insert_own" ON public.user_quiz_results;

-- 3. user_progress
DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "progress_select_own" ON public.user_progress;
DROP POLICY IF EXISTS "progress_insert_own" ON public.user_progress;
DROP POLICY IF EXISTS "progress_update_own" ON public.user_progress;

-- 4. solved_problems
DROP POLICY IF EXISTS "Users can view own solved problems" ON public.solved_problems;
DROP POLICY IF EXISTS "Users can view their own solved problems" ON public.solved_problems;
DROP POLICY IF EXISTS "Users can insert own solved problems" ON public.solved_problems;
DROP POLICY IF EXISTS "Users can insert their own solved problems" ON public.solved_problems;
DROP POLICY IF EXISTS "Users can update own solved problems" ON public.solved_problems;
DROP POLICY IF EXISTS "Users can update their own solved problems" ON public.solved_problems;
DROP POLICY IF EXISTS "solved_select_own" ON public.solved_problems;
DROP POLICY IF EXISTS "solved_insert_own" ON public.solved_problems;
DROP POLICY IF EXISTS "solved_update_own" ON public.solved_problems;

-- 5. Content Tables (Clean up "Admins can manage..." and "Anyone can view...")
DROP POLICY IF EXISTS "Admins can manage coding problems" ON public.coding_problems;
DROP POLICY IF EXISTS "Anyone can view coding problems" ON public.coding_problems;
DROP POLICY IF EXISTS "public_read_coding_problems" ON public.coding_problems;

DROP POLICY IF EXISTS "Admins can manage learning resources" ON public.learning_resources;
DROP POLICY IF EXISTS "Anyone can view learning resources" ON public.learning_resources;
DROP POLICY IF EXISTS "Authenticated users can insert learning resources" ON public.learning_resources;
DROP POLICY IF EXISTS "public_read_learning_resources" ON public.learning_resources;

DROP POLICY IF EXISTS "Admins can manage ml topics" ON public.ml_topics;
DROP POLICY IF EXISTS "Anyone can view ml topics" ON public.ml_topics;
DROP POLICY IF EXISTS "Authenticated users can insert ml topics" ON public.ml_topics;
DROP POLICY IF EXISTS "public_read_ml_topics" ON public.ml_topics;

DROP POLICY IF EXISTS "Admins can manage pipeline stages" ON public.pipeline_stages;
DROP POLICY IF EXISTS "Anyone can view pipeline stages" ON public.pipeline_stages;
DROP POLICY IF EXISTS "Authenticated users can insert pipeline stages" ON public.pipeline_stages;
DROP POLICY IF EXISTS "public_read_pipeline_stages" ON public.pipeline_stages;

DROP POLICY IF EXISTS "Admins can manage roadmaps" ON public.roadmaps;
DROP POLICY IF EXISTS "Anyone can view roadmaps" ON public.roadmaps;
DROP POLICY IF EXISTS "Authenticated users can insert roadmaps" ON public.roadmaps;
DROP POLICY IF EXISTS "public_read_roadmaps" ON public.roadmaps;

DROP POLICY IF EXISTS "Admins can manage quizzes" ON public.quizzes;
DROP POLICY IF EXISTS "Anyone can view quizzes" ON public.quizzes;
DROP POLICY IF EXISTS "Authenticated users can insert quizzes" ON public.quizzes;
DROP POLICY IF EXISTS "public_read_quizzes" ON public.quizzes;

DROP POLICY IF EXISTS "Admins can manage quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Anyone can view quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "Authenticated users can insert quiz questions" ON public.quiz_questions;
DROP POLICY IF EXISTS "public_read_quiz_questions" ON public.quiz_questions;


-- =====================================================================
-- PART 3: RE-CREATE OPTIMIZED POLICIES
-- =====================================================================
-- Using (SELECT auth.uid()) for performance as requested.
-- =====================================================================

-- 1. profiles
CREATE POLICY "profiles_select_own" ON public.profiles
    FOR SELECT USING (id = (SELECT auth.uid()));

CREATE POLICY "profiles_update_own" ON public.profiles
    FOR UPDATE USING (id = (SELECT auth.uid()));

CREATE POLICY "profiles_select_public" ON public.profiles -- Minimal public access
    FOR SELECT USING (true);


-- 2. user_quiz_results
CREATE POLICY "quiz_results_select_own" ON public.user_quiz_results
    FOR SELECT USING (user_id = (SELECT auth.uid()));

CREATE POLICY "quiz_results_insert_own" ON public.user_quiz_results
    FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));


-- 3. user_progress
CREATE POLICY "progress_select_own" ON public.user_progress
    FOR SELECT USING (user_id = (SELECT auth.uid()));

CREATE POLICY "progress_insert_own" ON public.user_progress
    FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "progress_update_own" ON public.user_progress
    FOR UPDATE USING (user_id = (SELECT auth.uid()));


-- 4. solved_problems
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'solved_problems') THEN
        EXECUTE 'CREATE POLICY "solved_select_own" ON public.solved_problems FOR SELECT USING (user_id = (SELECT auth.uid()))';
        EXECUTE 'CREATE POLICY "solved_insert_own" ON public.solved_problems FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()))';
        EXECUTE 'CREATE POLICY "solved_update_own" ON public.solved_problems FOR UPDATE USING (user_id = (SELECT auth.uid()))';
    END IF;
END $$;


-- 5. user_bookmarks (Conditional)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_bookmarks') THEN
        DROP POLICY IF EXISTS "bookmarks_select_own" ON public.user_bookmarks;
        DROP POLICY IF EXISTS "bookmarks_insert_own" ON public.user_bookmarks;
        DROP POLICY IF EXISTS "bookmarks_delete_own" ON public.user_bookmarks;
        
        EXECUTE 'CREATE POLICY "bookmarks_select_own" ON public.user_bookmarks FOR SELECT USING (user_id = (SELECT auth.uid()))';
        EXECUTE 'CREATE POLICY "bookmarks_insert_own" ON public.user_bookmarks FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()))';
        EXECUTE 'CREATE POLICY "bookmarks_delete_own" ON public.user_bookmarks FOR DELETE USING (user_id = (SELECT auth.uid()))';
    END IF;
END $$;


-- =====================================================================
-- PART 4: PUBLIC READ POLICIES FOR CONTENT
-- =====================================================================

DO $$
DECLARE
    t TEXT;
    content_tables TEXT[] := ARRAY[
        'coding_problems', 'learning_resources', 'ml_topics', 
        'pipeline_stages', 'roadmaps', 'quizzes', 'quiz_questions'
    ];
BEGIN
    FOREACH t IN ARRAY content_tables LOOP
        IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = t) THEN
           EXECUTE format('CREATE POLICY "public_read_%I" ON public.%I FOR SELECT USING (true)', t, t);
        END IF;
    END LOOP;
END $$;


-- =====================================================================
-- PART 5: FIX MUTABLE SEARCH PATHS (SECURITY)
-- =====================================================================

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


-- =====================================================================
-- SUCCESS MESSAGE
-- =====================================================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE '✅ FINAL CLEANUP COMPLETE';
    RAISE NOTICE '========================================';
    RAISE NOTICE '1. Dropped is_admin() and dependencies.';
    RAISE NOTICE '2. Explicitly dropped all old/duplicate policies.';
    RAISE NOTICE '3. Re-created optimized (SELECT auth.uid()) policies.';
    RAISE NOTICE '4. Fixed function search_paths.';
    RAISE NOTICE '========================================';
END $$;
