import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next'

import SidebarTree from './SidebarTree'

const DocsSidebar = () => {
  const { t } = useTranslation()
  const { language } = useI18next()
  //console.log(`language`, language)

  const data = useStaticQuery(graphql`
    query {
      docs: allMdx(
        sort: { frontmatter: { order: ASC } }
        filter: {           
          internal: {contentFilePath: {regex: "/docs/"}}
        }
      ) {
          nodes {
            id
            frontmatter {            
              slug
              title
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
  const nodesByLanguage = nodes.filter(node => node.fields.locale === language);
  //console.log("docsByLanguage \n", JSON.stringify(docsByLanguage, null, 2));

  return (
    <aside className="sidebar">
      
      <br/>
      
      <h2 className="sidebar__title">{t('docs')}</h2>
      <nav className="sidebar__nav">
          <SidebarTree nodes={nodesByLanguage}  basePath="/docs" />
      </nav>
    </aside>
  )  

}

export default DocsSidebar