import { useStaticQuery, graphql } from 'gatsby'

export const useShopify = () => {
  const data = useStaticQuery(graphql`
    query {
      allShopifyCollection {
        edges {
          node {
            handle 
            title
            products {
              handle
              title
              shopifyId
              storefrontId
              description
              totalInventory
              variants {
                id
                shopifyId
                storefrontId
                availableForSale
                image { 
                  id
                }
                price
              }
              priceRangeV2 {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              images {
                id
                gatsbyImageData(width: 600)
              }
              thumbs: images {
                id
                gatsbyImageData(height: 60, width: 45, layout: FIXED) 
              }
            }
          }
        }
      }

      giftCard: shopifyProduct(handle: { eq: "dark-ace-gift-card" }) {
        handle
        images {
          id
        }
        priceRangeV2 {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images {
          id
          gatsbyImageData(width: 600)
        }
        variants {
          shopifyId
          price
          storefrontId
        }
      }
    }
  `)

  // console.log(data)

  const allCollections = data.allShopifyCollection.edges.map(({ node }) => node)

  // console.log({allCollections})
  const allProducts = allCollections.map(c => c.products).flat()
  // console.log({ allProducts })
  const singleVariantProducts = allProducts.filter(p => p.variants.length === 1)
  // console.log({ singleVariantProducts })

  const accessories = allCollections.find(c => c.handle === 'accessories')
  const discs = allCollections.find(c => c.handle === 'discs')
  const headware = allCollections.find(c => c.handle === 'headware')
  const featured = allCollections.find(c => c.handle === 'featured')
  const tShirts = allCollections.find(c => c.handle === 't-shirts')
  const longsleeves = allCollections.find(c => c.handle === 'longsleeves')
  const driFits = allCollections.find(c => c.handle === 'dri-fits')
  const preOrder = allCollections.find(c => c.handle === 'pre-order')

  const collectionNames = allCollections.map(c => c.title)


  const { giftCard } = data

  return { discs, headware, accessories, featured, giftCard, longsleeves, tShirts, driFits, preOrder, collectionNames, allCollections, singleVariantProducts }

}