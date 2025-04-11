// GitBook-style Navigation Component
import React from 'react'
import { Link, useI18next } from 'gatsby-plugin-react-i18next';
import { graphql, useStaticQuery } from 'gatsby';
import LanguageSwitcher from './LanguageSwitcher'
import '../styles/sidebar.scss'

const Sidebar = () => {
  const { language } = useI18next();

  const data = useStaticQuery(graphql`
    query SidebarDocsQuery {
      allFile(
        filter: {
          sourceInstanceName: { eq: "docs" }
          extension: { eq: "mdx" }
        }
      ) {
        nodes {
          childMdx {
            frontmatter {
              title
              slug
            }
          }
          relativeDirectory
        }
      }
    }
  `);

  const docs = data.allFile.nodes
  .filter((node) => node.relativeDirectory === language)
  .map((node) => node.childMdx);

  return (
    <aside className="sidebar">
      <h2 className="sidebar__title">Gatsby - Localization</h2>
      <LanguageSwitcher />
      <br/>
      <nav className="sidebar__nav">
        {docs.map(doc => (
          <Link
            key={doc.frontmatter.slug}
            to={`/${language}${doc.frontmatter.slug}`}
            className="sidebar__link"
            activeClassName="sidebar__link--active"
          >
            {doc.frontmatter.title}
          </Link>
        ))}
      </nav>      
    </aside>
  )
}

export default Sidebar
