import React, { useContext } from 'react'
import { GlobalStateContext } from '../context/GlobalContextProvider'
import Button from '../components/button'

import Layout from '../components/layout'

import LineItem from '../components/line-item'

const Cart = () => {
  const {
    store: { checkout },
  } = useContext(GlobalStateContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const lineItems = checkout.lineItems.map(item => (
    <LineItem key={item.id.toString()} item={item} />
  ))

  return (
    <Layout>
      <div style={{color: 'white'}}>
        {lineItems}
        <h3>Subtotal</h3>
        <p>$ {checkout.subtotalPrice}</p>
        {/* <br /> */}
        <h3>Taxes</h3>
        <p>$ {checkout.totalTax}</p>
        {/* <br /> */}
        <h3>Total</h3>
        <p>$ {checkout.totalPrice}</p>
        {/* <br /> */}
        <Button
          onClick={handleCheckout}
          disabled={checkout.lineItems.length === 0}
        >
          Check out
        </Button>
      </div>
    </Layout>
  )
}

export default Cart