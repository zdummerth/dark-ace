import React, { useEffect, useState } from 'react'
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import ProductNav from '../components/layout/productCollectionNavigation'

import styled from 'styled-components'
import SlideShow from '../components/slideshow'
import { useShopify } from '../hooks/useShopify'
import { Listing, Subtitle, breakpoints } from '../utils/styles'
import ProductListingItem from '../components/products/ProducListingItem'


import SEO from "../components/seo"

import { DarkBrandButton, dimensions, colors } from '../utils/styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //Having align-items set to center prevents side scrolling for products

  width: 100%;
`

const Landing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: start;
  height: calc(100vh - ${dimensions.headerHeight});
`

const Banner = styled.div`
  width: 100%;
  max-width: 700px;
  align-self: center;
  // flex: 1;
  height: 25vh;
`

const StyledProductNav = styled(ProductNav)`
  max-width: 500px;
`

const LandingImgWrapper = styled.div`
  height: 60%;
  width: 100%;
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

const Margin = styled.div`
  margin: 20px;
`

const ProductContainer = styled.div`
  width: 90%;
  max-width: 600px;
  text-align: center;
  // overflow: hidden;
  flex: 1;
  // height: 50%;

  @media (min-width: ${breakpoints.tablet}) {
    // height: 50%;
  }

`



const IndexPage = ({ data }) => {
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

  const { featured, preOrder } = useShopify()

  const feature = preOrder.products[0]
  const collections = data.collectionData.edges.map(({ node }) => node)


  return (
    <>
      <SEO title="Home" />
      <Container>
        <Landing>

          <StyledProductNav />
          <ProductContainer>
            <Link to='/shop/biohazard-t-shirt'>
              <h1>Biohazard Pre-Order</h1>
            </Link>
            <ProductListingItem
              product={feature}
              key={feature.shopifyId}
              showThumbs={false}
              hideBorder={true}
              hideTitle={true}
              containImage={true}
              style={{
                width: '100%',
                maxWidth: '600px',
                // height: '45vh'
                // height: '100%'

              }}
            />
          </ProductContainer>

          {/* <LandingImgWrapper>
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
          </LandingImgWrapper> */}
          {/* <KeepScrolling scrolled={scrolled} /> */}
        </Landing>
        <Banner>
          <SlideShow />
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
  collectionData: allShopifyCollection {
      edges {
        node {
          handle
          title
        }
      }
    }
}
`

export default IndexPage
