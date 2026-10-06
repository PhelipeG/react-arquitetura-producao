import { data as routerData, Link } from 'react-router';

import { ErrorMessage } from '@/components/error-message';
import { Seo } from '@/components/seo';
import { buttonVariants } from '@/components/ui/button';
import { UserIdeas } from '@/features/ideas/components/user-ideas';
import {
  getProfileByUsername,
  useProfileByUsernameQuery,
} from '@/features/profile/api/get-profile-by-username';
import { ProfileDetails } from '@/features/profile/components/profile-details';
import { UserReviews } from '@/features/reviews/components/user-reviews';

import type { Route } from './+types/profile';

export async function loader({ params }: Route.LoaderArgs) {
  const profile = await getProfileByUsername(params.username);

  return routerData({
    profile,
  });
}

export default function ProfilePage({
  params,
  loaderData,
}: Route.ComponentProps) {
  const profileQuery = useProfileByUsernameQuery({
    username: params.username,
    options: {
      initialData: loaderData?.profile ?? undefined,
    },
  });

  const profile = profileQuery.data ?? loaderData?.profile;

  return (
    <div className="ds-page ds-page-narrow">
      <Seo
        title={`${profile.username} | AIdeas`}
        description="View profile, ideas, and reviews"
      />
      <ProfileDetails profile={profile} />
      <div className="mb-8">
        <UserIdeas username={params.username} />
      </div>
      <UserReviews username={params.username} />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="ds-page ds-page-narrow">
      <Seo
        title="Error loading profile | AIdeas"
        description="Error loading profile"
      />
      <div className="space-y-6">
        <ErrorMessage error={error} title="Error loading profile" />
        <div className="flex justify-center">
          <Link
            to="/"
            className={buttonVariants({ variant: 'outline', size: 'lg' })}
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
