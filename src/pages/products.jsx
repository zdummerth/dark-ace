import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components'
import Img from 'gatsby-image'

// import Layout from "../components/layout"


const ItemGrid = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 400px));
  color: white;

  & > * {
    border-bottom: 1px solid #C00A0A;
  }

  @media (max-width: 1000px) {
    width: 90%;
    margin: 0 auto;
  }
`

const ProductsPage = ({ data }) => {

  const products = data.allShopifyProduct.edges.map(({ node }) => {

    const price = Intl.NumberFormat(undefined, {
      currency: node.priceRange.minVariantPrice.currencyCode,
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(node.priceRange.minVariantPrice.amount)

    return   (
      <div key={node.shopifyId}>
        <Link to={`/product/${node.handle}`}>
          <Img
            fluid={node.images[0].localFile.childImageSharp.fluid} 
            alt={'item description'}
          />
        </Link>
        <h3>
          <Link to={`/product/${node.handle}`}>{node.title}</Link>
          {" - "}{price}
        </h3>
        <p>{node.description}</p>
      </div>
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
        }
      }
    }
  }
`