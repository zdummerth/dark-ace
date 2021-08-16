import React, { useState, useEffect } from 'react'
import Client from 'shopify-buy'
export const StoreContext = React.createContext()


const client = Client.buildClient({
  storefrontAccessToken: process.env.GATSBY_ACCESS_TOKEN,
  domain: process.env.GATSBY_SHOP_NAME,
})

// console.log('shopif  buy client', client)


const StoreContextProvider = ({ children }) => {
  let initialStoreState = {
    client,
    adding: false,
    status: 'idle',
    checkout: { lineItems: [] },
    products: [],
    shop: {},
  }

  const [store, updateStore] = useState(initialStoreState);

  const handleError = error => {
    updateStore(prevState => {
      return { ...prevState, error, status: 'idle' }
    })
  }

  useEffect(() => {
    const initializeCheckout = async () => {
      // Check for an existing cart.
      const isBrowser = typeof window !== 'undefined'
      const existingCheckoutID = isBrowser
        ? localStorage.getItem('shopify_checkout_id')
        : null

      const setCheckoutInState = checkout => {
        if (isBrowser) {
          localStorage.setItem('shopify_checkout_id', checkout.id)
        }

        updateStore(prevState => {
          return { ...prevState, checkout }
        })
      }

      const createNewCheckout = () => store.client.checkout.create()
      const fetchCheckout = id => store.client.checkout.fetch(id)

      if (existingCheckoutID) {
        try {
          const checkout = await fetchCheckout(existingCheckoutID)
          // Make sure this cart hasn’t already been purchased.
          if (!checkout.completedAt) {
            setCheckoutInState(checkout)
            return
          }
        } catch (e) {
          localStorage.setItem('shopify_checkout_id', null)
        }
      }

      const newCheckout = await createNewCheckout()
      setCheckoutInState(newCheckout)
    }

    initializeCheckout()
  }, [store.client.checkout])


  return (
    <StoreContext.Provider
      value={{
        store,

        addVariantToCart: (variantId, quantity) => {
          if (variantId === '' || !quantity) {
            console.error('Both a size and quantity are required.')
            return
          }

          updateStore(prevState => {
            return { ...prevState, status: 'Adding' }
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
                return { ...prevState, checkout, status: 'Added' }
              })
            }, (error) => handleError(error))
        },

        removeLineItem: (client, checkoutID, lineItemID) => {
          updateStore(prevState => {
            return { ...prevState, status: 'Removing' }
          })

          return client.checkout
            .removeLineItems(checkoutID, [lineItemID])
            .then(checkout => {
              updateStore(prevState => {
                return { ...prevState, checkout, status: 'Removed' }
              })
            }, (error) => handleError(error))
        },

        updateLineItem: (client, checkoutID, lineItemID, quantity) => {
          const lineItemsToUpdate = [
            { id: lineItemID, quantity: parseInt(quantity, 10) },
          ]

          updateStore(prevState => {
            return { ...prevState, status: 'Updating' }
          })

          return client.checkout
            .updateLineItems(checkoutID, lineItemsToUpdate)
            .then(checkout => {
              updateStore(prevState => {
                return { ...prevState, checkout, status: 'Updated' }
              })
            }, (error) => handleError(error))
        },

        checkAvailability: (productId, variantId) => {
          // console.log({ productId, variantId })
          
          return client.product
            .fetch(productId)
            .then(fetchedProduct => {
              // this checks the currently selected variant for availability
              const result = fetchedProduct.variants.filter(
                v => v.id === variantId
              )

              // console.log('result of availability', result)
              if (result.length > 0) {
                return { data: result[0].available }
              } else {
                return { data: false }
              }
            },
              (error) => {
                console.log('error of availability', error)
                return { data: false }
              })
        },

        resetError: () => {
          updateStore(prevState => {
            return { ...prevState, error: false }
          })
        },

        setStatus: (status) => {
          updateStore(prevState => {
            return { ...prevState, status }
          })
        }

      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider