'use client'

import React from 'react'
import { useChangeLocale, useCurrentLocale } from '@/lib/i18n/client'
import styles from './index.module.scss'

function LanguageSwitcher() {
  const changeLocale = useChangeLocale()
  const currentLocale = useCurrentLocale()

  const languages = [
    { code: 'sc', name: '简体中文' },
    { code: 'tc', name: '繁體中文' },
    { code: 'en', name: 'English' }
  ]

  const handleLanguageChange = (locale: string) => {
    changeLocale(locale as 'sc' | 'tc' | 'en')
  }

  return (
    <div className={styles.languageSwitcher}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`${styles.langButton} ${currentLocale === lang.code ? styles.active : ''}`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher