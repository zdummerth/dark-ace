import React, { useState, useContext } from 'react'
// import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import styled from 'styled-components'

import { GlobalStateContext } from '../context/GlobalContextProvider'

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5px;

  & > * {
    margin: 5px;
  }
`
const Select = styled.select`
  // color: red;
`
const PriceAndCart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`

const ExclusiveItem = ({ colors, price, sizes, item }) => {
  
  const { cart, setCart } = useContext(GlobalStateContext)
  
  const [currentColor, setCurrentColor] = useState(colors[0])
  
  const [currentSize, setCurrentSize] = useState(sizes[0])
  
  const handleColorChange = e => {
    e.preventDefault()
    const color = colors.find(c => c.color === e.target.value)
    setCurrentColor(color)
  }

  const handleSizeChange = e => {
    e.preventDefault()
    console.log(e.target.value)
    setCurrentSize(e.target.value)
  }

  const addToCart = (e) => {
    e.preventDefault()
    const image = colors.find(c => c.color === currentColor.color).image
    setCart([...cart, {price, image, color: currentColor.color, size: currentSize, item }])
  }

    return (
        <div>
            <Img 
              fluid={currentColor.image.childImageSharp.fluid} 
              alt={'item description'}
            />
            <ItemInfo>
            <div>{item}</div>
            <PriceAndCart>
                <span>${price}</span>
                <button onClick={addToCart}>Add to cart</button>
            </PriceAndCart>
              <label htmlFor="colors" id='color-label'>Choose Color:</label>
              <Select name="colors" id="colors" onChange={handleColorChange}>
                  {colors.map(c => (
                    c.color === currentColor ?
                      <option value={currentColor.color}>{currentColor.color}</option>
                      :
                      <option value={c.color}>{c.color}</option>
                  ))}
              </Select>
              <label htmlFor="sizes">Choose Size:</label>
              <Select name="sizes" id="sizes" onChange={handleSizeChange}>
                  {sizes.map(s => (
                    s.size === currentSize ?
                      <option value={currentSize}>{currentSize}</option>
                      :
                      <option value={s}>{s}</option>
                  ))}
              </Select>
            </ItemInfo>
        </div>
    )
  }
  
  
  export default ExclusiveItem