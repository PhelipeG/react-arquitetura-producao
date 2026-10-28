import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { CreateIdeaData, Idea } from '@/types/generated/types.gen';
import { zCreateIdeaBody } from '@/types/generated/zod.gen';

import { useTagsQuery } from '../api/get-tags';

export type IdeaFormProps = {
  initialData?: Idea | null;
  onSubmit: (data: CreateIdeaData['body']) => void;
  onCancel?: () => void;
  isSubmitting: boolean;
};

export function IdeaForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}: IdeaFormProps) {
  const { t } = useTranslation(['ideas', 'common']);
  const tagsQuery = useTagsQuery();
  const availableTags = tagsQuery.data?.data || [];

  const form = useForm<CreateIdeaData['body']>({
    resolver: zodResolver(zCreateIdeaBody),
    defaultValues: {
      title: initialData?.title || '',
      shortDescription: initialData?.shortDescription || '',
      description: initialData?.description || '',
      tags: initialData?.tags || [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('ideas:form.title')}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t('ideas:form.titlePlaceholder')}
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('ideas:form.shortDescription')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('ideas:form.shortDescriptionPlaceholder')}
                  rows={2}
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('ideas:form.description')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('ideas:form.descriptionPlaceholder')}
                  rows={8}
                  disabled={isSubmitting}
                  className="min-h-50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('ideas:form.tags')}</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {tagsQuery.isLoading ? (
                    <p className="text-sm text-muted-foreground">
                      {t('ideas:form.loadingTags')}
                    </p>
                  ) : availableTags.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      {t('ideas:form.noTags')}
                    </p>
                  ) : (
                    availableTags.map((tag: string) => {
                      const isSelected = field.value?.includes(tag);
                      return (
                        <Badge
                          key={tag}
                          variant={isSelected ? 'default' : 'outline'}
                          className="cursor-pointer"
                          onClick={() => {
                            if (isSubmitting) return;
                            const currentTags = field.value || [];
                            const newTags = isSelected
                              ? currentTags.filter((item) => item !== tag)
                              : [...currentTags, tag];
                            field.onChange(newTags);
                          }}
                        >
                          {tag}
                        </Badge>
                      );
                    })
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? t('ideas:create.saving')
              : initialData
                ? t('ideas:create.update')
                : t('ideas:create.submit')}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {t('common:cancel')}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
