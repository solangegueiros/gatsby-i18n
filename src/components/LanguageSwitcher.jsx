// src/components/LanguageSwitcher.js
import React from 'react'
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next'
import '../styles/sidebar.scss'

const LanguageSwitcher = () => {
  const { languages, changeLanguage, language } = useI18next()
  const { t } = useTranslation()

  return (
    <div className="sidebar__language-switcher">
      <h3 className="sidebar__language-title">{t('language')}</h3>
      <div className="sidebar__language-buttons">
        {languages.map(lang => (
          <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={`sidebar__language-button ${lang === language ? 'sidebar__language-button--active' : ''}`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSwitcher
