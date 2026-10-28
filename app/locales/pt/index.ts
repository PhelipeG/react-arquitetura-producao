import type { ResourceLanguage } from 'i18next';

import type { TranslationOf } from '@/config/i18n';

import authTranslations from '../../../src/features/auth/locales/pt';
import ideasTranslations from '../../../src/features/ideas/locales/pt';
import profileTranslations from '../../../src/features/profile/locales/pt';
import reviewsTranslations from '../../../src/features/reviews/locales/pt';
import type en from '../en';

import about from './about';
import common from './common';
import components from './components';
import dashboard from './dashboard';
import home from './home';
import navigation from './navigation';
import notFound from './not-found';

export default {
  common,
  notFound,
  home,
  about,
  dashboard,
  navigation,
  components,
  auth: authTranslations,
  ideas: ideasTranslations,
  reviews: reviewsTranslations,
  profile: profileTranslations,
} satisfies ResourceLanguage & TranslationOf<typeof en>;
