import React, { useState, useContext } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { GlobalStateContext } from '../context/GlobalContextProvider'


import Layout from '../components/layout'
import ProductForm from '../components/product-form'

import SEO from '../components/seo'

const Container = styled.div`
  display: flex;
  // align-items: center;
  margin: 3rem 0;
  color: white;
  width: 100%;
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
  }


`
const ImgContainer = styled.div`
  // flex: 0 1 80%;
  width: 100%;
  max-width: 600px;
  min-width: 300px;
`

const FormContainer = styled.div`
  height: 100%;
  width: 90%;
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

  const totalQuantity = lineItems.reduce((acc, cv) => acc + cv.quantity, 0)


  return (
    <>
      <SEO title={product.title} description={product.description} />
      <Layout>
        <Container>
          <ImgContainer>
            <Img
                fluid={imageFluid}
                key={product.images[0].id}
                alt={product.title}
              />
          </ImgContainer>
          <FormContainer>
            <h3>{product.title}</h3>
            <ProductForm product={product} setImageFluid={setImageFluid} />
          </FormContainer>
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