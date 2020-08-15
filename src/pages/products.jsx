import React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components'
import Img from 'gatsby-image'

import Layout from "../components/layout"


const ItemGrid = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
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
    const price = node.priceRange.minVariantPrice.amount === node.priceRange.maxVariantPrice.amount 
      ? 
      node.priceRange.minVariantPrice.amount 
      : 
      `${node.priceRange.minVariantPrice.amount} - ${node.priceRange.maxVariantPrice.amount}`

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
          {" - "}${price}
        </h3>
        <p>{node.description}</p>
      </div>
    )
  })

  return (
    <Layout>
      <h1>Products</h1>
      <ItemGrid>
        {products}
      </ItemGrid>
    </Layout>
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
            }
            maxVariantPrice {
              amount
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