import {
  mutationOptions,
  useMutation,
  type UseMutationOptions,
} from '@tanstack/react-query';

import { api } from '@/lib/api';
import type {
  LoginUserData,
  LoginUserResponse,
} from '@/types/generated/types.gen';
import { zLoginUserBody, zLoginUserResponse } from '@/types/generated/zod.gen';

export async function loginUser(
  data: LoginUserData['body'],
): Promise<LoginUserResponse> {
  const validatedData = zLoginUserBody.parse(data);

  const response = await api.post<LoginUserResponse>(
    '/auth/login',
    validatedData,
  );

  return zLoginUserResponse.parse(response);
}

export function getLoginUserMutationOptions() {
  return mutationOptions({
    mutationFn: loginUser,
  });
}

export function useLoginUserMutation({
  options,
}: {
  options?: Omit<
    UseMutationOptions<LoginUserResponse, Error, LoginUserData['body']>,
    'mutationFn'
  >;
} = {}) {
  return useMutation({
    ...getLoginUserMutationOptions(),
    ...options,
  });
}
