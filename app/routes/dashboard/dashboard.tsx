import { Lightbulb, MessageSquare, ArrowRight, Compass } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Seo } from '@/components/seo';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { t } = useTranslation('dashboard');

  return (
    <div className="space-y-8 ds-animate-in">
      <Seo title={t('meta.title')} description={t('meta.description')} />
      <div>
        <p className="ds-kicker">{t('kicker')}</p>
        <h1 className="ds-title mb-2">{t('title')}</h1>
        <p className="ds-subtitle">{t('subtitle')}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="ds-surface ds-surface-interactive p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="ds-feature-icon">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold">
                {t('myIdeas.title')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t('myIdeas.description')}
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
            {t('myIdeas.viewAll')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>

        <article className="ds-surface ds-surface-interactive p-6 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="ds-feature-icon">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-semibold">
                {t('myReviews.title')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t('myReviews.description')}
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
            {t('myReviews.viewAll')}
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
              {t('explore.title')}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t('explore.description')}
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
          {t('explore.browse')}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </article>
    </div>
  );
}
