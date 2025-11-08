import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { people } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

const People = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-10 bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold">People You Know</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="container mx-auto px-4 py-3 flex justify-around items-center">
          <Link to="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-sm font-medium">Memories</span>
          </Link>
          <Link to="/people" className="flex flex-col items-center gap-1 text-primary">
            <span className="text-sm font-medium">People</span>
          </Link>
          <Link to="/map" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-sm font-medium">Map</span>
          </Link>
          <Link to="/reminders" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-sm font-medium">Reminders</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default People;
