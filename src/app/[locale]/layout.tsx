'use client'

import {I18nProviderClient} from '@/lib/i18n/client';

export default function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!['sc', 'tc', 'en'].includes(locale)) {
    return <div>Invalid locale: {locale}</div>;
  }

  return (
    <I18nProviderClient locale={locale}>
      <div data-locale={locale}>
        {children}
      </div>
    </I18nProviderClient>
  );
}