import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'


import Layout from '../components/layout'
import SEO from '../components/seo'
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
const Shop = ({data}) => {
  console.log({data})
  const images = data.markdownRemark.frontmatter.items.map(({image, price, colors, sizes}) => (
    <div>
      <Img 
        fluid={image.childImageSharp.fluid} 
        alt={'item description'}
      />
      <ItemInfo>
        <PriceAndCart>
          <span>${price}</span>
          <button>Add to cart</button>
        </PriceAndCart>
        <label for="colors">Choose Color:</label>
        <Select name="colors" id="colors">
          {colors.map(c => <option value={c}>{c}</option>)}
        </Select>
        <label for="sizes">Choose Size:</label>
        <Select name="sizes" id="sizes">
          {sizes.map(s => <option value={s}>{s}</option>)}
        </Select>
      </ItemInfo>
    </div>
  ))
  return (
    <Layout>
        <SEO title="Shop" />
        <Title>Exclusive Items</Title>
        <ItemGrid>
          {images}
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
        colors
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
`

export default Shop
