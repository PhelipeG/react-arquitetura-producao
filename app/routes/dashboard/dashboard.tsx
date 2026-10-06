import { Lightbulb, MessageSquare, ArrowRight, Compass } from 'lucide-react';
import { Link } from 'react-router';

import { Seo } from '@/components/seo';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  return (
    <div className="space-y-8 ds-animate-in">
      <Seo
        title="Dashboard | AIdeas"
        description="Manage your AI application ideas and reviews in one place"
      />
      <div>
        <p className="ds-kicker">Workspace</p>
        <h1 className="ds-title mb-2">Dashboard</h1>
        <p className="ds-subtitle">Manage your ideas and reviews</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="ds-surface ds-surface-interactive p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="ds-feature-icon">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold">My Ideas</h2>
              <p className="text-sm text-muted-foreground">
                View and manage your submitted ideas
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/ideas"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'w-full gap-2',
            )}
          >
            View All Ideas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>

        <article className="ds-surface ds-surface-interactive p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="ds-feature-icon">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold">My Reviews</h2>
              <p className="text-sm text-muted-foreground">
                See all reviews you&apos;ve written
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/reviews"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'w-full gap-2',
            )}
          >
            View All Reviews
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>
      </div>

      <article className="ds-surface p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="ds-feature-icon">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-heading text-lg font-semibold">
              Explore Ideas
            </h2>
            <p className="text-sm text-muted-foreground">
              Discover and review ideas from the community
            </p>
          </div>
        </div>
        <Link
          to="/ideas"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'bg-transparent gap-2 shrink-0',
          )}
        >
          Browse All Ideas
          <ArrowRight className="h-4 w-4" />
        </Link>
      </article>
    </div>
  );
}
