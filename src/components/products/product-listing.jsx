import React from "react"
import styled from 'styled-components'
import { useStaticQuery, graphql } from "gatsby"

import ProductListingItem from './product-listing-item'
import Accessory from './accessory'


import { breakpoints, colors } from '../../utils/styles';


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  // margin-right: 10px;


  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: nowrap;
    justify-content: ${props => props.isSingleItem ? 'center' : 'flex-start'};
    overflow-x: auto;
  }
`

const Title = styled.h2`
  // text-align: center;
  font-size: 2rem;
  margin-bottom: 0;

  &.sale-text {
    -webkit-text-stroke: 1px ${colors.brand};
    font-weight: bold;
    font-size: 2.5rem;
    color: ${colors.lightest};
    text-shadow:
    -1px -1px 0 ${colors.brand},  
    1px -1px 0 ${colors.brand},
    -1px 1px 0 ${colors.brand},
      1px 1px 6px ${colors.lightest};
  }

  &.hide-lt-tablet {
    margin-bottom: 25px;
    @media (max-width: ${breakpoints.tablet}) {
      display: none;
    }
  }

  &.hide-gt-tablet {
    @media (min-width: ${breakpoints.tablet}) {
      display: none;
    }
  }
`

const Text = styled.div`
  width: 80%;
  max-width: 400px;
  // align-self: center;
  text-align: center;
  margin-top: 0;
  margin-left: 15px;
  margin-right: 15px;



  font-size: 1.25rem;

  @media (min-width: ${breakpoints.tablet}) {
    h2 {
      margin-top: 0;
    }
  }
`

const FeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 15px;



  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    margin-top: 35px;
  }
`


const ProductListing = ({ className, isFeature, isGiftCard }) => {
  const data = useStaticQuery(graphql`
    query {
      allShopifyCollection {
        edges {
          node {
            handle 
            products {
              handle
              title
              shopifyId
              variants {
                image { 
                  id
                }
                priceV2 {
                  amount
                  currencyCode
                }
                id
                shopifyId
                availableForSale
              }
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
                id
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 300) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
              thumbs: images {
                id
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
    }
  `)

  const filterdProducts = collection => (
    data.allShopifyCollection.edges
        .find(({node}) =>  node.handle === collection).node.products
  )
  
  const standards = filterdProducts('standards');
  const preOrder = filterdProducts('pre-order');
  const specials = filterdProducts('specials');

  const shirts = filterdProducts('shirts');

  const hoodies = filterdProducts('hoodies');
  const accessories = filterdProducts('accessories');

  const shirtsAndHoodies = [...hoodies, ...shirts]


  return (
    <>

      <Title className='hide-gt-tablet'>Featured Hoodie</Title>
      <FeatureContainer>

        <Container 
          className={className} 
          isSingleItem={preOrder.length === 1}
        >
          {preOrder.map(node => 
            <ProductListingItem 
              product={node} 
              isSingleItem={preOrder.length === 1}
              isFeature={true}
              showThumbs={true}
              isGiftCard={isGiftCard} 
              key={node.shopifyId}
            />)
          }
        </Container>
        <Text>
          <Title className='hide-lt-tablet'>Featured Hoodie</Title>
          <p>
            For every Listen to Metal Hoodie purchased, 20 meals will 
            be donated to those in need through the St.Louis Food Bank, 
            Operation Food Search. Also, you will be entered 
            into a raffle to win a brand new Prodigy practice bag! 
          </p>
        </Text>
      </FeatureContainer>
      <Title>All Shirts And Hoodies</Title>
      <Container 
        className={className} 
        isSingleItem={specials.length === 1}
      >
          {shirtsAndHoodies.map(node => 
            <ProductListingItem 
              product={node} 
              isSingleItem={specials.length === 1}
              isFeature={isFeature}
              showThumbs={true}
              isGiftCard={isGiftCard} 
              key={node.shopifyId}
            />)
          }
      </Container>
      <Title>Accessories</Title>
      <Container 
        className={className} 
        isSingleItem={standards.length === 1}
      >
        {accessories.map(node => 
          <Accessory
            product={node} 
            isSingleItem={standards.length === 1}
            isFeature={false}
            showThumbs={true}
            isGiftCard={false} 
            key={node.shopifyId}
          />)
        }
      </Container>
    </>
  )
}

export default ProductListing
