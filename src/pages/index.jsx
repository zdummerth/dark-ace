import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Slideshow from '../components/slideshow'
// import Spotify from '../components/spotify'
import Youtube from '../components/youtube'



import Layout from "../components/layout"
// import Logo from "../components/logo"
import SEO from "../components/seo"

const Container = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
`

const ImgWrapper = styled.div`
  margin-top: 5vh;
  margin-bottom: 5vh;
  // width: 90%;
  // max-width: 1200px;
`


const IndexPage = ({data}) => {
  return (
    <Layout>
      <SEO title="Home" />
      {/* <Spotify /> */}
      <Container>
        <ImgWrapper>
          <Img fluid={data.file.childImageSharp.fluid} />
        </ImgWrapper>
        <Youtube />
        <Slideshow />
      </Container>
    </Layout>
  )
}

export const query = graphql`
query {
  file(relativePath: { eq: "motto.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default IndexPage
