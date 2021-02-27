import { useState, useEffect, useContext, useCallback } from 'react'
import { StoreContext } from '../context/StoreContextProvider'


export const useCheckout = product => {

  const {
    // options,
    variants,
    shopifyId
  } = product

  // finds first available variant
  // Still need to set sold out when all variants are sold out...the false condition
  const initialVariant = product.availableForSale ? 
    variants.find(variant => variant.availableForSale) 
    : 
    variants[0]

  const { 
    addVariantToCart, 
    checkAvailability,
    store: { status } 
  } = useContext(StoreContext)

  const [variant, setVariant] = useState(initialVariant)
  // console.log('variant', variant)


  const [quantity, setQuantity] = useState(1)
  const [available, setAvailable] = useState(variant.availableForSale)

  const increaseQuantity = e => {
    e.preventDefault();
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = e => {
    e.preventDefault();
    if(quantity > 1) {
        setQuantity(quantity - 1)
    }
  }

  const addToCart = () => {
    addVariantToCart(variant.shopifyId, quantity)
  }

  const availability = useCallback(
    () => {
      // console.log('checking availability')
      checkAvailability(shopifyId, variant.shopifyId)
      .then(({ data }) => {
        setAvailable(data)
      })
    },
    [variant.shopifyId, checkAvailability, shopifyId]
  )

  useEffect(() => {
    availability(shopifyId)
  }, [shopifyId, availability]);

  return {
    variant,
    quantity,
    available,
    status,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    setVariant, 
  };
}