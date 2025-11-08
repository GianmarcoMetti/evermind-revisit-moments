-- Create memories table
CREATE TABLE public.memories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_user_id TEXT NOT NULL,
  created_by_name TEXT NOT NULL,
  created_by_relationship TEXT NOT NULL,
  title TEXT NOT NULL,
  story TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  location TEXT,
  media_url TEXT,
  category TEXT DEFAULT 'family',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read memories (for family sharing)
CREATE POLICY "Anyone can view memories"
  ON public.memories
  FOR SELECT
  USING (true);

-- Allow insertions from authenticated sources (Telegram bot will use service role)
CREATE POLICY "Service role can insert memories"
  ON public.memories
  FOR INSERT
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_memories_telegram_user ON public.memories(telegram_user_id);
CREATE INDEX idx_memories_date ON public.memories(date DESC);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_memories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_memories_updated_at
  BEFORE UPDATE ON public.memories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_memories_updated_at();