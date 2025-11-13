-- Harmless schema bump to trigger Supabase types regeneration
-- Creates/updates a tiny function in the public schema
CREATE OR REPLACE FUNCTION public._lovable_types_sync()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT true
$$;
