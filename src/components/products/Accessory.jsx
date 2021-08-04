import React from 'react'
import { useCheckout } from '../../hooks/useCheckout'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { formatPrice } from '../../utils/helpers';
import { colors, spacing, BrandButton } from '../../utils/styles'
import Flex from '../Flexbox'

import Quantity from './quantity'



const ProductWrapper = styled.div`
  display: flex;
  // flex-direction: column;
  border: 1px solid ${colors.gray};
  padding: 5px;
  height: 120px;
`
const TextWrapper = styled(Flex)`
  width: 70%;
  padding-left: 5px;
`

const ImageWrapper = styled.div`
  align-self: center;
  width: 30%;
  height: 100%;
  // overflow: hidden;

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
      <ImageWrapper>
        <Img
          fluid={images[0].localFile.childImageSharp.fluid}
          alt={title}
          style={{
            height: '100%',
            width: '100%'
          }}
          imgStyle={{
            objectFit: 'contain'
          }}
        />
      </ImageWrapper>
      <TextWrapper dir='column' ai='stretch' jc='space-between'>
        {available ?
          (<>
            <div>{product.title}</div>

            <Quantity
              quantity={quantity}
              increase={increaseQuantity}
              decrease={decreaseQuantity}
            />
            <Flex ai='center' jc='space-around'>
              <p>{formatPrice(variant.priceV2)}</p>
              <BrandButton onClick={addToCart}>Add To Cart</BrandButton>
            </Flex>

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

