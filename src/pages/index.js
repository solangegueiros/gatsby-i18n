import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { useTranslation } from 'gatsby-plugin-react-i18next'


const IndexPage = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <div>
        <h1>{t('homePage.title')}</h1>
        <p>{t('homePage.welcomeMessage')}</p>
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home</title>

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;