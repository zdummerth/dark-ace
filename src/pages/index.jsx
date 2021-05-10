import React from 'react'
import { graphql, Link } from "gatsby"
// import Img from "gatsby-image"
import styled from 'styled-components'
import { useShopify } from '../hooks/useShopify'

import ProductListingItem from '../components/products/ProducListingItem'
import SlideShow from '../components/slideshow'
import SEO from "../components/seo"

import { DarkBrandButton, Listing, Spacer } from '../utils/styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //Having align-items set to center prevents side scrolling for products

  width: 100%;
`

const Landing = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${dimensions.headerHeight} - 45px);
`

const Banner = styled.div`
  width: 100%;
  align-self: center;
  height: 20%;
`

const LandingImgWrapper = styled.div`
  // height: calc(100% - 150px);
  height: 75%;

  @media (min-width: ${breakpoints.tablet}) {
    height: calc(100% - 250px);
  }

`


const StyledLink = styled(Link)`
  align-self: center;
  margin-top: 30px;
`


const IndexPage = ({ data }) => {

  const { newLine, headware } = useShopify()

  return (
    <>
      <SEO title="Home" />
      <Container>
        <Landing>
          <Banner>
            <SlideShow />
          </Banner>
        </Landing>

        <Spacer />
        {/* <Feature
          product={feature}
          showThumbs={true}
          style={{
            width: '80vw',
            maxWidth: '400px',
          }}
        /> */}
        {/* <Subtitle>{newLine.title}</Subtitle> */}
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
        {/* <Subtitle>{headware.title}</Subtitle> */}
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
        {/* <Subtitle>{accessories.products[0].title}</Subtitle>
        <AltProductContainer>
          <Accessory
            product={accessories.products[0]}
            style={{
              marginBottom: '40px'
            }}
          />
          <GiftCard style={{ marginTop: '30px' }} />
        </AltProductContainer> */}
        <StyledLink to='/shop'>
          <DarkBrandButton>
            View All Products
          </DarkBrandButton>
        </StyledLink>
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
  giveBack: file(relativePath: { eq: "da-giveback-banner.png" }) {
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
