import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Person } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export const usePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchPeople = async () => {
    try {
      const { data, error } = await supabase
        .from('people')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      const mappedPeople: Person[] = (data || []).map((person) => ({
        id: person.id,
        name: person.name,
        relationshipToUser: person.relationship_to_user,
        avatar: person.avatar || undefined,
        bio: person.bio || undefined,
        birthYear: person.birth_year || undefined,
        passedAway: person.passed_away || undefined,
        location: person.location || undefined,
        career: person.career || undefined,
        personality: person.personality || undefined,
        quote: person.quote || undefined,
        legacy: person.legacy || undefined,
        summary: person.summary || undefined,
      }));

      setPeople(mappedPeople);
    } catch (error) {
      console.error('Error fetching people:', error);
      toast({
        title: 'Error',
        description: 'Failed to load people',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPeople();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('people-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'people',
        },
        () => {
          fetchPeople();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { people, isLoading };
};
