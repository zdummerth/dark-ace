import React from 'react'
import styled from 'styled-components'
import SEO from '../components/seo'
import ProductGrid from '../components/products/ProductGrid'


const Margin = styled.div`
  margin: 5px;
`


const Shop = ({ location }) => {
  // console.log('location', location.search)
  const category = location.search.slice(1)

  const initialCategory = category !== '' ? category : 'featured'

  console.log({ category })
  console.log({ initialCategory })



  return (
    <>
      <SEO title="Shop" />
      <Margin />
      <ProductGrid initialCategory={initialCategory} />
    </>
  )
}

export default Shop
