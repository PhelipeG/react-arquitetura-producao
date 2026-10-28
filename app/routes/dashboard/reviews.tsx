import { useTranslation } from 'react-i18next';

import { Seo } from '@/components/seo';
import { useCurrentUserReviewsQuery } from '@/features/reviews/api/get-current-user-reviews';
import { ReviewsList } from '@/features/reviews/components/reviews-list';

export default function MyReviewsPage() {
  const { t } = useTranslation('reviews');
  const reviewsQuery = useCurrentUserReviewsQuery();
  const reviews = reviewsQuery.data?.data;

  return (
    <div className="space-y-6 ds-animate-in">
      <Seo
        title={t('mine.metaTitle')}
        description={t('mine.metaDescription')}
      />
      <div>
        <p className="ds-kicker">{t('mine.kicker')}</p>
        <h1 className="ds-title mb-2">{t('mine.title')}</h1>
        <p className="text-muted-foreground">{t('mine.description')}</p>
      </div>

      <ReviewsList
        reviews={reviews}
        isLoading={reviewsQuery.isLoading}
        showIdeaTitle
        emptyMessage={t('emptyMine')}
        error={reviewsQuery.error}
      />
    </div>
  );
}
