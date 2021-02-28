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
              description
              variants {
                id
                shopifyId
                availableForSale
                image { 
                  id
                }
                priceV2 {
                  amount
                  currencyCode
                }
                compareAtPriceV2 {
                  amount
                  currencyCode
                }
              }
              priceRange {
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
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 350) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              thumbs: images {
                id
                localFile {
                  childImageSharp {
                    fixed(height: 60, width: 48) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
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
        priceRange {
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
          localFile {
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        variants {
          shopifyId
          priceV2 {
            amount
            currencyCode
          }
        }
      }
    }
  `)

  // console.log(data)

  const allCollections = data.allShopifyCollection.edges.map(({ node }) => node)

  const accessories = allCollections.find(c => c.handle === 'accessories')
  const preOrders = allCollections.find(c => c.handle === 'pre-order')

  const feature = preOrders.products[0]

  const collections = allCollections.filter(c => (c.handle !== 'pre-order' && c.handle !== 'accessories'))



  const { giftCard } = data

  return { collections, accessories, giftCard, feature }

}