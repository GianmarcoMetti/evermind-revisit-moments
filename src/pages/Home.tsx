import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Bell, ChevronRight, Loader2 } from 'lucide-react';
import { SearchBarWithMic } from '@/components/SearchBarWithMic';
import { FilterChips } from '@/components/FilterChips';
import { MasonryGallery } from '@/components/MasonryGallery';
import { MessagesSidebar } from '@/components/MessagesSidebar';
import { PeopleView } from '@/components/PeopleView';
import { MomentsView } from '@/components/MomentsView';
import { MapView } from '@/components/MapView';
import { reminders } from '@/lib/mockData';
import { FilterType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useMemories } from '@/hooks/useMemories';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { memories, isLoading } = useMemories();

  const activeReminders = reminders.filter(r => r.active);

  const filteredMemories = memories.filter((memory) => {
    const matchesSearch = memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.people.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesSearch;
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      );
    }

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
      <div className="flex-1 flex flex-col">
        {activeReminders.length > 0 && (
          <div className="border-b border-border bg-background">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-foreground" />
                  <h2 className="text-lg font-semibold">Active Reminders</h2>
                </div>
                <Link to="/reminders">
                  <Button variant="ghost" size="sm" className="gap-1 h-9">
                    View all
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {activeReminders.slice(0, 3).map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/30"
                  >
                    <div className="flex-1 flex items-center gap-4">
                      <div>
                        <p className="font-semibold text-foreground">
                          {reminder.createdBy.name} - {reminder.createdBy.relationship}
                        </p>
                        <p className="text-muted-foreground mt-0.5">{reminder.text}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium px-3 py-1.5 rounded-lg bg-primary/10 text-primary whitespace-nowrap">
                        {reminder.time}
                      </span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

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

        <main className="container mx-auto px-4 flex-1 overflow-y-auto py-6">
          {renderContent()}
        </main>
      </div>
      
      <MessagesSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
    </div>
  );
};

export default Home;
