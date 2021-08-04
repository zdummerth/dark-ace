import React, { useEffect } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import SEO from '../components/seo'
import ProductGrid from '../components/products/ProductGrid'


const Margin = styled.div`
  margin: 5px;
`


const Shop = ({ location }) => {
  useEffect(() => navigate('/shop/collection/featured'))
  return (
    <>
      <SEO title="Shop" />
    </>
  )
}

export default Shop
