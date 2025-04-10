import * as React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import Sidebar from './sidebar'

const Layout = ({ children, pageTitle }) => {
  const { t } = useTranslation()

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-6 w-full">
        <h1 className="text-2xl font-bold mb-4">{t(pageTitle)}</h1>
        {children}
      </main>
    </div>
  )
}

export default Layout
