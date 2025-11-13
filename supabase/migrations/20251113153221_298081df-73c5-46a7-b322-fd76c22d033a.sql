-- No-op migration to trigger types regeneration (fixed comment)
CREATE OR REPLACE FUNCTION public._lovable_types_sync()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT true
$$;

COMMENT ON FUNCTION public._lovable_types_sync() IS 'Recreated to trigger schema sync (no-op)';
