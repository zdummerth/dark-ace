import React, { useContext } from "react"
import styled from 'styled-components'
import { Link } from 'gatsby'
import { RiShoppingCartLine } from 'react-icons/ri';

import { StoreContext } from '../../context/StoreContextProvider'

import { breakpoints, colors } from '../../utils/styles';



const CartWrapper = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  position: relative;
  font-size: 1.75rem;
  color: ${colors.brand};



  span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.lightest};

    position: absolute;
    top: 10px;
    left: 17px;

    background-image: ${colors.gradient});
    border-radius: 50%;
    box-shadow: 0 0 5px  ${colors.lightest};
    font-size: 1.1rem;
    width: 22px;
    height: 22px;

  }

  @media (max-width: ${breakpoints.desktop}) {
    display: flex;
  }

`


const CartLink = () => {
  const {
    store: { checkout: { lineItems } },
  } = useContext(StoreContext)
  
  const totalQuantity = lineItems.reduce((acc, cv) => acc + cv.quantity, 0)

  return (
    <>
      <Link to='/cart'>
        <CartWrapper>
          <span>{totalQuantity}</span>
          <RiShoppingCartLine />
        </CartWrapper>
      </Link>

  </>
  )
}

export default CartLink

