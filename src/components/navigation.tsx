import { NavLink } from 'react-router';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { CurrentUser } from '@/types/generated/types.gen';

export default function Navigation({
  user,
  onLogout,
}: {
  user: CurrentUser;
  onLogout: () => void;
}) {
  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/ideas', label: 'Ideas' },
    { to: '/about', label: 'About' },
    ...(user
      ? [
          { to: '/dashboard', label: 'Dashboard' },
          { to: `/profile/${user.username}`, label: 'Profile' },
        ]
      : []),
  ] as const;

  return (
    <header className="ds-nav">
      <div className="ds-nav-inner">
        <NavLink to="/" end className="ds-nav-brand">
          AI<span>ideas</span>
        </NavLink>

        <nav className="ds-nav-links" aria-label="Main">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={'end' in link ? link.end : false}
              className={({ isActive }) =>
                cn(
                  'ds-nav-link',
                  isActive && 'ds-nav-link-active font-semibold',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="ds-nav-link"
            >
              Logout
            </Button>
          ) : (
            <NavLink
              to="/auth/login"
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
