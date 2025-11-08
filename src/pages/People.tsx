import { useNavigate } from 'react-router-dom';
import { usePeople } from '@/hooks/usePeople';
import { Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

const People = () => {
  const navigate = useNavigate();
  const { people, isLoading } = usePeople();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold">People You Know</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : people.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No people found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {people.map((person) => {
              const initials = person.name.split(' ').map(n => n[0]).join('').toUpperCase();
              return (
                <Card
                  key={person.id}
                  onClick={() => navigate(`/person/${person.id}`)}
                  className="p-6 flex flex-col shadow-soft hover:shadow-soft-md transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-16 w-16 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold mb-1 truncate">{person.name}</h2>
                      <p className="text-sm text-muted-foreground capitalize mb-1">{person.relationshipToUser}</p>
                      {person.summary && (
                        <p className="text-sm text-muted-foreground">{person.summary}</p>
                      )}
                    </div>
                  </div>
                  
                  {person.quote && (
                    <div className="mt-auto pt-4 border-t border-border">
                      <p className="text-sm italic text-muted-foreground line-clamp-2">
                        &ldquo;{person.quote}&rdquo;
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default People;
