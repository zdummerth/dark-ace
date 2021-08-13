import React, { useState } from 'react'
import { graphql, Link, navigate } from 'gatsby'
import Img from 'gatsby-image'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import styled from 'styled-components'
import { colors, breakpoints, spacing, Subtitle, DarkBrandButton } from '../utils/styles'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useCheckout } from '../hooks/useCheckout'

import ProductForm from '../components/products/product-form'
import GiftCard from '../components/products/GiftCard'

import Price from '../components/products/Price'
import SEO from '../components/seo'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 95%;
  // padding: 0 5px;

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
  height: 50vh;

  @media (min-width: ${breakpoints.tablet}) {
    height: 60vh;
  }

  @media (min-width: ${breakpoints.tablet}) {
    height: 70vh;
  }

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
  // min-width: 300px;
  display: flex;
  flex-direction: column;
  // align-items: center;

  @media (min-width: ${breakpoints.desktop}) {
    margin-left: 15px;
  }
`
const StyledPrice = styled(Price)`
  margin-top: 10px;
  margin-bottom: 10px;
`
const FormContainer = styled.div`
  // width: 100%;
  padding: ${spacing.sm};
  margin-bottom: 30px;
  margin-top: 30px;

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
  align-self: center;
  margin-top: 30px;
`

const BackLink = styled(Link)`
  margin: 10px;
`
const Thumbnails = ({ imgWithOption, handleClick }) => {
  return (
    <ThumbnailContainer>
      {imgWithOption.map(opt => (
        <Thumbnail
          key={opt.imageId}
          onClick={() => handleClick(opt)}
          //Default button type is submit, so this prevents click from submitting form
          type='button'
        >
          <Img
            fixed={opt.thumb}
            alt={'Thumbnail for Product'}
          />
        </Thumbnail>
      ))}
    </ThumbnailContainer>
  )
}

const ProductPage = ({ data, location }) => {
  // console.log({ location })
  const product = data.shopifyProduct
  const {
    thumbs,
    fulls,
    variants
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

  // console.log('the current variant', variant)

  const [imageFluid, setImageFluid] = useState(variant.image.localFile.childImageSharp.fluid)


  const handleOptionClick = (name, value, isImage) => {
    const currentOptions = [...variant.selectedOptions]

    const index = currentOptions.findIndex(opt => opt.name === name)

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }

    const selectedVariant = find(variants, ({ selectedOptions }) =>
      isEqual(currentOptions, selectedOptions)
    )

    setVariant(selectedVariant)

    if (isImage) {
      setImageFluid(selectedVariant.image.localFile.childImageSharp.fluid)
    }
  }


  const attachOptionsToImages = () => {
    const imgWithOption = []
    fulls.forEach(fullImg => {
      const variantForImg = variants.find(v => v.image.id === fullImg.id)

      if (variantForImg) {
        const colorOption = variantForImg.selectedOptions.find(opt => opt.name === 'Color')

        if (!colorOption) {
          const newThumb = thumbs.find(t => t.id === fullImg.id)
          const newOption = {
            imageId: fullImg.id,
            thumb: newThumb.localFile.childImageSharp.fixed
          }
          imgWithOption.push(newOption)
        } else {
          const newThumb = thumbs.find(t => t.id === fullImg.id)
          const optionWithImage = {
            ...colorOption,
            imageId: fullImg.id,
            thumb: newThumb.localFile.childImageSharp.fixed
          }
          imgWithOption.push(optionWithImage)
        }
      } else {
        const newThumb = thumbs.find(t => t.id === fullImg.id)
        const newOption = {
          imageId: fullImg.id,
          thumb: newThumb.localFile.childImageSharp.fixed
        }
        imgWithOption.push(newOption)
      }
    })

    return imgWithOption
  }

  const imgWithOption = attachOptionsToImages()
  const variantImgWithOption = imgWithOption.filter(opt => opt.name && opt.value)

  const handleThumbClick = ({ imageId, name, value }) => {
    if (name && value) {
      handleOptionClick(name, value, true)
    } else {
      const fullImg = fulls.find(f => f.id === imageId)
      setImageFluid(fullImg.localFile.childImageSharp.fluid)
    }
  }

  const isPreOrder = product.tags.includes('pre-order');


  return (
    <>
      <SEO title={product.title} description={product.description} />
      <BackLink to='/shop/collection/featured'>
        <DarkBrandButton>
          <AiOutlineArrowLeft size={18} />
        </DarkBrandButton>
      </BackLink>
      <Container>
        <ImagesWrapper>
          <ImgContainer>
            <Img
              fluid={imageFluid}
              alt={product.title}
              style={{
                height: '100%',
                width: '100%'
              }}
              imgStyle={{
                objectFit: 'scale-down'
              }}
            />
          </ImgContainer>
          {(thumbs.length > 1 && thumbs.length < 6) &&
            <Thumbnails imgWithOption={imgWithOption} handleClick={handleThumbClick} />
          }
        </ImagesWrapper>
        <InfoWrapper>
          <div style={{ height: '10px' }} />

          <Subtitle>{product.title}</Subtitle>

          {/* {isPreOrder ? <h2>This Is A Pre-Order Item</h2> : null} */}
          <div style={{ height: '10px' }} />
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
              handleThumbClick={handleThumbClick}
              imgWithOption={variantImgWithOption}
            />

          </FormContainer>
          <GiftCard />
          <StyledLink to='/shop/collection/featured'>
            <DarkBrandButton>
              View All Products
            </DarkBrandButton>
          </StyledLink>

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