import * as React from "react"
import { graphql } from "gatsby"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
import Layout from "../components/layout"

const Blog = ({ data, pageContext }) => {
  const { locale } = useLocalization()

  return (
    <Layout pageContext={pageContext}>
      <h1>Blog - {locale}</h1>

      <ul>
        {data.allFile.nodes.map(({ childMdx: node }) => (
          <li key={node.frontmatter.slug}>
            <LocalizedLink to={node.frontmatter.slug}>
              {node.frontmatter.title}
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Blog

export const query = graphql`
  query($locale: String!) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "blog" }
        childMdx: { fields: { locale: { eq: $locale } } }
      }
    ) {
      nodes {
        childMdx {
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }
`
