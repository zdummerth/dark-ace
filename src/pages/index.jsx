import React, { useEffect, useState } from 'react'
import { graphql, Link } from "gatsby"
// import { CaretDown } from 'grommet-icons';
import Img from "gatsby-image"
import styled from 'styled-components'
import { useShopify } from '../hooks/useShopify'

import ProductListingItem from '../components/products/ProducListingItem'
import SlideShow from '../components/slideshow'
import SEO from "../components/seo"

import { DarkBrandButton, Listing, Spacer, dimensions, breakpoints, colors, Subtitle } from '../utils/styles'

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

// const Margin = styled.div`
//   margin-bottom: 10px;
// `

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

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${colors.brand};
`

const Tab = styled.div`
  border: 1px solid ${colors.brand};
  border-radius: 5px 5px 0 0;
  border-bottom: none;
  padding: 5px;
  background: ${({ selected }) => selected ? colors.brand : 'transparent'};
  cursor: pointer;
`

const Margin = styled.div`
  margin: 5px;
`


const IndexPage = ({ data }) => {
  console.log('index rendered')

  const { tShirts, longsleeves, driFits, headware, accessories, discs, featured } = useShopify()
  const [scrolled, setScrolled] = useState(false)
  const [MainCat, setMainCat] = useState('featured')
  const [SecCat, setSecCat] = useState('t-shirts')

  console.log('featured', featured)


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
          <KeepScrolling scrolled={scrolled} />
        </Landing>
        <Tabs>
          <Tab
            selected={MainCat === 'featured'}
            onClick={() => setMainCat('featured')}
          >Featured</Tab>
          <Margin />
          <Tab
            selected={MainCat === 'apparel'}
            onClick={() => setMainCat('apparel')}
          >Apparel</Tab>
          <Margin />
          <Tab
            selected={MainCat === 'discs'}
            onClick={() => setMainCat('discs')}
          >Discs</Tab>
        </Tabs>
        <Margin />
        {MainCat === 'apparel' && (
          <Tabs>
            <Tab
              selected={SecCat === 't-shirts'}
              onClick={() => setSecCat('t-shirts')}
            >Shirts</Tab>
            <Margin />
            <Tab
              selected={SecCat === 'dri-fits'}
              onClick={() => setSecCat('dri-fits')}
            >Dri-Fits</Tab>
            <Margin />
            <Tab
              selected={SecCat === 'headware'}
              onClick={() => setSecCat('headware')}
            >Hats</Tab>
            <Margin />
            <Tab
              selected={SecCat === 'accessories'}
              onClick={() => setSecCat('accessories')}
            >Accessories</Tab>
          </Tabs>
        )}

        <Container>
          <Margin />
          {MainCat === 'discs' && (
            <>
              <Subtitle>{discs.title}</Subtitle>
              <Listing>
                {discs.products.map(product => (
                  <ProductListingItem
                    product={product}
                    key={product.shopifyId}
                    showThumbs={false}
                    style={{
                      // width: '60vw',
                      // maxWidth: '300px',
                    }}
                  />
                ))}
              </Listing>
            </>
          )}
          {MainCat === 'featured' && (
            <>
              <Subtitle>{featured.title}</Subtitle>
              <Listing>
                {featured.products.map(product => (
                  <ProductListingItem
                    product={product}
                    key={product.shopifyId}
                    showThumbs={false}
                    style={{
                      // width: '60vw',
                      // maxWidth: '300px',
                    }}
                  />
                ))}
              </Listing>
            </>
          )}
          {SecCat === 't-shirts' && MainCat === 'apparel' && (
            <>
              <Subtitle>{tShirts.title}</Subtitle>
              {/* <Margin /> */}
              <Listing>
                {tShirts.products.map(product => (
                  <ProductListingItem
                    product={product}
                    key={product.shopifyId}
                    showThumbs={false}
                    style={{
                      // width: '60vw',
                      // maxWidth: '300px',
                    }}
                  />
                ))}
                {longsleeves.products.map(product => (
                  <ProductListingItem
                    product={product}
                    key={product.shopifyId}
                    showThumbs={false}
                    style={{
                      // width: '60vw',
                      // maxWidth: '300px',
                    }}
                  />
                ))}
              </Listing>
            </>
          )}
          {SecCat === 'dri-fits' && MainCat === 'apparel' && (
            <>
              <Subtitle>{driFits.title}</Subtitle>
              {/* <Margin /> */}
              <Listing>
                {driFits.products.map(product => (
                  <ProductListingItem
                    product={product}
                    key={product.shopifyId}
                    showThumbs={false}
                    style={{
                      // width: '60vw',
                      // maxWidth: '300px',
                    }}
                  />
                ))}
              </Listing>
            </>
          )}
          {SecCat === 'headware' && MainCat === 'apparel' && (
            <>
              <Subtitle>{headware.title}</Subtitle>
              <Margin />
              <Listing>
                {headware.products.map(product => (
                  <ProductListingItem
                    product={product}
                    key={product.shopifyId}
                    showThumbs={false}
                    style={{
                      // width: '60vw',
                      // maxWidth: '300px',
                    }}
                  />
                ))}
              </Listing>
            </>
          )}
          {SecCat === 'accessories' && MainCat === 'apparel' && (
            <>
              <Subtitle>{accessories.title}</Subtitle>
              <Margin />
              <Listing>
                {accessories.products.map(product => (
                  <ProductListingItem
                    product={product}
                    key={product.shopifyId}
                    showThumbs={false}
                    style={{
                      // width: '60vw',
                      // maxWidth: '300px',
                    }}
                  />
                ))}
              </Listing>
            </>
          )}


        </Container>
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
