import React from "react"
import Seo from "src/components/SEO"
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import Flex from 'src/components/shared/Flexbox'

import { dimensions, breakpoints, H1, H2, colors } from 'src/styles'

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
const PartnersPage = () => (
  <>
    <Seo title="Our Partners" />
    <Wrapper>
      <H1>Our Partners</H1>

      <H2>Local Line Apparel</H2>
      <ImgContainer>
        <StaticImage
          src='../images/local-line-logo.jpg'
          alt={'Product Image'}
        // style={{width: '100%', height: '100%'}}
        // objectFit='contain'
        // objectFit={'cover'}
        />
      </ImgContainer>

      <H2>Ripper Studios</H2>
      <ImgContainer>
        <StaticImage
          src='../images/ripper-studios-logo.jpg'
          alt={'Product Image'}
        // style={{width: '100%', height: '100%'}}
        // objectFit='contain'
        // objectFit={'cover'}
        />
      </ImgContainer>

    </Wrapper>
  </>
)

export default PartnersPage
