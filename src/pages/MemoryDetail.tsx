import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PeopleChip } from '@/components/PeopleChip';
import { RelationshipBadge } from '@/components/RelationshipBadge';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MemoryPost } from '@/lib/types';

const MemoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [memory, setMemory] = useState<MemoryPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMemory = async () => {
      try {
        const { data, error } = await supabase
          .from('memories')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (data) {
          setMemory({
            id: data.id,
            title: data.title,
            date: data.date,
            location: data.location || undefined,
            media: {
              url: data.media_url || '',
              aspect: 'square' as const,
            },
            people: [],
            story: data.story,
            postedBy: {
              name: data.created_by_name,
              relationship: data.created_by_relationship,
            },
            category: data.category as any,
          });
        }
      } catch (error) {
        console.error('Error fetching memory:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMemory();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!memory) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Memory not found</h1>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative">
        <img
          src={memory.media.url}
          alt={memory.title}
          className="w-full h-[50vh] object-cover"
        />
        <div className="absolute top-4 left-4">
          <Button
            onClick={() => navigate('/')}
            size="icon"
            className="rounded-full bg-card/80 backdrop-blur-md hover:bg-card shadow-soft-md"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <Card className="p-6 shadow-soft-lg">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-semibold">{memory.title}</h1>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Volume2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(memory.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            {memory.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{memory.location}</span>
              </div>
            )}
          </div>

          {memory.people.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">People in this memory</h2>
              <div className="flex flex-wrap gap-2">
                {memory.people.map((person) => (
                  <PeopleChip key={person.id} person={person} />
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">The Story</h2>
            <p className="text-lg leading-relaxed">{memory.story}</p>
          </div>

          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Posted by</p>
            <RelationshipBadge
              name={memory.postedBy.name}
              relationship={memory.postedBy.relationship}
            />
          </div>
        </Card>

      </div>
    </div>
  );
};

export default MemoryDetail;
