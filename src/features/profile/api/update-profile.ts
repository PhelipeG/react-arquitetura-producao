import {
  mutationOptions,
  useMutation,
  type UseMutationOptions,
} from '@tanstack/react-query';

import { api } from '@/lib/api';
import type {
  UpdateProfileData,
  UpdateProfileResponse,
} from '@/types/generated/types.gen';
import {
  zUpdateProfileBody,
  zUpdateProfileResponse,
} from '@/types/generated/zod.gen';

export async function updateProfile(
  data?: UpdateProfileData['body'],
): Promise<UpdateProfileResponse> {
  const validatedBody = zUpdateProfileBody.parse(data);

  const response = await api.patch<UpdateProfileResponse>(
    '/profile',
    validatedBody,
  );

  return zUpdateProfileResponse.parse(response);
}

export function getUpdateProfileMutationOptions() {
  return mutationOptions({
    mutationFn: updateProfile,
  });
}

export function useUpdateProfileMutation({
  options,
}: {
  options?: Omit<
    UseMutationOptions<
      UpdateProfileResponse,
      Error,
      UpdateProfileData['body'] | undefined
    >,
    'mutationFn'
  >;
}) {
  return useMutation({
    ...getUpdateProfileMutationOptions(),
    ...options,
  });
}
