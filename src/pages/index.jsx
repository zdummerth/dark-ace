import React, { useEffect } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { navigate, Link } from 'gatsby'
// import ProductNav from 'src/components/layout/productCollectionNavigation'
import styled from 'styled-components'
// import SlideShow from 'src/components/slideshow'
import ProductListingItem from 'src/components/products/ProducListingItem'
import CollectionListingItem from 'src/components/products/CollectionListingItem'
import { useShopify } from 'src/hooks/useShopify'
import Flex from 'src/components/shared/Flexbox'
import Seo from "src/components/SEO"
import { dimensions, breakpoints, H1, H2, colors } from 'src/styles'

import Slideshow from 'src/components/Slideshow'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: calc(100vh - 25px);
  text-align: center;


  h1 {
    max-width: 300px;
  }
`

const StyledSlideshow = styled(Slideshow)`
  width: 100vw;
  max-width: 500px;

  height: 100vw;
  margin-top: 8px;

  //Max content width is 1300px
  max-height: 500px;
`




const IndexPage = () => {

  return (
    <>
      <Seo title="Home" />
      <Container dir='column'>
        <StaticImage
          src='../images/da-logo-square.png'
          alt='logo'
          width={150}
          height={150}
        />

        <H1>Prepare For The Weekend Of Darkness</H1>

        <StyledSlideshow interval={3500}>
          <StaticImage
            src='../images/sales/dark-friday-announcement.jpg'
            alt='logo'
          />
          <StaticImage
            src='../images/sales/dark-friday.jpg'
            alt='logo'
          />
          <StaticImage
            src='../images/sales/shredder-saturday.jpg'
            alt='logo'
          />
          <StaticImage
            src='../images/sales/slasher-sunday.jpg'
            alt='logo'
          />
          <StaticImage
            src='../images/sales/metal-monday.jpg'
            alt='logo'
          />
        </StyledSlideshow>
      </Container>
    </>
  )
}

export default IndexPage
