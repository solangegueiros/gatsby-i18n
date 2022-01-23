import * as React from "react"
import { graphql } from "gatsby"
import { LocalesList, LocalizedLink as Link, useLocalization } from "gatsby-theme-i18n"
import Layout from "../components/layout"

const Locales = ({ data }) => {
  const { config, locale } = useLocalization()

  return (
    <Layout>
      <h1>{locale}</h1>

      <h3>Select</h3>
      <nav>
        <ul>
          {config.map(item => (
            <li key={item.code}>
              <Link to="/" language={item.code}>
                {item.localName} ({item.name})
              </Link>
            </li>
          ))}          
        </ul>
      </nav>

      <h3>Locales List</h3>
      <LocalesList />

      <h3>Config</h3>
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </Layout>
  )
}

export default Locales
