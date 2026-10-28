import { Lightbulb, Share2, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Seo } from '@/components/seo';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const { t } = useTranslation('home');

  const features = [
    {
      icon: Lightbulb,
      title: t('features.discover.title'),
      description: t('features.discover.description'),
    },
    {
      icon: Share2,
      title: t('features.share.title'),
      description: t('features.share.description'),
    },
    {
      icon: MessageSquare,
      title: t('features.review.title'),
      description: t('features.review.description'),
    },
  ] as const;

  return (
    <div className="ds-page">
      <Seo title={t('meta.title')} description={t('meta.description')} />

      <section className="ds-hero ds-hero-center">
        <p className="ds-kicker ds-animate-in">{t('kicker')}</p>
        <h1 className="ds-display ds-animate-in ds-animate-in-delay-1">
          AI<span className="text-ds-accent">ideas</span>
        </h1>
        <p className="ds-subtitle ds-animate-in ds-animate-in-delay-2">
          {t('subtitle')}
        </p>
        <div className="ds-cta-row ds-animate-in ds-animate-in-delay-3">
          <Link
            to="/ideas"
            className={cn(buttonVariants({ size: 'lg' }), 'min-w-36')}
          >
            {t('exploreIdeas')}
          </Link>
          <Link
            to="/about"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'min-w-36 bg-transparent',
            )}
          >
            {t('learnMore')}
          </Link>
        </div>
      </section>

      <hr className="ds-divider mb-10" />

      <section className="ds-section grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <article
              key={feature.title}
              className={cn(
                'ds-surface ds-surface-interactive p-6',
                index === 0 && 'ds-animate-in-delay-1',
                index === 1 && 'ds-animate-in-delay-2',
                index === 2 && 'ds-animate-in-delay-3',
              )}
            >
              <div className="ds-feature-icon mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="ds-title text-xl mb-2">{feature.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </article>
          );
        })}
      </section>
    </div>
  );
}
