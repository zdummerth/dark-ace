import React, { useEffect, useState } from 'react'
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
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
  height: calc(100vh - ${dimensions.headerHeight});
`

const Banner = styled.div`
  width: 100%;
  align-self: center;
  height: 22%;
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

const TabContainer = styled.div`
  height: 15%;
`

const Tabs = styled.div`
  display: flex;
  justify-content: center;
`

const Tab = styled(Link)`
  border: 1px solid ${colors.brand};
  // border-radius: 5px 5px 0 0;
  border-radius: 50px;
  // border-bottom: none;
  padding: 5px 10px;
  background: ${({ selected }) => selected ? colors.brand : 'transparent'};
  cursor: pointer;
`

const Margin = styled.div`
  margin: 5px;
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

  const { featured, accessories } = useShopify()


  return (
    <>
      <SEO title="Home" />
      <Container>
        <Landing>
          <Banner>
            <SlideShow />
          </Banner>
          <TabContainer>
            <Tabs>
              <Tab
                to='/shop?featured'
              >Featured</Tab>
              <Margin />
              <Tab
                to='/shop?discs'
              >Discs</Tab>
              <Margin />
              <Tab
                to='/shop?t-shirts'
              >Shirts</Tab>
              <Margin />
              <Tab
                to='/shop?dri-fits'
              >Dri Fits</Tab>
            </Tabs>
            <Margin />
            <Tabs>
              <Tab
                to='/shop?headware'
              >Hats</Tab>
              <Margin />
              <Tab
                to='/shop?accessories'
              >Accessories</Tab>
              <Margin />
              <Tab
                to='/shop?giftCard'
              >Gift Cards</Tab>
            </Tabs>
          </TabContainer>
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
          <KeepScrolling scrolled={scrolled} />
        </Landing>
        {/* <ProductGrid /> */}
        <Subtitle>{featured.title}</Subtitle>
        <Listing>
          {featured.products.map(product => (
            <ProductListingItem
              product={product}
              key={product.shopifyId}
              showThumbs={false}
              style={{
                width: '70vw',
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
