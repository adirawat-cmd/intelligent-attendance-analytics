import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  description?: string;
}

export function DashboardCard({ 
  title, 
  value, 
  icon: Icon, 
  iconColor = 'text-green-600',
  description 
}: DashboardCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground mb-2">{title}</p>
          <h3 className="text-foreground mb-1">{value}</h3>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
        <div className={`p-3 bg-accent rounded-lg ${iconColor}`}>
          <Icon className="size-6" />
        </div>
      </div>
    </div>
  );
}
