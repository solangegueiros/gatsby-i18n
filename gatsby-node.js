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




exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    //console.log("node", JSON.stringify(node, null, 2));

    filePath = node.internal.contentFilePath;
    //console.log(`contentFilePath: ${filePath}`);
    const isDoc = filePath => /[/\\]docs(?:[/\\][a-z]{2})?[/\\][^/\\]+\.mdx$/.test(filePath)
    const isBlog = filePath => /[/\\]blog[/\\][^/\\]+[/\\]index(\.[a-z]{2})?\.mdx$/.test(filePath)
    //console.log(` isDoc: ${isDoc(filePath)} \t isBlog: ${isBlog(filePath)}`);

    const name = path.basename(
      node.internal.contentFilePath,
      ".mdx"
    );

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
    }
    
    //Doc Pages
    //en/page1
    //pt/page1
    if (isDoc(filePath)) {
      const { locale, isDefault } = extractLocale({ filePath, type: "doc" })
      //console.log(`language: ${locale} \t isDefault: ${isDefault}`); 

      createNodeField({ node,
        "name": "locale",
        "value": locale });
      createNodeField({ node,
        "name": "isDefault",
        "value": isDefault });         
    }
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
        //path: `/${language}/${slug}`,
        //path: `/doc/${slug}`,
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
        const pagePath = `/docs/${slug}`;

        // var str = 'http://localhost//example/author/admin///';    
        // var clean_url = str.replace(/([^:])(\/\/+)/g, '$1/');
        if (entry) {
          //console.log("Page entry: ", JSON.stringify(entry, null, 2));

          const pageData = {
            "path": pagePath,
            "component": docTemplate,
            "context": {
              slug,
              language,
              filePath: entry.context.filePath,
            }
          };

          // if (entry.language === defaultLanguage) {
          //   pageData.context.isDefault = true;
          // }

          createPage(pageData);
          //console.log(`✅ Create page: language: ${language}/docs/${slug}\n`, JSON.stringify(pageData, null, 2));
          console.log(`✅ Create DOC page: language: ${language}/docs/${slug}`);
        } 
        /*
        else if (fallbackEntry) {
          createPage({
            //path: `/${language}/${slug}`,
            "path": pagePath,
            component: notTranslatedTemplate,
            context: {
                slug,
                language,
                fallbackFrom: defaultLanguage,
            },
          });
          console.log(`❌ Create fallback page: language: ${language}/docs/${slug} | Fallback to ${defaultLanguage}`);                    
        }
        */ 
             
      });  
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
  console.log(`\n onCreatePage: ${page.path} | language: ${page.context.language} | ID: ${page.context.id}`)

};