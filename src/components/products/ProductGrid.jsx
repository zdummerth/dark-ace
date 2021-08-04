import React, { useState } from 'react'
import styled from 'styled-components'
import { breakpoints, Listing, spacing, Subtitle, colors } from '../../utils/styles'
import { useShopify } from '../../hooks/useShopify'
import GiftCard from './GiftCard'


import ProductListingItem from './ProducListingItem'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  // border-bottom: 1px solid ${colors.brand};
  // padding-bottom: 5px;
`

const Tab = styled.div`
  border: 1px solid ${colors.brand};
  // border-radius: 5px 5px 0 0;
  border-radius: 50px;
  // border-bottom: none;
  padding: 5px 10px;
  background: ${({ selected }) => selected ? colors.gradient : 'transparent'};
  cursor: pointer;
`

const Margin = styled.div`
  margin: 5px;
`

const GiftCardContainer = styled.div`
  align-self: center;
  width: 100%;
  max-width: 350px;
`




const ProductGrid = ({ initialCategory }) => {

  const { tShirts, longsleeves, driFits, headware, accessories, discs, featured } = useShopify()
  const [scrolled, setScrolled] = useState(false)
  const [MainCat, setMainCat] = useState(initialCategory)
  const [SecCat, setSecCat] = useState('t')

  return (
    <>
      <Tabs>
        <Tab
          selected={MainCat === 'featured'}
          onClick={() => setMainCat('featured')}
        >Featured</Tab>
        <Margin />
        <Tab
          selected={MainCat === 'discs'}
          onClick={() => setMainCat('discs')}
        >Discs</Tab>
        <Margin />
        <Tab
          selected={MainCat === 't-shirts'}
          onClick={() => setMainCat('t-shirts')}
        >Shirts</Tab>
        <Margin />
        <Tab
          selected={MainCat === 'dri-fits'}
          onClick={() => setMainCat('dri-fits')}
        >Dri-Fits</Tab>
        <Margin />
      </Tabs>
      <Margin />
      <Tabs>
        <Tab
          selected={MainCat === 'headware'}
          onClick={() => setMainCat('headware')}
        >Hats</Tab>
        <Margin />
        <Tab
          selected={MainCat === 'accessories'}
          onClick={() => setMainCat('accessories')}
        >Accessories</Tab>
        <Margin />
        <Tab
          selected={MainCat === 'giftCard'}
          onClick={() => setMainCat('giftCard')}
        >Gift Cards</Tab>
      </Tabs>
      <Margin />
      <Container>
        <Margin />
        {MainCat === 'discs' && (
          <>
            <Subtitle>{discs.title}</Subtitle>
            <Listing>
              {discs.products.map(product => (
                <ProductListingItem
                  product={product}
                  key={product.shopifyId}
                  showThumbs={false}
                  style={{
                    width: '50vw',
                    maxWidth: '300px',
                  }}
                />
              ))}
            </Listing>
          </>
        )}
        {MainCat === 'featured' && (
          <>
            <Subtitle>{featured.title}</Subtitle>
            <Listing>
              {featured.products.map(product => (
                <ProductListingItem
                  product={product}
                  key={product.shopifyId}
                  showThumbs={false}
                  style={{
                    width: '50%',
                    maxWidth: '400px',
                  }}
                />
              ))}
            </Listing>
          </>
        )}
        {MainCat === 't-shirts' && (
          <>
            <Subtitle>{tShirts.title}</Subtitle>
            {/* <Margin /> */}
            <Listing>
              {tShirts.products.map(product => (
                <ProductListingItem
                  product={product}
                  key={product.shopifyId}
                  showThumbs={false}
                  style={{
                    width: '50%',
                    maxWidth: '400px',
                  }}
                />
              ))}
              {longsleeves.products.map(product => (
                <ProductListingItem
                  product={product}
                  key={product.shopifyId}
                  showThumbs={false}
                  style={{
                    width: '50%',
                    maxWidth: '400px',
                  }}
                />
              ))}
            </Listing>
          </>
        )}
        {MainCat === 'dri-fits' && (
          <>
            <Subtitle>{driFits.title}</Subtitle>
            {/* <Margin /> */}
            <Listing>
              {driFits.products.map(product => (
                <ProductListingItem
                  product={product}
                  key={product.shopifyId}
                  showThumbs={false}
                  style={{
                    width: '50%',
                    maxWidth: '400px',
                  }}
                />
              ))}
            </Listing>
          </>
        )}
        {MainCat === 'headware' && (
          <>
            <Subtitle>{headware.title}</Subtitle>
            <Margin />
            <Listing>
              {headware.products.map(product => (
                <ProductListingItem
                  product={product}
                  key={product.shopifyId}
                  showThumbs={false}
                  style={{
                    width: '50%',
                    maxWidth: '400px',
                  }}
                />
              ))}
            </Listing>
          </>
        )}
        {MainCat === 'accessories' && (
          <>
            <Subtitle>{accessories.title}</Subtitle>
            <Margin />
            <Listing>
              {accessories.products.map(product => (
                <ProductListingItem
                  product={product}
                  key={product.shopifyId}
                  showThumbs={false}
                  style={{
                    width: '50%',
                    maxWidth: '400px',
                  }}
                />
              ))}
            </Listing>
          </>
        )}

        {MainCat === 'giftCard' && (
          <>
            <Subtitle>Gift Cards</Subtitle>
            <Margin />
            <GiftCardContainer>
              <GiftCard />
            </GiftCardContainer>
          </>
        )}


      </Container>
    </>
  )
}

export default ProductGrid
