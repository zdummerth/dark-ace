import React from 'react'
import ProductNav from 'src/components/layout/productCollectionNavigation'
import styled from 'styled-components'
// import SlideShow from 'src/components/slideshow'
import { useShopify } from 'src/hooks/useShopify'
import { breakpoints } from 'src/styles'
import ProductListingItem from 'src/components/products/ProducListingItem'


import SEO from "src/components/SEO"

import { dimensions } from 'src/styles'

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
  max-width: 700px;
  align-self: center;
  height: 25vh;
`

const StyledProductNav = styled(ProductNav)`
  max-width: 500px;
`


// const KeepScrolling = styled.div`
//   background: ${colors.darkToBottom};
//   height: 3%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   opacity: ${({ scrolled }) => scrolled ? '0' : '1'};
//   transition: opacity .5s ease-in-out;
// `



const ProductContainer = styled.div`
  width: 90%;
  max-width: 600px;
  text-align: center;
  flex: 1;

  @media (min-width: ${breakpoints.tablet}) {
    // height: 50%;
  }

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

  const { featured } = useShopify()

  const feature = featured.products[0]

  return (
    <>
      <SEO title="Home" />
      <Container>
        <Landing>
          <StyledProductNav />
          <ProductContainer>
            <ProductListingItem
              product={feature}
              key={feature.shopifyId}
              showThumbs={false}
              // hideBorder={true}
              // hideTitle={true}
              // containImage={true}
              style={{
                width: '100%',
                maxWidth: '600px',
              }}
            />
          </ProductContainer>
        </Landing>
        <Banner>
          {/* <SlideShow /> */}
        </Banner>
      </Container>

    </>
  )
}

export default IndexPage
