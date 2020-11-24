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
  width: ${props => props.isFeature ? '100%' : '60vw'};
  max-width: ${props => props.isFeature ? '900px' : '300px'};
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

const ProductListingItem = ({ product, isSingleItem, className, isFeature, showThumbs }) => {
  const [index, setIndex] = useState(0);

  const price = Intl.NumberFormat(undefined, {
    currency: product.priceRange.minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(product.priceRange.minVariantPrice.amount)

  const images = product.images.map((variant, ind) => (
        <ImgLink
            to={`/shop/${product.handle}`}
            hidden={index !== ind}
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
        isFeature={isFeature}>
        <ImgContainer>
            {images}
        </ImgContainer>
        {showThumbs ?
          <ThumbnailContainer>
            {product.thumbs.map((variant, ind) => (
              <Thumbnail onClick={() => setIndex(ind)}>
                <Img 
                    fixed={variant.localFile.childImageSharp.fixed} 
                    alt={product.title}
                />
              </Thumbnail>
          ))}
          </ThumbnailContainer>
        : null }
        <Link to={`/shop/${product.handle}`}>
          <h3>{product.title}{" - "}{price}</h3>
        </Link>
      </ProductContainer>
  )
}


export default ProductListingItem

