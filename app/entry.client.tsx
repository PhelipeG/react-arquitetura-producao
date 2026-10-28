import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import Fetch from 'i18next-fetch-backend';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { HydratedRouter } from 'react-router/dom';

import { i18nConfig } from '@/config/i18n';

async function main() {
  await i18next
    .use(initReactI18next) // inicializa o i18next com o react
    .use(Fetch) // usa o fetch para carregar os arquivos de tradução
    .use(I18nextBrowserLanguageDetector) // usa o browser language detector para detectar o idioma do usuario
    .init({
      fallbackLng: i18nConfig.fallbackLng,
      supportedLngs: i18nConfig.supportedLanguages,
      defaultNS: i18nConfig.defaultNS,
      detection: i18nConfig.detection,
      backend: i18nConfig.backend,
    });

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <HydratedRouter />
        </StrictMode>
      </I18nextProvider>,
    );
  });
}

main().catch((error) => console.error(error));
