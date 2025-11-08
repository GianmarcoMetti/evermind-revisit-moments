import { MemoryPost } from '@/lib/types';
import { useNavigate } from 'react-router-dom';

interface MemoryCardProps {
  memory: MemoryPost;
  onPersonClick?: (personId: string) => void;
}

export const MemoryCard = ({ memory, onPersonClick }: MemoryCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/memory/${memory.id}`);
  };

  const handlePersonChipClick = (e: React.MouseEvent, personId: string) => {
    e.stopPropagation();
    if (onPersonClick) {
      onPersonClick(personId);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-soft hover:shadow-soft-lg"
    >
      <img
        src={memory.media.url}
        alt={memory.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {memory.people.map((person) => (
            <button
              key={person.id}
              onClick={(e) => handlePersonChipClick(e, person.id)}
              className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium hover:bg-black/80 transition-colors"
            >
              {person.name}
            </button>
          ))}
        </div>
        <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
          <span className="text-sm font-medium text-white">
            {memory.postedBy.relationship}
          </span>
        </div>
      </div>
    </div>
  );
};
