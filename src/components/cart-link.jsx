import React, { useContext } from "react"
import styled from 'styled-components'
import { Link } from 'gatsby'
import { RiShoppingCartLine } from 'react-icons/ri';

import { StoreContext } from '../context/StoreContextProvider'


const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #C00A0A;

  @media (min-width: 900px) {
    display: none;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;

  :hover {
    cursor: pointer;
  }
`

const TotalItems = styled.span`
  // font-size: 1.4rem;
  // color: white;
`

const CartIcon = styled(RiShoppingCartLine)`
  font-size: 1.7rem;
  margin-right: .3rem;
`


const CartLink = ({children, useIcon}) => {
  const {
    store: { checkout: { lineItems } },
  } = useContext(StoreContext)
  
  const totalQuantity = lineItems.reduce((acc, cv) => acc + cv.quantity, 0)

  return (
    <>
      <StyledLink to='/cart'>
        {children}
        <Container>
          {useIcon ? <CartIcon /> : null}
          (<TotalItems>{totalQuantity}</TotalItems>)
        </Container>
      </StyledLink>
  </>
  )
}

export default CartLink

