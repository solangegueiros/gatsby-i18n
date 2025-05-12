import * as React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import Layout from '../components/Layout'
import { SEO }  from "../components/Seo"

const PageTitle = "Home"
// console.log("PageTitle: ", PageTitle);

const IndexPage = ({ location }) => {
  //console.log("IndexPage location\n", JSON.stringify(location, null, 2));

  const { t } = useTranslation()
  const PageLocalized = t('homePage.title')

  return (
    <Layout pageTitle={PageLocalized} location={location}>
        <p>{t('homePage.welcomeMessage')}</p>
    </Layout>
  )
}

export default IndexPage

export const Head = () => (
  <SEO pageTitle={PageTitle} />
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