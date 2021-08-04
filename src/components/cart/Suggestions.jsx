import React, { useContext } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { StoreContext } from '../../context/StoreContextProvider'
import { useShopify } from '../../hooks/useShopify'
import { Listing, Subtitle } from '../../utils/styles'
import Accessory from '../products/Accessory'



import LineItem from './line-item'

// import { colors } from '../../utils/styles'


const Container = styled.div`
  display: flex;
  flex-direction: column;
`


const CartSuggestions = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const { accessories } = useShopify()

  const accessoriesNotInCart = null

  console.log({ checkout })


  const totalQuantity = checkout.lineItems.reduce((acc, cv) => acc + cv.quantity, 0)

  const lineItems = checkout.lineItems.map(item => (
    <LineItem key={item.id.toString()} item={item} />
  ))

  return (
    <Container>
        {accessories.products.map(product => (
          <Accessory
            product={product}
            key={product.shopifyId}
            showThumbs={false}
            style={{
              // width: '100%',
              // maxWidth: '300px',
            }}
          />
        ))}
    </Container>
  )
}

export default CartSuggestions