import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components'
import Img from 'gatsby-image'

// import Layout from "../components/layout"


const ItemGrid = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  color: white;

  & > * {
    // padding-bottom: 2rem;
    border-bottom: 1px solid #C00A0A;
    text-align: center; 

    .thumb-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 5px;
      & > * {
        margin-right: 8px;
      }
    }
  }

  @media (max-width: 1000px) {
    width: 90%;
    margin: 0 auto;
  }
`

const ImgContainer = styled.div`
  position: relative;
  height: 50vh;
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
        // zIndex: `${index === ind ? '1' : '-10'}`,
        opacity: `${index === ind ? '1' : '0'}`,
        transition: 'opacity .19s ease-in', 
      }}
      imgStyle={{ 
        objectFit: 'contain', 
      }}
    />
  ))

  const thumbs = node.thumbs.map((variant, ind) => (
      <div 
        onClick={() => setIndex(ind)}
      >
    <Img 
      fixed={variant.localFile.childImageSharp.fixed} 
      alt={'slideshow for feature images'}
      fadeIn={false}
      onClick={() => setIndex(ind)}
      style={{

      }}
      imgStyle={{ 
        objectFit: 'contain', 
      }}
    />
    </div>
  ))

  return (
      <div key={node.shopifyId}>
        <Link 
          to={`/product/${node.handle}`} 
        >
          <ImgContainer>
            {images}
          </ImgContainer>
        </Link>
        <div className='thumb-container'>
          <span>Colors</span>
          {thumbs}
        </div>
        <h3>
          <Link to={`/product/${node.handle}`}>{node.title}</Link>
          {" - "}{price}
        </h3>
        <p>{node.description}</p>
      </div>
  )
}

const ProductsPage = ({ data }) => {

  const products = data.allShopifyProduct.edges.map(({ node }) => {

    return   (
      <Product node={node} />
    )
  })

  
  return (
    <>
      <h1>Products</h1>
      <ItemGrid>
        {products}
      </ItemGrid>
    </>
  )
}

export default ProductsPage

export const query = graphql`
  {
    allShopifyProduct(sort: { fields: [title] }) {
      edges {
        node {
          handle
          title
          shopifyId
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images {
            localFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          thumbs: images {
            localFile {
              childImageSharp {
                fixed(height: 60, width: 48) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`