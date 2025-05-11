import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Link, useI18next } from "gatsby-plugin-react-i18next";

import Layout from '../components/Layout'
import { SEO }  from "../components/Seo"
// import { buildSidebarTree } from "../utils/buildSidebarTree";
import { groupDocsBySubfolder, formatFolderName } from "../utils/folderUtils";

const PageTitle = "Docs"

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
    docs: allMdx(
      sort: { frontmatter: { order: ASC } }
      filter: { 
        fields: {locale: {eq: $language} } 
        internal: {contentFilePath: {regex: "/doc/"}}
      }
    ) {
        nodes {
          id
          frontmatter {            
            title
            slug
            order
          }
          fields {
            subfolder
          }          
        }
      }
    }
  `


const DocsPage = ({ data, pageContext: { language } }) => {

  const tree = groupDocsBySubfolder(data.docs.nodes);

  // Separate top-level and foldered docs
  const topLevelDocs = Object.entries(tree).filter(([_, v]) => !v.children);
  const folderGroups = Object.entries(tree)
  .filter(([_, v]) => v.children)
  .sort(([a], [b]) => {
    const aNum = parseInt(a.split("-")[0], 10);
    const bNum = parseInt(b.split("-")[0], 10);
    return aNum - bNum;
  });
  
  return (
    <Layout pageTitle={PageTitle}>
      <ul>
        {/* Top-level docs first */}
        {topLevelDocs.map(([_, doc]) => (
          <li key={doc.slug}>
            <Link to={`/docs/${doc.slug}`}>{doc.title}</Link>
          </li>
        ))}

        {/* Then folder groups */}
        {folderGroups.map(([folder, group]) => (
          <li key={folder}>
            <strong>{formatFolderName(folder)}</strong>
            <ul>
              {group.children.map(child => (
                <li key={child.slug}>
                  <Link to={`/docs/${folder}/${child.slug}`}>{child.title}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default DocsPage;

export const Head = () => <SEO pageTitle={PageTitle} />

