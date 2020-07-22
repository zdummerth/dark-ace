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
  const images = data.markdownRemark.frontmatter.items.map(({image, price}) => (
    <div>
      <Img 
        fluid={image.childImageSharp.fluid} 
        alt={'item description'}
      />
      <ItemInfo>${price}</ItemInfo>
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
