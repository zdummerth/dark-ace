import React, { useContext } from "react"
import styled from 'styled-components'
import { Link } from 'gatsby'
import { RiShoppingCartLine } from 'react-icons/ri';

import { StoreContext } from '../../context/StoreContextProvider'

import { breakpoints } from '../../utils/styles';



const StyledLink = styled(Link)`
  display: none;

  @media (max-width: ${breakpoints.desktop}) {
    display: flex;
    align-items: center;
    color: #C00A0A;
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

const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  position: relative;
  font-size: 1.75rem;


  span {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 10px;
    left: 17px;

    background-color: ${colors.brand};
    border-radius: 50%;
    font-size: 1rem;
    width: 22px;
    height: 22px;

  }

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

