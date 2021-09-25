import React, { useEffect } from 'react'
// import { StaticImage } from 'gatsby-plugin-image'
import { navigate } from 'gatsby'
// import ProductNav from 'src/components/layout/productCollectionNavigation'
// import styled from 'styled-components'
// import SlideShow from 'src/components/slideshow'
// import ProductListingItem from 'src/components/products/ProducListingItem'
// import { useShopify } from 'src/hooks/useShopify'
// import { breakpoints } from 'src/styles'
// import Flex from 'src/components/shared/Flexbox'
import Seo from "src/components/SEO"
// import { dimensions } from 'src/styles'

// const Container = styled(Flex)`
//   .fullWidth {
//     position: relative;
//   }
// `

// const Landing = styled(Flex)`
//   flex-direction: column;
//   justify-content: space-evenly;
//   min-height: calc(95vh - ${dimensions.headerHeight});

//   @media (min-width: ${breakpoints.hd}) {
//     // flex-direction: row;
//   }
// `

// const ProductContainer = styled.div`
//   position: relative;
// `



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

  // const { featured } = useShopify()

  // const feature = featured.products[0]

  useEffect(() => navigate('/shop/collection/featured'))


  return (
    <>
      <Seo title="Home" />
      {/* <Container>
        <Landing>
          <Flex style={{ marginTop: '10px' }}>
            <StaticImage
              src='../images/da-logo-square.png'
              alt='logo'
              width={140}
              height={140}
            />
          </Flex>
          <ProductContainer>
            <ProductListingItem
              product={feature}
              key={feature.shopifyId}
              showThumbs={false}
              hideBorder={true}
              // hideTitle={true}
              // containImage={true}
              style={{
                width: '100%',
                maxWidth: '600px',
              }}
            />
          </ProductContainer>
          <ProductNav />
        </Landing>
      </Container> */}
    </>
  )
}

export default IndexPage
