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
  text-align: center;

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
  width: 100%;
  // max-width: 1500px;
  align-self: center;
`

const StyledProductListing = styled(ProductListing)`
  margin-bottom: 30px;
`

const Text = styled.p`
  width: 80%;
  max-width: 400px;
  align-self: center;

  font-size: 1.25rem;
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
        <Text>
          For every Listen to Metal Hoodie purchased, 20 meals will 
          be donated to those in need through the St.Louis Food Bank, 
          Operation Food Search. Also, you will be entered 
          into a raffle to win a brand new Prodigy practice bag! 
        </Text>
        <Title>Specials</Title>
        <StyledProductListing collection='specials' showThumbs={false} />
        {/* <Title>Standards</Title>
        <StyledProductListing collection='standards' showThumbs={true} /> */}
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
}
`

export default IndexPage
