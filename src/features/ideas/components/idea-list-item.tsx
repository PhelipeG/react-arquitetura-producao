import { MessageSquare, User, Calendar } from 'lucide-react';
import { Link } from 'react-router';

import { RatingDisplay } from '@/components/rating-display';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/date';
import type { Idea } from '@/types/generated/types.gen';

export type IdeaListItemProps = {
  idea: Idea;
};

export function IdeaListItem({ idea }: IdeaListItemProps) {
  return (
    <div className="ds-list-item py-6 -mx-6 px-6">
      <div className="flex flex-col space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-heading text-xl font-semibold tracking-tight">
              <Link
                to={`/ideas/${idea.id}`}
                className="hover:text-ds-accent transition-colors"
              >
                {idea.title}
              </Link>
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1.5">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <Link
                  to={`/profile/${idea.author.username}`}
                  className="hover:text-ds-accent transition-colors"
                >
                  @{idea.author.username}
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(idea.createdAt, 'en')}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                <span>{idea.reviewsCount} reviews</span>
              </div>
              {idea.avgRating !== null && idea.avgRating > 0 && (
                <RatingDisplay
                  rating={idea.avgRating}
                  reviewCount={idea.reviewsCount}
                  size="sm"
                  showCount={false}
                />
              )}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {idea.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {idea.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs rounded-md">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
