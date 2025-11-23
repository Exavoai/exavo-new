-- Add project progress tracking to appointments
ALTER TABLE public.appointments 
ADD COLUMN project_progress INTEGER DEFAULT 0 CHECK (project_progress >= 0 AND project_progress <= 100),
ADD COLUMN project_status TEXT DEFAULT 'not_started' CHECK (project_status IN ('not_started', 'in_progress', 'review', 'completed', 'on_hold'));