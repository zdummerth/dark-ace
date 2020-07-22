import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'


import Layout from '../components/layout'
import SEO from '../components/seo'


const ImgWrapper = styled.div`

`


const Shop = ({data}) => {
  console.log({data})
  const images = data.markdownRemark.frontmatter.items.map(({image}) => (
      <Img 
        fluid={image.childImageSharp.fluid} 
        alt={'item description'}
      />
  ))
  return (
    <Layout>
        <SEO title="Shop" />
        <h1>Exlusive Items</h1>
        {images}
    </Layout>
  )
}

export const query = graphql`
query {
  markdownRemark(frontmatter: {title: {eq: "Exclusives"}}) {
    frontmatter {
      items {
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
