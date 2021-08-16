import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import SEO from 'src/components/Seo'


const Shop = () => {
  useEffect(() => navigate('/shop/collection/featured'))
  return (
    <>
      <SEO title="Shop" />
    </>
  )
}

export default Shop
