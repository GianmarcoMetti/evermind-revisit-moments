import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Heart, Quote, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { usePeople } from '@/hooks/usePeople';
import { useMemories } from '@/hooks/useMemories';

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { people, isLoading: peopleLoading } = usePeople();
  const { memories, isLoading: memoriesLoading } = useMemories();

  const person = people.find(p => p.id === id);
  const personMemories = memories.filter(m => m.people.some(p => p.id === id));

  if (peopleLoading || memoriesLoading) {
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
  const age = person.birthYear ? new Date().getFullYear() - person.birthYear : null;

  return (
    <div className="min-h-screen bg-background pb-8">
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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Card */}
        <Card className="p-8 shadow-soft-lg mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-32 w-32 shrink-0">
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{person.name}</h2>
              <p className="text-xl text-muted-foreground capitalize mb-4">{person.relationshipToUser}</p>
              
              <div className="space-y-2">
                {person.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{person.location}</span>
                  </div>
                )}
                {person.career && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    <span>{person.career}</span>
                  </div>
                )}
                {person.birthYear && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span>Born {person.birthYear}{age && !person.passedAway && ` (age ${age})`}</span>
                  </div>
                )}
                {person.passedAway && (
                  <div className="text-muted-foreground">
                    <span>{person.passedAway}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Quote Card */}
        {person.quote && (
          <Card className="p-6 shadow-soft mb-6 bg-secondary/30">
            <div className="flex gap-4">
              <Quote className="h-8 w-8 text-primary shrink-0" />
              <div>
                <p className="text-lg italic leading-relaxed">&ldquo;{person.quote}&rdquo;</p>
                <p className="text-sm text-muted-foreground mt-2">— Lotte about {person.name}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Biography Section */}
        {person.bio && (
          <Card className="p-6 shadow-soft mb-6">
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <p className="text-lg leading-relaxed whitespace-pre-line">{person.bio}</p>
          </Card>
        )}

        {/* Personality Section */}
        {person.personality && (
          <Card className="p-6 shadow-soft mb-6">
            <h3 className="text-xl font-semibold mb-4">Personality & Relationship</h3>
            <p className="text-lg leading-relaxed whitespace-pre-line">{person.personality}</p>
          </Card>
        )}

        {/* Legacy Section */}
        {person.legacy && (
          <Card className="p-6 shadow-soft mb-6">
            <h3 className="text-xl font-semibold mb-4">Legacy</h3>
            <p className="text-lg leading-relaxed whitespace-pre-line">{person.legacy}</p>
          </Card>
        )}

        {/* Shared Memories Section */}
        {personMemories.length > 0 && (
          <Card className="p-6 shadow-soft">
            <h3 className="text-xl font-semibold mb-4">Shared Memories ({personMemories.length})</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {personMemories.map((memory) => (
                <div
                  key={memory.id}
                  onClick={() => navigate(`/memory/${memory.id}`)}
                  className="relative overflow-hidden rounded-lg cursor-pointer transition-all hover:scale-105 shadow-soft"
                >
                  <img
                    src={memory.media.url}
                    alt={memory.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                    <span className="text-white text-sm font-medium">{memory.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default PersonDetail;
