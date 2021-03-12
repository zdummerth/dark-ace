import React from 'react'
import { graphql } from "gatsby"
import styled from "styled-components"
import { useShopify } from '../hooks/useShopify'

import ProductListingItem, { 
  // Feature 
} from '../components/products/ProducListingItem'
// import Accessory from '../components/products/Accessory'
import SEO from "../components/seo"
import Profile from "../components//members/Profile"

import { Listing, Subtitle } from '../utils/styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //Having align-items set to center prevents side scrolling for products

  width: 100%;
`


const EarlyAccess = () => {
  //This is a private page only for members

  const { collections } = useShopify()

  return (
    <>
      <SEO title="Early Access" />
      <Container>
        <Profile />
        <Subtitle>Early Access</Subtitle>
        <Subtitle>{collections[0].title}</Subtitle>
        <Listing>
          {collections[0].products.map(product => (
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

export const query = graphql`
query {
   motto: file(relativePath: { eq: "motto.png" }) {
    childImageSharp {
      fluid(maxWidth: 1280) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default EarlyAccess
