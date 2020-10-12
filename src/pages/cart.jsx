import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { StoreContext } from '../context/StoreContextProvider'



import LineItem from '../components/cart/line-item'

const Container = styled.div`
  color: white;
  width: 95%;
  margin: 0 auto;

  #lineItems {
    border-top: 1px solid #C00A0A;
  }
`

const Subtotal = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-right: 1rem;
  }
`

const CheckoutLink = styled.a`
  display: block;
  background: #C00A0A;
  padding: .8rem 0;
  margin-bottom: 2rem;
  text-align: center;
  border-radius: 5px;
  max-width: 300px;
`

const StyledLink = styled(Link)`
    display: block;
    text-align: center;
    border: 1px solid white;
    border-radius: 5px;
    padding: 10px 0;
    margin: 2rem 0;
    max-width: 300px;
`

const Cart = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const totalQuantity = checkout.lineItems.reduce((acc, cv) => acc + cv.quantity, 0)

  const lineItems = checkout.lineItems.map(item => (
    <LineItem key={item.id.toString()} item={item} />
  ))

  return (
      <Container>
        <Subtotal>
          <p>{`Subtotal (${totalQuantity} ${totalQuantity > 1 ? 'items' : 'item'}): `}</p>
          <h4>$ {checkout.subtotalPrice}</h4>
        </Subtotal>
        {checkout.lineItems.length === 0 
          ? 
          'Your Cart is empty' 
          : 
          <CheckoutLink href={checkout.webUrl}>Proceed to checkout</CheckoutLink>
          }
        <div id='lineItems'>
          {lineItems}
        </div>
        <StyledLink to='/shop'>Continue Shopping</StyledLink>
      </Container>
  )
}

export default Cart