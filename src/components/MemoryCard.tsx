import { MemoryPost } from '@/lib/types';
import { useNavigate } from 'react-router-dom';

interface MemoryCardProps {
  memory: MemoryPost;
}

export const MemoryCard = ({ memory }: MemoryCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/memory/${memory.id}`)}
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-soft hover:shadow-soft-lg"
    >
      <img
        src={memory.media.url}
        alt={memory.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <div className="bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
          <span className="text-sm font-medium">
            {memory.postedBy.name} — {memory.postedBy.relationship}
          </span>
        </div>
      </div>
    </div>
  );
};
