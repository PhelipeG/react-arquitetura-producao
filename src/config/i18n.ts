export const languages = {
  en: 'English',
  pt: 'Português',
} as const;

export type Language = keyof typeof languages;

const supportedLanguages = Object.keys(languages) as Language[];

export const i18nConfig = {
  defaultNS: 'common' as const, // namespace a ser usado quando nao especificado
  fallbackLng: 'en' as const, // idoma de fallback
  supportedLanguages, // lista de idiomas soportados
  backend: {
    // backend para carregar os arquivos de tradução
    loadPath: '/api/locales/{{lng}}/{{ns}}',
  },
  // usado para detectar o idioma do usuario pelo browser
  detection: {
    order: ['htmlTag'],
    caches: [],
  },
  cookieName: 'lng' as const, // nome do cookie para armazenar o idioma do usuario
};

export type TranslationOf<T> = {
  [K in keyof T]: T[K] extends string ? string : TranslationOf<T[K]>;
};
