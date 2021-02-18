import { useStaticQuery, graphql } from 'gatsby'

export const useCollections = () => {
    const collections = useStaticQuery(graphql`
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
              variants {
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
                id
                shopifyId
                availableForSale
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
    }
  `)

  return collections.allShopifyCollection.edges.map(({ node }) => node)

}