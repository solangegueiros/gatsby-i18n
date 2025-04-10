import * as React from 'react'
import Layout from '../components/layout'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const IndexPage = () => {
  const { t } = useTranslation()

  return (
    <Layout>
      <div>
        <h1>{t('welcome')}</h1>
        <p>{t('helloWorld')}</p>
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home</title>