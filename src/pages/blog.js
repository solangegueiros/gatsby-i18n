import * as React from 'react'
import { graphql } from 'gatsby'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import ReactMarkdown from "react-markdown";

import Layout from '../components/Layout'
import { SEO }  from "../components/Seo"

const PageTitle = "Blog"

//allFile(filter: {sourceInstanceName: {eq: "blog"}}) {
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
    blogs: allMdx(
      sort: { frontmatter: { date: DESC } }
      filter: { 
        fields: {locale: {eq: $language} } 
        internal: {contentFilePath: {regex: "/blog/"}}
      }
    ) {
        nodes {
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            slug
          }
          id
          excerpt
        }
      }
    }
  `

const BlogPage = ({ data, pageContext: { language } }) => {
  const { t } = useTranslation();


  return (
    <Layout pageTitle={PageTitle}>
      {
        data.blogs.nodes.map((node) => (
          <article key={node.id}>
            <h2>
              <Link to={`/blog/${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>
            </h2>
            
            <p>
              {t('blogPage.posted')}
              {Intl.DateTimeFormat(language,
                { year: 'numeric', month: 'long', day: '2-digit' } //, timeZone: 'UTC'             
              ).format(new Date(node.frontmatter.date).getTime())}
            </p>

            <ReactMarkdown>
              {node.excerpt}
            </ReactMarkdown>
            <p>...</p>
          </article>
        ))
      }
    </Layout>
  )
}

//export const Head = ({ data }) => <SEO pageTitle={data.site.siteMetadata.title} />
export const Head = () => <SEO pageTitle={PageTitle} />


export default BlogPage