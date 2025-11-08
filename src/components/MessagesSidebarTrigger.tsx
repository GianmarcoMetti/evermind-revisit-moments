import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

export const MessagesSidebarTrigger = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="rounded-full" 
      onClick={toggleSidebar}
    >
      <MessageCircle className="h-5 w-5" />
    </Button>
  );
};
