import * as React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from "react-markdown";

import Layout from '../components/Layout'
import { SEO }  from "../components/Seo"


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

export const query = graphql`
  query DocPageQuery($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        slug
        language
      }
    }
  }
`;

export default DocPage

export const Head = ({ data }) => (  
  <SEO pageTitle={data?.mdx?.frontmatter?.title ?? "Not Translated"} />
)
