import React, { useState } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import Sidebar from './Sidebar'
import '../styles/sidebar.scss'

const Layout = ({ children, pageTitle }) => {
  const { t } = useTranslation()
  
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  return (
    <div className="layout">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar />
      </div>
      <main className="main-content">
        <h1 >{t(pageTitle)}</h1>
        {children}
      </main>
    </div>
  )
}

export default Layout
