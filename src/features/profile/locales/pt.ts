import type { TranslationOf } from '@/config/i18n';

import type en from './en';

export default {
  edit: {
    description: 'Atualize as informações do seu perfil',
    success: 'Perfil atualizado',
    title: 'Editar perfil',
  },
  form: {
    bio: 'Bio',
    bioPlaceholder: 'Conte um pouco sobre você',
  },
  joined: 'Entrou em {{date}}',
  kicker: 'Perfil',
  metaDescription: 'Veja perfil, ideias e avaliações',
  notFound: 'Usuário não encontrado',
  pageError: {
    description: 'Erro ao carregar o perfil',
    title: 'Erro ao carregar o perfil',
    titleWithBrand: 'Erro ao carregar o perfil | AIdeas',
  },
} satisfies TranslationOf<typeof en>;
