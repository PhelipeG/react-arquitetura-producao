import {
  mutationOptions,
  useMutation,
  type UseMutationOptions,
} from '@tanstack/react-query';

import { api } from '@/lib/api';
import type {
  RegisterUserData,
  RegisterUserResponse,
} from '@/types/generated/types.gen';
import {
  zRegisterUserBody,
  zRegisterUserResponse,
} from '@/types/generated/zod.gen';

export async function registerUser(
  data: RegisterUserData['body'],
): Promise<RegisterUserResponse> {
  const validatedData = zRegisterUserBody.parse(data);

  const response = await api.post<RegisterUserResponse>(
    '/auth/register',
    validatedData,
  );

  return zRegisterUserResponse.parse(response);
}

export function getRegisterUserMutationOptions() {
  return mutationOptions({
    mutationFn: registerUser,
  });
}

export function useRegisterUserMutation({
  options,
}: {
  options?: Omit<
    UseMutationOptions<RegisterUserResponse, Error, RegisterUserData['body']>,
    'mutationFn'
  >;
} = {}) {
  return useMutation({
    ...getRegisterUserMutationOptions(),
    ...options,
  });
}
