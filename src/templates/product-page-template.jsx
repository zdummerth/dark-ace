import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
// import { colors } from '../utils/styles'
import styled from 'styled-components'
import { colors, breakpoints } from '../utils/styles'

import { useCheckout } from '../hooks/useCheckout'

import ProductForm from '../components/products/product-form'
import Price from '../components/products/Price'
import SEO from '../components/seo'


const Title = styled.h1`
  text-align: center;
`
const Subtitle = styled.h2`
  margin: 1rem auto;
  color: white;
  width: 90%;
  text-align: center;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem auto;
  width: 90%;

  .hidden {
    display: none;
  }
  @media (min-width: ${breakpoints.desktop}) {
    flex-direction: row;
    align-items: flex-start;
  }
`
const ImgContainer = styled.div`
  width: 100%;
`
const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`
const InfoWrapper = styled.div`
  max-width: 400px;

  @media (min-width: ${breakpoints.desktop}) {
    margin-left: 15px;
  }
`
const StyledPrice = styled(Price)`
  margin-top: 10px;
  margin-bottom: 10px;
`
const FormContainer = styled.div`
  width: 100%;
  margin-bottom: 30px;
  & > * {
    margin: .75rem;
  }

  border: 2px solid ${colors.gray};
  background: ${colors.grayGradient};
  
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
const StyledLink = styled(Link)`
    text-align: center;
    background: ${colors.darkGradient};
    box-shadow: 0 0 5px ${colors.brand};
    border-radius: 5px;
    padding: 10px;
`

const Thumbnails = ({ thumbs, handleClick }) => {
  return (
    <ThumbnailContainer>
      {thumbs.map(t => (
        <Thumbnail
          key={t.id}
          onClick={() => handleClick(t)}
          //Default button type is submit, so this prevents click from submitting form
          type='button'
        >
          <Img
            fixed={t.localFile.childImageSharp.fixed}
            alt={'Thumbnail for Product'}
          />
        </Thumbnail>
      ))}
    </ThumbnailContainer>
  )
}

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  const {
    thumbs,
    fulls,
  } = product

  const {
    variant,
    quantity,
    available,
    status,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    setVariant
  } = useCheckout(product)


  const [imageFluid, setImageFluid] = useState(variant.image.localFile.childImageSharp.fluid)


  const handleThumbClick = img => {
    const fullImage = fulls.find(full => full.id === img.id)
    setImageFluid(fullImage.localFile.childImageSharp.fluid)
  }

  const isPreOrder = product.tags.includes('pre-order');


  return (
    <>
      <SEO title={product.title} description={product.description} />
      <Container>
        <ImagesWrapper>
          <ImgContainer>
            <Img
              fluid={imageFluid}
              alt={product.title}
              imgStyle={{
                objectFit: 'contain',
              }}
            />
          </ImgContainer>
          <Thumbnails thumbs={thumbs} handleClick={handleThumbClick} />
        </ImagesWrapper>
        <InfoWrapper>
          <Title>{product.title}</Title>
          {isPreOrder ? <Subtitle>This Is A Pre-Order Item</Subtitle> : null}
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          <FormContainer>
            <StyledPrice
              price={variant.priceV2}
              compareAtPrice={variant.compareAtPriceV2}
            />
            <ProductForm
              product={product}
              variant={variant}
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              available={available}
              status={status}
              addToCart={addToCart}
              setImageFluid={setImageFluid}
              setVariant={setVariant}
              thumbs={thumbs}
              fulls={fulls}
              Thumbnails={Thumbnails}
            />
          </FormContainer>
          <StyledLink to='/'>Continue Shopping</StyledLink>
        </InfoWrapper>
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
      availableForSale
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
        priceV2 {
          amount
          currencyCode
        }
        compareAtPriceV2 {
          amount
          currencyCode
        }
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
        image {
          id
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
        id
        localFile {
          childImageSharp {
            fixed(height: 60, width: 48) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
      fulls: images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default ProductPage