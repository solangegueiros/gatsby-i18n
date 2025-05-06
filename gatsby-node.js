const path = require('path')
const config = require('./gatsby-config');

const i18nPlugin = config.plugins.find(
  p =>
    typeof p === 'object' &&
    p.resolve === 'gatsby-plugin-react-i18next'
);

const languages = i18nPlugin?.options?.languages || ['en'];
const defaultLanguage = i18nPlugin?.options?.defaultLanguage || 'en';

const docTemplate = path.resolve(`./src/templates/doc-page.js`);
const notTranslatedTemplate = path.resolve(`./src/templates/not-translated.js`);
const blogTemplate = path.resolve(`./src/templates/blog-post.js`); 

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {

    const name = path.basename(
      node.internal.contentFilePath,
      ".mdx"
    );

    const isDefault = name === "index";
  
    const lang = isDefault
      ? defaultLanguage
      : name.split(".")[1];

    createNodeField({ node,
      "name": "locale",
      "value": lang });
    createNodeField({ node,
      "name": "isDefault",
      "value": isDefault });
  }
};


exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;
  
    const result = await graphql(`
        {
          docs: allFile(
            filter: { sourceInstanceName: { eq: "docs" }, extension: { eq: "mdx" } }
          ) {
            nodes {
              childMdx {
                frontmatter {
                  slug
                }
                internal {
                  contentFilePath
                }
              }
              name
              relativeDirectory
            }
          }
          blogList: allMdx(filter: {internal: {contentFilePath: {regex: "/blog/"}}}) {
            edges {
              node {
                id
                frontmatter {
                  slug
                }
                internal {
                  contentFilePath
                }
                fields {
                  isDefault
                  locale
                }
              }
            }
          }            
        }
    `);

    if (result.errors) {
      reporter.panicOnBuild('Error loading MDX result', result.errors)
    }

    //DOC PAGES
    const nodesDoc = result.data.docs.nodes;    
  
    // Build a map like: { 'introduction': { en: node1, pt: node2 } }
    const pagesBySlug = {};

    nodesDoc.forEach(node => {
        const slug = node.childMdx.frontmatter.slug || node.name;
        const language = node.relativeDirectory;

        if (!pagesBySlug[slug]) {
            pagesBySlug[slug] = {};
          }

          pagesBySlug[slug][language] = {
            path: `/${language}/${slug}`,
            component: docTemplate,
            context: {
              slug,
              language,
              filePath: node.childMdx.internal.contentFilePath,
            },
          };
        });

    // Now generate one page per language
    Object.entries(pagesBySlug).forEach(([slug, langEntries]) => {
        languages.forEach(language => {
        const entry = langEntries[language];
        const fallbackEntry = langEntries[defaultLanguage];

        if (entry) {
            createPage({
            path: `/${language}/${slug}`,
            component: docTemplate,
            context: {
                slug,
                language,
                filePath: entry.context.filePath,
            },
            });
        } else if (fallbackEntry) {
            createPage({
            path: `/${language}/${slug}`,
            component: notTranslatedTemplate,
            context: {
                slug,
                language,
                fallbackFrom: defaultLanguage,
            },
            });
        }
        });
    });

    //BLOG PAGES
    const blogNodes = result.data.blogList.edges;
    blogNodes.forEach((post, index) => {
      if (!post) {
        console.log("\n ERROR: post is NULL ", {index}, "\n", JSON.stringify(post, null, 2));
        return
      } 
      const { id, frontmatter, fields } = post.node;
      const { slug } = frontmatter;
      const { isDefault, locale } = fields;
        
      const blogTemplate = path.resolve(`./src/templates/blog-post.js`); // Use a fixed template
      const pagePath = `/blog/${slug}`;
  
      const pageData = {
        "path": pagePath,
        "component": blogTemplate,
        "context": {
          id,
          "language": locale,
          slug
        }
      };
      if (isDefault) createPage(pageData);
  
      console.log(`✅ Create page: /${locale}/blog/${slug} | ID: ${id}`);
    });
    
    console.log("\n\n");

  };
  
