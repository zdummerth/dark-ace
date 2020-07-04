import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layout"
// import Logo from "../components/logo"
import SEO from "../components/seo"

const ImgWrapper = styled.div`
  // border: 1px solid #C00A0A;
`

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <ImgWrapper>
      <Img fluid={data.file.childImageSharp.fluid} />
    </ImgWrapper>
  </Layout>
)

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
