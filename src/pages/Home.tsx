import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { SearchBarWithMic } from '@/components/SearchBarWithMic';
import { FilterChips } from '@/components/FilterChips';
import { MasonryGallery } from '@/components/MasonryGallery';
import { memories } from '@/lib/mockData';
import { FilterType } from '@/lib/types';
import { Button } from '@/components/ui/button';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filteredMemories = memories.filter((memory) => {
    const matchesSearch = memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.people.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex-1 flex justify-center">
            <SearchBarWithMic
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search memories, people, moments..."
            />
          </div>
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
        <div className="container mx-auto px-4 pb-4">
          <FilterChips activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {filteredMemories.length > 0 ? (
          <MasonryGallery memories={filteredMemories} />
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No memories found</p>
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="container mx-auto px-4 py-3 flex justify-around items-center">
          <Link to="/" className="flex flex-col items-center gap-1 text-primary">
            <span className="text-sm font-medium">Memories</span>
          </Link>
          <Link to="/people" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
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

export default Home;
