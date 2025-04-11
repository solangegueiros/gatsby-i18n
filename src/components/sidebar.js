// GitBook-style Navigation Component
import * as React from 'react'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const Sidebar = () => {

  return (
    <aside className="w-64 h-full fixed left-0 top-0 bg-white shadow-lg p-6 border-r">
      <h2 className="text-xl font-bold mb-4">Gatsby - Localization</h2>
      <LanguageSwitcher />
    </aside>
  )
}

export default Sidebar
