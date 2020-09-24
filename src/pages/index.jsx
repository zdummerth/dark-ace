import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Slideshow from '../components/slideshow'
import Youtube from '../components/youtube'



// import Layout from "../components/layout"
import ProductGrid from "../components/product-grid"
import SEO from "../components/seo"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  width: 100%;

   & > * {
    //  align-self: center;
     margin-top: 1.5rem;
   }
`

const ImgWrapper = styled.div`
  margin-top: 5vh;
  margin-bottom: 5vh;
  width: 90%;
  align-self: center;
  // max-width: 1200px;
`

const Hr = styled.hr`
   color: #C00A0A;
   width: 90%;
`

const StyledProductGrid = styled(ProductGrid)`
   border: 2px solid blue;
   background: blue;
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
        <Youtube style={{alignSelf: 'center'}} />
        <Hr/>
        <h2 style={{alignSelf: 'center'}} >Pre-Order</h2>
        <ProductGrid products={data.allShopifyProduct.edges} />
        <Slideshow />
      </Container>
      {/* <ProductGrid products={data.allShopifyProduct.edges} /> */}

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
  allShopifyProduct(sort: { fields: [title] }) {
    edges {
      node {
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
}
`

export default IndexPage
