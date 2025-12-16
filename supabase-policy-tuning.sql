-- =====================================================================
-- Supabase Policy Tuning & Optimization Script
-- =====================================================================
-- Purpose: Remove redundant policies and fix Admin/Public overlaps.
--          1. Drop redundant profile SELECT policy.
--          2. Restore Admin capabilities using distinct actions (INSERT/UPDATE/DELETE).
--          3. Fix "Multiple Permissive Policies" warnings by resolving overlaps.
-- Date: 2025-12-16
-- Run this script in the Supabase SQL Editor
-- =====================================================================

-- =====================================================================
-- PART 1: RE-CREATE is_admin FUNCTION (CORRECTLY)
-- =====================================================================
-- Previous error showed 'is_admin' column missing.
-- We must use 'role' column instead.
-- =====================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = (SELECT auth.uid())
        AND role = 'admin'
    );
END;
$$;

COMMENT ON FUNCTION public.is_admin() IS 'Checks if user has admin role. SECURITY: search_path set to public.';

-- =====================================================================
-- PART 2: FIX PROFILE REDUNDANCY
-- =====================================================================
-- 'profiles_select_public' already allows everyone to view profiles.
-- 'profiles_select_own' is redundant overhead.
-- =====================================================================

DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
-- (Redundant because profiles_select_public uses 'true')

-- =====================================================================
-- PART 3: FIX ADMIN/PUBLIC OVERLAP (CONTENT TABLES)
-- =====================================================================
-- Problem: 'Admins can manage...' (FOR ALL) overlaps with 'Public Read' (FOR SELECT).
-- Fix: Split Admin policies into INSERT, UPDATE, DELETE only.
--      Admins will use the Public policy for SELECT access.
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
        -- 1. Drop any lingering "Admins can manage..." policies
        EXECUTE format('DROP POLICY IF EXISTS "Admins can manage %I" ON public.%I', replace(t, '_', ' '), t);
        
        -- 2. Drop potential explicit admin policies if they exist to avoid dupe errors
        EXECUTE format('DROP POLICY IF EXISTS "admin_insert_%I" ON public.%I', t, t);
        EXECUTE format('DROP POLICY IF EXISTS "admin_update_%I" ON public.%I', t, t);
        EXECUTE format('DROP POLICY IF EXISTS "admin_delete_%I" ON public.%I', t, t);

        IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = t) THEN
            -- 3. Create distinct Admin policies (No SELECT)
            
            -- INSERT
            EXECUTE format('
                CREATE POLICY "admin_insert_%I" ON public.%I
                FOR INSERT
                WITH CHECK (public.is_admin())
            ', t, t);

            -- UPDATE
            EXECUTE format('
                CREATE POLICY "admin_update_%I" ON public.%I
                FOR UPDATE
                USING (public.is_admin())
                WITH CHECK (public.is_admin())
            ', t, t);

            -- DELETE
            EXECUTE format('
                CREATE POLICY "admin_delete_%I" ON public.%I
                FOR DELETE
                USING (public.is_admin())
            ', t, t);
            
            RAISE NOTICE '✓ Created Admin policies for %', t;
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
    RAISE NOTICE '✅ POLICY TUNING COMPLETE';
    RAISE NOTICE '========================================';
    RAISE NOTICE '1. Created correct is_admin() function (checking role).';
    RAISE NOTICE '2. Dropped redundant "profiles_select_own".';
    RAISE NOTICE '3. Separated Admin access into INSERT/UPDATE/DELETE.';
    RAISE NOTICE '4. Eliminated Admin/Public SELECT overlaps.';
    RAISE NOTICE '========================================';
END $$;
