import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Nav from 'src/components/layout/productCollectionNavigation'
import { breakpoints, Subtitle } from 'src/styles'
import ProductListingItem from 'src/components/products/ProducListingItem'

import GiftCard from 'src/components/products/GiftCard'

import Seo from 'src/components/SEO'


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


  return (
    <>
      <Seo title={title} />
      <Container>
        <Nav />
        <Subtitle>{title}</Subtitle>
        {handle === 'gift-card' ? (
          <>
            <GiftCard />
          </>
        ) : (
          <Listing>
            {products.map(product => (
              <ProductListingItem
                product={product}
                key={product.shopifyId}
                showThumbs={false}
                // hideBorder={products.length === 1 ? true : false}
                style={{
                  width: products.length === 1 ? '100%' : '50%',
                  maxWidth: products.length === 1 ? '600px' : '300px',
                }}
              />
            ))}
          </Listing>
        )}
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
        totalInventory
        shopifyId
        title
        handle
        images {
          id
          gatsbyImageData(width: 350)
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