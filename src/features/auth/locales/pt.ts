import type { TranslationOf } from '@/config/i18n';

import type en from './en';

export default {
  fields: {
    email: 'E-mail',
    password: 'Senha',
    username: 'Nome de usuário',
  },
  login: {
    metaDescription: 'Entre na sua conta',
    metaTitle: 'Entrar | AIdeas',
    noAccount: 'Não tem uma conta?',
    registerLink: 'Cadastre-se',
    submit: 'Entrar',
    submitting: 'Entrando...',
    title: 'Entrar',
  },
  register: {
    hasAccount: 'Já tem uma conta?',
    loginLink: 'Entrar',
    metaDescription: 'Crie uma nova conta',
    metaTitle: 'Cadastro | AIdeas',
    submit: 'Cadastrar',
    submitting: 'Criando conta...',
    title: 'Cadastrar',
  },
} satisfies TranslationOf<typeof en>;
