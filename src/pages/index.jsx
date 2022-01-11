import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { LinkExternal } from '@styled-icons/boxicons-regular'
import styled from 'styled-components'
import ProductListingItem from 'src/components/products/ProducListingItem'
import { useShopify } from 'src/hooks/useShopify'
import Flex from 'src/components/shared/Flexbox'
import Seo from "src/components/SEO"
import { breakpoints, H1, colors } from 'src/styles'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  a {
    margin: 0;
  }

  h2 {
    @media (min-width: ${breakpoints.tablet}) {
      font-size: 28px;
    }
  }

  #register {
    border: 1px solid ${colors.brand};
    border-radius: 50px;
    padding: 10px;
    margin: 20px 0 50px 0;
    background: ${colors.darkGradient};
    width: 150px;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-align: center;
  }

  #league {
    text-align: center;
  }
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

  // const [controls, setControls] = useState(false)

  // useEffect(() => {
  //   if (controls) return
  //   setControls(true)
  // }, [controls]);


  const { featured, homePageCollectionListing } = useShopify()

  return (
    <>
      <Seo title="Home" />
      <Container dir='column'>

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
        <Spacer />
        <Flex id='league' dir='column' ai='center'>
          <h2>Putting League At 4 Hands Brewery</h2>
          <p>
            Random Draw Doubles
          </p>
          <p>
            The top three teams will receive cash payout as well as all 4Hands products and well liquor comped from their tab!
          </p>
          <p>
            Each player will receive their first beer (either City Wide or Full Life) free as well as 25% off their tab.
          </p>
          <h3>Upcoming Dates</h3>
          <p>
            - January 24th
          </p>
          <p>
            - January 31st
          </p>
          <p>
            <a
              id='register'
              href="https://www.eventbrite.com/e/dark-ace-weekly-putting-league-tickets-238956213467"
            >
              Register
              <LinkExternal size='22' />
            </a>
          </p>
        </Flex>
        <Spacer />

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

        <Spacer />

        {/* <StaticImage src='../images/da-logo-square.png' alt='logo' width={40} height={40} /> */}
        {/* <ProductNav /> */}

      </Container>
    </>
  )
}

export default IndexPage
