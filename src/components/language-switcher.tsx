import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher, useRevalidator } from 'react-router';

import { Button } from '@/components/ui/button';
import { i18nConfig, type Language } from '@/config/i18n';
import { cn } from '@/lib/utils';

function FlagEn({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0 V40 M0 20 H60" stroke="#fff" strokeWidth="12" />
      <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function FlagPt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width="60" height="40" fill="#009C3B" />
      <polygon points="30,4 54,20 30,36 6,20" fill="#FFDF00" />
      <circle cx="30" cy="20" r="8" fill="#002776" />
    </svg>
  );
}

const languageOptions = [
  {
    code: 'en' as const,
    labelKey: 'languageSwitcher.english' as const,
    Flag: FlagEn,
  },
  {
    code: 'pt' as const,
    labelKey: 'languageSwitcher.portuguese' as const,
    Flag: FlagPt,
  },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { t, i18n } = useTranslation('components');
  const fetcher = useFetcher<{ success: boolean }>();
  const revalidator = useRevalidator();
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null);
  const activeLanguage = (i18n.resolvedLanguage ?? i18n.language).startsWith(
    'pt',
  )
    ? 'pt'
    : 'en';

  useEffect(() => {
    if (
      fetcher.state !== 'idle' ||
      !fetcher.data?.success ||
      !pendingLanguage
    ) {
      return;
    }

    void i18n.changeLanguage(pendingLanguage).then(() => {
      document.documentElement.lang = pendingLanguage;
      document.documentElement.dir =
        typeof i18n.dir === 'function' ? i18n.dir(pendingLanguage) : 'ltr';
      setPendingLanguage(null);
      revalidator.revalidate();
    });
  }, [fetcher.data, fetcher.state, i18n, pendingLanguage, revalidator]);

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      role="group"
      aria-label={t('languageSwitcher.switchLanguage')}
    >
      {languageOptions.map(({ code, labelKey, Flag }) => {
        const isActive = activeLanguage === code;

        return (
          <fetcher.Form
            key={code}
            method="post"
            action="/api/set-language"
            className="inline-flex"
            onSubmit={() => setPendingLanguage(code)}
          >
            <input type="hidden" name={i18nConfig.cookieName} value={code} />
            <Button
              type="submit"
              variant="ghost"
              size="icon-sm"
              disabled={fetcher.state !== 'idle' || isActive}
              aria-label={t(labelKey)}
              aria-pressed={isActive}
              title={t(labelKey)}
              className={cn(
                'overflow-hidden border border-transparent',
                isActive && 'border-border bg-muted',
              )}
            >
              <Flag className="size-5 rounded-[2px]" />
            </Button>
          </fetcher.Form>
        );
      })}
    </div>
  );
}
