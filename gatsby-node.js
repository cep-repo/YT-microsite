const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators
    if (node.internal.type === `DataJson`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators
    return new Promise((resolve, reject) => {
        graphql(`{
            allDataJson {
                edges {
                  node {
                    fields {
                      slug
                    }
                  }
                }
              }
            }
        `
        ).then(result => {
              result.data.allDataJson.edges.forEach(({ node }) => {
                createPage({
                  path: node.fields.slug,
                  component: path.resolve(`./src/templates/microsite-template.js`),
                  context: {
                    // Data passed to context is available in page queries as GraphQL variables.
                    slug: node.fields.slug,
                  },
                })
              })
              resolve()
            })
    })
};