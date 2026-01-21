-- Add category and featured_image_url columns to posts table
ALTER TABLE public.posts 
ADD COLUMN category text DEFAULT 'General',
ADD COLUMN featured_image_url text;

-- Create index on category for faster filtering
CREATE INDEX idx_posts_category ON public.posts(category);