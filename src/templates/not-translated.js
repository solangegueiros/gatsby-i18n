import React from 'react';
import Layout from '../components/Layout';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const NotTranslated = ({ pageContext }) => {
  const { t } = useTranslation();
  const { language } = pageContext;

  return (
    <Layout>
      <div>
        <h1>{t('notTranslated.title')}</h1>
        <p>{t('notTranslated.message')}</p>
      </div>
    </Layout>
  );
};

export default NotTranslated;
