import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { data as routerData } from 'react-router';

import { Seo } from '@/components/seo';
import {
  getIdeasQueryOptions,
  useIdeasQuery,
} from '@/features/ideas/api/get-ideas';
import { getTagsQueryOptions } from '@/features/ideas/api/get-tags';
import { IdeaSearchAndFilters } from '@/features/ideas/components/idea-search-and-filters';
import { IdeasList } from '@/features/ideas/components/ideas-list';
import { useSearchAndFilters } from '@/features/ideas/hooks/use-search-and-filters';
import { createQueryClient } from '@/lib/react-query';
import type { GetAllIdeasData } from '@/types/generated/types.gen';

import type { Route } from './+types/ideas';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const ideasParams = {
    search: searchParams.get('search') || undefined,
    tags: searchParams.get('tags') || undefined,
    sortBy: searchParams.get('sortBy') || undefined,
  } as GetAllIdeasData['query'];
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getIdeasQueryOptions(ideasParams)),
    queryClient.prefetchQuery(getTagsQueryOptions()),
  ]);

  return routerData({
    dehydratedState: dehydrate(queryClient),
  });
}

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  return (
    <HydrationBoundary state={loaderData.dehydratedState}>
      <Ideas />
    </HydrationBoundary>
  );
}

function Ideas() {
  const { params } = useSearchAndFilters();

  const ideasQuery = useIdeasQuery({
    params: params as GetAllIdeasData['query'],
  });

  const allIdeas = ideasQuery.data?.data || [];

  return (
    <div className="ds-page">
      <Seo
        title="Discover AI Ideas | AIdeas"
        description="Browse and explore innovative AI application ideas from the community"
      />
      <div className="mb-8 ds-animate-in">
        <p className="ds-kicker">Browse</p>
        <h1 className="ds-title mb-3">Discover AI Ideas</h1>
        <p className="ds-subtitle mb-6">
          Browse and explore innovative AI application ideas from the community
        </p>
        <div className="ds-surface p-4 md:p-5">
          <IdeaSearchAndFilters />
        </div>
      </div>

      <div className="ds-animate-in ds-animate-in-delay-1">
        <IdeasList
          ideas={allIdeas}
          isLoading={ideasQuery.isLoading && allIdeas.length === 0}
          emptyMessage={'No ideas available yet'}
          error={ideasQuery.error}
        />
      </div>
    </div>
  );
}
