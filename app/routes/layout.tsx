import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';

import Navigation from '@/components/navigation';
import { PageTransition } from '@/components/page-transition';
import { useLogoutUserMutation } from '@/features/auth/api/logout';
import { useUser } from '@/features/auth/hooks/use-user';
import { useTransitionNavigate } from '@/hooks/use-transition-navigate';

export default function Layout() {
  const user = useUser();
  const navigate = useTransitionNavigate();
  const { t } = useTranslation(['navigation']); // aqui importamos o namespace navigation para usar as traduções

  const logoutUserMutation = useLogoutUserMutation({
    options: {
      onSuccess: () => {
        navigate('/auth/login');
      },
    },
  });

  const handleLogout = () => {
    logoutUserMutation.mutate();
  };

  return (
    <div className="ds-shell">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4
focus:left-4 focus:z-50 focus:bg-background focus:text-foreground focus:px-4
focus:py-2 focus:border focus:rounded focus:ring-2 focus:ring-ring"
      >
        {t('navigation:skipToContent')}
      </a>
      <header>
        <Navigation user={user} onLogout={handleLogout} />
      </header>
      <main className="min-h-screen bg-background">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <footer className="border-t py-6 px-4 text-center tforeground">
        {' '}
        © {new Date().getFullYear()} AIdeas. Todos os direitos reservados
      </footer>
    </div>
  );
}
