import { cn } from '@/lib/utils';

export type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'ds-surface border-dashed flex flex-col items-center justify-center py-16 px-8 text-center',
        className,
      )}
    >
      {icon && (
        <div className="mb-6 text-muted-foreground/45 [&>svg]:w-14 [&>svg]:h-14">
          {icon}
        </div>
      )}
      <h3 className="font-heading text-xl font-semibold mb-3 text-foreground tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="text-base text-muted-foreground mb-6 max-w-md leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
