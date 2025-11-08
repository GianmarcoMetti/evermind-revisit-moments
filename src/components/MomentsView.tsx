import { memories } from '@/lib/mockData';
import { MomentCategory } from '@/lib/types';
import { MemoryCard } from './MemoryCard';
import { Heart, Plane, GraduationCap, PartyPopper, Briefcase, Palette, HeartHandshake, UtensilsCrossed } from 'lucide-react';

const categoryIcons: Record<MomentCategory, any> = {
  family: Heart,
  travel: Plane,
  school: GraduationCap,
  celebrations: PartyPopper,
  work: Briefcase,
  hobby: Palette,
  romance: HeartHandshake,
  food: UtensilsCrossed,
};

const categoryLabels: Record<MomentCategory, string> = {
  family: 'Family',
  travel: 'Travel',
  school: 'School',
  celebrations: 'Celebrations',
  work: 'Work',
  hobby: 'Hobbies',
  romance: 'Romance',
  food: 'Food',
};

export const MomentsView = () => {
  const categories = Object.keys(categoryLabels) as MomentCategory[];
  
  const memoriesByCategory = categories.reduce((acc, category) => {
    acc[category] = memories.filter(m => m.category === category);
    return acc;
  }, {} as Record<MomentCategory, typeof memories>);

  return (
    <div className="py-8 space-y-12">
      {categories.map((category) => {
        const categoryMemories = memoriesByCategory[category];
        if (categoryMemories.length === 0) return null;
        
        const Icon = categoryIcons[category];
        
        return (
          <div key={category}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">{categoryLabels[category]}</h2>
              <span className="text-muted-foreground">({categoryMemories.length})</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categoryMemories.map((memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
