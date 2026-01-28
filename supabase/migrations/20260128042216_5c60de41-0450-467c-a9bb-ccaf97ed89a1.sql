-- Create table to track download button clicks
CREATE TABLE public.download_clicks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  clicked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  store_type TEXT NOT NULL CHECK (store_type IN ('app_store', 'google_play')),
  country TEXT,
  country_code TEXT,
  city TEXT,
  user_agent TEXT,
  referrer TEXT
);

-- Enable RLS but allow public inserts (for tracking) and reads (for analytics)
ALTER TABLE public.download_clicks ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (tracking clicks)
CREATE POLICY "Anyone can insert download clicks"
ON public.download_clicks
FOR INSERT
WITH CHECK (true);

-- Allow anyone to read (public analytics)
CREATE POLICY "Anyone can view download analytics"
ON public.download_clicks
FOR SELECT
USING (true);

-- Create index for faster queries
CREATE INDEX idx_download_clicks_clicked_at ON public.download_clicks(clicked_at DESC);
CREATE INDEX idx_download_clicks_store_type ON public.download_clicks(store_type);
CREATE INDEX idx_download_clicks_country_code ON public.download_clicks(country_code);