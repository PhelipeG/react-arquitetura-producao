import { Plus } from 'lucide-react';
import { Link } from 'react-router';

import { Seo } from '@/components/seo';
import { buttonVariants } from '@/components/ui/button';
import { useCurrentUserIdeasQuery } from '@/features/ideas/api/get-current-user-ideas';
import { IdeasList } from '@/features/ideas/components/ideas-list';
import { cn } from '@/lib/utils';

export default function MyIdeasPage() {
  const ideasQuery = useCurrentUserIdeasQuery();
  const ideas = ideasQuery.data?.data;

  return (
    <div className="space-y-6 ds-animate-in">
      <Seo
        title="My Ideas | AIdeas"
        description="Manage and track your submitted AI application ideas"
      />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="ds-kicker">Yours</p>
          <h1 className="ds-title mb-2">My Ideas</h1>
          <p className="text-muted-foreground">
            Manage and track your submitted ideas
          </p>
        </div>
        <Link
          to="/dashboard/ideas/new"
          className={cn(buttonVariants(), 'gap-2 shrink-0')}
        >
          <Plus className="h-4 w-4" />
          New Idea
        </Link>
      </div>

      <IdeasList
        ideas={ideas}
        isLoading={ideasQuery.isLoading}
        emptyMessage="You haven't created any ideas yet."
        error={ideasQuery.error}
      />
    </div>
  );
}
