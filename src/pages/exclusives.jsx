import React, { useContext } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { FiShoppingCart } from 'react-icons/fi';


import Layout from '../components/layout'
import SEO from '../components/seo'
import ExclusiveItem from '../components/exclusive-item'
import { GlobalStateContext } from '../context/GlobalContextProvider'
// import { string } from 'prop-types'

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
const CartIcon = styled(FiShoppingCart)`
color: #C00A0A;
`


const Shop = ({data}) => {
  const { cart, setCart } = useContext(GlobalStateContext)

  const items = data.markdownRemark.frontmatter.items.map(({images, price, colors, sizes}) => (
      <ExclusiveItem 
        images={images} 
        price={price}
        colors={colors}
        sizes={sizes}
        cart={cart}
        setCart={setCart}
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
