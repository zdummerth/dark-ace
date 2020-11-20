import React from 'react'
import styled from 'styled-components'

import ProductListing from '../components/products/product-listing'


const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
`

const StyledProductListing = styled(ProductListing)`
  margin-bottom: 30px;
`


const ProductsPage = () => {
  return (
    <>
      <Title>Dark Ace Feature</Title>
      <StyledProductListing collection='pre-order' isFeature={true} />
      <Title>Dark Ace Specials</Title>
      <StyledProductListing collection='specials' />
      <Title>Dark Ace Standards</Title>
      <StyledProductListing collection='standards' />
    </>
  )
}

export default ProductsPage