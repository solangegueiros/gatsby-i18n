import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'


const Menu = () => {
  const { t } = useTranslation()

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  //console.log("Layout data \n", JSON.stringify(data, null, 2));    
  
  return (
      <div className="menu">
        <div  className="menu-title">{data.site.siteMetadata.title}</div >
        <nav>
          <ul className="menu-links">
              <li className="menu-link-item">
                <Link to="/" className="nav-link-text">
                    {t('menu.home')}
                </Link>
              </li>
              <li className="menu-link-item">
                <Link to="/blog" className="nav-link-text">
                    {t('menu.blog')}
                </Link>
              </li>
              <li className="menu-link-item">
                <Link to="/about" className="nav-link-text">
                    {t('menu.about')}
                </Link>
              </li>
          </ul>
        </nav>
      </div>
    )
  }
  
  export default Menu