import React, { useContext } from "react"
import styled from 'styled-components'
import { Link } from 'gatsby'
import { GiShoppingCart } from 'react-icons/gi';

import { GlobalStateContext } from '../context/GlobalContextProvider'


const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
`

const Span = styled.span`
  margin-left: 5px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  // align-self: flex-end;
  width: 50px;
  height: 50px;
  color: white;
  background: #C00A0A;
  border-radius: 50%;
  padding: .8rem;
  margin: 1rem 0;
  font-size: 1.5rem;

  :hover {
    cursor: pointer;
    background: red;
  }
`

const TotalItems = styled.span`
  font-size: 1.2rem;
`

const CartIcon = styled(GiShoppingCart)`
  font-size: 2rem;
  margin-right: .3rem;
`


const CartLink = () => {
  const {
    store: { checkout: { lineItems } },
  } = useContext(GlobalStateContext)
  
  const totalQuantity = lineItems.reduce((acc, cv) => acc + cv.quantity, 0)

  return (
    <>
    {totalQuantity > 0 ? 
      <StyledLink to='/cart'>
        <Container>
          <CartIcon/>
          <TotalItems>{totalQuantity}</TotalItems>
        </Container>
        <Span>View Cart</Span>
      </StyledLink>
      :
      <></>
    }
  </>
  )
}

export default CartLink

