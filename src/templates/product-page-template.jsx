import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'


import ProductForm from '../components/products/product-form'

import SEO from '../components/seo'

const Title = styled.h1`
  margin: 1rem auto;
  color: white;
  width: 90%;
`

const Subtitle = styled.h2`
  margin: 1rem auto;
  color: white;
  width: 90%;
`

const Container = styled.div`
  display: flex;
  // align-items: center;
  margin: 3rem auto;
  color: white;
  width: 90%;

  .hidden {
    display: none;
  }
  @media (max-width: 1000px) {
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
  // height: 100%;
  width: 100%;
  & > * {
    margin: .75rem;
  }
  
`
const ThumbnailContainer = styled.div`  
  margin-top: 5px;
`
const Thumbnail = styled.button`
    margin-right: 8px;
    width: 48px;
    height: 60px;
    border: 0;
    outline: 0;
    background: none;
    :focus {outline:none;}
    ::-moz-focus-inner {border:0;}
`

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  const {
    variants: [initialVariant],
    thumbs,
    fulls,
    productType
  } = product

  const [imageFluid, setImageFluid] = useState(initialVariant.image.localFile.childImageSharp.fluid)
  const [index, setIndex] = useState(0);


  const isPreOrder = product.tags.includes('pre-order');
  const isPolo = productType === 'polo'

  const imagesTags = fulls.map((variant, ind) => (
    <div>
        <Img 
            fluid={variant.localFile.childImageSharp.fluid} 
            alt={product.title}
            className={index !== ind ? 'hidden': ''}
        />
    </div>
))

  const thumbnails = (
    <ThumbnailContainer>
      {thumbs.map((variant, ind) => (
        <Thumbnail onClick={() => setIndex(ind)}>
          <Img 
              fixed={variant.localFile.childImageSharp.fixed} 
              alt={product.title}
          />
        </Thumbnail>
    ))}
    </ThumbnailContainer>
  ) 

  const imageDisplay = isPolo ? imagesTags 
    :
    ( <Img
        fluid={imageFluid}
        key={product.thumbs[0].id}
        alt={product.title}
      />)


  return (
    <>
      <SEO title={product.title} description={product.description} />
        <Title>{product.title}</Title>
        {isPreOrder ? <Subtitle>This is a pre order item</Subtitle> : null}
        <Container>
          <ImgContainer>
            {imageDisplay}
          </ImgContainer>
          { isPolo ? thumbnails : null }
          <FormContainer>
            <ProductForm 
              product={product} 
              setImageFluid={setImageFluid}
            />
            <div dangerouslySetInnerHTML={{__html: product.descriptionHtml}}/>
          </FormContainer>
        </Container>
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
      tags
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
      thumbs: images {
        localFile {
          childImageSharp {
            fixed(height: 60, width: 48) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      fulls: images {
        localFile {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default ProductPage