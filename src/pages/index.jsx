import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Slideshow from '../components/slideshow'
import HorizontalScroll from '../components/horizontal-scroll'
import Youtube from '../components/youtube'

import SEO from "../components/seo"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  width: 100%;

   & > * {
     margin-top: 1.5rem;
   }
`

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
`

const ImgWrapper = styled.div`
  margin-top: 5vh;
  margin-bottom: 5vh;
  width: 90%;
  align-self: center;
`


const IndexPage = ({data}) => {
  const products = data.shopifyCollection.products
  return (
    <>
      <SEO title="Home" />
      <Container>
        <ImgWrapper>
          <Img fluid={data.file.childImageSharp.fluid} />
        </ImgWrapper>
        <Title>2020 Ledgestone Commercial</Title>
        <Youtube style={{alignSelf: 'center'}} />
        <Title>Pre-Order</Title>
        <HorizontalScroll products={products} />
        <Slideshow />
      </Container>

    </>
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
  shopifyCollection(handle: {eq: "pre-order"}) {
        handle 
        products {
          handle
          title
          shopifyId
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          thumbs: images {
            localFile {
              childImageSharp {
                fixed(height: 60, width: 48) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
}
`

export default IndexPage
