import React from "react"
import styled from 'styled-components'
import { useStaticQuery, graphql } from "gatsby"

import ProductListingItem from './product-listing-item'

import { breakpoints } from '../../utils/styles';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0;


  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: nowrap;
    justify-content: ${props => props.isSingleItem ? 'center' : 'flex-start'};
    overflow-x: auto;
  }
`

const ProductListing = ({ className, collection, isFeature }) => {
  const data = useStaticQuery(graphql`
    query {
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
                id
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 900) {
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

  const products = data.allShopifyCollection.edges
  .find(({node}) =>  node.handle === collection)
  .node.products

  const isSingleItem = products.length === 1
  return (
    <Container 
      className={className} 
      isSingleItem={isSingleItem}
    >
        {products.map(node => 
        <ProductListingItem 
          product={node} 
          isSingleItem={isSingleItem}
          isFeature={isFeature}
          key={node.shopifyId}
           />)}
    </Container>
  )
}

export default ProductListing
