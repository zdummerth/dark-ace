import React, { useEffect, useState } from 'react'
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import ProductNav from '../components/layout/productCollectionNavigation'

import styled from 'styled-components'
import SlideShow from '../components/slideshow'
import { useShopify } from '../hooks/useShopify'
import { Listing, Subtitle } from '../utils/styles'
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
  height: calc(100vh - ${dimensions.headerHeight});
`

const Banner = styled.div`
  width: 100%;
  align-self: center;
  // height: 22%;
  // height: 200px;
  flex: 1;
`

const StyledProductNav = styled(ProductNav)`
  // height: 15%;
  flex: 1;

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
  const collections = data.collectionData.edges.map(({ node }) => node)


  return (
    <>
      <SEO title="Home" />
      <Container>
        <Landing>

          <StyledProductNav collections={collections} />
          <Link to='/shop/biohazard-t-shirt'>
            <h1>Biohazard Pre-Order</h1>
          </Link>
          <Listing style={{ height: '55%' }}>
            {preOrder.products.map(product => (
              <ProductListingItem
                product={product}
                key={product.shopifyId}
                showThumbs={false}
                hideBorder={true}
                hideTitle={true}
                containImage={true}
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  // height: '45vh'
                  height: '100%'

                }}
              />
            ))}
          </Listing>
          <Banner>
            <SlideShow />
          </Banner>

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
          </LandingImgWrapper>
          <KeepScrolling scrolled={scrolled} /> */}
          <Margin />

        </Landing>
        {/* <ProductGrid /> */}
        {/* <Subtitle>{featured.title}</Subtitle>
        <Listing>
          {featured.products.map(product => (
            <ProductListingItem
              product={product}
              key={product.shopifyId}
              showThumbs={false}
              style={{
                width: '50%',
                maxWidth: '400px',
                // height: '40vh'
              }}
            />
          ))}
        </Listing> */}
        {/* <StyledLink to='/shop/collection/featured'>
          <DarkBrandButton>
            View All Products
          </DarkBrandButton>
        </StyledLink> */}
        {/* <StyledProductNav collections={collections} />/ */}

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
