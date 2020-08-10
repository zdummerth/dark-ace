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

const ExclusiveItem = ({ images, price, sizes, item }) => {
  
  const { cart, setCart } = useContext(GlobalStateContext)
  
  const [currentColor, setCurrentColor] = useState(images[0])
   
  const defaultSize = sizes ? sizes[0] : null
  const [currentSize, setCurrentSize] = useState(defaultSize)
  
  const handleColorChange = e => {
    e.preventDefault()
    const color = images.find(c => c.color === e.target.value)
    setCurrentColor(color)
  }

  const handleSizeChange = e => {
    e.preventDefault()
    console.log(e.target.value)
    setCurrentSize(e.target.value)
  }

  const addToCart = (e) => {
    e.preventDefault()
    const image = images.find(c => c.color === currentColor.color).image
    const color = currentColor ? currentColor.color : null
    setCart([...cart, {price, image, color, size: currentSize, item }])
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
            {images.length > 1 ? 
              <>
                <label htmlFor="colors" id='color-label'>Choose Color:</label>
                <Select name="colors" id="colors" onChange={handleColorChange}>
                    {images.map(c => (
                      c.color === currentColor ?
                        <option value={currentColor.color}>{currentColor.color}</option>
                        :
                        <option value={c.color}>{c.color}</option>
                    ))}
                </Select>
              </>
                : 
                null
            }
            {sizes ?
              <>
                <label htmlFor="sizes">Choose Size:</label>
                <Select name="sizes" id="sizes" onChange={handleSizeChange}>
                    {sizes.map(s => (
                      s.size === currentSize ?
                        <option value={currentSize}>{currentSize}</option>
                        :
                        <option value={s}>{s}</option>
                    ))}
                </Select>
              </>
              :
              null
            }
            </ItemInfo>
        </div>
    )
  }
  
  
  export default ExclusiveItem