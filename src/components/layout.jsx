import * as React from "react"
import { useTranslation } from 'gatsby-plugin-react-i18next'
import Sidebar from './Sidebar'
import '../styles/sidebar.scss'

const Layout = ({ children, pageTitle }) => {
  const { t } = useTranslation()


  return (
    <div className="layout">
      <Sidebar />

      <main className="main-content">
        <h1 >{t(pageTitle)}</h1>
        {children}
      </main>
    </div>
  )
}

export default Layout
