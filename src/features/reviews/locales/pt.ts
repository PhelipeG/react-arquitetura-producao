import type { TranslationOf } from '@/config/i18n';

import type en from './en';

export default {
  actions: {
    delete: 'Excluir avaliação',
    edit: 'Editar avaliação',
  },
  byUser: 'Avaliações de {{username}} ({{count}})',
  count: 'Avaliações ({{count}})',
  create: {
    error: 'Falha ao criar a avaliação',
    submit: 'Escrever avaliação',
    success: 'Avaliação criada',
  },
  delete: {
    description:
      'Tem certeza de que deseja excluir esta avaliação? Essa ação não pode ser desfeita.',
    error: 'Falha ao excluir a avaliação',
    success: 'Avaliação excluída',
    title: 'Excluir avaliação',
  },
  emptyByUser: '{{username}} ainda não escreveu nenhuma avaliação.',
  emptyDescription:
    'Compartilhe sua opinião e ajude outras pessoas a descobrir boas ideias.',
  emptyMine:
    'Você ainda não escreveu nenhuma avaliação. Explore ideias e compartilhe seu feedback!',
  emptyTitle:
    'Nenhuma avaliação ainda. Seja a primeira pessoa a avaliar esta ideia!',
  form: {
    content: 'Avaliação',
    contentPlaceholder: 'Escreva sua avaliação aqui...',
    editDescription: 'Atualize sua avaliação desta ideia',
    editTitle: 'Editar avaliação',
    rating: 'Nota',
    reviewFor: 'Avaliação de:',
    submit: 'Enviar avaliação',
    writeDescription: 'Compartilhe sua opinião sobre esta ideia',
    writeTitle: 'Escrever avaliação',
  },
  mine: {
    description: 'Veja e gerencie todas as avaliações que você escreveu',
    kicker: 'Feedback',
    metaDescription:
      'Veja e gerencie todas as avaliações que você escreveu para ideias de aplicações de IA',
    metaTitle: 'Minhas avaliações | AIdeas',
    title: 'Minhas avaliações',
  },
  updated: 'Avaliação atualizada',
} satisfies TranslationOf<typeof en>;
