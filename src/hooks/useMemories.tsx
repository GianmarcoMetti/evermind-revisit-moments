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
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedMemories: MemoryPost[] = (data || []).map((memory) => ({
        id: memory.id,
        title: memory.title,
        date: memory.date,
        location: memory.location || undefined,
        media: {
          url: memory.media_url || '',
          aspect: 'square' as const,
        },
        people: [],
        story: memory.story,
        postedBy: {
          name: memory.created_by_name,
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
