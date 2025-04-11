import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/layout'


const DocPage = ({ data }) => {
  const { mdx } = data;

  return (
    <Layout>
      <main className="doc-page">
        <h1>{mdx.frontmatter.title}</h1>
        <MDXRenderer>{mdx.body}</MDXRenderer>
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
