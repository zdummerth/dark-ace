import React, { useEffect } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { navigate, Link } from 'gatsby'
import ProductNav from 'src/components/layout/productCollectionNavigation'
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
  width: 100%;
`

const StyledSlideshow = styled(Slideshow)`
  width: 100vw;
  max-width: 500px;

  height: 100vw;

  //Max content width is 1300px
  max-height: 500px;
`

const Listing = styled(Flex)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`

const ImagesWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  max-height: 40vh;
  padding: 5px;

  & > * {
    flex: 1;
  }
`

const AllImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
  }
`

const StyledLink = styled(Link)`
  border: 1px solid ${colors.brand};
  border-radius: 50px;
  padding: 10px;
  margin: 20px 0 50px 0;
  background: ${colors.darkGradient};
`

const Spacer = styled.div`
  // position: relative;
  // top: 34px;
  background: ${colors.radialGradient};
  height: 10px;
  width: 100%;
  margin: 20px 0;

`



const IndexPage = () => {
  // const [scrolled, setScrolled] = useState(false)

  // const isScrolled = () => {
  //   if (window.pageYOffset > 0) {
  //     setScrolled(true)
  //   }
  //   else {
  //     setScrolled(false)
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', isScrolled, { passive: true });

  //   return () => {
  //     window.removeEventListener('scroll', isScrolled);
  //   };
  // }, []);

  const { featured, homePageCollectionListing } = useShopify()
  console.log('featured', featured.products[0])

  return (
    <>
      <Seo title="Home" />
      <Container dir='column'>
        
        <StyledSlideshow interval={3500}>
          <StaticImage
            src='../images/sales/slasher-sunday.jpg'
            alt='logo'
          />
          <StaticImage
            src='../images/sales/metal-monday.jpg'
            alt='logo'
          />
        </StyledSlideshow>
        <H1>Featured Products</H1>
        <Listing ai='stretch'>
          {featured.products.map(product => (
            <ProductListingItem
              product={product}
              key={product.shopifyId}
              showThumbs={false}
              hideBorder={true}
              style={{
                // width: '100%',
                width: featured.products.length === 1 ? '100%' : '50%',
                maxWidth: featured.products.length === 2 ? '500px' : '450px',
              }}
            />
          ))}
        </Listing>


        {/* <H1>Our Collections</H1>
        <Listing ai='stretch'>
          {homePageCollectionListing.map(c => (
            <CollectionListingItem
              collection={c}
              key={c.shopifyId}
              showThumbs={false}
              hideBorder={true}
              style={{
                width: '50%',
                maxHeight: '50vh',
                maxWidth: '350px',
              }}
            />
          ))}
        </Listing> */}

        <StyledLink
          to={`/shop/collection/fall-collection`}
        >
          View All Products
        </StyledLink>

        <Spacer />

        {/* <StaticImage src='../images/da-logo-square.png' alt='logo' width={40} height={40} /> */}

        <AllImagesWrapper>
          <ImagesWrapper>
            <StaticImage
              src='../images/group.jpg'
              alt='logo'
            />
          </ImagesWrapper>
          <ImagesWrapper>
            <StaticImage
              src='../images/burrs.jpg'
              alt='logo'
            />
            <StaticImage
              src='../images/homies.jpg'
              alt='logo'
            />
          </ImagesWrapper>
          <ImagesWrapper>
            <StaticImage
              src='../images/biofreezearmy.jpg'
              alt='logo'
            />
          </ImagesWrapper>
        </AllImagesWrapper>
        <ProductNav />

      </Container>
    </>
  )
}

export default IndexPage
