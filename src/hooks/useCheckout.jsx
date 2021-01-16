import { useState, useEffect, useContext } from 'react'
import { StoreContext } from '../context/StoreContextProvider'


export const useCheckout = product => {

  const { variants, shopifyId } = product;

  const { addVariantToCart, checkAvailability } = useContext(StoreContext);

  const [variant, setVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [available, setAvailable] = useState(variant.availableForSale);

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

  useEffect(() => {
    console.log('checking availability')
    checkAvailability(shopifyId, variant.shopifyId)
      .then(({ data }) => {
        setAvailable(data)
      })
  }, [shopifyId, variant.shopifyId, checkAvailability]);

  return {
    variant,
    quantity,
    available,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    setVariant, 
  };
}