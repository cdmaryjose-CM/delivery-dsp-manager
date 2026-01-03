'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export const LanguageToggle: React.FC = () => {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = React.useState('en');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Read current locale from cookie
    const cookies = document.cookie.split(';');
    const localeCookie = cookies.find(c => c.trim().startsWith('NEXT_LOCALE='));
    if (localeCookie) {
      const locale = localeCookie.split('=')[1];
      setCurrentLocale(locale);
    }
  }, []);

  const toggleLocale = async () => {
    const newLocale = currentLocale === 'en' ? 'es' : 'en';

    // Set cookie via API
    await fetch('/api/locale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ locale: newLocale }),
    });

    setCurrentLocale(newLocale);
    router.refresh();
  };

  if (!mounted) {
    return (
      <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-800">
        EN
      </button>
    );
  }

  return (
    <button
      onClick={toggleLocale}
      className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
      aria-label={`Switch to ${currentLocale === 'en' ? 'Spanish' : 'English'}`}
    >
      {currentLocale === 'en' ? 'ES' : 'EN'}
    </button>
  );
};
