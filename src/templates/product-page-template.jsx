import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import styled from 'styled-components'
import { colors, breakpoints, Subtitle, dimensions } from 'src/styles'
// import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useCheckout } from 'src/hooks/useCheckout'
import ProductNav from 'src/components/layout/productCollectionNavigation'
import ProductForm from 'src/components/products/product-form'
import Flex from 'src/components/shared/Flexbox'

// import GiftCard from '../components/products/GiftCard'

import Seo from 'src/components/SEO'


const Container = styled(Flex)`
  width: 100%;
  margin-top: 30px;

  @media (min-width: ${breakpoints.desktop}) {
    position: relative;
    flex-direction: row;
    align-items: flex-start;
    // min-height: calc(100vh - ${dimensions.headerHeight});
  }
`

const ImgContainer = styled(Flex)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
const ImagesWrapper = styled(Flex)`
  height: 60vh;
  width: 100%;
  padding: 10px;
  border: 1px solid ${colors.gray};

  @media (min-width: ${breakpoints.desktop}) {
    height: 80vh;
    flex: 1;
  }
`
const InfoWrapper = styled.div`
  // max-width: 600px;
  display: flex;
  width: 100%;
  flex-direction: column;


  @media (min-width: ${breakpoints.desktop}) {
    margin-left: 15px;
    width: 500px;
  }
`
const StyledPrice = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
`

const ThumbnailContainer = styled.div`  
  margin-top: 5px;
  height: 60px;
`
const Thumbnail = styled.button`
    margin-right: 8px;
    border: 0;
    outline: 0;
    background: none;
    :focus {outline:none;}
    ::-moz-focus-inner {border:0;}
`

const Section = styled.section`
  background: ${colors.grayGradient};
  border: 1px solid ${colors.gray};
  // border-bottom: 1px solid ${colors.gray};
  padding: 10px;
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: ${breakpoints.desktop}) {
    &.top {
      margin-top: 0;
    }
  }
`

// const BackLink = styled(Link)`
//   margin: 10px;
// `
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
          <GatsbyImage
            image={opt.thumb}
            alt={'Thumbnail for Product'}
          />
        </Thumbnail>
      ))}
    </ThumbnailContainer>
  )
}

const ProductPage = ({ data }) => {
  // console.log({ data })
  const product = data.shopifyProduct
  const {
    thumbs,
    fulls,
    title,
  } = product

  console.log({ title })

  const variants = product.variants ? product.variants : []

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

  // console.log('the current product', product)

  const [imageFluid, setImageFluid] = useState(fulls[0].gatsbyImageData)


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
      setImageFluid(selectedVariant.image.gatsbyImageData)
    }
  }


  const attachOptionsToImages = () => {
    const imgWithOption = []
    // console.log('variants', variants)

    fulls.forEach(fullImg => {
      // console.log('full', fullImg)
      const variantForImg = variants.find(v => v.image?.id === fullImg.shopifyId)
      // console.log('variant for Img', variantForImg)


      if (variantForImg) {
        const colorOption = variantForImg.selectedOptions.find(opt => opt.name === 'Color')

        if (!colorOption) {
          const newThumb = thumbs.find(t => t.id === fullImg.id)
          const newOption = {
            imageId: fullImg.shopifyId,
            thumb: newThumb.gatsbyImageData
          }
          imgWithOption.push(newOption)
        } else {
          const newThumb = thumbs.find(t => t.id === fullImg.id)
          const optionWithImage = {
            ...colorOption,
            imageId: fullImg.shopifyId,
            thumb: newThumb.gatsbyImageData
          }
          imgWithOption.push(optionWithImage)
        }
      } else {
        const newThumb = thumbs.find(t => t.id === fullImg.id)
        const newOption = {
          imageId: fullImg.shopifyId,
          thumb: newThumb.gatsbyImageData
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
      const fullImg = fulls.find(f => f.shopifyId === imageId)
      setImageFluid(fullImg.gatsbyImageData)
    }
  }


  return (
    <>
      <Seo title={title} description={product.description} />
      {/* <BackLink to='/shop/collection/featured'>
        <DarkBrandButton>
          <AiOutlineArrowLeft size={18} />
        </DarkBrandButton>
      </BackLink> */}

      <Container dir='column'>
        <ImagesWrapper dir='column'>
          <ImgContainer>
            <GatsbyImage
              image={imageFluid}
              alt={title}
              style={{ height: '100%', width: '100%' }}
              objectFit={'contain'}
            />
          </ImgContainer>
          {(thumbs.length > 1 && thumbs.length < 6) &&
            <Thumbnails imgWithOption={imgWithOption} handleClick={handleThumbClick} />
          }
        </ImagesWrapper>
        <InfoWrapper>
          <Section className='top'>
            <Subtitle>{title}</Subtitle>
            <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
          </Section>
          <Section>
            <StyledPrice>
              ${variant.price}
            </StyledPrice>
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

          </Section>

          <Section>
            <ProductNav />
          </Section>
        </InfoWrapper>
      </Container>
    </>
  )
}

export const query = graphql`
  query($handle: String!) {
    shopifyProduct: shopifyProduct(handle: { eq: $handle }) {
      id
      storefrontId
      title
      handle
      totalInventory
      productType
      description
      descriptionHtml
      shopifyId
      tags
      fulls: images {
        id
        shopifyId
        gatsbyImageData(width: 800)
      }
      thumbs: images {
        id
        gatsbyImageData(width: 48, height: 60, layout: FIXED)
      }
      options {
        id
        name
        values
      }
      variants {
        id
        storefrontId
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
        image {
          id
          gatsbyImageData(width: 450)
        }
      }
    }
  }
`

export default ProductPage