import React, { useState } from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import Img from 'gatsby-image'

import { breakpoints, colors } from '../../utils/styles';


const ProductContainer = styled.div`
  margin: 0 1rem;
  text-align: center; 
  // flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  border-bottom: 1px solid ${colors.brand};

  @media (max-width: ${breakpoints.tablet}) {
    &:last-child {
        padding-right: ${props => props.isSingleItem ? '0' : '2rem'};
      }
  }
`

const ImgContainer = styled.div`
  width: 60vw;
  max-width: inherit;
`

const ThumbnailContainer = styled.div`  
  // display: flex;
  // justify-content: center;
  // align-items: center;
  margin-top: 5px;
`

const Thumbnail = styled.button`
    margin-right: 8px;
    width: 48px;
    height: 60px;
    border: none;
    outline: 0;
    background: none;
`

const ImgLink = styled(Link)`
  display: ${props => props.visible ? 'block' : 'none'};
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

const ProductListingItem = ({ product, isSingleItem }) => {
  const [index, setIndex] = useState(0);

  const price = Intl.NumberFormat(undefined, {
    currency: product.priceRange.minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(product.priceRange.minVariantPrice.amount)

  const images = product.images.map((variant, ind) => (
        <ImgLink
            to={`/shop/${product.handle}`}
            visible={index === ind}
        >
            <Img 
                fluid={variant.localFile.childImageSharp.fluid} 
                alt={product.title}
            />
        </ImgLink>
  ))

  return (
      <ProductContainer key={product.shopifyId} isSingleItem={isSingleItem}>
        <ImgContainer>
            {images}
        </ImgContainer>
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
        <Link to={`/shop/${product.handle}`}>
          <h3>{product.title}{" - "}{price}</h3>
        </Link>
      </ProductContainer>
  )
}


export default ProductListingItem

