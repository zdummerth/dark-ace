import React, { useEffect, useState } from 'react'
import { graphql, Link } from "gatsby"
// import { CaretDown } from 'grommet-icons';
import Img from "gatsby-image"
import styled from 'styled-components'

import SEO from "../components/seo"

import { DarkBrandButton, Listing, Spacer, dimensions, breakpoints, colors } from '../utils/styles'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  //Having align-items set to center prevents side scrolling for products
  align-items: center;
  width: 100%;
`

const Landing = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  // height: 100vh;
  width: 100vw;
`

const Banner = styled.div`
  width: 100%;
  max-width: 500px;
  align-self: center;
  height: 40%;
`

const ImgWrapper = styled.div`
  height: 120px;
  width: 120px;
  margin: 10px;

  @media (min-width: ${breakpoints.tablet}) {
    height: 200px;
    width: 200px;
  }
`



const StyledLink = styled(Link)`
  align-self: center;
  margin-top: 30px;
  margin-bottom: 30px;
`

const I = styled.i`
  font-size: 22px;
  margin: 20px 0;
`


const IndexPage = ({ data }) => {
  console.log(data)

  const firstHalf = data.allFile.edges.slice(0, 2)
  const secHalf = data.allFile.edges.slice(2, 4)
  const all = data.allFile.edges

  return (
    <>
      <SEO title="Home" />
      <Container>
        <Landing>
          <Banner>
            <Img
              fluid={data.banner.childImageSharp.fluid}
              alt={'new product image'}
              style={{
                height: '100%',
              }}
              imgStyle={{
                objectFit: 'contain'
              }}
            />
          </Banner>
          <I>
            Coming June 8th, 2021
          </I>
          <Listing>
            {all.map(({ node }) => {
              return (
                <ImgWrapper key={node.name}>
                  <Img
                    fluid={node.childImageSharp.fluid}
                    alt={'new product image'}
                    style={{
                      height: '100%',
                    }}
                    imgStyle={{
                      // objectFit: 'contain'
                    }}
                  />
                </ImgWrapper>
              )
            })}
          </Listing>
        </Landing>


        {/* <StyledLink to='/contact'>
          <DarkBrandButton>
            Contact Us
          </DarkBrandButton>
        </StyledLink> */}
      </Container>

    </>
  )
}

export const query = graphql`
query {
  allFile(filter: {relativeDirectory: {eq: "newItems"}}) {
    edges {
      node {
        name
        childImageSharp {
          fluid(maxWidth: 1280) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
  banner: file(name: {eq: "da-square-banner"}) {
    childImageSharp {
      fluid(maxWidth: 1280) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default IndexPage
