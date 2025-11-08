interface RelationshipBadgeProps {
  relationship: string;
}

export const RelationshipBadge = ({ relationship }: RelationshipBadgeProps) => {
  return (
    <div className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
      <span className="font-medium text-foreground">{relationship}</span>
    </div>
  );
};
