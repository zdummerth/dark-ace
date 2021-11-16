import React from "react"
import Seo from "src/components/SEO"
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import Flex from 'src/components/shared/Flexbox'

import { dimensions, breakpoints, H1, colors } from 'src/styles'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  p {
    width: 80%;
    max-width: 400px;
    text-align: center;
  }
`

const ImgContainer = styled(Flex)`
  position: relative;
  width: 90%;
  max-width: 400px;
  flex: 1;
  overflow: hidden;
  margin: 20px 0;
`
const NotFoundPage = () => (
  <>
    <Seo title="About Us" />
    <Wrapper>
      <ImgContainer>
        <StaticImage
          src='../images/da-logo-square.png'
          alt={'Product Image'}
        // style={{width: '100%', height: '100%'}}
        // objectFit='contain'
        // objectFit={'cover'}
        />
      </ImgContainer>
      <H1>About Us</H1>
      <p>
        Established in 2020, and hailing from St. Louis, MO, Dark Ace Apparel is a brand on a mission to merge the worlds of headbangers and chainbangers.
      </p>
    </Wrapper>
  </>
)

export default NotFoundPage
