import { type ReactNode, useState, useSyncExternalStore } from 'react';
import { useLocation } from 'react-router';

import { cn } from '@/lib/utils';

const subscribe = () => () => {};

function useSupportsViewTransition() {
  return useSyncExternalStore(
    subscribe,
    () => typeof document.startViewTransition === 'function',
    () => false,
  );
}

/**
 * Smooth transition between pages.
 *
 * - On browsers with the View Transitions API the native cross-fade is used
 *   (the element below is captured with `view-transition-name: page-content`).
 * - On browsers without it, a CSS enter animation is applied instead.
 */
export function PageTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const location = useLocation();
  const supportsViewTransition = useSupportsViewTransition();
  const [previousPathname, setPreviousPathname] = useState(location.pathname);
  const [navigationCount, setNavigationCount] = useState(0);

  if (previousPathname !== location.pathname) {
    setPreviousPathname(location.pathname);
    setNavigationCount((count) => count + 1);
  }

  const hasNavigated = navigationCount > 0;

  return (
    <div
      key={location.pathname}
      className={cn(
        'ds-page-transition',
        // Only animate when the browser has no native view transition support
        // and the page was not the first one rendered (no animation on load).
        hasNavigated && !supportsViewTransition && 'ds-page-transition-animate',
        className,
      )}
    >
      {children}
    </div>
  );
}
