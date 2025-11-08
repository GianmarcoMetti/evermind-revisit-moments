import { PeopleChip } from './PeopleChip';
import { usePeople } from '@/hooks/usePeople';
import { Loader2 } from 'lucide-react';

interface PeopleViewProps {
  onPersonClick: (personId: string) => void;
}

export const PeopleView = ({ onPersonClick }: PeopleViewProps) => {
  const { people, isLoading } = usePeople();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">No people found</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold mb-6">People in Your Memories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {people.map((person) => (
          <PeopleChip
            key={person.id}
            person={person}
            onClick={() => onPersonClick(person.id)}
          />
        ))}
      </div>
    </div>
  );
};
