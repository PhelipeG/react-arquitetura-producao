import type { TranslationOf } from '@/config/i18n';

import type en from './en';

export default {
  actions: {
    delete: 'Excluir ideia',
    edit: 'Editar ideia',
  },
  create: {
    description: 'Compartilhe sua ideia de IA com a comunidade',
    saving: 'Salvando...',
    submit: 'Criar ideia',
    title: 'Criar nova ideia',
    update: 'Atualizar ideia',
  },
  delete: {
    description:
      'Tem certeza de que deseja excluir "{{title}}"? Essa ação não pode ser desfeita.',
    error: 'Falha ao excluir a ideia',
    success: 'Ideia excluída',
    title: 'Excluir ideia',
  },
  detail: {
    back: 'Voltar para ideias',
    errorMetaTitle: 'Erro ao carregar ideia | AIdeas',
    errorTitle: 'Erro ao carregar ideia',
    fallbackDescription: 'Ver detalhes da ideia',
    fallbackTitle: 'Ideia',
  },
  discover: {
    description:
      'Navegue e explore ideias inovadoras de aplicações de IA da comunidade',
    metaTitle: 'Descobrir ideias de IA | AIdeas',
    title: 'Descobrir ideias de IA',
  },
  filters: {
    filterByTags: 'Filtrar por tags:',
    newest: 'Mais recentes',
    oldest: 'Mais antigas',
    rating: 'Melhor avaliação',
    reviews: 'Mais avaliações',
    searchPlaceholder: 'Buscar ideias por título ou descrição...',
    sortBy: 'Ordenar por:',
  },
  form: {
    description: 'Descrição detalhada (Markdown)',
    descriptionPlaceholder: 'Digite a descrição detalhada em Markdown',
    loadingTags: 'Carregando tags...',
    noTags: 'Nenhuma tag disponível',
    shortDescription: 'Descrição curta',
    shortDescriptionPlaceholder: 'Digite uma breve descrição',
    tags: 'Tags',
    title: 'Título',
    titlePlaceholder: 'Digite o título da ideia',
  },
  list: {
    byUser: 'Ideias de {{username}} ({{count}})',
    emptyByUser: '{{username}} ainda não compartilhou nenhuma ideia.',
    emptyDescription:
      'Volte mais tarde ou seja a primeira pessoa a compartilhar uma ideia!',
    emptyMine: 'Você ainda não criou nenhuma ideia.',
    emptyTitle: 'Nenhuma ideia disponível ainda',
    loadMore: 'Carregar mais ideias',
    loadingMore: 'Carregando mais ideias...',
    reviews: '{{count}} avaliações',
  },
  mine: {
    description: 'Gerencie e acompanhe as ideias que você enviou',
    metaDescription:
      'Gerencie e acompanhe as ideias de aplicações de IA que você enviou',
    metaTitle: 'Minhas ideias | AIdeas',
    new: 'Nova ideia',
    title: 'Minhas ideias',
  },
} satisfies TranslationOf<typeof en>;
