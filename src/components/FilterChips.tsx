import { FilterType } from '@/lib/types';
import { Button } from '@/components/ui/button';

interface FilterChipsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'People', value: 'people' },
  { label: 'Moments', value: 'moments' },
  { label: 'Map', value: 'map' },
];

export const FilterChips = ({ activeFilter, onFilterChange }: FilterChipsProps) => {
  return (
    <div className="flex gap-3 flex-wrap">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          variant={activeFilter === filter.value ? 'default' : 'outline'}
          className="rounded-full px-6 h-10 text-base font-medium transition-all"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};
