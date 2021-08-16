import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StoreContext } from 'src/context/StoreContextProvider'


export const useCheckout = product => {
  // console.log({ product, StoreContext })

  const {
    // options,
    variants,
    id,
    storefrontId
  } = product

  // console.log('product', product)


  // finds first available variant
  // Still need to set sold out when all variants are sold out...the false condition
  const initialVariant = product.totalInventory > 0 ?
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
  // console.log('availability', available)


  const increaseQuantity = e => {
    e.preventDefault();
    setQuantity(quantity + 1)
  }

  const decreaseQuantity = e => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const addToCart = () => {
    addVariantToCart(variant.storefrontId, quantity)
  }

  const availability = useCallback(
    () => {
      // console.log('checking availability')
      checkAvailability(storefrontId, variant.storefrontId)
        .then(({ data }) => {
          // console.log('available result', data)
          setAvailable(data)
        })
    },
    [variant.id, checkAvailability, id]
  )

  useEffect(() => {
    availability(id)
  }, [id, availability]);

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