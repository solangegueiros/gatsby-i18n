import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next'

import SidebarTree from './SidebarTree'

const BlogSidebar = () => {
  const { t } = useTranslation()
  const { language } = useI18next()
  //console.log(`language`, language)  

  const data = useStaticQuery(graphql`
    query {
      blogs: allMdx(
        sort: { frontmatter: { date: DESC } }
        filter: { 
          internal: {contentFilePath: {regex: "/blog/"}}
        }
      ) {
          nodes {
            id
            frontmatter {
              slug
              title
              date(formatString: "MMMM DD, YYYY")
            }
            fields {
              locale
              subfolder
            }              
          }
        }
    }
  `)
  //console.log("blogs \n", JSON.stringify(data.blogs, null, 2));  
  const { nodes } = data.blogs; 
  const nodesByLanguage = nodes.filter(node => node.fields.locale === language);
  //console.log("docsByLanguage \n", JSON.stringify(docsByLanguage, null, 2));

  return (
    <aside className="sidebar">
      
      <br/>
      
      <h2 className="sidebar__title">{t('blog')}</h2>
      <nav className="sidebar__nav">
          <SidebarTree nodes={nodesByLanguage}  basePath="/blog" />
      </nav>
    </aside>
  ) 

}

export default BlogSidebar
