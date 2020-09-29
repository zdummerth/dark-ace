import React, { useState, useEffect } from 'react'
import Client from 'shopify-buy'
export const GlobalStateContext = React.createContext()


const client = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_ACCESS_TOKEN,
  domain: process.env.GATSBY_SHOP_NAME,
})

export const initialStoreState = {
  client,
  adding: false,
  checkout: { lineItems: [] },
  products: [],
  shop: {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {}
}

const StoreContext = ({ children }) => {

  
  
  return (
    <GlobalStateContext.Provider 
    value={{
      store,
      addVariantToCart: (variantId, quantity) => {
        if (variantId === '' || !quantity) {
          console.error('Both a size and quantity are required.')
          return
        }

        updateStore(prevState => {
          return { ...prevState, adding: true }
        })

        const { checkout, client } = store

        const checkoutId = checkout.id
        const lineItemsToUpdate = [
          { variantId, quantity: parseInt(quantity, 10) },
        ]

        return client.checkout
          .addLineItems(checkoutId, lineItemsToUpdate)
          .then(checkout => {
            updateStore(prevState => {
              // console.log('Current Items', checkout.lineItems[0].quantity)
              return { ...prevState, checkout, adding: false }
            })
          })
      },
      removeLineItem: (client, checkoutID, lineItemID) => {
        return client.checkout
          .removeLineItems(checkoutID, [lineItemID])
          .then(res => {
            updateStore(prevState => {
              return { ...prevState, checkout: res }
            })
          })
      },
      updateLineItem: (client, checkoutID, lineItemID, quantity) => {
        const lineItemsToUpdate = [
          { id: lineItemID, quantity: parseInt(quantity, 10) },
        ]

        return client.checkout
          .updateLineItems(checkoutID, lineItemsToUpdate)
          .then(res => {
            updateStore(prevState => {
              return { ...prevState, checkout: res }
            })
          })
      },
    }}
    >
        {children}
    </GlobalStateContext.Provider>
  )
}

export default StoreContext