import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { breakpoints } from 'src/styles'

const MobileLogo = styled.div`

  @media (min-width: ${breakpoints.desktop}) {
    // display: none;
  }
`
// const DesktopLogo = styled.div`
//   display: none;

//   @media (min-width: ${breakpoints.desktop}) {
//     display: block;
//   }
// `

const Logo = () => {
  return (
    <>
      <MobileLogo>
        <StaticImage src='../../images/da-logo-square.png' alt='logo' width={50} height={50} />
      </MobileLogo>
      {/* <DesktopLogo>
        <StaticImage src='../../images/logo.png' alt='logo' width={206} height={70} quality={100} />
      </DesktopLogo> */}
    </>
  )
}

export default Logo

