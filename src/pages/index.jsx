import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import ProductListing from '../components/products/product-listing'

import Youtube from '../components/youtube'

import SEO from "../components/seo"

import { colors } from '../utils/styles';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .special-text {
    -webkit-text-stroke: 1px ${colors.brand};
    font-weight: bold;
    font-size: 2.5rem;
    color: ${colors.lightest};
    text-shadow:
    -1px -1px 0 ${colors.brand},  
    1px -1px 0 ${colors.brand},
    -1px 1px 0 ${colors.brand},
      1px 1px 6px ${colors.lightest};
  }

   & > * {
     margin-top: 1.5rem;
   }
`

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 0;
`

const ImgWrapper = styled.div`
  width: 100%;
  align-self: center;
`

const Banner = styled.div`
  width: 100vw;
  max-width: 1500px;
  align-self: center;
`

const StyledProductListing = styled(ProductListing)`
  margin-bottom: 30px;
`


const IndexPage = ({data}) => {

  return (
    <>
      <SEO title="Home" />
      <Container>
        <Banner>
          <Img fluid={data.parked.childImageSharp.fluid} />
        </Banner>
        <Title className='special-text'>50% Off Sale!</Title>
        <StyledProductListing collection='sale' showThumbs={true} />
        <Title>Feature</Title>
        <StyledProductListing collection='pre-order' isFeature={true} showThumbs={false} />
        <Title>Specials</Title>
        <StyledProductListing collection='specials' showThumbs={false} />
        <Title>Standards</Title>
        <StyledProductListing collection='standards' showThumbs={true} />
        <Title>Gift Card</Title>
        <StyledProductListing 
          collection='gift-cards' 
          showThumbs={false} 
          isFeature={true} 
          isGiftCard={true} 
        />
        <Title>2020 Ledgestone Commercial</Title>
        <Youtube style={{alignSelf: 'center'}} />
        <ImgWrapper>
          <Img fluid={data.motto.childImageSharp.fluid} />
        </ImgWrapper>
      </Container>

    </>
  )
}

export const query = graphql`
query {
   motto: file(relativePath: { eq: "motto.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  parked: file(relativePath: { eq: "parked.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  bunkerBaby: file(relativePath: { eq: "bunker-baby.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default IndexPage
