import { Link, NavLink } from 'react-router';
import type { LinkProps, NavLinkProps } from 'react-router';

/**
 * `Link`/`NavLink` with the page transition (View Transition) enabled by
 * default, so every navigation between pages animates smoothly.
 *
 * Pass `viewTransition={false}` to opt out for a specific link.
 */
export function RouteLink({ viewTransition = true, ...props }: LinkProps) {
  return <Link {...props} viewTransition={viewTransition} />;
}

export function RouteNavLink({
  viewTransition = true,
  ...props
}: NavLinkProps) {
  return <NavLink {...props} viewTransition={viewTransition} />;
}
