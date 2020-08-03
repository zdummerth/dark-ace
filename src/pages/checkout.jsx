import React, { useContext } from 'react'
// import { useStaticQuery, graphql } from "gatsby"
// import Img from 'gatsby-image'
// import styled from 'styled-components'

import Layout from '../components/layout'
import { GlobalStateContext } from '../context/GlobalContextProvider'


const Checkout = () => {
    const { cart, setCart } = useContext(GlobalStateContext)
    console.log(setCart)

    const items = cart.map(i => <p>{i}</p>)
    return (
      <Layout>
        <h1>Checkout</h1>
        <button onClick={() => setCart([...cart, 'next item'])}>add to cart</button>
        <button onClick={() => setCart([])}>clear cart</button>
        {items}
      </Layout>
    )
  }
  
  
  export default Checkout