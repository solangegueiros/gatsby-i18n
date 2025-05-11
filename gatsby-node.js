const path = require('path')
const config = require('./gatsby-config');
const { createFilePath } = require(`gatsby-source-filesystem`)

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

// Helper to extract locale and isDefault
function extractLocale({ filePath, type }) {
  if (type === "blog") {
    const name = path.basename(filePath, ".mdx")
    const isDefault = name === "index"
    const locale = isDefault ? defaultLanguage : name.split(".")[1]
    return { locale, isDefault }
  }

  if (type === "doc") {
    const parts = filePath.split(/[/\\]/)

    // Find "docs" index
    const docsIndex = parts.findIndex(p => p === "docs")
    const maybeLang = parts[docsIndex + 1] // should be "en" or "pt"
    //console.log(`parts: ${JSON.stringify(parts, null, 2)}`);
    //console.log(`maybeLang: ${maybeLang}`);

    // Fallback if language is missing or invalid
    const locale = /^[a-z]{2}(-[a-zA-Z]{2})?$/.test(maybeLang)
      ? maybeLang
      : defaultLanguage

    const isDefault = locale === defaultLanguage
    return { locale, isDefault }
  }

  return null
}

function getSubpath(filePath) {
  const regex = /docs\/([a-z]{2})\/(.*)\/[^/]+\.mdx$/i;
  const match = filePath.replace(/\\/g, '/').match(regex);
  return match ? match[2] : '';
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    //console.log("node", JSON.stringify(node, null, 2));

    filePath = node.internal.contentFilePath;
    //console.log(`${filePath}`);
    const isDoc = filePath => /[/\\]docs[/\\][a-z]{2}(?:[/\\].+)?\.mdx$/.test(filePath);
    const isBlog = filePath => /[/\\]blog[/\\][^/\\]+[/\\]index(\.[a-z]{2})?\.mdx$/.test(filePath)
    //console.log(` isDoc: ${isDoc(filePath)} \t isBlog: ${isBlog(filePath)}`);

    // extract the filename without the extension
    const name = path.basename(filePath, ".mdx");
    
    //Doc Pages
    //en/page1
    //pt/page1
    if (isDoc(filePath)) {

      const match = filePath.match(/[/\\]docs[\/\\]([a-z]{2})[\/\\]/); // Match 'docs/<locale>/'
      const locale = match ? match[1] : null;
      const isDefault = locale === defaultLanguage;
      //console.log(`language: ${locale} \t isDefault: ${isDefault}`);
      
      const subfolder = getSubpath(filePath); // Extract subfolder path
      //console.log(`subfolder: ${subfolder}`);        
        
      createNodeField({ node,
        "name": "locale",
        "value": locale });
      createNodeField({ node,
        "name": "isDefault",
        "value": isDefault });
        createNodeField({ node,
          "name": "subfolder",
          "value": subfolder });          
    }

    //Blog pages
    //index.mdx is the default language
    //index.pt.mdx is the default language for pt-BR
    if (isBlog(filePath)) {
      const { locale, isDefault } = extractLocale({ filePath, type: "blog" })
      //console.log(`isDefault: ${isDefault}`);
  
      createNodeField({ node,
        "name": "locale",
        "value": locale });
      createNodeField({ node,
        "name": "isDefault",
        "value": isDefault });
        createNodeField({ node,
          "name": "subfolder",
          "value": "" });               
    }    
  }
};


exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;
  
    const result = await graphql(`
        {
          docs: allMdx(filter: {internal: {contentFilePath: {regex: "/docs/"}}}) {
            nodes {
              frontmatter {
                slug
                title
              }
              id
              fields {
                isDefault
                locale
                subfolder
              }
              internal {
                contentFilePath
              }
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
      const { id, name, frontmatter, fields } = node;
      const { slug } = frontmatter;
      const { isDefault, locale, subfolder } = fields; 
      //const subfolder = fields.subfolder || '';

      const pagePath = subfolder ? `/docs/${subfolder}/${slug}` : `/docs/${slug}`;
      console.log(pagePath);
      //console.log(`DOCs page slug: ${slug} \t language: ${locale} \t subfolder: ${subfolder} pagePath: ${pagePath}`);

      const pageData = {
        "path": pagePath,
        "component": docTemplate,
        "context": {
          id,
          "language": locale,
          slug,
          subfolder
        }
      };
      if (isDefault) createPage(pageData);

      //console.log(`✅ Create DOC page: ID: ${id} \t language: ${locale} \t slug: ${slug} \t path: ${pagePath}`);      
             
    });  


    //BLOG PAGES
    console.log("\n\n");
    const blogNodes = result.data.blogList.edges;
    blogNodes.forEach((post, index) => {
      if (!post) {
        console.log("\n ERROR: post is NULL ", {index}, "\n", JSON.stringify(post, null, 2));
        return
      } 
      const { id, frontmatter, fields } = post.node;
      const { slug } = frontmatter;
      const { isDefault, locale } = fields;        
      
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
  
      console.log(`✅ Create BLOG page: /${locale}/blog/${slug} | ID: ${id}`);
    });
    
    console.log("\n\n");

  };
  
exports.onCreatePage = async ({ page, actions, getNodes }) => {
  const { createPage, deletePage } = actions;

  const { id } = page.context;  

  const isBlogPage = /\/src\/(pages\/blog\/|templates\/blog)/.test(page.component);  
  const isDocPage = /\/src\/(pages\/blog\/|templates\/doc)/.test(page.component);  

  //if (!id || !isBlogPage || !isDocPage) return;
  if (!isBlogPage && !isDocPage) return;
  console.log(`onCreatePage: ${page.path} | language: ${page.context.language} | ID: ${page.context.id}`)

};