import React from 'react'
import styled from 'styled-components'
import SEO from '../components/seo'
import { useShopify } from '../hooks/useShopify'
import ProductListingItem from '../components/products/ProducListingItem'

import { Listing, Subtitle, Spacer } from '../utils/styles'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
`
const Shop = () => {
  const { newLine, headware, closeOut } = useShopify()


  return (
    <>
      <SEO title="Shop" />
      <Container>
        <Spacer />
        <Subtitle>Anarchy is Here</Subtitle>
        <Listing>
          {newLine.products.map(product => (
            <ProductListingItem
              product={product}
              key={product.shopifyId}
              showThumbs={true}
              style={{
                width: '60vw',
                maxWidth: '300px',
              }}
            />
          ))}
        </Listing>
        <Spacer />
        <Subtitle>{headware.title}</Subtitle>
        <Listing>
          {headware.products.map(product => (
            <ProductListingItem
              product={product}
              key={product.shopifyId}
              showThumbs={true}
              style={{
                width: '60vw',
                maxWidth: '300px',
              }}
            />
          ))}
        </Listing>
        <Spacer />
        <Subtitle>{closeOut.title}</Subtitle>
        <Listing>
          {closeOut.products.map(product => (
            <ProductListingItem
              product={product}
              key={product.shopifyId}
              showThumbs={true}
              style={{
                width: '60vw',
                maxWidth: '300px',
              }}
            />
          ))}
        </Listing>
      </Container>
    </>
  )
}

// export const query = graphql`
// query {

// }
// `

export default Shop
