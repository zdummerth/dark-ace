import React, { useState } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from 'gatsby-image'
import styled from 'styled-components'

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

const ExclusiveItem = ({ images, price, colors, sizes, addToCart }) => {
    const [index, setIndex] = useState(0);
//     const data = useStaticQuery(graphql`
//     query SiteTitleQuery {
//       site {
//         siteMetadata {
//           title
//         }
//       }
//     }
//   `)

const handleChange = e => {
    e.preventDefault()
    console.log(e.target)
}

    return (
        <div>
            <Img 
            fluid={images[index].image.childImageSharp.fluid} 
            alt={'item description'}
            />
            <ItemInfo>
            <PriceAndCart>
                <span>${price}</span>
                <button onClick={() => addToCart}>Add to cart</button>
            </PriceAndCart>
            <label for="colors">Choose Color:</label>
            <Select name="colors" id="colors" onChange={handleChange}>
                {images.map((i, ind) => <option onClick={() => setIndex(ind)} value={i.color}>{i.color}</option>)}
            </Select>
            <label for="sizes">Choose Size:</label>
            <Select name="sizes" id="sizes">
                {sizes.map(s => <option value={s}>{s}</option>)}
            </Select>
            </ItemInfo>
        </div>
    )
  }
  
  
  export default ExclusiveItem