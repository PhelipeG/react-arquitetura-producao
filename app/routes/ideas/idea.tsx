import { Lightbulb } from 'lucide-react';
import { data as routerData, Link } from 'react-router';

import { ErrorMessage } from '@/components/error-message';
import { Seo } from '@/components/seo';
import { buttonVariants } from '@/components/ui/button';
import {
  getIdeaById,
  useIdeaByIdQuery,
} from '@/features/ideas/api/get-idea-by-id';
import { IdeaDetails } from '@/features/ideas/components/idea-details';
import {
  getReviewsByIdea,
  useReviewsByIdeaQuery,
} from '@/features/reviews/api/get-reviews-by-idea';
import { CreateReview } from '@/features/reviews/components/create-review';
import { ReviewsList } from '@/features/reviews/components/reviews-list';
import { CURRENT_USER } from '@/lib/api';
import { cn } from '@/lib/utils';

import type { Route } from './+types/idea';

export async function loader({ params }: Route.LoaderArgs) {
  const [idea, reviews] = await Promise.all([
    getIdeaById(params.id),
    getReviewsByIdea(params.id),
  ]);
  return routerData({
    idea,
    reviews,
  });
}

export default function IdeaDetailPage({
  params,
  loaderData,
}: Route.ComponentProps) {
  const ideaId = params.id as string;
  const user = CURRENT_USER;

  const ideaQuery = useIdeaByIdQuery({
    id: ideaId,
    options: {
      ...(loaderData?.idea && { initialData: loaderData.idea }),
    },
  });
  const idea = ideaQuery.data ?? loaderData.idea;

  const reviewsQuery = useReviewsByIdeaQuery({
    id: ideaId,
    options: {
      ...(loaderData?.reviews && { initialData: loaderData.reviews }),
    },
  });
  const reviews = reviewsQuery?.data?.data;

  const isAuthor = user?.id === idea?.authorId;
  return (
    <div className="ds-page ds-page-narrow">
      <Seo
        title={`${idea.title} | AIdeas`}
        description={idea.shortDescription}
      />
      <IdeaDetails idea={idea} currentUser={user} />
      <div className="space-y-6 ds-animate-in ds-animate-in-delay-1">
        <div className="flex items-center justify-between gap-4">
          <h2 className="ds-title text-xl">Reviews ({reviews?.length || 0})</h2>
          {user && !isAuthor && <CreateReview ideaId={ideaId} />}
        </div>

        <ReviewsList
          reviews={reviews}
          isLoading={reviewsQuery?.isLoading}
          showIdeaTitle={false}
          emptyMessage="No reviews yet. Be the first to review this idea!"
          error={reviewsQuery?.error}
        />
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="ds-page ds-page-narrow">
      <Seo
        title="Error Loading Idea | AIdeas"
        description="Error Loading Idea"
      />
      <div className="space-y-6">
        <ErrorMessage error={error} title="Error Loading Idea" />
        <div className="flex justify-center">
          <Link
            to="/ideas"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'gap-2',
            )}
          >
            <Lightbulb className="h-4 w-4" />
            Back to Ideas
          </Link>
        </div>
      </div>
    </div>
  );
}
