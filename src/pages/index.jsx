import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import ProductListing from '../components/products/product-listing'
import Youtube from '../components/youtube'

import SEO from "../components/seo"

// import { colors } from '../utils/styles';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

   & > * {
     margin-top: 1.5rem;
   }

   .bunker-link {
     font-size: 1rem;
     align-self: center;
   }
`

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 0;
`

const ImgWrapper = styled.div`
  width: 100%;
  align-self: center;
`

const Banner = styled.div`
  width: 100vw;
  max-width: 1500px;
  align-self: center;
`

const StyledProductListing = styled(ProductListing)`
  margin-bottom: 30px;
`


const IndexPage = ({data}) => {

  const specials = data.allShopifyCollection.edges
  .find(({node}) =>  node.handle === 'frontpage')
  .node.products

  const standards = data.allShopifyCollection.edges
  .find(({node}) =>  node.handle === 'standards')
  .node.products

  return (
    <>
      <SEO title="Home" />
      <Container>
        <Banner>
          <Img fluid={data.parked.childImageSharp.fluid} />
        </Banner>
        <Title>Bunker Baby Gear</Title>
        <StyledProductListing products={specials} />
        <Title>Dark Ace Standards</Title>
        <StyledProductListing products={standards} />
        {/* <ImgWrapper>
          <Img fluid={data.bunkerBaby.childImageSharp.fluid} />
        </ImgWrapper>
        <Link 
          as='a' 
          href="https://www.discgolfscene.com/tournaments/Revenge_Of_The_Bunker_Baby_A_Halloween_Doubles_Tournament_2020" 
          className='bunker-link'>
            Register on disc golf scene <FiExternalLink />
        </Link> */}
        <Title>2020 Ledgestone Commercial</Title>
        <Youtube style={{alignSelf: 'center'}} />
        <ImgWrapper>
          <Img fluid={data.motto.childImageSharp.fluid} />
        </ImgWrapper>
      </Container>

    </>
  )
}

export const query = graphql`
query {
   motto: file(relativePath: { eq: "motto.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  parked: file(relativePath: { eq: "parked.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  bunkerBaby: file(relativePath: { eq: "bunker-baby.png" }) {
    childImageSharp {
      fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  allShopifyCollection {
    edges {
      node {
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
  }
}
`

export default IndexPage
