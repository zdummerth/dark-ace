import React from 'react'
import { useCheckout } from '../../hooks/useCheckout'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { formatPrice } from '../../utils/helpers';
import { colors, spacing, BrandButton } from '../../utils/styles';

import Quantity from './quantity'



const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 300px;
  margin: 15px;
  border: 1px solid ${colors.gray};

  .gatsby-image-wrapper {
    height: 400px;
  }

`
const TextWrapper = styled.div`

  background: ${colors.grayGradient};

  padding-right: ${spacing.sm};
  padding-left: ${spacing.sm};
  & > * {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`

const PriceAndCartWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`



const Accessory = ({ product, style }) => {

  const {
    variant,
    quantity,
    available,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
  } = useCheckout(product)

  const { images, title } = product;

  
  return (
      <ProductWrapper style={style}>
        <Img 
          fluid={images[0].localFile.childImageSharp.fluid} 
          alt={title}
          imgStyle={{
            objectFit: 'contain',
          }}
        />
        <TextWrapper>
          <h3>{title}</h3>
          {available ? 
            (<>
              <Quantity
                quantity={quantity}
                increase={increaseQuantity}
                decrease={decreaseQuantity}
              />
              <PriceAndCartWrapper>
                <BrandButton onClick={addToCart}>Add To Cart</BrandButton>
                <h3>{formatPrice(variant.priceV2)}</h3>
              </PriceAndCartWrapper>
            </>
            ) : (
              <div>Sold Out!!</div>
            )
          }
        </TextWrapper>
      </ProductWrapper>
  )
}

export default Accessory

