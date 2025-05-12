// src/components/Sidebar.jsx
import * as React from 'react'
import { graphql } from 'gatsby'
import { useStaticQuery } from 'gatsby'
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next'

import SidebarTree from './SidebarTree'
import DocsSidebar from './DocsSidebar'
import BlogSidebar from './BlogSidebar'

const Sidebar = ({ location }) => {
  const { t } = useTranslation()
  const { language } = useI18next()
  //console.log(`language`, language)


  console.log("Sidebar location\n", JSON.stringify(location, null, 2));
  const path = location?.pathname || ''
  const isDocs = path.includes('/docs/')
  const isBlog = path.includes('/blog/')
  //const isDocs = path.match(/^\/(?:[a-z]{2}\/)?docs(?:\/|$)/)
  console.log(`isDocs: ${isDocs} \t isBlog: ${isBlog}`)

/*
          {isDocs && <DocsSidebar />}
          {isBlog && <BlogSidebar />}

*/

  return (
    <>
      {isDocs && <DocsSidebar />}
      {isBlog && <BlogSidebar />}
    </>
  )
}

export default Sidebar