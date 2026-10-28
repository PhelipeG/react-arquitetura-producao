import type { ResourceLanguage } from 'i18next';

// Feature translations (imported from features)

// App-level translations (staying in app/locales)
import authTranslations from '../../../src/features/auth/locales/en';
import ideasTranslations from '../../../src/features/ideas/locales/en';
import profileTranslations from '../../../src/features/profile/locales/en';
import reviewsTranslations from '../../../src/features/reviews/locales/en';

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
  auth: authTranslations, // From features/auth
  ideas: ideasTranslations, // From features/ideas
  reviews: reviewsTranslations, // From features/reviews
  profile: profileTranslations, // From features/profile
} satisfies ResourceLanguage;
