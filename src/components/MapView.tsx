import { memories } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';

export const MapView = () => {
  const navigate = useNavigate();

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold mb-6">Memory Locations</h2>
      
      <div className="relative w-full h-[600px] bg-secondary/20 rounded-2xl overflow-hidden border border-border">
        {/* Simple map representation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-green-50/50">
          {memories.map((memory, index) => {
            if (!memory.coordinates) return null;
            
            // Convert coordinates to percentage positions for simple display
            const top = ((memory.coordinates.lat + 90) / 180) * 100;
            const left = ((memory.coordinates.lng + 180) / 360) * 100;
            
            return (
              <button
                key={memory.id}
                onClick={() => navigate(`/memory/${memory.id}`)}
                className="absolute group"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping" />
                  <img
                    src={memory.media.url}
                    alt={memory.title}
                    className="w-16 h-16 object-cover rounded-full border-4 border-background shadow-soft-lg relative z-10 group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20">
                    <MapPin className="h-5 w-5 text-primary fill-primary" />
                  </div>
                </div>
                
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-30 whitespace-nowrap">
                  <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-soft-lg">
                    <p className="font-medium text-sm">{memory.title}</p>
                    <p className="text-xs text-muted-foreground">{memory.location}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Click on any memory to view details
      </div>
    </div>
  );
};
