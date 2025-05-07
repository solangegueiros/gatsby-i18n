import * as React from 'react'
import { graphql } from 'gatsby'
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

const DocPage = ({ data, children, pageContext: { language } }) => {
  const { mdx } = data;

  return (
    <Layout pageTitle={mdx.frontmatter.title}>
      <main className="doc-page">
        <ReactMarkdown>
          {mdx.body}
        </ReactMarkdown> 
      </main>
    </Layout>
  );
};


export default DocPage

export const Head = ({ data }) => (  
  <SEO pageTitle={data?.mdx?.frontmatter?.title ?? "Not Translated"} />
)
