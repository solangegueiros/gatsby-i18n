import * as React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MdxLink, LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import Language from "../components/language"
import {
  navLinks,
  navLinkItem,
  navLinkText,
} from './layout.module.css'

const components = {
  a: MdxLink,
}

const Layout = ({ children, pageContext }) => {
  const { locale } = useLocalization()
  //console.log(pageContext)

  return (
    <React.Fragment>
      <header>
        <nav>
          <ul className={navLinks}>
            <li className={navLinkItem}>
              <Link to="/" className={navLinkText}>
                Home {locale}
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/locales" className={navLinkText}>
                Locales info
              </Link>
            </li>          
            <li className={navLinkItem}>
              <Link to="/page-2/" className={navLinkText}>
                Page 2 {locale}
              </Link>
            </li>          
            <li className={navLinkItem}>
              <Link to="/page-3/" className={navLinkText}>
                Page 3 {locale}
              </Link>
            </li>
            <li className={navLinkItem}>
              <Link to="/blog/" className={navLinkText}>
                Blog {locale}
              </Link>
            </li>          
          </ul>
        </nav>

        <Language pageContext={pageContext}/>
      </header>

      <main>
        <MDXProvider components={components}>{children}</MDXProvider>
      </main>
    </React.Fragment>
  )
}

export default Layout
