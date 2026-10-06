import { Home, Lightbulb, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

import { Seo } from '@/components/seo';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="ds-page flex min-h-[70vh] items-center justify-center">
      <Seo
        title="Page Not Found | AIdeas"
        description="The page you're looking for doesn't exist or has been moved."
      />
      <div className="ds-surface w-full max-w-xl p-8 md:p-12 text-center ds-animate-in">
        <p className="ds-kicker">404</p>
        <div className="relative mb-6">
          <h1 className="font-heading text-8xl font-semibold text-muted-foreground/20 tracking-tight">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <Lightbulb className="h-16 w-16 text-ds-accent" />
          </div>
        </div>

        <h2 className="ds-title mb-3">Page not found</h2>
        <p className="ds-subtitle mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="ds-cta-row justify-center">
          <Link to="/" className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}>
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            to="/ideas"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'gap-2 bg-transparent',
            )}
          >
            <Search className="h-4 w-4" />
            Explore Ideas
          </Link>
        </div>

        <div className="pt-8 mt-8 border-t border-border/70">
          <Button
            variant="link"
            size="sm"
            onClick={() => window.history.back()}
            className="gap-1"
          >
            <ArrowLeft className="h-3 w-3" />
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
