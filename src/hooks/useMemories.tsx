import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MemoryPost } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export const useMemories = () => {
  const [memories, setMemories] = useState<MemoryPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMemories = async () => {
    try {
      const { data: memoriesData, error: memoriesError } = await supabase
        .from('memories')
        .select('*')
        .order('created_at', { ascending: false });

      if (memoriesError) throw memoriesError;

      // Fetch all memory-people relationships
      const { data: memoryPeopleData, error: memoryPeopleError } = await supabase
        .from('memory_people')
        .select(`
          memory_id,
          people:person_id (
            id,
            name,
            relationship_to_user,
            avatar
          )
        `);

      if (memoryPeopleError) throw memoryPeopleError;

      // Create a map of memory_id to people
      const memoryPeopleMap = new Map<string, any[]>();
      (memoryPeopleData || []).forEach((mp: any) => {
        const memoryId = mp.memory_id;
        if (!memoryPeopleMap.has(memoryId)) {
          memoryPeopleMap.set(memoryId, []);
        }
        if (mp.people) {
          memoryPeopleMap.get(memoryId)?.push({
            id: mp.people.id,
            name: mp.people.name,
            relationshipToUser: mp.people.relationship_to_user,
            avatar: mp.people.avatar,
          });
        }
      });

      const mappedMemories: MemoryPost[] = (memoriesData || []).map((memory) => ({
        id: memory.id,
        title: memory.title,
        date: memory.date,
        location: memory.location || undefined,
        media: {
          url: memory.media_url || '',
          aspect: 'square' as const,
        },
        people: memoryPeopleMap.get(memory.id) || [],
        story: memory.story,
        postedBy: {
          relationship: memory.created_by_relationship,
        },
        category: memory.category as any,
      }));

      setMemories(mappedMemories);
    } catch (error) {
      console.error('Error fetching memories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load memories',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('memories-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'memories',
        },
        () => {
          fetchMemories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { memories, isLoading };
};
