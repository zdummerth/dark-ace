import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Slideshow from '../components/slideshow'

import Layout from "../components/layout"
// import Logo from "../components/logo"
import SEO from "../components/seo"


const ImgWrapper = styled.div`
  margin-top: 5vh;
  margin-bottom: 5vh;
`

const GalleryWrapper = styled.div`
  img {
    border: 2px solid #C00A0A;
    :hover {
      cursor: pointer;
    }
  }
`

const IndexPage = ({data}) => {
  // console.log(data.slideshow.edges)
  const images = data.gallery.edges.map(({ node }) => node.childImageSharp)
  // console.log({images})
  return (
    <Layout>
      <SEO title="Home" />
      <ImgWrapper>
        <Img fluid={data.file.childImageSharp.fluid} />
      </ImgWrapper>
      <Slideshow />
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
  gallery: allFile(filter: {relativeDirectory: {eq: "slideshow"}}) {
    edges {
      node {
        childImageSharp {
          thumb: fluid(maxWidth: 270, maxHeight: 270) {
            ...GatsbyImageSharpFluid
          }
          full: fluid(maxWidth: 1024) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}
`

export default IndexPage
