import { Person } from '@/lib/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface PeopleChipProps {
  person: Person;
  onClick?: () => void;
}

export const PeopleChip = ({ person, onClick }: PeopleChipProps) => {
  const initials = person.name.split(' ').map(n => n[0]).join('').toUpperCase();
  const displayName = person.name;
  const displayRelationship = person.relationshipToUser;

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full hover:bg-secondary transition-colors shadow-soft"
    >
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start min-w-0 max-w-[180px]">
        <span className="font-medium text-sm truncate w-full">{displayName}</span>
        <span className="text-xs text-muted-foreground capitalize">{displayRelationship}</span>
      </div>
    </button>
  );
};
