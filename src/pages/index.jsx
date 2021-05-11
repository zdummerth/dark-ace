import React, { useEffect, useState } from 'react'
import { graphql, Link } from "gatsby"
// import { CaretDown } from 'grommet-icons';
import Img from "gatsby-image"
import styled from 'styled-components'
import { useShopify } from '../hooks/useShopify'

import ProductListingItem from '../components/products/ProducListingItem'
import SlideShow from '../components/slideshow'
import SEO from "../components/seo"

import { DarkBrandButton, Listing, Spacer, dimensions, breakpoints, colors } from '../utils/styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //Having align-items set to center prevents side scrolling for products

  width: 100%;
`

const Landing = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${dimensions.headerHeight});
`

const Banner = styled.div`
  width: 100%;
  align-self: center;
  height: 22%;
`

const LandingImgWrapper = styled.div`
  // height: calc(100% - 150px);
  height: 75%;
  width: 100%;

  // @media (min-width: ${breakpoints.tablet}) {
  //   height: calc(100% - 250px);
  // }

`

const KeepScrolling = styled.div`
  background: ${colors.darkToBottom};
  height: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ scrolled }) => scrolled ? '0' : '1'};
  transition: opacity .5s ease-in-out;
`


const StyledLink = styled(Link)`
  align-self: center;
  margin-top: 30px;
`


const IndexPage = ({ data }) => {
  console.log('index rendered')

  const { newLine, headware } = useShopify()
  const [scrolled, setScrolled] = useState(false)

  const isScrolled = () => {
    if (window.pageYOffset > 0) {
      setScrolled(true)
    }
    else {
      setScrolled(false)
    }
  }

  useEffect(() => {

    window.addEventListener('scroll', isScrolled, { passive: true });

    return () => {
      window.removeEventListener('scroll', isScrolled);
    };
  }, []);

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
              fluid={data.squareBanner.childImageSharp.fluid}
              alt={'bone basket background'}
              style={{
                height: '100%',
              }}
              imgStyle={{
                objectFit: 'contain'
              }}
            />
          </LandingImgWrapper>
          <KeepScrolling scrolled={scrolled}>
            {/* <CaretDown
              color={colors.lightest}
            /> */}
          </KeepScrolling>
        </Landing>

        {/* <Spacer /> */}
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
  squareBanner: file(relativePath: { eq: "da-square-banner.png" }) {
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
