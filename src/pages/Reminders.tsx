import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { reminders } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { ReminderCard } from '@/components/ReminderCard';

const Reminders = () => {
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
          <h1 className="text-2xl font-semibold">Daily Reminders</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-4">
          {reminders.map((reminder) => (
            <ReminderCard key={reminder.id} reminder={reminder} />
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="container mx-auto px-4 py-3 flex justify-around items-center">
          <Link to="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-sm font-medium">Memories</span>
          </Link>
          <Link to="/people" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-sm font-medium">People</span>
          </Link>
          <Link to="/map" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-sm font-medium">Map</span>
          </Link>
          <Link to="/reminders" className="flex flex-col items-center gap-1 text-primary">
            <span className="text-sm font-medium">Reminders</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Reminders;
