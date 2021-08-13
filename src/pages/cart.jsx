import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { StoreContext } from '../context/StoreContextProvider'
import ProductNav from '../components/layout/productCollectionNavigation'
import LineItem from '../components/cart/line-item'
import Suggestions from '../components/cart/Suggestions'

import { colors } from '../utils/styles'


const Container = styled.div`
  // color: white;
  // width: 95%;
  // margin: 0 auto;
  // text-align: center;
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

const StyledLink = styled(Link)`
    display: block;
    text-align: center;
    background: ${colors.darkGradient};
    box-shadow: 0 0 5px ${colors.brand};
    border-radius: 5px;
    padding: 10px 0;
    margin: 2rem 0;
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
        </>
        :
        <>
          <CheckoutLink href={checkout.webUrl}>Proceed to checkout</CheckoutLink>
          <p style={{ textAlign: 'center', width: '90%'}}>If your cart contains a pre-order item, all items will be shipped with the pre-order</p>
        </>
      }
      <div id='lineItems'>
        {lineItems}
      </div>
      <ProductNav />

    </Container>
  )
}


export default Cart