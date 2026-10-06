import { Outlet } from 'react-router';

import Navigation from '@/components/navigation';

export default function Layout() {
  return (
    <div className="ds-shell">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
