import { people } from '@/lib/mockData';
import { PeopleChip } from './PeopleChip';
import { useNavigate } from 'react-router-dom';

export const PeopleView = () => {
  const navigate = useNavigate();

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold mb-6">People in Your Memories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {people.map((person) => (
          <PeopleChip
            key={person.id}
            person={person}
            onClick={() => navigate('/people')}
          />
        ))}
      </div>
    </div>
  );
};
