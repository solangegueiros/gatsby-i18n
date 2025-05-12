import * as React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import ReactMarkdown from "react-markdown";

import Layout from '../components/Layout'
import { SEO }  from "../components/Seo"


export const query = graphql`
  query DocPageQuery($language: String!, $slug: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    mdx(
      frontmatter: { slug: { eq: $slug } }
      fields: { locale: { eq: $language } }
    ) {
      body
      frontmatter {
        title
        slug
      }
    }
  }
`;

const DocPage = ({ data, children, pageContext: { language }, location }) => {
  const { t } = useTranslation();

  const doc = data.mdx
  if (!doc) {
    return (
      <Layout pageTitle={t('notTranslated.title')} location={location}>
        <p>{t('notTranslated.message')}</p>
      </Layout>
    )
  }
  else {
    //console.log("body ", `${post.body}`);

    return (
      <Layout pageTitle={doc.frontmatter.title} location={location}>
        <hr />
        <ReactMarkdown>
          {doc.body}
        </ReactMarkdown>

      </Layout>
    );
  }
};

export default DocPage

export const Head = ({ data }) => (  
  <SEO pageTitle={data?.mdx?.frontmatter?.title ?? "Not Translated"} />
)
