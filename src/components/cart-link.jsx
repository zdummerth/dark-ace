import React, { useContext } from "react"
import styled from 'styled-components'
import { Link } from 'gatsby'
import { RiShoppingCartLine } from 'react-icons/ri';

import { GlobalStateContext } from '../context/GlobalContextProvider'


const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  @media (min-width: 900px) {
    display: none;
  }
`

const Span = styled.span`
  margin-left: 5px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;

  :hover {
    cursor: pointer;
    background: red;
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
  } = useContext(GlobalStateContext)
  
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

