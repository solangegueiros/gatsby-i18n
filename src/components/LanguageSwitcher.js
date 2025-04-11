// src/components/LanguageSwitcher.js
import React from 'react'
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next'
//import '../styles/sidebar.scss'

const LanguageSwitcher = () => {
  const { languages, changeLanguage, language } = useI18next()
  const { t } = useTranslation()

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold mb-1">{t('language')}</h3>
      <div className="flex space-x-2">
        {languages.map(lang => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang)}
            className={`px-2 py-1 rounded text-sm ${lang === language ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSwitcher
