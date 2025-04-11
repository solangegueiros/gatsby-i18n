// GitBook-style Navigation Component
import * as React from 'react'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'

const Sidebar = () => {
  const { languages, changeLanguage, language } = useI18next()

  return (
    <aside className="w-64 h-full fixed left-0 top-0 bg-white shadow-lg p-6 border-r">
      <h2 className="text-xl font-bold mb-4">Gatsby with Localization</h2>
      <div className="mt-8">
        <h3 className="text-sm font-semibold mb-1">Language</h3>
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
    </aside>
  )
}

export default Sidebar
