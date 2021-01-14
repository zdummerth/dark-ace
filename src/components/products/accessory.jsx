import React, { useState, useContext } from 'react'
import { StoreContext } from '../../context/StoreContextProvider'
import { useCheckout } from '../../hooks/useCheckout'


import styled from 'styled-components'
import Img from 'gatsby-image'

import { AiOutlinePlusCircle } from 'react-icons/ai';
import { AiOutlineMinusCircle } from 'react-icons/ai';

import { breakpoints, colors } from '../../utils/styles';
import { formatPrice } from '../../utils/helpers';
import { StyledButton } from '../shared/buttons'



const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  align-self: center;
  margin: 20px;
  text-align: left;

  border-bottom: 1px solid ${colors.brand};


  width: 70vw;
  max-width: 300px;

  & > * {
    margin-top: 10px;
    margin-bottom: 10px;
}
`

const ImgContainer = styled.div`
width: 70vw;
max-width: 300px;
height: 250px;
position: relative;
overflow: hidden;



  @media (max-width: ${breakpoints.tablet}) {}

  // .gatsby-image-wrapper {}
`

const ButtonContainer = styled.div`
  // display: flex;
  
  align-items: center;
  justify-content: space-between;
  width: 100%;



`

const QuantityContainer = styled.div`
    display: flex;
    align-items: center;
    // justify-content: space-between;
    margin-bottom: 10px;

    & button {
        border: none;
        background: none;
        color: white;
    }

    & > * {
        // font-size: 24px;
        // font-weight: bold;
        padding-right: 8px;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    h3 {
      margin: 0;
    }


`



const Accessory = ({ product }) => {

  const {
    variant,
    quantity,
    adding,
    available,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    setVariant,
  } = useCheckout(product)

  const { images, title } = product;

  
  return (
      <ProductContainer>
        <ImgContainer>
          <Img 
            fluid={images[0].localFile.childImageSharp.fluid} 
            alt={'Gift Card'}
          />
        </ImgContainer>
        <h3>{title}</h3>
        <h3>{formatPrice(variant.priceV2)}</h3>
        {available ? 
          (<ButtonContainer>
            <QuantityContainer>
                <h3>Quantity:</h3>
                <button onClick={decreaseQuantity}>
                    <AiOutlineMinusCircle /> 
                </button>
                <p>{quantity}</p> 
                <button onClick={increaseQuantity}>
                    <AiOutlinePlusCircle />
                </button>
            </QuantityContainer>
            <StyledButton onClick={addToCart}>Add To Cart</StyledButton>
          </ButtonContainer>) : (
            <div>Sold Out</div>
          )
        }
      </ProductContainer>
  )
}


export default Accessory

