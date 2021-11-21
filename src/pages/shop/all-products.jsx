import React, { useEffect } from 'react'
import ProductNav from 'src/components/layout/productCollectionNavigation'
import styled from 'styled-components'
// import SlideShow from 'src/components/slideshow'
import ProductListingItem from 'src/components/products/ProducListingItem'
import { useShopify } from 'src/hooks/useShopify'
import Flex from 'src/components/shared/Flexbox'
import Seo from "src/components/SEO"
import { dimensions, breakpoints, H1, colors } from 'src/styles'



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`


const Listing = styled(Flex)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`









const AllProductsPage = () => {

  const { allProducts } = useShopify()

  return (
    <>
      <Seo title="Shop || All Products" />
      <Container dir='column'>
        <ProductNav />
        <H1>All Products</H1>
        <Listing ai='stretch'>
          {allProducts.map(product => (
            <ProductListingItem
              product={product}
              key={product.shopifyId}
              showThumbs={false}
              hideBorder={true}
              style={{
                width: '50%',
                maxWidth: '350px',
              }}
            />
          ))}
        </Listing>

      </Container>
    </>
  )
}

export default AllProductsPage
