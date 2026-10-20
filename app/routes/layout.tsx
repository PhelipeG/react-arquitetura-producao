import { Outlet, useNavigate } from 'react-router';

import Navigation from '@/components/navigation';
import { useLogoutUserMutation } from '@/features/auth/api/logout';
import { useUser } from '@/features/auth/hooks/use-user';

export default function Layout() {
  const user = useUser();
  const navigate = useNavigate();

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
      <Navigation user={user} onLogout={handleLogout} />
      <main className="min-h-screen bg-background">
        <Outlet />
      </main>
    </div>
  );
}
