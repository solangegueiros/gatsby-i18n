import * as React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import ReactMarkdown from "react-markdown";

import Layout from '../components/Layout'
import { SEO }  from "../components/Seo"


export const query = graphql`
  query Post($language: String!, $slug: String!) {
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
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;

const BlogPost = ({ data, children, pageContext: { language } }) => {
  const { t } = useTranslation();

  const post = data.mdx
  if (!post) {
    return (
      <Layout pageTitle={t("notTranslated")}/>
    )
  }
  else {
    //console.log("body ", `${post.body}`);

    return (
      <Layout pageTitle={post.frontmatter.title}>
        <hr />        
        <p>
          {t('blogPage.posted')}
          {Intl.DateTimeFormat(language,
            { year: 'numeric', month: 'long', day: '2-digit' } //, timeZone: 'UTC'             
          ).format(new Date(post.frontmatter.date).getTime())}
        </p>
        
        <ReactMarkdown>
          {post.body}
        </ReactMarkdown>            
      </Layout>
      
    )    
  }
}


export const Head = ({ data }) => (  
  <SEO pageTitle={data?.mdx?.frontmatter?.title ?? "Not Translated"} />
)

export default BlogPost
