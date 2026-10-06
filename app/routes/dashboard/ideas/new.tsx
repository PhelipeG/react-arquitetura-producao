import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { ErrorMessage } from '@/components/error-message';
import { useCreateIdeaMutation } from '@/features/ideas/api/create-idea';
import { IdeaForm } from '@/features/ideas/components/idea-form';
import { ideasQueryKeys } from '@/features/ideas/config/query-keys';

export default function NewIdeaPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // We are using the mutation hook to get the mutation object:
  const createIdeaMutation = useCreateIdeaMutation({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ideasQueryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: ideasQueryKeys.current() });
        navigate('/dashboard/ideas');
      },
    },
  });
  return (
    <div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Create New Idea</h1>
          <p className="text-muted-foreground">
            Share your AI idea with the community
          </p>
        </div>
        Chapter 5 136
        {/* We are displaying the error state if the mutation fails */}
        {createIdeaMutation.error && (
          <ErrorMessage error={createIdeaMutation.error} />
        )}
        <IdeaForm
          // We are using mutate method to trigger the mutation
          onSubmit={createIdeaMutation.mutate}
          onCancel={() => navigate('/dashboard/ideas')}
          // We are showing the loading state if the mutation is pending
          isSubmitting={createIdeaMutation.isPending}
        />
      </div>
    </div>
  );
}
