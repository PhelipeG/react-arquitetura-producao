import { Star, User, Calendar } from 'lucide-react';
import { Link } from 'react-router';

import { CURRENT_USER } from '@/lib/api';
import { formatDate } from '@/lib/date';
import type { Review } from '@/types/generated/types.gen';

import { ReviewActions } from './review-actions';

export type ReviewListItemProps = {
  review: Review;
  showIdeaTitle?: boolean;
};

export function ReviewListItem({
  review,
  showIdeaTitle = false,
}: ReviewListItemProps) {
  const user = CURRENT_USER;

  const isOwner = user && user.id === review.authorId;

  return (
    <div className="ds-list-item py-5 -mx-6 px-6">
      <div className="flex flex-col space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <Link
                  to={`/profile/${review.author.username}`}
                  className="hover:text-ds-accent transition-colors"
                >
                  @{review.author.username}
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(review.createdAt, 'en')}</span>
              </div>
              {isOwner && <ReviewActions review={review} />}
            </div>
          </div>

          <div className="flex items-center gap-0.5 shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? 'fill-ds-accent text-ds-accent'
                    : 'text-border'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-sm leading-relaxed text-foreground">
          {review.content}
        </p>

        {showIdeaTitle && review.idea && (
          <div className="text-xs text-muted-foreground">
            Review for:{' '}
            <Link
              to={`/ideas/${review.idea.id}`}
              className="font-medium hover:text-ds-accent transition-colors"
            >
              {review.idea.title}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
