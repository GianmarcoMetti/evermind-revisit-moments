import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, ChevronDown, ChevronRight, MessageCircle, Bell, Image } from 'lucide-react';
import { messages } from '@/lib/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Messages = () => {
  const [expandedPerson, setExpandedPerson] = useState<string | null>(null);

  // Group messages by person
  const messagesByPerson = messages.reduce((acc, message) => {
    const personName = message.from;
    if (!acc[personName]) {
      acc[personName] = {
        relationship: message.relationship,
        messages: [],
      };
    }
    acc[personName].messages.push(message);
    return acc;
  }, {} as Record<string, { relationship: string; messages: typeof messages }>);

  const togglePerson = (name: string) => {
    setExpandedPerson(expandedPerson === name ? null : name);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">Messages</h1>
          </div>
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 flex-1 overflow-y-auto py-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {Object.entries(messagesByPerson).map(([name, data]) => {
              const isExpanded = expandedPerson === name;
              const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
              
              return (
                <div key={name} className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => togglePerson(name)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-secondary transition-colors"
                  >
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-lg">{name}</p>
                      <p className="text-sm text-muted-foreground">{data.relationship}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                        {data.messages.length}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="bg-secondary/30 p-4 space-y-3">
                      {data.messages.map((message) => (
                        <div
                          key={message.id}
                          className="p-4 rounded-lg bg-background border border-border"
                        >
                          <p className="mb-2">{message.content}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm text-muted-foreground">{message.date}</p>
                            {message.usedForMemory && (
                              <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                <Image className="h-3 w-3" />
                                Memory
                              </span>
                            )}
                            {message.usedForReminder && (
                              <span className="inline-flex items-center gap-1 text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded-full">
                                <Bell className="h-3 w-3" />
                                Reminder
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
