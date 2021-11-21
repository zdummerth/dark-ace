import React, { useContext } from "react"
import styled from 'styled-components'
import { Cart } from '@styled-icons/boxicons-regular'

import { StoreContext } from 'src/context/StoreContextProvider'

import { colors } from 'src/styles';



const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;


  span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.lightest};

    position: absolute;
    bottom: 5px;
    left: 20px;

    background-image: ${colors.gradient};
    border-radius: 50%;
    box-shadow: 0 0 5px  ${colors.brand};
    // font-size: 1.1rem;
    width: 20px;
    height: 20px;
  }
`


const CartLink = () => {
  const {
    store: { checkout: { lineItems } },
  } = useContext(StoreContext)

  const totalQuantity = lineItems.reduce((acc, cv) => acc + cv.quantity, 0)

  return (
    <CartWrapper>
      {totalQuantity > 0 && <span>{totalQuantity}</span>}
      <Cart size='22' />
    </CartWrapper>
  )
}

export default CartLink

