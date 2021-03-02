import React from 'react'
import styled from 'styled-components'
import { breakpoints, Listing, spacing } from '../../utils/styles'
import { useShopify } from '../../hooks/useShopify'

import ProductListingItem from './ProducListingItem'


const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 0;

  &.hide-lt-tablet {
    margin-bottom: 25px;
    @media (max-width: ${breakpoints.tablet}) {
      display: none;
    }
  }

  &.hide-gt-tablet {
    @media (min-width: ${breakpoints.tablet}) {
      display: none;
    }
  }
`




const ProductListing = () => {

  const { collections, accessories, feature } = useShopify()

  return (
    <>
      <Title>{collections[0].title}</Title>
      <Listing>
        {collections[0].products.map(product => (
          <ProductListingItem
            product={product}
            key={product.shopifyId}
            showThumbs={true}
            style={{
              width: '60vw',
              maxWidth: '300px',
              marginRight: spacing.lg,
              marginBottom: spacing.lg,
            }}
          />
        ))}
      </Listing>
    </>
  )
}

export default ProductListing
