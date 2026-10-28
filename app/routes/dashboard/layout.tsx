import { LayoutDashboard, Lightbulb, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router';

import { cn } from '@/lib/utils';

import { protectedMiddleware } from '~/middleware/protected';

export const middleware = [protectedMiddleware];

export default function DashboardLayout() {
  const { t } = useTranslation('dashboard');

  const dashboardNavItems = [
    {
      href: '/dashboard',
      label: t('navigation.dashboard'),
      icon: LayoutDashboard,
    },
    {
      href: '/dashboard/ideas',
      label: t('navigation.myIdeas'),
      icon: Lightbulb,
    },
    {
      href: '/dashboard/reviews',
      label: t('navigation.myReviews'),
      icon: MessageSquare,
    },
  ];

  return (
    <div className="ds-page ds-page-narrow">
      <nav className="mb-8" aria-label={t('navigation.label')}>
        <div className="flex flex-wrap gap-1 border-b border-border/80">
          {dashboardNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/dashboard'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 px-4 py-2.5 border-b-2 -mb-px text-sm transition-colors',
                    isActive
                      ? 'border-ds-accent text-foreground font-semibold'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border',
                  )
                }
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </nav>
      <Outlet />
    </div>
  );
}
