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
  const { products, title, handle, description } = data.collection


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
          <>
            {handle === 'bundle' && (
              <p>{description}</p>
            )}
            <Listing>
              {products.map(product => (
                <ProductListingItem
                  product={product}
                  key={product.shopifyId}
                  // showThumbs={handle === 'headware' && product.title === 'Anarchy Dad Hat'}
                  showThumbs={false}
                  // hideBorder={products.length === 1 ? true : false}
                  hideBorder={true}
                  hideTitle={handle === 'bundle'}
                  style={{
                    width: products.length === 1 ? '100%' : '50%',
                    maxWidth: products.length === 1 ? '500px' : '350px',
                  }}
                />
              ))}
            </Listing>
          </>
        )}
      </Container>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    collection: shopifyCollection(handle: {eq: $handle}) {
      title
      handle
      description
      products {
        totalInventory
        shopifyId
        title
        handle
        storefrontId
        variants {
          id
          storefrontId
          availableForSale
          shopifyId
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