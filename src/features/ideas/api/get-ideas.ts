import {
  infiniteQueryOptions,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import { api } from '@/lib/api';
import type {
  GetAllIdeasData,
  GetAllIdeasResponse,
} from '@/types/generated/types.gen';
import {
  zGetAllIdeasQuery,
  zGetAllIdeasResponse,
} from '@/types/generated/zod.gen';

import { ideasQueryKeys } from '../config/query-keys';

export async function getIdeas(
  params?: GetAllIdeasData['query'],
): Promise<GetAllIdeasResponse> {
  const validatedData = zGetAllIdeasQuery.parse(params ?? {});

  const response = await api.get<GetAllIdeasResponse>('/ideas', {
    params: { ...validatedData, limit: 10 },
  });

  return zGetAllIdeasResponse.parse(response);
}

export function getIdeasQueryOptions(params?: GetAllIdeasData['query']) {
  return queryOptions({
    queryKey: ideasQueryKeys.list(params),
    queryFn: () => getIdeas(params),
  });
}

export function useIdeasQuery({
  params,
  options,
}: {
  params?: GetAllIdeasData['query'];
  options?: Omit<
    ReturnType<typeof getIdeasQueryOptions>,
    'queryKey' | 'queryFn'
  >;
}) {
  return useQuery({
    ...getIdeasQueryOptions(params),
    ...options,
  });
}

export function getIdeasInfiniteQueryOptions(
  params?: GetAllIdeasData['query'],
) {
  return infiniteQueryOptions({
    queryKey: ideasQueryKeys.list(params),
    queryFn: ({ pageParam }) =>
      // paginaParam é o parametro da pagina a ser carregada
      getIdeas({ ...params, page: pageParam.toString() }),
    getNextPageParam: ({ pagination }) => pagination.nextPage, // pega o nextPage da resposta da api para saber qual a proxima pagina a ser carregada
    initialPageParam: 1, // pagina inicial a ser carregada
  });
}

export function useIdeasInfiniteQuery({
  params,
  options,
}: {
  params?: GetAllIdeasData['query'];
  options?: Omit<
    ReturnType<typeof getIdeasInfiniteQueryOptions>,
    'queryKey' | 'queryFn'
  >;
}) {
  return useInfiniteQuery({
    ...getIdeasInfiniteQueryOptions(params),
    ...options,
  });
}
