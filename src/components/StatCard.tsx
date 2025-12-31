import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'success' | 'danger' | 'accent';
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, trend, variant = 'default', delay = 0 }: StatCardProps) {
  const glowClass = {
    default: '',
    success: 'glow-success',
    danger: 'glow-danger',
    accent: 'glow-accent',
  }[variant];

  const iconBgClass = {
    default: 'bg-muted',
    success: 'bg-success/20',
    danger: 'bg-destructive/20',
    accent: 'bg-accent/20',
  }[variant];

  const iconColorClass = {
    default: 'text-muted-foreground',
    success: 'text-success',
    danger: 'text-destructive',
    accent: 'text-accent',
  }[variant];

  return (
    <div 
      className={cn("stat-card", glowClass, "opacity-0 animate-fade-in")}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {trend && (
            <p className={cn(
              "text-xs mt-2 flex items-center gap-1",
              trend.isPositive ? "text-success" : "text-destructive"
            )}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}% vs mes anterior</span>
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl", iconBgClass)}>
          <Icon className={cn("h-5 w-5", iconColorClass)} />
        </div>
      </div>
    </div>
  );
}
