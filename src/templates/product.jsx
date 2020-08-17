import React, { useState, useContext } from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { GlobalStateContext } from '../context/GlobalContextProvider'


import Layout from '../components/layout'
import ProductForm from '../components/product-form'

import SEO from '../components/seo'

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;

  @media (max-width: 630px) {
    flex-direction: column;
  }

`
const ImgContainer = styled.div`
  flex: 1;
  max-width: 500px;

  @media (max-width: 630px) {
    width: 100%;
  }
`

const FormContainer = styled.div`
& > * {
  margin: 1rem;
}
  
`

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  const {
    variants: [initialVariant],
  } = product
  const [imageFluid, setImageFluid] = useState(initialVariant.image.localFile.childImageSharp.fluid)

  const {
    store: { checkout: { lineItems } },
  } = useContext(GlobalStateContext)

  return (
    <>
      <SEO title={product.title} description={product.description} />
      <Layout>
        <Link to='/products'>{'<<< Back To Store'}</Link>
        <Container>
          <ImgContainer>
            <Img
                fluid={imageFluid}
                key={product.images[0].id}
                alt={product.title}
              />
          </ImgContainer>
          <FormContainer>
            <div>{product.title}</div>
            <ProductForm product={product} setImageFluid={setImageFluid} />
          </FormContainer>
          <Link to='/cart'>View Cart {lineItems.length}</Link>
        </Container>
      </Layout>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
        image {
          localFile {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
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
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`

export default ProductPage