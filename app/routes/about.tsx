import { Lightbulb, Users, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { Seo } from '@/components/seo';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AboutPage() {
  const { t } = useTranslation('about');

  const pillars = [
    {
      icon: Lightbulb,
      title: t('features.shareIdeas.title'),
      description: t('features.shareIdeas.description'),
    },
    {
      icon: MessageSquare,
      title: t('features.getReviews.title'),
      description: t('features.getReviews.description'),
    },
    {
      icon: Users,
      title: t('features.joinCommunity.title'),
      description: t('features.joinCommunity.description'),
    },
  ] as const;

  const steps = [
    {
      title: t('howItWorks.steps.createAccount.title'),
      description: t('howItWorks.steps.createAccount.description'),
    },
    {
      title: t('howItWorks.steps.submit.title'),
      description: t('howItWorks.steps.submit.description'),
    },
    {
      title: t('howItWorks.steps.engage.title'),
      description: t('howItWorks.steps.engage.description'),
    },
  ] as const;

  return (
    <div className="ds-page ds-page-narrow">
      <Seo title={t('meta.title')} description={t('meta.description')} />

      <section className="ds-hero ds-hero-center">
        <p className="ds-kicker">{t('header.kicker')}</p>
        <h1 className="ds-display text-[clamp(2rem,5vw,3.25rem)]">
          {t('header.title')}
        </h1>
        <p className="ds-subtitle">{t('header.subtitle')}</p>
      </section>

      <section className="ds-section space-y-8">
        <article className="ds-surface p-6 md:p-8">
          <h2 className="ds-title mb-4">{t('whatWeDo.title')}</h2>
          <div className="ds-prose space-y-4">
            <p>{t('whatWeDo.paragraph1')}</p>
            <p>{t('whatWeDo.paragraph2')}</p>
          </div>
        </article>

        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className="ds-surface ds-surface-interactive p-5"
              >
                <div className="ds-feature-icon mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>

        <article className="ds-surface p-6 md:p-8">
          <h2 className="ds-title mb-6">{t('howItWorks.title')}</h2>
          <div className="space-y-5">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div className="ds-step">{index + 1}</div>
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <div className="ds-cta-row justify-center pt-4 pb-8">
        <Link
          to="/"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'bg-transparent',
          )}
        >
          {t('cta.backToHome')}
        </Link>
        <Link to="/ideas" className={buttonVariants({ size: 'lg' })}>
          {t('cta.exploreIdeas')}
        </Link>
      </div>
    </div>
  );
}
