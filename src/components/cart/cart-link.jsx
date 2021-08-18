import React, { useContext } from "react"
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Cart } from '@styled-icons/boxicons-regular'

import { StoreContext } from 'src/context/StoreContextProvider'

import { breakpoints, colors } from 'src/styles';



const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // padding: 20px 0;

  //This margin offsets the quantity which is shifted 17px
  // margin-right: 17px;

  position: relative;
  // font-size: 1.75rem;
  // color: ${colors.brand};



  span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.lightest};

    position: absolute;
    bottom: 13px;
    left: 20px;

    background-image: ${colors.gradient};
    border-radius: 50%;
    box-shadow: 0 0 5px  ${colors.brand};
    font-size: 1.1rem;
    width: 22px;
    height: 22px;
  }

  // @media (max-width: ${breakpoints.desktop}) {
  //   display: flex;
  // }

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
          {totalQuantity > 0 && <span>{totalQuantity}</span>}
          {/* <span>{totalQuantity}</span> */}
          <Cart size='28' />
        </CartWrapper>
      </Link>

    </>
  )
}

export default CartLink

