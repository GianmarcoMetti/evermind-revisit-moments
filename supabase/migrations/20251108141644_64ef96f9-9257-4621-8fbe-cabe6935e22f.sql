-- Create people table
CREATE TABLE public.people (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  relationship_to_user TEXT NOT NULL,
  avatar TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create junction table for memories and people (many-to-many)
CREATE TABLE public.memory_people (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  memory_id UUID NOT NULL REFERENCES public.memories(id) ON DELETE CASCADE,
  person_id UUID NOT NULL REFERENCES public.people(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(memory_id, person_id)
);

-- Enable RLS
ALTER TABLE public.people ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memory_people ENABLE ROW LEVEL SECURITY;

-- RLS policies for people table
CREATE POLICY "Anyone can view people"
  ON public.people
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert people"
  ON public.people
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update people"
  ON public.people
  FOR UPDATE
  USING (true);

-- RLS policies for memory_people table
CREATE POLICY "Anyone can view memory_people"
  ON public.memory_people
  FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert memory_people"
  ON public.memory_people
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can delete memory_people"
  ON public.memory_people
  FOR DELETE
  USING (true);

-- Create trigger for automatic timestamp updates on people
CREATE TRIGGER update_people_updated_at
  BEFORE UPDATE ON public.people
  FOR EACH ROW
  EXECUTE FUNCTION public.update_memories_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_memory_people_memory_id ON public.memory_people(memory_id);
CREATE INDEX idx_memory_people_person_id ON public.memory_people(person_id);