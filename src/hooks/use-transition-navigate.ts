import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import type { NavigateOptions, To } from 'react-router';

/**
 * `useNavigate` with the page transition (View Transition) enabled by default,
 * so programmatic navigations animate smoothly too.
 */
export function useTransitionNavigate() {
  const navigate = useNavigate();

  return useCallback(
    (to: To, options?: NavigateOptions) =>
      navigate(to, { ...options, viewTransition: true }),
    [navigate],
  );
}
