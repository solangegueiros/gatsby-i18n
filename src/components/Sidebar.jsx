// src/components/Sidebar.jsx
import * as React from 'react'
import { graphql } from 'gatsby'
import { useStaticQuery } from 'gatsby'
import { Link, useI18next, useTranslation } from 'gatsby-plugin-react-i18next'


const Sidebar = () => {
  const { t } = useTranslation()
  const { language } = useI18next()
  console.log(`language`, language)


  const data = useStaticQuery(graphql`
    query {
      docs: allMdx(
        filter: { internal: { contentFilePath: { regex: "/doc/" } } }
        
      ) {
        edges {
          node {
            id
            frontmatter {
              slug
              title
            }
            fields {
              locale
              isDefault
            }
          }
        }
      }
    }
  `)
  console.log("docs \n", JSON.stringify(data.docs, null, 2));

  const docsByLanguage = data.docs.edges.filter(({ node }) => node.fields.locale === language)     
  console.log("docsByLanguage \n", JSON.stringify(docsByLanguage, null, 2));   

  return (
    <aside className="sidebar">
      
      <br/>
      
      <h2 className="sidebar__title">{t('docs')}</h2>
      <nav className="sidebar__nav">
        {docsByLanguage?.map(({ node }) => (
          <Link
            key={node.id}
            to={`/doc/${node.frontmatter.slug}`}
            className="sidebar__link"
            activeClassName="sidebar__link--active"
          >
            {t(node.frontmatter.title)}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar

/*

const navItems = [
  { titleKey: 'introduction', path: '/introduction' },
  { titleKey: 'getting_started', path: '/getting-started' },
]

        {
        navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className="sidebar__link"
            activeClassName="sidebar__link--active"
          >
            {t(item.titleKey)}
          </Link>
        ))}

*/