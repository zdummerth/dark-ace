import React, { useState } from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import Img from 'gatsby-image'

import { breakpoints, colors } from '../../utils/styles';


const ProductContainer = styled.div`
  margin: ${props => props.isFeature ? '0' : '1rem'};;
  text-align: center; 
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${props => props.isFeature ? '80%' : '60vw'};
  max-width: ${props => props.isFeature ? '300px' : '300px'};
  border-bottom: 1px solid ${colors.brand};

  @media (max-width: ${breakpoints.tablet}) {
    &:last-child {
        padding-right: ${props => props.isSingleItem ? '0' : '2rem'};
      }
  }
`

const ImgContainer = styled.div`
  width: inherit;
  max-width: inherit;
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

const ImgLink = styled(Link)`
  display: ${props => props.hidden ? 'none' : 'block'};
  overflow: hidden;
  position: relative;

  .gatsby-image-wrapper {
    transition: all 250ms;
  }

  @media (hover: hover) {
    ${ImgContainer}:hover & {
      .gatsby-image-wrapper {
        transform: scale(1.1);
      }
    }
  }
`

const CompareAtPriceWrapper = styled.div`
  display: flex;
  align-items: center;
`
const CompareAtPrice = styled.div`
  position: relative;
  // font-size: 1.75rem;
  margin-right: 20px;

  .line-through {
    position: absolute;
    border-top: 2px solid ${colors.brand};
    width: 100%;
    transform: rotate(-10deg);
    top: 50%;
  }
`

const NewPrice = styled.div`
  -webkit-text-stroke: 1px ${colors.brand};
  font-size: 2.5rem;
  font-weight: bold;
  color: ${colors.lightest};
  text-shadow:
  -1px -1px 0 ${colors.brand},  
  1px -1px 0 ${colors.brand},
  -1px 1px 0 ${colors.brand},
    1px 1px 6px ${colors.lightest};
`

const ProductListingItem = ({ product, isSingleItem, className, isFeature, showThumbs, isGiftCard }) => {
  const [index, setIndex] = useState(0);

  const minPrice = Intl.NumberFormat(undefined, {
    currency: product.priceRange.minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(product.priceRange.minVariantPrice.amount)

  const maxPrice = Intl.NumberFormat(undefined, {
    currency: product.priceRange.minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(product.priceRange.maxVariantPrice.amount);

  const price = isGiftCard ? `${minPrice} - ${maxPrice}` : minPrice;

  const compareAtPrice = product.variants[0].compareAtPrice ? (
    Intl.NumberFormat(undefined, {
      currency: product.priceRange.minVariantPrice.currencyCode,
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(product.variants[0].compareAtPrice)
  ) : (
    null
  )

  const priceDisplay = compareAtPrice ? (
    <>
      <CompareAtPriceWrapper>
        <CompareAtPrice>
          <div>{compareAtPrice}</div>
          <div className="line-through"></div>
        </CompareAtPrice>
        <NewPrice>{price}</NewPrice>
      </CompareAtPriceWrapper>
    </>
  ) : (
    <div className="price">{price}</div>
  )

  const images = product.images.map((variant, ind) => (
        <ImgLink
            to={`/shop/${product.handle}`}
            hidden={index !== ind}
            key={variant.id}
        >
            <Img 
                fluid={variant.localFile.childImageSharp.fluid} 
                alt={product.title}
            />
        </ImgLink>
  ))

  return (
      <ProductContainer 
        className={className} 
        key={product.shopifyId} 
        isSingleItem={isSingleItem}
        isFeature={isFeature}
      >
        <ImgContainer>
            {images}
        </ImgContainer>
        {showThumbs ?
          <ThumbnailContainer>
            {product.thumbs.map((variant, ind) => (
              <Thumbnail key={variant.id} onClick={() => setIndex(ind)}>
                <Img 
                    fixed={variant.localFile.childImageSharp.fixed} 
                    alt={product.title}
                />
              </Thumbnail>
          ))}
          </ThumbnailContainer>
        : null }
        <Link to={`/shop/${product.handle}`}>
          <h3>{product.title}</h3>
          <h3>{priceDisplay}</h3>
        </Link>
      </ProductContainer>
  )
}


export default ProductListingItem

