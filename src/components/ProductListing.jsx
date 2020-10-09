import React, { useState } from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import Img from 'gatsby-image'

import { breakpoints, colors } from '../utils/styles';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${breakpoints.desktop}) {
    flex-wrap: nowrap;
    justify-content: flex-start;
    overflow-x: auto;
  }
`

const ProductContainer = styled.div`
  margin: 2rem 1rem;
  text-align: center; 
  flex: 1;
  max-width: 300px;
  border-bottom: 1px solid ${colors.brand};

  @media (max-width: ${breakpoints.desktop}) {
    &:last-child {
          padding-right: 1rem;
      }
  }
`

const ImgContainer = styled.div`
  width: 60vw;
  max-width: inherit;
`

const ThumbnailContainer = styled.div`  
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`

const Thumbnail = styled.button`
    margin-right: 8px;
    width: 48px;
    height: 60px;
    border: none;
    background: none;
`

const ImgLink = styled(Link)`
  display: ${props => (props.visible ? "block" : "none")};
`

const Product = ({node}) => {
  const [index, setIndex] = useState(0);

  const price = Intl.NumberFormat(undefined, {
    currency: node.priceRange.minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(node.priceRange.minVariantPrice.amount)

  const images = node.images.map((variant, ind) => (
        <ImgLink
            to={`/shop/${node.handle}`}
            visible={index === ind}
        >
            <Img 
                fluid={variant.localFile.childImageSharp.fluid} 
                alt={node.title}
            />
        </ImgLink>
  ))


  return (
      <ProductContainer key={node.shopifyId}>
        <ImgContainer>
            {images}
        </ImgContainer>
        <ThumbnailContainer>
          {node.thumbs.map((variant, ind) => (
            <Thumbnail onClick={() => setIndex(ind)}>
            <Img 
                fixed={variant.localFile.childImageSharp.fixed} 
                alt={node.title}
            />
            </Thumbnail>
        ))}
        </ThumbnailContainer>
        <Link to={`/shop/${node.handle}`}>
          <h3>{node.title}{" - "}{price}</h3>
        </Link>
      </ProductContainer>
  )
}


const ProductListing = ({ products }) => {
  return (
    <Container>
        {products.map(node => <Product node={node} />)}
    </Container>
  )
}

export default ProductListing

