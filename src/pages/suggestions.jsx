import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { StoreContext } from 'src/context/StoreContextProvider'
import ProductNav from 'src/components/layout/productCollectionNavigation'
import { useShopify } from 'src/hooks/useShopify'
import LineItem from 'src/components/cart/line-item'
import Seo from 'src/components/SEO'
import Button from 'src/components/shared/Button'

import Suggestions from 'src/components/products/suggestions/view'

import { colors } from 'src/styles'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  #lineItems {
    // border-top: 1px solid #C00A0A;
    width: 100%;
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

  const [isOpen, setIsOpen] = useState(false)

  const { singleVariantProducts } = useShopify()

  const lineItemProducts = checkout.lineItems.map(li => li.variant.product)

  const suggestions = singleVariantProducts.filter(s => (
    !lineItemProducts.find(li => li.id === s.storefrontId)
  ))

  const totalQuantity = checkout.lineItems.reduce((acc, cv) => acc + cv.quantity, 0)

  const lineItems = checkout.lineItems.map(item => (
    <LineItem key={item.id.toString()} item={item} />
  ))

  return (
    <>
      <Seo title='Suggestions' />
      <Container>
        <Suggestions suggestions={suggestions} isOpen={isOpen} setIsOpen={setIsOpen} checkoutUrl={checkout.webUrl} />
      </Container>
    </>
  )
}


export default Cart