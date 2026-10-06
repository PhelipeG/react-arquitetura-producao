import { User as UserIcon } from 'lucide-react';
import { Link } from 'react-router';

import { MarkdownRenderer } from '@/components/markdown-renderer';
import { RatingDisplay } from '@/components/rating-display';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date';
import type { Idea, User } from '@/types/generated/types.gen';

import { IdeaActions } from './idea-actions';

export type IdeaDetailsProps = {
  idea: Idea;
  currentUser: User | null;
};

export function IdeaDetails({ idea, currentUser }: IdeaDetailsProps) {
  return (
    <article className="ds-surface mb-8 overflow-hidden">
      <header className="p-6 md:p-8 border-b border-border/70">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="ds-kicker">Idea</p>
            <h1 className="ds-title mb-3">{idea?.title}</h1>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <UserIcon className="h-4 w-4" />
              <Link
                to={`/profile/${idea?.author.username}`}
                className="hover:text-ds-accent transition-colors"
              >
                @{idea?.author.username}
              </Link>
              <span aria-hidden>•</span>
              <span>{formatDate(idea?.createdAt, 'en')}</span>
            </div>
          </div>

          {currentUser && currentUser.id === idea?.authorId && (
            <IdeaActions idea={idea} />
          )}
        </div>
      </header>

      <div className="p-6 md:p-8 space-y-5">
        <div className="ds-quote">
          <p className="font-medium text-foreground">
            {idea?.shortDescription}
          </p>
        </div>

        {idea?.avgRating !== null && (
          <RatingDisplay
            rating={idea.avgRating}
            reviewCount={idea.reviewsCount}
            size="md"
          />
        )}

        <div className="ds-prose">
          <MarkdownRenderer content={idea?.description} />
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {idea?.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-md">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}
