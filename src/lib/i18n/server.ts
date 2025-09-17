import { createI18nServer } from 'next-international/server'

export const { getI18n, getScopedI18n, getStaticParams } = createI18nServer({
  sc: () => import('../../../locales/sc/ship.json'),
  tc: () => import('../../../locales/tc/ship.json'),
  en: () => import('../../../locales/en/ship.json'),
})