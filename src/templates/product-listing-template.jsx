import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import Nav from '../components/layout/productCollectionNavigation'
import { breakpoints, Subtitle } from '../utils/styles'
import ProductListingItem from '../components/products/ProducListingItem'

import GiftCard from '../components/products/GiftCard'

import SEO from '../components/seo'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .hide-gt-mobile {
    @media (min-width: ${breakpoints.mobile}) {
      display: none;
    }
  }
`

const Listing = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`




const ProductListingPage = ({ data }) => {
  console.log({ data })
  // const product = data.shopifyProduct
  // const {
  //   thumbs,
  //   fulls,
  //   variants
  // } = product
  const { products, title, handle } = data.collection

  const collections = data.collectionNames.edges.map(({ node }) => node)
  console.log(collections)


  return (
    <>
      {/* <SEO title={product.title} description={product.description} /> */}
      <Container>
        {/* <Nav collections={collections} />
        <Subtitle>{title}</Subtitle>
        {handle === 'gift-card' ? (
          <GiftCard style />
        ) : (
          <Listing>
            {products.map(product => (
              <ProductListingItem
                product={product}
                key={product.shopifyId}
                showThumbs={false}
                style={{
                  width: '50%',
                  maxWidth: '400px',
                }}
              />
            ))}
          </Listing>
        )} */}
        {/* <Nav className='hide-gt-mobile' collections={collections} /> */}
      </Container>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    collection: shopifyCollection(handle: {eq: $handle}) {
      title
      handle
      products {
        availableForSale
        shopifyId
        title
        handle
        images {
          localFile {
            childImageSharp {
              fluid(maxWidth: 400) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    collectionNames: allShopifyCollection {
      edges {
        node {
          handle
          title
        }
      }
    }
  }
`

export default ProductListingPage