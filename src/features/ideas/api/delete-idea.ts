import {
  mutationOptions,
  useMutation,
  type UseMutationOptions,
} from '@tanstack/react-query';

import { api } from '@/lib/api';
import type {
  DeleteIdeaData,
  DeleteIdeaResponse,
} from '@/types/generated/types.gen';
import {
  zDeleteIdeaPath,
  zDeleteIdeaResponse,
} from '@/types/generated/zod.gen';

export async function deleteIdea(
  path: DeleteIdeaData['path'],
): Promise<DeleteIdeaResponse> {
  const validatedPath = zDeleteIdeaPath.parse(path);

  const response = await api.delete<DeleteIdeaResponse>(
    `/ideas/${validatedPath.id}`,
  );

  return zDeleteIdeaResponse.parse(response);
}

export function getDeleteIdeaMutationOptions() {
  return mutationOptions({
    mutationFn: deleteIdea,
  });
}

export function useDeleteIdeaMutation({
  options,
}: {
  options?: Omit<
    UseMutationOptions<DeleteIdeaResponse, Error, DeleteIdeaData['path']>,
    'mutationFn'
  >;
}) {
  return useMutation({
    ...getDeleteIdeaMutationOptions(),
    ...options,
  });
}
