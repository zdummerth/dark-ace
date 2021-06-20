import React from 'react'
import styled from 'styled-components'
import SEO from '../components/seo'
import ProductGrid from '../components/products/ProductGrid'


const Margin = styled.div`
  margin: 5px;
`


const Shop = () => {
  return (
    <>
      <SEO title="Shop" />
      <Margin />
      <ProductGrid />
    </>
  )
}

export default Shop
