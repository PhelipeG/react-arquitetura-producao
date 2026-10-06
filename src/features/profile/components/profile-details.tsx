import { User as UserIcon, Calendar } from 'lucide-react';

import { MarkdownRenderer } from '@/components/markdown-renderer';
import { CURRENT_USER } from '@/lib/api';
import { formatDate } from '@/lib/date';
import type { User } from '@/types/generated/types.gen';

import { EditProfile } from './edit-profile';

export type ProfileDetailsProps = {
  profile: User | undefined;
};

export function ProfileDetails({ profile }: ProfileDetailsProps) {
  const user = CURRENT_USER;

  const isMyProfile = user ? user.username === profile?.username : false;

  if (!profile) {
    return (
      <div className="text-center py-12">
        <h1 className="ds-title mb-4">User not found</h1>
      </div>
    );
  }

  return (
    <>
      <article className="ds-surface mb-8 overflow-hidden ds-animate-in">
        <div className="p-6 md:p-8 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="h-20 w-20 shrink-0 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
            <UserIcon className="h-9 w-9 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <p className="ds-kicker">Profile</p>
            <h1 className="ds-title truncate">@{profile.username}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Calendar className="h-4 w-4" />
              <span>Joined {formatDate(profile.createdAt, 'en')}</span>
            </div>
          </div>
        </div>
        {profile.bio && (
          <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
            <div className="ds-prose text-sm border-t border-border/70 pt-5">
              <MarkdownRenderer content={profile.bio} />
            </div>
          </div>
        )}
      </article>
      {isMyProfile && (
        <div className="flex justify-end mb-6">
          <EditProfile profile={profile} />
        </div>
      )}
    </>
  );
}
