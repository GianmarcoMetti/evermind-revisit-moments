import { Reminder } from '@/lib/types';
import { Clock, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ReminderCardProps {
  reminder: Reminder;
}

export const ReminderCard = ({ reminder }: ReminderCardProps) => {
  return (
    <Card className="p-4 flex items-center gap-4 shadow-soft border-border">
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
        reminder.active ? 'bg-primary/10' : 'bg-muted'
      }`}>
        {reminder.active ? (
          <Clock className="h-6 w-6 text-primary" />
        ) : (
          <Check className="h-6 w-6 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1">
        <p className="font-medium text-lg">{reminder.text}</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-sm text-muted-foreground">{reminder.time}</p>
          <span className="text-muted-foreground">•</span>
          <p className="text-sm text-muted-foreground">
            Set by <span className="font-medium">{reminder.createdBy.name}</span> ({reminder.createdBy.relationship})
          </p>
        </div>
      </div>
    </Card>
  );
};
