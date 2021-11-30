import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { StoreContext } from 'src/context/StoreContextProvider'
import ProductNav from 'src/components/layout/productCollectionNavigation'
// import { useShopify } from 'src/hooks/useShopify'
import LineItem from 'src/components/cart/line-item'
import Seo from 'src/components/SEO'
// import Button from 'src/components/shared/Button'

// import Suggestions from 'src/components/products/suggestions/view'

import { colors } from 'src/styles'
import { initial } from 'lodash'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  #lineItems {
    // width: 100%;
    // margin: 0 auto;
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

const Cart = ({ data }) => {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  // console.log('checkout', checkout?.lineItems[0]?.variant)

  // console.log('variant data', variant)
  // console.log('parse int', parseInt(checkout.totalPrice))
  // console.log('cart data', data.shopifyProduct)

  // const [isOpen, setIsOpen] = useState(false)

  // const { singleVariantProducts } = useShopify()

  // const lineItemProducts = checkout.lineItems.map(li => li.variant.product)

  // const suggestions = singleVariantProducts.filter(s => (
  //   !lineItemProducts.find(li => li.id === s.storefrontId)
  // ))

  const totalQuantity = checkout.lineItems.reduce((acc, cv) => acc + cv.quantity, 0)

  const lineItems = checkout.lineItems.map(item => (
    <LineItem key={item.id.toString()} item={item} />
  ))

  return (
    <>
      <Seo title='Cart' />
      <Container>
        {/* <Suggestions suggestions={suggestions} isOpen={isOpen} setIsOpen={setIsOpen} checkoutUrl={checkout.webUrl} /> */}
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
            {/* {suggestions.length > 0 ? (
              <Button type='button' onClick={() => setIsOpen(true)}>Go to checkout</Button>

            ) : (
              <CheckoutLink href={checkout.webUrl}>Proceed to checkout</CheckoutLink>
            )} */}
            <CheckoutLink href={checkout.webUrl}>Proceed to checkout</CheckoutLink>
          </>
        }
        <div id='lineItems'>
          {lineItems}
        </div>
      </Container>
    </>
  )
}

export const query = graphql`
  query MyQuery {
  shopifyProduct(
    storefrontId: {eq: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY2NzA3ODg3ODgzNzc="}
  ) {
    handle
    storefrontId
    title
    totalInventory
    images {
      gatsbyImageData
    }
    variants {
      storefrontId
      id
      displayName
      inventoryQuantity
      availableForSale
      price
    }
  }
}
`


export default Cart