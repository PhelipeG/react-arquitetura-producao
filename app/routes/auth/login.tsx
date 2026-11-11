import { useRevalidator } from 'react-router';

import { RouteLink as Link } from '@/components/route-link';
import { Seo } from '@/components/seo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLoginUserMutation } from '@/features/auth/api/login';
import { LoginForm } from '@/features/auth/components/login-form';
import { useTransitionNavigate } from '@/hooks/use-transition-navigate';
import type { LoginUserData } from '@/types/generated/types.gen';

export default function LoginPage() {
  const navigate = useTransitionNavigate();
  const revalidator = useRevalidator();

  const loginUserMutation = useLoginUserMutation();

  const onSubmit = (data: LoginUserData['body']) => {
    loginUserMutation.mutate(data, {
      onSuccess: () => {
        revalidator.revalidate();
        navigate('/dashboard');
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <Seo title="Log In | AIdeas" description="Log in to your account" />
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Log In</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm
              onSubmit={onSubmit}
              error={loginUserMutation.error}
              isPending={loginUserMutation.isPending}
            />
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                  to="/auth/register"
                  className="text-primary hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
