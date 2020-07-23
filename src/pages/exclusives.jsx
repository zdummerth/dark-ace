import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'


import Layout from '../components/layout'
import SEO from '../components/seo'
import { string } from 'prop-types'

const Title = styled.h1`
  text-align: center;
`

const ItemGrid = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  color: white;

  @media (max-width: 1000px) {
    width: 90%;
    margin: 0 auto;
  }
`

const ItemInfo = styled.div`
  margin-top: 5px;
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
        ${price}
        <label for="colors">Choose Color:</label>
        <select name="colors" id="colors">
          {colors.map(c => <option value={c}>{c}</option>)}
        </select>
        <label for="sizes">Choose Size:</label>
        <select name="sizes" id="sizes">
          {sizes.map(s => <option value={s}>{s}</option>)}
        </select>
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
