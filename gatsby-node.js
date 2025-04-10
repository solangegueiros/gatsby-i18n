const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
  
    const result = await graphql(`
    {
        allMdx(filter: { internal: { contentFilePath: { regex: "/doc/" } } }) {
        nodes {
            id
            frontmatter {
            slug
            }
        }
        }
    }
    `)
    if (result.errors) {
        throw result.errors
      }    
    if (!result.data || !result.data.allMdx) {
        console.error("MDX query failed:", result)
        return
    }    
  
    const docs = result.data.allMdx.nodes

    docs.forEach(node => {
        createPage({
          path: node.frontmatter.slug,
          component: path.resolve(`./src/templates/doc-page.js`),
          context: {
            id: node.id,
          },
        })
      })
      
  }
  