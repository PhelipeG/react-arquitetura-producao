import { Lightbulb, Users, MessageSquare } from 'lucide-react';
import { Link } from 'react-router';

import { Seo } from '@/components/seo';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const pillars = [
  {
    icon: Lightbulb,
    title: 'Share Ideas',
    description:
      'Post AI concepts and projects to get visibility and feedback.',
  },
  {
    icon: MessageSquare,
    title: 'Get Reviews',
    description:
      'Receive ratings and constructive notes that sharpen your thinking.',
  },
  {
    icon: Users,
    title: 'Join Community',
    description: 'Connect with builders who care about craft, not just hype.',
  },
] as const;

const steps = [
  {
    title: 'Create an Account',
    description: 'Sign up to share ideas and review projects from others.',
  },
  {
    title: 'Submit Your Ideas',
    description:
      'Add descriptions, tags, and the details that make your concept clear.',
  },
  {
    title: 'Engage with the Community',
    description: 'Review, discuss, and collaborate with fellow innovators.',
  },
] as const;

export default function AboutPage() {
  return (
    <div className="ds-page ds-page-narrow">
      <Seo
        title="About AIdeas"
        description="Learn about AIdeas - a collaborative platform for sharing, reviewing, and refining AI-powered ideas with the community"
      />

      <section className="ds-hero ds-hero-center">
        <p className="ds-kicker">About the platform</p>
        <h1 className="ds-display text-[clamp(2rem,5vw,3.25rem)]">
          Ideas deserve better feedback
        </h1>
        <p className="ds-subtitle">
          AIdeas is a collaborative space where innovators, developers, and AI
          enthusiasts share concepts and refine them together.
        </p>
      </section>

      <section className="ds-section space-y-8">
        <article className="ds-surface p-6 md:p-8">
          <h2 className="ds-title mb-4">What we do</h2>
          <div className="ds-prose space-y-4">
            <p>
              Whether you&apos;re working on a machine learning project, an AI
              application, or a creative concept, AIdeas helps you refine ideas
              through peer reviews and community engagement.
            </p>
            <p>
              We keep the focus on clarity, critique, and craft — not noise.
            </p>
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
          <h2 className="ds-title mb-6">How it works</h2>
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
          Back to Home
        </Link>
        <Link to="/ideas" className={buttonVariants({ size: 'lg' })}>
          Explore Ideas
        </Link>
      </div>
    </div>
  );
}
