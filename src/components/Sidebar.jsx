// GitBook-style Navigation Component
import * as React from 'react'
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const navItems = [
  { titleKey: 'introduction', path: '/introduction' },
  { titleKey: 'getting_started', path: '/getting-started' },
]
  

const Sidebar = () => {
  const { t } = useTranslation()

  return (
    <aside className="sidebar">
      <LanguageSwitcher />
      
      <h2 className="sidebar__title">{t('docs')}</h2>
      <nav className="sidebar__nav">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className="sidebar__link"
            activeClassName="sidebar__link--active"
          >
            {t(item.titleKey)}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
