import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import Seo from 'src/components/SEO'


const Shop = () => {
  useEffect(() => navigate('/shop/collection/featured'))
  return (
    <>
      <Seo title="Shop" />
    </>
  )
}

export default Shop
