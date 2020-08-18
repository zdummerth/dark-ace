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
        <h2>Subtotal</h2>
        <p>$ {checkout.subtotalPrice}</p>
        <br />
        <h2>Taxes</h2>
        <p>$ {checkout.totalTax}</p>
        <br />
        <h2>Total</h2>
        <p>$ {checkout.totalPrice}</p>
        <br />
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