import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import ProductNav from 'src/components/layout/productCollectionNavigation'
import styled from 'styled-components'
// import SlideShow from 'src/components/slideshow'
import { useShopify } from 'src/hooks/useShopify'
import { breakpoints } from 'src/styles'
import { Plus } from '@styled-icons/boxicons-regular'
import Flex from 'src/components/shared/Flexbox'
import Link from 'src/components/shared/Link'


import Seo from "src/components/SEO"

import { dimensions, colors } from 'src/styles'

const Container = styled(Flex)`
  .fullWidth {
    position: relative;
  }
`

const Landing = styled(Flex)`
  flex-direction: column;
  justify-content: space-evenly;
  min-height: calc(95vh - ${dimensions.headerHeight});

  @media (min-width: ${breakpoints.hd}) {
    // flex-direction: row;
  }
`

const StyledLink = styled.div`
  position: absolute;
  bottom: 80px;
  right: 10px;
  background: transparent;
  // background: ${colors.gradient};
  // border: 1px solid #2596be;
  // border: 1px solid ${colors.brand};
  border: 1px solid white;
  padding: 15px;
  margin-top: 30px;
  border-radius: 10px;
  @media (min-width: ${breakpoints.phablet}) {
    bottom: 100px; 
    right: 30px;
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
      <Seo title="Home" />
      <Container>
        <Landing>
          <Flex>
            <StaticImage
              src='../images/da-logo-square.png'
              alt='logo'
              width={140}
              height={140}
            />
            <Plus size='22' />
            <StaticImage
              src='../images/wc-sawblade.png'
              alt='logo'
              width={140}
              height={140}
            />
          </Flex>
          <Link
            to={`/shop/${feature.handle}`}
            className='fullWidth'
          >
            <StaticImage
              src='../images/WC-Banner.jpg'
              alt='logo'
              width={650}
            />
            <StyledLink
              to={`/shop/${feature.handle}`}
            >
              {'Pre Order Now >'}
            </StyledLink>
          </Link>
          <ProductNav />
        </Landing>
        {/* <Spacer />
        <H2>
          Featured
        </H2>
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
        </ProductContainer> */}
        {/* <Banner>
          <SlideShow />
        </Banner> */}
      </Container>

    </>
  )
}

export default IndexPage
