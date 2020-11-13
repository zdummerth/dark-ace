import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import ProductListing from '../components/products/product-listing'
import FeaturedItem from '../components/products/featured-item'


const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
`

const StyledProductListing = styled(ProductListing)`
  margin-bottom: 30px;
`


const ProductsPage = ({ data }) => {
  const preOrders = data.allShopifyCollection.edges
                  .find(({node}) =>  node.handle === 'pre-order')
                  .node.products
                  
  const specials = data.allShopifyCollection.edges
                  .find(({node}) =>  node.handle === 'frontpage')
                  .node.products

  const standards = data.allShopifyCollection.edges
                  .find(({node}) =>  node.handle === 'standards')
                  .node.products


  
  return (
    <>
      <Title>Dark Ace Feature</Title>
      <FeaturedItem product={preOrders[0]} />
      <Title>Bunker Baby Gear</Title>
      <StyledProductListing products={specials} />
      <Title>Dark Ace Standards</Title>
      <StyledProductListing products={standards} />
    </>
  )
}

export default ProductsPage

export const query = graphql`
  {
    allShopifyCollection {
      edges {
        node {
          handle 
          products {
            handle
            title
            shopifyId
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
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            thumbs: images {
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
`