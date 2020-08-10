import React, { useContext } from 'react'
// import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import styled from 'styled-components'

import Layout from '../components/layout'
import { GlobalStateContext } from '../context/GlobalContextProvider'

const Item = styled.div`
  display: flex;
  // flex-direction: column;
  // align-items: flex-start;
  margin-bottom: 15px;
`
const Description = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: flex-start;
  margin-bottom: 15px;
`
const Checkout = () => {
    const { cart, setCart } = useContext(GlobalStateContext)
    console.log(setCart)

    const items = cart.map(item => (
      <Item>
        <Img 
          fluid={item.image.childImageSharp.fluid} 
          alt={'item description'}
          style={{width: '40%', maxWIdth: '400px', maxHeight: '400px'}}
          imgStyle={{ 
            objectFit: 'contain', 
          }}
          />
        <Description>
          <p>{item.name}</p>
          <p>{item.price}</p>
          <p>{item.size} {item.color}</p>
        </Description>
      </Item>
    ))
    return (
      <Layout>
        <button onClick={() => setCart([])}>clear cart</button>
        <h1>Checkout</h1>
        {items}
      </Layout>
    )
  }
  
  
  export default Checkout