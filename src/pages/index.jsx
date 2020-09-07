import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Slideshow from '../components/slideshow'
import Youtube from '../components/youtube'



// import Layout from "../components/layout"
// import Logo from "../components/logo"
import SEO from "../components/seo"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
   & > * {
     margin-top: 1.5rem;
   }
`

const ImgWrapper = styled.div`
  margin-top: 5vh;
  margin-bottom: 5vh;
  width: 90%;
  // max-width: 1200px;
`

const Hr = styled.hr`
   color: #C00A0A;
   width: 90%;
`


const IndexPage = ({data}) => {
  return (
    // <Layout>
    <>
      <SEO title="Home" />
      <Container>
        <ImgWrapper>
          <Img fluid={data.file.childImageSharp.fluid} />
        </ImgWrapper>
        <Hr/>
        <Youtube />
        <Hr/>
        <Slideshow />
      </Container>
    </>
    // </Layout>
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
