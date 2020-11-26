import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import ProductListing from '../components/products/product-listing'

import Youtube from '../components/youtube'

import SEO from "../components/seo"

// import { colors } from '../utils/styles';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

`

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 0;
`

const ImgWrapper = styled.div`
  width: 100%;
  align-self: center;
  max-width: 1200px;
  padding: 3rem 0;
`

const Banner = styled.div`
  width: 100%;
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
        <ImgWrapper>
          <Img fluid={data.motto.childImageSharp.fluid} />
        </ImgWrapper>
        <Title>Feature</Title>
        <StyledProductListing collection='pre-order' isFeature={true} />
        <Title>Specials</Title>
        <StyledProductListing collection='specials' />
        <Title>Standards</Title>
        <StyledProductListing collection='standards' />
        <Title>2020 Ledgestone Commercial</Title>
        <Youtube style={{alignSelf: 'center'}} />
        <Banner>
          <Img fluid={data.parked.childImageSharp.fluid} />
        </Banner>
      </Container>

    </>
  )
}

export const query = graphql`
query {
   motto: file(relativePath: { eq: "motto-no-background.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  parked: file(relativePath: { eq: "mvp.png" }) {
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
