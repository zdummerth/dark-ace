import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import SEO from "../components/seo"


const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  font-size: 2rem;
`


const Wholesale = ({data}) => {

  return (
    <>
      <SEO title="Wholesale" />
      <Container>
          <Img fluid={data.one.childImageSharp.fluid} />
          <Img fluid={data.two.childImageSharp.fluid} />
          <Img fluid={data.three.childImageSharp.fluid} />
          <Img fluid={data.four.childImageSharp.fluid} />
          <Img fluid={data.five.childImageSharp.fluid} />
          <Img fluid={data.six.childImageSharp.fluid} />
          <Link to='/contact'>
            <p>Contact us for more information</p>
          </Link>
      </Container>

    </>
  )
}

export const query = graphql`
query {
   one: file(relativePath: { eq: "wholesale/1.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  two: file(relativePath: { eq: "wholesale/2.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  three: file(relativePath: { eq: "wholesale/3.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  four: file(relativePath: { eq: "wholesale/4.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  five: file(relativePath: { eq: "wholesale/5.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  six: file(relativePath: { eq: "wholesale/6.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default Wholesale
