import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { GlobalStateContext } from '../context/GlobalContextProvider'
import styled from 'styled-components'


import Layout from '../components/layout'

import LineItem from '../components/line-item'

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
`

const StyledLink = styled(Link)`
    display: block;
    text-align: center;
    border: 1px solid white;
    border-radius: 5px;
    padding: 10px 0;
    margin: 2rem 0;
`

const Cart = () => {
  const {
    store: { checkout },
  } = useContext(GlobalStateContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const totalQuantity = checkout.lineItems.reduce((acc, cv) => acc + cv.quantity, 0)

  const lineItems = checkout.lineItems.map(item => (
    <LineItem key={item.id.toString()} item={item} />
  ))

  return (
    <Layout>
      <Container>
        <Subtotal>
          <p>{`Subtotal (${totalQuantity} ${totalQuantity > 1 ? 'items' : 'item'}): `}</p>
          <h4>$ {checkout.subtotalPrice}</h4>
        </Subtotal>
        <CheckoutLink href={checkout.webUrl}>Proceed to checkout</CheckoutLink>
        <div id='lineItems'>
          {lineItems}
        </div>
        {/* <h3>Taxes</h3>
        <p>$ {checkout.totalTax}</p>
        <h3>Total</h3>
        <p>$ {checkout.totalPrice}</p>
        <button
          onClick={handleCheckout}
          disabled={checkout.lineItems.length === 0}
        >
          Check out
        </button> */}
        <StyledLink to='/products'>Continue Shopping</StyledLink>
      </Container>
    </Layout>
  )
}

export default Cart