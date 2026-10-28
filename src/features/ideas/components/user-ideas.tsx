import { useTranslation } from 'react-i18next';

import { IdeasList } from '@/features/ideas/components/ideas-list';

import { useIdeasByUserQuery } from '../api/get-ideas-by-user';

export type UserIdeasProps = {
  username: string;
};

export function UserIdeas({ username }: UserIdeasProps) {
  const { t } = useTranslation('ideas');
  const ideasQuery = useIdeasByUserQuery({ username });
  const ideas = ideasQuery.data?.data;

  return (
    <div>
      <h2 className="ds-title text-xl mb-6">
        {t('list.byUser', { username, count: ideas?.length || 0 })}
      </h2>
      <IdeasList
        ideas={ideas}
        isLoading={ideasQuery.isLoading}
        emptyMessage={t('list.emptyByUser', { username })}
        error={ideasQuery.error}
      />
    </div>
  );
}
