import React from "react"
import styled from 'styled-components'

import ProductListingItem from './product-listing-item'

import { breakpoints } from '../../utils/styles';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0;

  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: nowrap;
    // justify-content: flex-start;
    justify-content: ${props => props.isSingleItem ? 'center' : 'flex-start'};
    overflow-x: auto;
  }
`

const ProductListing = ({ products, className }) => {
  const isSingleItem = products.length === 1
  return (
    <Container className={className} isSingleItem={isSingleItem}>
        {products.map(node => <ProductListingItem product={node} isSingleItem={isSingleItem} />)}
    </Container>
  )
}

export default ProductListing
