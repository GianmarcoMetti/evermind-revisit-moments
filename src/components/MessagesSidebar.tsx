import { useState } from 'react';
import { memories } from '@/lib/mockData';
import { ChevronDown, ChevronRight, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

export const MessagesSidebar = () => {
  const navigate = useNavigate();
  const [expandedPerson, setExpandedPerson] = useState<string | null>(null);

  // Group memories by person
  const messagesByPerson = memories.reduce((acc, memory) => {
    const personName = memory.postedBy.name;
    if (!acc[personName]) {
      acc[personName] = {
        relationship: memory.postedBy.relationship,
        messages: [],
      };
    }
    acc[personName].messages.push(memory);
    return acc;
  }, {} as Record<string, { relationship: string; messages: typeof memories }>);

  const togglePerson = (name: string) => {
    setExpandedPerson(expandedPerson === name ? null : name);
  };

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-4 border-b border-border sticky top-0 bg-card z-10">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
      </div>
      
      <div className="p-2">
        {Object.entries(messagesByPerson).map(([name, data]) => {
          const isExpanded = expandedPerson === name;
          const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
          
          return (
            <div key={name} className="mb-2">
              <button
                onClick={() => togglePerson(name)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground">{data.relationship}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {data.messages.length}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </button>
              
              {isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {data.messages.map((memory) => (
                    <button
                      key={memory.id}
                      onClick={() => navigate(`/memory/${memory.id}`)}
                      className="w-full text-left p-2 rounded-lg hover:bg-secondary/50 transition-colors group"
                    >
                      <div className="flex gap-2">
                        <img
                          src={memory.media.url}
                          alt={memory.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                            {memory.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{memory.date}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
