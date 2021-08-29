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

import { dimensions, colors, H2 } from 'src/styles'

const Container = styled(Flex)``

const Landing = styled(Flex)`
  flex-direction: column;
  justify-content: space-evenly;
  min-height: calc(100vh - ${dimensions.headerHeight});

  @media (min-width: ${breakpoints.hd}) {
    // flex-direction: row;
  }
`

const StyledLink = styled(Link)`
  background: ${colors.gradient};
  padding: 15px;
  margin-top: 30px;
  border-radius: 10px;
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
          {/* <StyledProductNav /> */}
          <Flex>
            <StaticImage
              src='../images/da-logo-square.png'
              alt='logo'
              width={125}
              height={125}
            />
            <Plus size='22' />
            <StaticImage
              src='../images/wc-sawblade.png'
              alt='logo'
              width={125}
              height={125}
            />
          </Flex>
          <StaticImage
            src='../images/WC-Banner.jpg'
            alt='logo'
          />
          <StyledLink
            to={`/shop/${feature.handle}`}
          >
            Pre Order Now
          </StyledLink>
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
