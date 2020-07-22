import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'

import BackgroundImage from 'gatsby-background-image'

const StyledBackgroundImage = styled(BackgroundImage)`
    background-color: #020202;

`
const TextWrapper = styled.div`
    height: 100%;
    font-size: 1.5rem;
    text-align: center;
    padding-top: 20vh;
    // background-color: rgba(0,0,0,0.6);

    @media (max-width: 500px) {
        font-size: 1.2rem;;
      }

`
const BackgroundSection = ({ className }) => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "bg.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.file.childImageSharp.fluid
      return (
            <StyledBackgroundImage
              Tag="section"
              className={className}
              fluid={imageData}
              backgroundColor={`#040e18`}
            >
                <TextWrapper>
                    <p>For sponsorship’s of any kind, custom artwork, or to share your favorite band, please send us an email :</p>
                    <p>DARKACEAPPAREL@GMAIL.COM</p>
                </TextWrapper>
            </StyledBackgroundImage>
      )
    }}
  />
)

const StyledBackgroundSection = styled(BackgroundSection)`
  width: 100%;
  max-width: 789px;
  height: 100vh;
  margin: 0 auto;
  background-position: top center;
  background-repeat: repeat-y;
  background-size: cover;
`

export default StyledBackgroundSection