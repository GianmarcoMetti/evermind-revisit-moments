import { useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
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
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <SidebarTrigger />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {people.map((person) => {
              const initials = person.name.split(' ').map(n => n[0]).join('').toUpperCase();
              return (
                <Card
                  key={person.id}
                  className="p-6 flex flex-col items-center text-center shadow-soft hover:shadow-soft-md transition-all cursor-pointer"
                >
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold mb-1">{person.name}</h2>
                  <p className="text-muted-foreground capitalize">{person.relationshipToUser}</p>
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
