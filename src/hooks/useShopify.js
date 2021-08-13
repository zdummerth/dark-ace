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
              availableForSale
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
                    fluid(maxWidth: 600) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              thumbs: images {
                id
                localFile {
                  childImageSharp {
                    fixed(height: 60, width: 45) {
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
              fluid(maxWidth: 400) {
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

  console.log({allCollections})

  const accessories = allCollections.find(c => c.handle === 'accessories')
  const discs = allCollections.find(c => c.handle === 'discs')
  const headware = allCollections.find(c => c.handle === 'headware')
  const featured = allCollections.find(c => c.handle === 'featured')
  const tShirts = allCollections.find(c => c.handle === 't-shirts')
  const longsleeves = allCollections.find(c => c.handle === 'longsleeves')
  const driFits = allCollections.find(c => c.handle === 'dri-fits')
  const preOrder = allCollections.find(c => c.handle === 'pre-order')


  const { giftCard } = data

  return { discs, headware, accessories, featured, giftCard, longsleeves, tShirts, driFits, preOrder }

}