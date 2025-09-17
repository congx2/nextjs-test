import { createI18nClient } from 'next-international/client'

export const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, useCurrentLocale } = createI18nClient({
  sc: () => import('../../../locales/sc/ship.json'),
  tc: () => import('../../../locales/tc/ship.json'),
  en: () => import('../../../locales/en/ship.json'),
})