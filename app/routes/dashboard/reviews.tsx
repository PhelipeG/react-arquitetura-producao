import { Seo } from '@/components/seo';
import { useCurrentUserReviewsQuery } from '@/features/reviews/api/get-current-user-reviews';
import { ReviewsList } from '@/features/reviews/components/reviews-list';

export default function MyReviewsPage() {
  const reviewsQuery = useCurrentUserReviewsQuery();
  const reviews = reviewsQuery.data?.data;

  return (
    <div className="space-y-6 ds-animate-in">
      <Seo
        title="My Reviews | AIdeas"
        description="View and manage all reviews you've written for AI application ideas"
      />
      <div>
        <p className="ds-kicker">Feedback</p>
        <h1 className="ds-title mb-2">My Reviews</h1>
        <p className="text-muted-foreground">
          View and manage all reviews you&apos;ve written
        </p>
      </div>

      <ReviewsList
        reviews={reviews}
        isLoading={reviewsQuery.isLoading}
        showIdeaTitle
        emptyMessage="You haven't written any reviews yet. Explore ideas and share your feedback!"
        error={reviewsQuery.error}
      />
    </div>
  );
}
