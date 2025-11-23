-- Create site_settings table for dynamic configuration
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can view settings (needed for public pages)
CREATE POLICY "Anyone can view settings"
ON public.site_settings
FOR SELECT
USING (true);

-- Only admins can modify settings
CREATE POLICY "Admins can modify settings"
ON public.site_settings
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for better query performance
CREATE INDEX idx_site_settings_key ON public.site_settings(key);
CREATE INDEX idx_site_settings_category ON public.site_settings(category);

-- Insert default settings
INSERT INTO public.site_settings (key, value, category, description) VALUES
  ('site_name', 'Exavo AI', 'general', 'Website name'),
  ('site_description', 'Transform your business with AI-powered solutions', 'general', 'Website description'),
  ('contact_email', 'admin@exavo.ai', 'general', 'Primary contact email'),
  ('logo_url', '/src/assets/exavo-logo.png', 'branding', 'Main logo URL'),
  ('favicon_url', '/favicon.ico', 'branding', 'Favicon URL'),
  ('primary_color', '#8B5CF6', 'branding', 'Primary brand color'),
  ('secondary_color', '#7C3AED', 'branding', 'Secondary brand color'),
  ('accent_color', '#A78BFA', 'branding', 'Accent color'),
  ('hero_title', 'Transform Your Business with AI', 'branding', 'Hero section title'),
  ('hero_subtitle', 'Unlock the power of artificial intelligence', 'branding', 'Hero section subtitle'),
  ('maintenance_mode', 'false', 'general', 'Enable maintenance mode'),
  ('allow_registration', 'true', 'general', 'Allow user registration'),
  ('feature_bookings', 'true', 'features', 'Enable booking system'),
  ('feature_payments', 'true', 'features', 'Enable payment processing'),
  ('feature_chatbot', 'true', 'features', 'Enable AI chatbot'),
  ('feature_tickets', 'true', 'features', 'Enable support tickets'),
  ('notify_new_users', 'true', 'notifications', 'Notify on new user registrations'),
  ('notify_new_bookings', 'true', 'notifications', 'Notify on new bookings'),
  ('notify_new_payments', 'true', 'notifications', 'Notify on new payments'),
  ('notify_new_tickets', 'true', 'notifications', 'Notify on new support tickets'),
  ('smtp_host', '', 'email', 'SMTP host'),
  ('smtp_port', '587', 'email', 'SMTP port'),
  ('smtp_user', '', 'email', 'SMTP username'),
  ('smtp_password', '', 'email', 'SMTP password'),
  ('currency', 'USD', 'payments', 'Default currency');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_site_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_site_settings_updated_at();