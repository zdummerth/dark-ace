import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import { FiExternalLink } from 'react-icons/fi';

import ProductListing from '../components/products/product-listing'
import Youtube from '../components/youtube'

import SEO from "../components/seo"

import { colors } from '../utils/styles';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

   & > * {
     margin-top: 1.5rem;
   }

   .bunker-link {
     font-size: 1.25rem;
     align-self: center;
   }
`

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-top: 100px;
`

const ImgWrapper = styled.div`
  width: 100%;
  align-self: center;
`

const Banner = styled.div`
  margin-bottom: 5vh;
  width: 100vw;
  max-width: 1500px;
  align-self: center;
`

const Spacer = styled.div`
   height: 10px;
   background: ${colors.brand};
`


const IndexPage = ({data}) => {

  const preOrders = data.allShopifyCollection.edges
  .find(({node}) =>  node.handle === 'pre-order')
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
        <Title>Pre-Order</Title>
        <ProductListing products={preOrders} />
        <Title>Dark Ace Standards</Title>
        <ProductListing products={standards} />
        <Spacer />
        <ImgWrapper>
          <Img fluid={data.bunkerBaby.childImageSharp.fluid} />
        </ImgWrapper>
        <Link 
          as='a' 
          href="https://www.discgolfscene.com/tournaments/Revenge_Of_The_Bunker_Baby_A_Halloween_Doubles_Tournament_2020" 
          className='bunker-link'>
            Register on disc golf scene <FiExternalLink />
        </Link>
        <Spacer />
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
