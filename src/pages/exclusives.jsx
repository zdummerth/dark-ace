import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { FiShoppingCart } from 'react-icons/fi';


import Layout from '../components/layout'
import SEO from '../components/seo'
import ExclusiveItem from '../components/exclusive-item'

const Title = styled.h1`
  text-align: center;
`

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

const CartIcon = styled(FiShoppingCart)`
color: #C00A0A;
`


const Shop = ({data}) => {

  const items = data.markdownRemark.frontmatter.items.map(({price, images, sizes, item}) => (
      <ExclusiveItem 
        price={price}
        images={images}
        sizes={sizes}
        item={item}
      />
  ))
  return (
    <Layout>
        <SEO title="Shop" />
        <Title>Exclusive Items</Title>
        <CartIcon />
        <ItemGrid>
          {items}
        </ItemGrid>
    </Layout>
  )
}

export const query = graphql`
query {
  markdownRemark(frontmatter: {title: {eq: "Exclusives"}}) {
    frontmatter {
      items {
        price
        sizes
        item
        images {
          color
          image {
            childImageSharp {
              fluid(maxWidth: 400, quality: 100) {
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

export default Shop
