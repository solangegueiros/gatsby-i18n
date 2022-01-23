import * as React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogTemplate = ({ data, pageContext }) => {
  return (
    <Layout pageContext={pageContext}>
      <h2>Content page</h2>
      <div>
        {data.mdx ? (
          <>
            <Seo title={data.mdx.frontmatter.title} />
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </>
        ) : (
          <div>This page hasn't been translated yet</div>
        )}
      </div>

      <h2>Context info</h2>
      <p>pageContext.originalPath: {pageContext.originalPath}</p>
      <pre>{JSON.stringify(pageContext, null, 2)}</pre>
    </Layout>
  )
}

export default BlogTemplate

export const query = graphql`
  query($locale: String!, $slug: String!) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $slug } }
    ) {
      frontmatter {
        slug
        title
      }
      body
    }
  }
`
