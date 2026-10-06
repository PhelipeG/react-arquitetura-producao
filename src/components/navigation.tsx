import { NavLink } from 'react-router';

import { CURRENT_USER } from '@/lib/api';
import { cn } from '@/lib/utils';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/ideas', label: 'Ideas' },
  { to: '/about', label: 'About' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: `/profile/${CURRENT_USER.username}`, label: 'Profile' },
] as const;

export default function Navigation() {
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
        </nav>
      </div>
    </header>
  );
}
