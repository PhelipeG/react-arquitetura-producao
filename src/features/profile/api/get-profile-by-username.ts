import { queryOptions, useQuery } from '@tanstack/react-query';

import { profileQueryKeys } from '@/features/profile/config/query-keys';
import { api } from '@/lib/api';
import type { GetUserByUsernameResponse } from '@/types/generated/types.gen';
import {
  zGetUserByUsernamePath,
  zGetUserByUsernameResponse,
} from '@/types/generated/zod.gen';

export async function getProfileByUsername(
  username: string,
): Promise<GetUserByUsernameResponse> {
  const validatedPath = zGetUserByUsernamePath.parse({ username });

  const response = await api.get<GetUserByUsernameResponse>(
    `/profile/${validatedPath.username}`,
  );

  return zGetUserByUsernameResponse.parse(response);
}

export function getProfileByUsernameQueryOptions(username: string) {
  return queryOptions({
    queryKey: profileQueryKeys.byUsername(username),
    queryFn: () => getProfileByUsername(username),
  });
}

export function useProfileByUsernameQuery({
  username,
  options,
}: {
  username: string;
  options?: Omit<
    ReturnType<typeof getProfileByUsernameQueryOptions>,
    'queryKey' | 'queryFn'
  >;
}) {
  return useQuery({
    ...getProfileByUsernameQueryOptions(username),
    ...options,
  });
}
