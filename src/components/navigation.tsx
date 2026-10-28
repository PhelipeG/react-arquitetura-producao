import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router';

import { LanguageSwitcher } from '@/components/language-switcher';
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
  const { t } = useTranslation('navigation');

  const links = [
    { to: '/', label: t('home'), end: true },
    { to: '/ideas', label: t('ideas') },
    { to: '/about', label: t('about') },
    ...(user
      ? [
          { to: '/dashboard', label: t('dashboard') },
          { to: `/profile/${user.username}`, label: t('profile') },
        ]
      : []),
  ];

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

          <LanguageSwitcher />

          {user ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="ds-nav-link"
            >
              {t('logout')}
            </Button>
          ) : (
            <NavLink
              to="/auth/login"
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}
            >
              {t('login')}
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}
