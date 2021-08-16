import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { breakpoints } from 'src/styles'


/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.org/docs/use-static-query/
 */

const MobileLogo = styled.div`

  @media (min-width: ${breakpoints.desktop}) {
    display: none;
  }
`
const DesktopLogo = styled.div`
  display: none;

  @media (min-width: ${breakpoints.desktop}) {
    display: block;
  }
`

const Logo = () => {
  return (
    <>
      <MobileLogo>
        <StaticImage src='../../images/da-logo-square.png' alt='logo' width={60} height={60} />
      </MobileLogo>
      <DesktopLogo>
        <StaticImage src='../../images/logo.png' alt='logo' width={200} height={70} />
      </DesktopLogo>
    </>
  )
}

export default Logo

