import React from 'react'
import { useCheckout } from '../../hooks/useCheckout'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { formatPrice } from '../../utils/helpers';
import { colors, BrandButton } from '../../utils/styles';

import Quantity from './quantity'



const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;


  margin: 15px;
  border-bottom: 1px solid ${colors.gray};

  width: 70vw;
  max-width: 300px;

  .gatsby-image-wrapper {
    height: 300px;
    width: inherit;
    max-width: inherit;
  }

`


const TextWrapper = styled.div`
  padding-right: 15px;
  padding-left: 15px;



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



const Accessory = ({ product }) => {

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
      <ProductWrapper>
        <Img 
          fluid={images[0].localFile.childImageSharp.fluid} 
          alt={title}
          imgStyle={{
            // objectFit: 'contain',
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

