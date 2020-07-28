import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { FiShoppingCart } from 'react-icons/fi';


import Layout from '../components/layout'
import SEO from '../components/seo'
import ExclusiveItem from '../components/exclusive-item'
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

const addToCart = (e) => {
  console.log(e.currentTarget)
  const localDb = typeof window !== "undefined" ? window.localStorage : null
  if(localDb) {
    localDb.setItem('product', 'test item for store');
    console.log(localDb)
    console.log(localDb.length)
    console.log(localDb.getItem('product'))
    console.log(localDb.length)
    console.log(localDb)
  }
}
const Shop = ({data}) => {
  console.log({data})
  // const items = data.markdownRemark.frontmatter.items.map(({images, price, colors, sizes}) => (
  //   <div>
  //     {/* <Img 
  //       fluid={image.childImageSharp.fluid} 
  //       alt={'item description'}
  //     /> */}
  //     {images.map(({image}) => (
  //         <Img 
  //         fluid={image.childImageSharp.fluid} 
  //         alt={'item description'}
  //       />
  //     ))}
  //     <ItemInfo>
  //       <PriceAndCart>
  //         <span>${price}</span>
  //         <button onClick={() => addToCart}>Add to cart</button>
  //       </PriceAndCart>
  //       <label for="colors">Choose Color:</label>
  //       <Select name="colors" id="colors">
  //         {colors.map(c => <option value={c}>{c}</option>)}
  //       </Select>
  //       <label for="sizes">Choose Size:</label>
  //       <Select name="sizes" id="sizes">
  //         {sizes.map(s => <option value={s}>{s}</option>)}
  //       </Select>
  //     </ItemInfo>
  //   </div>
  // ))

  const items = data.markdownRemark.frontmatter.items.map(({images, price, colors, sizes}) => (
      <ExclusiveItem 
        images={images} 
        price={price}
        colors={colors}
        sizes={sizes}
        addToCart={addToCart}
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
        item
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
