import React, { useEffect } from 'react'
// import { StaticImage } from 'gatsby-plugin-image'
import { navigate, Link } from 'gatsby'
// import ProductNav from 'src/components/layout/productCollectionNavigation'
import styled from 'styled-components'
// import SlideShow from 'src/components/slideshow'
// import ProductListingItem from 'src/components/products/ProducListingItem'
// import { useShopify } from 'src/hooks/useShopify'
// import { breakpoints } from 'src/styles'
// import Flex from 'src/components/shared/Flexbox'
import Seo from "src/components/SEO"
// import { dimensions, breakpoints, H1, colors } from 'src/styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%
`

// const Listing = styled(Flex)`
//   display: flex;
//   flex-wrap: wrap;
//   width: 100%;
//   justify-content: center;
// `

// const ImagesWrapper = styled.div`
//   // position: relative;
//   display: flex;
//   width: 100%;
//   // height: 30vh;

//   & > * {
//     flex: 1;
//   }
// `

// const StyledLink = styled(Link)`
//   border: 1px solid ${colors.brand};
//   border-radius: 5px;
//   padding: 10px;
//   margin: 20px 0 50px 0;
//   background: ${colors.darkGradient};
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
      <Container dir='column'>
        {/* <StaticImage
          src='../images/banner-hearse.png'
          alt='logo'
        />

        <H1>Featured Products</H1>
        <Listing ai='stretch'>
          {featured.products.map(product => (
            <ProductListingItem
              product={product}
              key={product.shopifyId}
              showThumbs={false}
              hideBorder={true}
              style={{
                width: featured.length === 1 ? '100%' : '50%',
                maxWidth: featured.length === 1 ? '500px' : '350px',
              }}
            />
          ))}
        </Listing>

        <StyledLink
          to={`/shop/collection/featured`}
        >
          View All Products
        </StyledLink>

        <StaticImage
          src='../images/group.jpg'
          alt='logo'
        />
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
        <StaticImage
          src='../images/biofreezearmy.jpg'
          alt='logo'
        /> */}

        {/* <ProductNav /> */}

      </Container>
    </>
  )
}

export default IndexPage
