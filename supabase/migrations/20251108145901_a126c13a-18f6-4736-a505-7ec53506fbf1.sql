-- Add detailed person information fields to people table
ALTER TABLE public.people
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS birth_year INTEGER,
ADD COLUMN IF NOT EXISTS passed_away TEXT,
ADD COLUMN IF NOT EXISTS location TEXT,
ADD COLUMN IF NOT EXISTS career TEXT,
ADD COLUMN IF NOT EXISTS personality TEXT,
ADD COLUMN IF NOT EXISTS quote TEXT,
ADD COLUMN IF NOT EXISTS legacy TEXT,
ADD COLUMN IF NOT EXISTS summary TEXT;

COMMENT ON COLUMN public.people.bio IS 'Detailed biography and personal story';
COMMENT ON COLUMN public.people.birth_year IS 'Year of birth';
COMMENT ON COLUMN public.people.passed_away IS 'Information about passing if deceased';
COMMENT ON COLUMN public.people.location IS 'Current location or last known location';
COMMENT ON COLUMN public.people.career IS 'Career and professional information';
COMMENT ON COLUMN public.people.personality IS 'Personality traits and characteristics';
COMMENT ON COLUMN public.people.quote IS 'Memorable quote or saying';
COMMENT ON COLUMN public.people.legacy IS 'Legacy and lasting impact';
COMMENT ON COLUMN public.people.summary IS 'Short one-line summary for card display';