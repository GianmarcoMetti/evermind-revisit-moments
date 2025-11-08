import { useState } from 'react';
import { messages } from '@/lib/mockData';
import { ChevronDown, ChevronRight, MessageCircle, Bell, Image } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

export const MessagesSidebar = () => {
  const { open } = useSidebar();
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
    <Sidebar side="right" collapsible="offcanvas" data-sidebar="right">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          {open && <h2 className="text-lg font-semibold">Messages</h2>}
        </div>
        <SidebarTrigger />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
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
                        {data.messages.map((message) => (
                          <div
                            key={message.id}
                            className="w-full text-left p-3 rounded-lg bg-secondary/30 transition-colors"
                          >
                            <div className="flex gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm mb-1">{message.content}</p>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="text-xs text-muted-foreground">{message.date}</p>
                                  {message.usedForMemory && (
                                    <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                      <Image className="h-3 w-3" />
                                      Memory
                                    </span>
                                  )}
                                  {message.usedForReminder && (
                                    <span className="inline-flex items-center gap-1 text-xs bg-accent/50 text-accent-foreground px-2 py-0.5 rounded-full">
                                      <Bell className="h-3 w-3" />
                                      Reminder
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};