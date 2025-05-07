//src/components/Layout.jsx
import React, { useState } from 'react'

import Menu from './Menu'
import Sidebar from './Sidebar'


const Layout = ({ children, pageTitle, data }) => {
  
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  //<h1 >{t(pageTitle)}</h1>
  return (
    <div className="layout">
      <Menu />
      <div className="layout-body">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <Sidebar className={isSidebarOpen ? 'open' : ''} />

        <main className="main-content">          
          <h1>{pageTitle}</h1>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
