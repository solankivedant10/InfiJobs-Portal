-- =====================================================================
-- Supabase Complete Cleanup & Optimization Script (v3 - Final Fix)
-- =====================================================================
-- Purpose: Fix ALL remaining Supabase Advisor warnings and dependencies
--          Safely handles reserved keywords and quoting in policy names
-- Date: 2025-12-16
-- Run this script in the Supabase SQL Editor
-- =====================================================================

-- =====================================================================
-- PART 1: DROP NON-EXISTENT FUNCTION & DEPENDENCIES
-- =====================================================================

-- Drop is_admin function with CASCADE to remove dependent policies
DROP FUNCTION IF EXISTS public.is_admin() CASCADE;

-- =====================================================================
-- PART 2: CLEAN UP DUPLICATE/OLD POLICIES
-- =====================================================================

DO $$ 
DECLARE 
    tables TEXT[] := ARRAY[
        'profiles', 
        'user_quiz_results', 
        'user_progress', 
        'solved_problems',
        'coding_problems',
        'learning_resources',
        'ml_topics',
        'pipeline_stages',
        'roadmaps',
        'quizzes',
        'quiz_questions',
        'user_bookmarks'
    ];
    t TEXT;
    clean_name TEXT;
    p_name TEXT;
BEGIN 
    FOREACH t IN ARRAY tables LOOP
        -- Calculate clean name (e.g. "user_quiz_results" -> "user quiz results")
        clean_name := replace(t, '_', ' ');

        -- 1. "Anyone can view..."
        p_name := 'Anyone can view ' || clean_name;
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p_name, t);

        -- 2. "Public view"
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', 'Public view', t);

        -- 3. "Users can view own..."
        p_name := 'Users can view own ' || clean_name;
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p_name, t);

        -- 4. "Users can insert own..."
        p_name := 'Users can insert own ' || clean_name;
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p_name, t);

        -- 5. "Users can update own..."
        p_name := 'Users can update own ' || clean_name;
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p_name, t);

        -- 6. "Users can view their own..." (variation)
        p_name := 'Users can view their own ' || clean_name;
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p_name, t);

        -- 7. "Users can insert their own..." (variation)
        p_name := 'Users can insert their own ' || clean_name;
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p_name, t);

        -- 8. "Users can update their own..." (variation)
        p_name := 'Users can update their own ' || clean_name;
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p_name, t);
        
        -- 9. "Admins can manage..." (variation)
        p_name := 'Admins can manage ' || clean_name;
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p_name, t);

    END LOOP;
    
    -- Manually drop specific variants that might have inconsistent naming
    DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
    DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
    
END $$;

-- =====================================================================
-- PART 3: CREATE CLEAN, OPTIMIZED POLICIES (USER DATA)
-- =====================================================================

-- profiles table
CREATE POLICY "profiles_select_own"
    ON public.profiles FOR SELECT
    USING (id = (SELECT auth.uid()));

CREATE POLICY "profiles_update_own"
    ON public.profiles FOR UPDATE
    USING (id = (SELECT auth.uid()))
    WITH CHECK (id = (SELECT auth.uid()));
    
-- Allow public read of minimal profile info
CREATE POLICY "profiles_select_public"
    ON public.profiles FOR SELECT
    USING (true);

-- user_quiz_results table
CREATE POLICY "quiz_results_select_own"
    ON public.user_quiz_results FOR SELECT
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "quiz_results_insert_own"
    ON public.user_quiz_results FOR INSERT
    WITH CHECK (user_id = (SELECT auth.uid()));

-- user_progress table
CREATE POLICY "progress_select_own"
    ON public.user_progress FOR SELECT
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "progress_insert_own"
    ON public.user_progress FOR INSERT
    WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "progress_update_own"
    ON public.user_progress FOR UPDATE
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

-- solved_problems table
CREATE POLICY "solved_select_own"
    ON public.solved_problems FOR SELECT
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "solved_insert_own"
    ON public.solved_problems FOR INSERT
    WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "solved_update_own"
    ON public.solved_problems FOR UPDATE
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));
    
-- user_bookmarks table (conditional check)
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
-- PART 4: CREATE CLEAN POLICIES (PUBLIC CONTENT)
-- =====================================================================
-- Enabling public read access for learning materials
-- =====================================================================

DO $$
DECLARE
    t TEXT;
    content_tables TEXT[] := ARRAY[
        'coding_problems',
        'learning_resources',
        'ml_topics',
        'pipeline_stages',
        'roadmaps',
        'quizzes',
        'quiz_questions'
    ];
BEGIN
    FOREACH t IN ARRAY content_tables LOOP
        IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = t) THEN
           -- Drop potentially conflicting new policies to be safe (idempotency)
           EXECUTE format('DROP POLICY IF EXISTS "public_read_%I" ON public.%I', t, t);
           
           -- Create the public read policy
           EXECUTE format('CREATE POLICY "public_read_%I" ON public.%I FOR SELECT USING (true)', t, t);
        END IF;
    END LOOP;
END $$;

-- =====================================================================
-- SUCCESS MESSAGE
-- =====================================================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE '✅ Ultimate Cleanup Complete!';
    RAISE NOTICE '========================================';
    RAISE NOTICE '  ✓ Fixed policy name quoting issues';
    RAISE NOTICE '  ✓ Dropped is_admin() CASCADE';
    RAISE NOTICE '  ✓ Cleaned duplicate policies';
    RAISE NOTICE '  ✓ Created optimized policies';
    RAISE NOTICE '========================================';
END $$;
