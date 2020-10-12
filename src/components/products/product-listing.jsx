import React from "react"
import styled from 'styled-components'

import ProductListingItem from './product-listing-item'

import { breakpoints } from '../../utils/styles';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${breakpoints.desktop}) {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
  }
`

const ProductListing = ({ products }) => {
  return (
    <Container>
        {products.map(node => <ProductListingItem product={node} />)}
    </Container>
  )
}

export default ProductListing
