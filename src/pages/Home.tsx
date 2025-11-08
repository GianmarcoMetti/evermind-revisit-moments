import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { SearchBarWithMic } from '@/components/SearchBarWithMic';
import { FilterChips } from '@/components/FilterChips';
import { MasonryGallery } from '@/components/MasonryGallery';
import { MessagesSidebar } from '@/components/MessagesSidebar';
import { PeopleView } from '@/components/PeopleView';
import { MomentsView } from '@/components/MomentsView';
import { MapView } from '@/components/MapView';
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

  const renderContent = () => {
    if (activeFilter === 'people') {
      return <PeopleView />;
    }
    if (activeFilter === 'moments') {
      return <MomentsView />;
    }
    if (activeFilter === 'map') {
      return <MapView />;
    }
    // Default 'all' view
    return filteredMemories.length > 0 ? (
      <MasonryGallery memories={filteredMemories} />
    ) : (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">No memories found</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      <MessagesSidebar />
      
      <div className="flex-1 flex flex-col">
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

        <main className="container mx-auto px-4 flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Home;
