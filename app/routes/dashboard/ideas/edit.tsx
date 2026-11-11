import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

import { ErrorMessage } from '@/components/error-message';
import { Seo } from '@/components/seo';
import { useIdeaByIdQuery } from '@/features/ideas/api/get-idea-by-id';
import { useUpdateIdeaMutation } from '@/features/ideas/api/update-idea';
import { IdeaForm } from '@/features/ideas/components/idea-form';
import { ideasQueryKeys } from '@/features/ideas/config/query-keys';
import { useTransitionNavigate } from '@/hooks/use-transition-navigate';
import type { CreateIdeaData } from '@/types/generated/types.gen';

export default function EditIdeaPage() {
  const { t } = useTranslation('ideas');
  const { id } = useParams();
  const ideaId = id as string;
  const navigate = useTransitionNavigate();
  const queryClient = useQueryClient();

  const ideaQuery = useIdeaByIdQuery({ id: ideaId });
  const idea = ideaQuery.data;

  const updateIdeaMutation = useUpdateIdeaMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ideasQueryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: ideasQueryKeys.current() });
        queryClient.invalidateQueries({
          queryKey: ideasQueryKeys.detail(ideaId),
        });
        navigate(`/ideas/${ideaId}`);
      },
    },
  });

  const handleSubmit = (data: CreateIdeaData['body']) => {
    updateIdeaMutation.mutate({
      path: { id: ideaId },
      body: data,
    });
  };

  if (ideaQuery.isLoading) {
    return <p className="text-muted-foreground">{t('create.saving')}</p>;
  }

  if (ideaQuery.error || !idea) {
    return (
      <ErrorMessage error={ideaQuery.error ?? new Error('Idea not found')} />
    );
  }

  return (
    <div>
      <Seo title={t('create.update')} description={t('create.description')} />
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('create.update')}</h1>
          <p className="text-muted-foreground">{t('create.description')}</p>
        </div>
        {updateIdeaMutation.error && (
          <ErrorMessage error={updateIdeaMutation.error} />
        )}
        <IdeaForm
          initialData={idea}
          onSubmit={handleSubmit}
          onCancel={() => navigate(`/ideas/${ideaId}`)}
          isSubmitting={updateIdeaMutation.isPending}
        />
      </div>
    </div>
  );
}
