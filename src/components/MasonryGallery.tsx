import { MemoryPost } from '@/lib/types';
import { MemoryCard } from './MemoryCard';

interface MasonryGalleryProps {
  memories: MemoryPost[];
}

export const MasonryGallery = ({ memories }: MasonryGalleryProps) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {memories.map((memory) => (
        <div key={memory.id} className="break-inside-avoid">
          <MemoryCard memory={memory} />
        </div>
      ))}
    </div>
  );
};
