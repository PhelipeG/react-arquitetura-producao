import { Lightbulb } from 'lucide-react';

import { EmptyState } from '@/components/empty-state';
import { ErrorMessage } from '@/components/error-message';
import { Skeleton } from '@/components/ui/skeleton';
import type { Idea } from '@/types/generated/types.gen';

import { IdeaListItem } from './idea-list-item';

export type IdeasListProps = {
  ideas: Idea[] | undefined;
  isLoading?: boolean;
  emptyMessage?: string;
  error?: Error | null;
};

export function IdeasList({
  ideas,
  isLoading,
  emptyMessage,
  error,
}: IdeasListProps) {
  if (isLoading) {
    return (
      <div className="ds-surface p-6 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage error={error} title="Error" />;
  }

  if (!ideas || ideas.length === 0) {
    return (
      <EmptyState
        icon={<Lightbulb />}
        title={emptyMessage || 'No ideas available yet'}
        description="Check back later or be the first to share an idea!"
      />
    );
  }

  return (
    <div className="ds-surface overflow-hidden">
      <div className="divide-y divide-border/80">
        {ideas.map((idea) => (
          <div key={idea.id} className="px-6">
            <IdeaListItem idea={idea} />
          </div>
        ))}
      </div>
    </div>
  );
}
