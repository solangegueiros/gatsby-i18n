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

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
  
    const result = await graphql(`
        {
            allFile(
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
        }
    `);

    if (result.errors) {
        throw result.errors;
    }

    const nodes = result.data.allFile.nodes;    
  
    // Build a map like: { 'introduction': { en: node1, pt: node2 } }
    const pagesBySlug = {};

    nodes.forEach(node => {
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

  };
  


/*    
    const result = await graphql(`
        query {
        allMdx(filter: { internal: { contentFilePath: { regex: "/docs/" } } }) {
            nodes {
            id
            frontmatter {
                slug
                language
                title
            }
            }
        }
        }
    `);

    if (result.errors) {
    console.error(result.errors);
    return;
    }

    if (!result.data || !result.data.allMdx) {
        console.error("MDX query failed:", result)
        return
    }

    const docNodes = result.data.allMdx.nodes;

    // Group by slug
    const pagesBySlug = {};

    docNodes.forEach(node => {
      const { slug, language } = node.frontmatter;
      if (!pagesBySlug[slug]) {
        pagesBySlug[slug] = {};
      }
      pagesBySlug[slug][language] = node.id;
    });

    const languages = ['en', 'pt'];

  Object.keys(pagesBySlug).forEach(slug => {
    languages.forEach(language => {
      if (pagesBySlug[slug][language]) {
        createPage({
          path: `/${language}${slug}`,
          component: docTemplate,
          context: {
            id: pagesBySlug[slug][language],
            language,
          },
        });
      } else {
        createPage({
          path: `/${language}${slug}`,
          component: notTranslatedTemplate,
          context: {
            slug,
            language,
          },
        });
      }
    });
  });
*/
  