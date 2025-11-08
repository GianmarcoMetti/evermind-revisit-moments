import { Search, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchBarWithMicProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBarWithMic = ({ value, onChange, placeholder = "Search memories..." }: SearchBarWithMicProps) => {
  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-12 pr-12 h-14 text-lg bg-card border-border shadow-soft-md rounded-2xl focus-visible:ring-2 focus-visible:ring-primary"
      />
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Voice search"
      >
        <Mic className="h-5 w-5" />
      </button>
    </div>
  );
};
