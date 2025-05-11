// src/components/Sidebar.jsx
import * as React from 'react'
import { graphql } from 'gatsby'
import { useStaticQuery } from 'gatsby'
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next'

import SidebarTree from './SidebarTree'

const Sidebar = () => {
  const { t } = useTranslation()
  const { language } = useI18next()
  //console.log(`language`, language)

  const data = useStaticQuery(graphql`
    query {
      docs: allMdx(
        sort: { frontmatter: { order: ASC } }
        filter: {           
          internal: {contentFilePath: {regex: "/doc/"}}
        }
      ) {
          nodes {
            id
            frontmatter {            
              title
              slug
              order
            }
            fields {
              locale
              subfolder
            }             
          }
        }
    }
  `)
  //console.log("docs \n", JSON.stringify(data.docs, null, 2));  
  const { nodes } = data.docs;   

  return (
    <aside className="sidebar">
      
      <br/>
      
      <h2 className="sidebar__title">{t('docs')}</h2>
      <nav className="sidebar__nav">
          <SidebarTree nodes={nodes}  basePath="/docs" />
      </nav>
    </aside>
  )
}

export default Sidebar
