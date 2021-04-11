import React from 'react'
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from 'styled-components'
import { useShopify } from '../hooks/useShopify'

import ProductListingItem from '../components/products/ProducListingItem'
import SlideShow from '../components/slideshow'
import SEO from "../components/seo"

import { BrandButton, dimensions, Listing, Spacer, breakpoints, colors } from '../utils/styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //Having align-items set to center prevents side scrolling for products

  width: 100%;
`


const StyledLink = styled(Link)`
  align-self: center;
  margin-top: 30px;
`

const Landing = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${dimensions.headerHeight} - 40px);
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
          <LandingImgWrapper>
            <Img
              fluid={data.boneBasket.childImageSharp.fluid}
              alt={'bone basket background'}
              style={{
                height: '100%',
              }}
              imgStyle={{
                objectFit: 'contain'
              }}
            />
          </LandingImgWrapper>
        </Landing>
        {/* <Subtitle>{newLine.title}</Subtitle> */}
        <Spacer />
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
          <BrandButton>
            View All Products
          </BrandButton>
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
  boneBasket: file(relativePath: { eq: "bone-basket.jpg" }) {
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
