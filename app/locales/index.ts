import type { ResourceLanguage } from 'i18next';

import { type Language } from '@/config/i18n';

import en from './en';
import pt from './pt/index';

export type Resource = typeof en;

export const resources = { en, pt } satisfies Record<
  Language,
  ResourceLanguage
>;
