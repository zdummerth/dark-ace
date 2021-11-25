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
  // console.log({ data })
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
                // showThumbs={true}
                // hideBorder={products.length === 1 ? true : false}
                hideBorder={true}
                style={{
                  width: products.length === 1 || product.title === 'Anarchy Dad Hat' ? '100%' : '50%',
                  maxWidth: products.length === 1 ? '500px' : '350px',
                  // height: product.title === 'Anarchy Dad Hat' ? '60vh' : 'inherit',
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
        storefrontId
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
        variants {
          id
          storefrontId
          availableForSale
          shopifyId
          price
          compareAtPrice
          image { 
            id
            gatsbyImageData(width: 600)
          }
        }
        images {
          id
          gatsbyImageData(width: 850)
        }
        thumbs: images {
          id
          gatsbyImageData(width: 48)
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