import React from 'react'
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { useShopify } from '../hooks/useShopify'

import ProductListingItem, { Feature } from '../components/products/ProducListingItem'
import Accessory from '../components/products/Accessory'
import GiftCard from '../components/products/GiftCard'
import Youtube from '../components/youtube'
import SEO from "../components/seo"

import { Listing, Subtitle } from '../utils/styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //Having align-items set to center prevents side scrolling for products

  width: 100%;
`

const Banner = styled.div`
  width: 100%;
  align-self: center;
`

const AltProductContainer = styled.div`
  width: 80%;
  align-self: center;

  max-width: 400px;
`


const IndexPage = ({ data }) => {

  const { collections, accessories, feature } = useShopify()

  return (
    <>
      <SEO title="Home" />
      <Container>
        <Banner>
          <Img fluid={data.parked.childImageSharp.fluid} />
        </Banner>
        <Feature
          product={feature}
          showThumbs={true}
          style={{
            width: '80vw',
            maxWidth: '400px',
          }}
        />
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
        <Subtitle>{accessories.products[0].title}</Subtitle>
        <AltProductContainer>
          <Accessory
            product={accessories.products[0]}
            style={{
              marginBottom: '40px'
            }}
          />
          <GiftCard style={{ marginTop: '30px' }} />
        </AltProductContainer>
        <Subtitle>2020 Ledgestone Commercial</Subtitle>
        <Youtube style={{ alignSelf: 'center' }} />
        <Banner>
          <Img fluid={data.motto.childImageSharp.fluid} />
        </Banner>
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
  parked: file(relativePath: { eq: "parked.png" }) {
    childImageSharp {
      fluid(maxWidth: 1280) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  winterWizards: file(relativePath: { eq: "winter-wizards.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1280) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  anarchy: file(relativePath: { eq: "anarchy.png" }) {
    childImageSharp {
      fluid(maxWidth: 1280) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default IndexPage
