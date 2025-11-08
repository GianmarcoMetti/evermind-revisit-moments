import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Heart, Calendar, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Person } from '@/lib/types';
import { Loader2 } from 'lucide-react';

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const { data, error } = await supabase
          .from('people')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        if (data) {
          setPerson({
            id: data.id,
            name: data.name,
            relationshipToUser: data.relationship_to_user,
            avatar: data.avatar || undefined,
            bio: data.bio || undefined,
            birthYear: data.birth_year || undefined,
            passedAway: data.passed_away || undefined,
            location: data.location || undefined,
            career: data.career || undefined,
            personality: data.personality || undefined,
            quote: data.quote || undefined,
            legacy: data.legacy || undefined,
            summary: data.summary || undefined,
          });
        }
      } catch (error) {
        console.error('Error fetching person:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPerson();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Person not found</h1>
          <Button onClick={() => navigate('/people')}>Back to People</Button>
        </div>
      </div>
    );
  }

  const initials = person.name.split(' ').map(n => n[0]).join('').toUpperCase();
  const currentAge = person.birthYear && !person.passedAway ? new Date().getFullYear() - person.birthYear : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            onClick={() => navigate('/people')}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold">{person.name}</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Card */}
          <Card className="p-8 shadow-soft-lg">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{person.name}</h2>
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
                    <Heart className="h-4 w-4 text-primary" />
                    <span className="font-medium capitalize">{person.relationshipToUser}</span>
                  </span>
                  {person.location && (
                    <span className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full text-sm">
                      <MapPin className="h-4 w-4" />
                      {person.location}
                    </span>
                  )}
                  {person.birthYear && (
                    <span className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full text-sm">
                      <Calendar className="h-4 w-4" />
                      Born {person.birthYear}
                      {currentAge && ` (age ${currentAge})`}
                    </span>
                  )}
                </div>
                {person.summary && (
                  <p className="text-lg text-muted-foreground">{person.summary}</p>
                )}
              </div>
            </div>

            {person.quote && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex gap-3 items-start">
                  <Quote className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg italic text-foreground">"{person.quote}"</p>
                </div>
              </div>
            )}
          </Card>

          {/* Bio Section */}
          {person.bio && (
            <Card className="p-6 shadow-soft">
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <p className="text-foreground leading-relaxed whitespace-pre-line">{person.bio}</p>
            </Card>
          )}

          {/* Career Section */}
          {person.career && (
            <Card className="p-6 shadow-soft">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">Career</h3>
              </div>
              <p className="text-foreground leading-relaxed">{person.career}</p>
            </Card>
          )}

          {/* Personality Section */}
          {person.personality && (
            <Card className="p-6 shadow-soft">
              <h3 className="text-xl font-semibold mb-4">Personality & Relationship</h3>
              <p className="text-foreground leading-relaxed whitespace-pre-line">{person.personality}</p>
            </Card>
          )}

          {/* Legacy Section */}
          {person.legacy && (
            <Card className="p-6 shadow-soft">
              <h3 className="text-xl font-semibold mb-4">Legacy</h3>
              <p className="text-foreground leading-relaxed whitespace-pre-line">{person.legacy}</p>
            </Card>
          )}

          {/* Passed Away Notice */}
          {person.passedAway && (
            <Card className="p-6 shadow-soft bg-muted/30">
              <p className="text-foreground">{person.passedAway}</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default PersonDetail;
