import { useState, useEffect, useContext } from 'react'
import { StoreContext } from '../context/StoreContextProvider'


export const useCheckout = product => {

  const { variants, shopifyId } = product;

  const {
    addVariantToCart,
    checkAvailability,
    store: { adding },
  } = useContext(StoreContext);

  const [variant, setVariant] = useState(variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [available, setAvailable] = useState(variant.availableForSale);
  const [error, setError] = useState(false);




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

  const resetError = () => setError(false)
    
  useEffect(() => {
    console.log('checking availability')
    checkAvailability(shopifyId, variant.shopifyId)
      .then(({ data, err }) => {
        if(err) {
          setError(err)
        } else {
          setAvailable(data)
        }
      })
  }, [shopifyId, variant.shopifyId, checkAvailability]);

  return {
    variant,
    quantity,
    adding,
    available,
    error,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    setVariant, 
    resetError
  };
}