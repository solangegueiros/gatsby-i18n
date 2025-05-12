import React from 'react';
import Layout from '../components/Layout';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const NotTranslated = ({ pageContext, location }) => {
  const { t } = useTranslation();
  const { language } = pageContext;
  const PageLocalized = t('notTranslated.title')

//        <h1>{t('notTranslated.title')}</h1>
  
  return (
    <Layout pageTitle={PageLocalized} location={location}>
      <p>{t('notTranslated.message')}</p>
    </Layout>
  );
};

export default NotTranslated;
