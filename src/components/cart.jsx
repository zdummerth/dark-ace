import React, { useState } from 'react';

const Cart = () => {
  const [items, setItems] = useState([]);

  const addToCart = () => {
    setItems([...items, 'next']);
    console.log(items)
  };

  return (
    <div>
      <button type="button" onClick={addToCart}>
        Add To Cart
      </button>
      <h1>Hello, I'm your Cart</h1>
    </div>
  );
};

export default Cart;