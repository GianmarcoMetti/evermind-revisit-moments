import { FilterType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Grid3x3, Users, Image, MapPin } from 'lucide-react';

interface FilterChipsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { label: string; value: FilterType; icon: any }[] = [
  { label: 'All', value: 'all', icon: Grid3x3 },
  { label: 'People', value: 'people', icon: Users },
  { label: 'Moments', value: 'moments', icon: Image },
  { label: 'Map', value: 'map', icon: MapPin },
];

export const FilterChips = ({ activeFilter, onFilterChange }: FilterChipsProps) => {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <Button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            variant={activeFilter === filter.value ? 'default' : 'outline'}
            className="rounded-full px-6 h-10 text-base font-medium transition-all"
          >
            <Icon className="h-4 w-4 mr-2" />
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
};
