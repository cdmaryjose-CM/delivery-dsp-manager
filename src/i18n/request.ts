import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

/**
 * i18n Configuration - Cookie-based locale detection
 *
 * Flow:
 * 1. User clicks EN/ES in LanguageToggle.tsx
 * 2. POST /api/locale sets NEXT_LOCALE cookie
 * 3. Page reloads, this config reads the cookie
 * 4. NextIntlClientProvider receives messages in correct language
 */
export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;

  const locale: Locale = (localeCookie && locales.includes(localeCookie as Locale))
    ? (localeCookie as Locale)
    : defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
    timeZone: 'America/Los_Angeles'
  };
});
