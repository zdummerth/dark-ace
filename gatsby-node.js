const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const productPageResult = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            handle
            collections {
              handle
            }
          }
        }
      }
    }
  `)

  if (productPageResult.errors) {
    reporter.panicOnBuild(`Error while running product page GraphQL query.`)
    return
  }

  // console.log('the products handles', productPageResult)

  productPageResult.data.allShopifyProduct.edges.forEach(({ node }) => {
    createPage({
      path: `shop/${node.handle}/`,
      component: path.resolve(`./src/templates/product-page-template.jsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        handle: node.handle,
        collectionHandle: node.collections[0]?.handle
      },
    })
  })

  const productListingResult = await graphql(`
  {
    allShopifyCollection {
      edges {
        node {
          handle
        }
      }
    }
  }
`)

  if (productListingResult.errors) {
    reporter.panicOnBuild(`Error while running product page GraphQL query.`)
    return
  }

  productListingResult.data.allShopifyCollection.edges.forEach(({ node }) => {
    createPage({
      path: `shop/collection/${node.handle}/`,
      component: path.resolve(`./src/templates/product-listing-template.jsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        handle: node.handle,
      },
    })
  })
}