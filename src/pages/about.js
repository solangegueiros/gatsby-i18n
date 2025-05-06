import * as React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import Layout from '../components/Layout'
import { SEO }  from "../components/Seo"

const PageTitle = "About Me"

const AboutPage = () => {
  const { t } = useTranslation()
  const PageLocalized = t('aboutPage.title')

  return (
    <Layout pageTitle={PageLocalized}>
      <p>{t('aboutPage.description')}</p>
    </Layout>
  )
}

export default AboutPage


export const Head = () => (
  <>
    <SEO pageTitle={PageTitle} pageDescription="About me" />
  </>
)


// This is mandatory for every page using useTranslation() or anything from gatsby-plugin-react-i18next.
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