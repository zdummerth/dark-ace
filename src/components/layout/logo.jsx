import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from 'styled-components'
import { breakpoints } from '../../utils/styles'


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
  const data = useStaticQuery(graphql`
  query {
    mobile: file(relativePath: { eq: "da-logo-square.png" }) {
      childImageSharp {
        fixed(width: 45, height: 45) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    desktop: file(relativePath: { eq: "logo.png" }) {
      childImageSharp {
        fixed(width: 200, height: 55) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
  `)

  return (
    <>
      <MobileLogo>
        <Img fixed={data.mobile.childImageSharp.fixed} />
      </MobileLogo>
      <DesktopLogo>
        <Img fixed={data.desktop.childImageSharp.fixed} />
      </DesktopLogo>
    </>
  )
}

export default Logo

