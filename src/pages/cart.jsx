import React, { useContext } from 'react'
import styled from 'styled-components'
import { StoreContext } from 'src/context/StoreContextProvider'
import ProductNav from 'src/components/layout/productCollectionNavigation'
import LineItem from 'src/components/cart/line-item'

// import Suggestions from '../components/cart/Suggestions'

import { colors } from 'src/styles'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  #lineItems {
    // border-top: 1px solid #C00A0A;
  }
`

const Subtotal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;


  p {
    margin-right: 1rem;
  }
`

const CheckoutLink = styled.a`
  display: block;
  background: ${colors.gradient};
  box-shadow: 0 0 5px ${colors.brand};
  padding: 10px;
  margin-bottom: 2rem;
  text-align: center;
  border-radius: 5px;
  max-width: 300px;
`

const Italic = styled.i`
  display: block;
  padding-bottom: 25px;
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
      {/* <Suggestions /> */}
      <Subtotal>
        <p>{`Subtotal (${totalQuantity} ${totalQuantity > 1 ? 'items' : 'item'}): `}</p>
        <h4>$ {checkout.subtotalPrice}</h4>
      </Subtotal>
      <Italic>taxes and shipping calculated at checkout</Italic>

      {checkout.lineItems.length === 0
        ?
        <>
          <p>
            Your Cart Is Empty
          </p>
          <p>
            Please Select A Category
          </p>
          <ProductNav />

        </>
        :
        <>
          <CheckoutLink href={checkout.webUrl}>Proceed to checkout</CheckoutLink>
          {/* <p style={{ textAlign: 'center', width: '90%'}}>If your cart contains a pre-order item, all items will be shipped with the pre-order</p> */}
        </>
      }
      <div id='lineItems'>
        {lineItems}
      </div>
    </Container>
  )
}


export default Cart