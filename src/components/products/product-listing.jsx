import React from 'react'
import styled from 'styled-components'
import { breakpoints } from '../../utils/styles'
import { useShopify } from '../../hooks/useShopify'

import ProductListingItem from './product-listing-item'
import Accessory from './accessory'




const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: nowrap;
    justify-content: ${props => props.isSingleItem ? 'center' : 'flex-start'};
    overflow-x: auto;
  }
`
const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 0;

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
  margin-top: 30px;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 10px;



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
const CollectionListing = ({ collection }) => {
  const { products, title, handle } = collection

  return (
    <div key={collection.handle}>
      <Title>{title}</Title>
      <Container
        isSingleItem={products.length === 1}
      >
        {products.map(prod => {
          if (handle === 'accessories') {
            return (
              <Accessory
                product={prod}
                key={prod.shopifyId}
              />
            )
          }
          return (
            <ProductListingItem
              product={prod}
              isFeature={false}
              showThumbs={true}
              key={prod.shopifyId}
            />)
        })
        }
      </Container>
    </div>
  )
}

const Feature = ({ product }) => {
  return (
    <>
      <Title className='hide-gt-tablet'>Featured Hoodie</Title>
      <FeatureContainer>
        <ProductListingItem
          product={product}
          isFeature={true}
          showThumbs={true}
        />
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
    </>
  )
}

const ProductListing = () => {

  const { collections, feature } = useShopify()

  return (
    <>
      <Feature product={feature} />
      { collections.map(c => <CollectionListing key={c.handle} collection={c} />)}
    </>
  )
}

export default ProductListing
