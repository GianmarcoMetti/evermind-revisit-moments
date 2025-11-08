interface RelationshipBadgeProps {
  name: string;
  relationship: string;
}

export const RelationshipBadge = ({ name, relationship }: RelationshipBadgeProps) => {
  return (
    <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
      <span className="font-medium text-foreground">{name}</span>
      <span className="text-muted-foreground">—</span>
      <span className="text-muted-foreground">{relationship}</span>
    </div>
  );
};
