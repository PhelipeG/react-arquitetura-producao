import {
  mutationOptions,
  useMutation,
  type UseMutationOptions,
} from '@tanstack/react-query';

import { api } from '@/lib/api';
import type {
  UpdateIdeaData,
  UpdateIdeaResponse,
} from '@/types/generated/types.gen';
import {
  zUpdateIdeaBody,
  zUpdateIdeaPath,
  zUpdateIdeaResponse,
} from '@/types/generated/zod.gen';

export async function updateIdea({
  body,
  path,
}: {
  body: UpdateIdeaData['body'];
  path: UpdateIdeaData['path'];
}): Promise<UpdateIdeaResponse> {
  const validatedPath = zUpdateIdeaPath.parse(path);
  const validatedBody = zUpdateIdeaBody.parse(body);

  const response = await api.patch<UpdateIdeaResponse>(
    `/ideas/${validatedPath.id}`,
    validatedBody,
  );

  return zUpdateIdeaResponse.parse(response);
}

export function getUpdateIdeaMutationOptions() {
  return mutationOptions({
    mutationFn: updateIdea,
  });
}

export function useUpdateIdeaMutation({
  options,
}: {
  options?: Omit<
    UseMutationOptions<
      UpdateIdeaResponse,
      Error,
      { body: UpdateIdeaData['body']; path: UpdateIdeaData['path'] }
    >,
    'mutationFn'
  >;
}) {
  return useMutation({
    ...getUpdateIdeaMutationOptions(),
    ...options,
  });
}
