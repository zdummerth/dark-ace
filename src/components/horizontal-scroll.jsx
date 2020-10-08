import React, { useState } from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import Img from 'gatsby-image'

import { breakpoints, colors } from '../utils/styles';


const Container = styled.div`
  display: flex;
  overflow-x: auto;
  color: white;
  width: 95%;
  margin: 0 auto;
  & > * {
      border-bottom: 1px solid ${colors.brand};
    }
  }

  @media (min-width: ${breakpoints.desktop}) {
    display: grid;
    align-items: center;
    grid-row-gap: 3rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    width: 100%;
  }
`

const ProductContainer = styled.div`
  flex: 1 1 70vw;
  margin: 0 1rem;
  text-align: center; 
  .thumb-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    & > * {
      position: relative;
      margin-right: 8px;
      width: 48px;
      height: 60px;
      border: none;
    }
  }
`

const ImageLink = styled(Link)`
  position: relative;
  height: 40vh;
  display: block;
  @media (max-width: ${breakpoints.desktop}) {
    width: 70vw;
    max-width: 320px;
  }
`

const Product = ({node}) => {
  const [index, setIndex] = useState(0);

  const price = Intl.NumberFormat(undefined, {
    currency: node.priceRange.minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(node.priceRange.minVariantPrice.amount)

  const images = node.images.map((variant, ind) => (
    <Img 
      fluid={variant.localFile.childImageSharp.fluid} 
      alt={'slideshow for feature images'}
      fadeIn={false}
      style={{
        position: 'absolute',
        top: '0',
        width: '100%',
        height: '100%',
        left: '0',
        opacity: `${index === ind ? '1' : '0'}`,
        transition: 'opacity .19s ease-in', 
      }}
      imgStyle={{ 
        objectFit: 'contain', 
      }}
    />
  ))

  const thumbs = node.thumbs.map((variant, ind) => (
    <button
      className='thumbnail' 
      onClick={() => setIndex(ind)}
    >
      <Img 
        fixed={variant.localFile.childImageSharp.fixed} 
        alt={'slideshow for feature images'}
        fadeIn={false}
        onClick={() => setIndex(ind)}
        style={{
          position: 'absolute',
          top: '0',
          width: '100%',
          height: '100%',
          left: '0',
        }}
        imgStyle={{ 
          objectFit: 'contain', 
        }}
      />
    </button>
  ))

  return (
      <ProductContainer key={node.shopifyId}>
          <ImageLink to={`/shop/${node.handle}`} >
              {images}
          </ImageLink>
        <div className='thumb-container'>
          {thumbs}
        </div>
        <h3>
          <Link to={`/shop/${node.handle}`}>
            {node.title}{" - "}{price}
          </Link>
        </h3>
      </ProductContainer>
  )
}

const ProductHorizontal = ({ products }) => {

  const productsList = products.map(node => {

    return   (
      <Product node={node} />
    )
  })

  
  return (
    <div>
      <Container>
        {productsList}
      </Container>
    </div>
  )
}

export default ProductHorizontal

