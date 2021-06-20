import React, { useState } from 'react'
import styled from 'styled-components'
import { breakpoints, Listing, spacing, Subtitle, colors } from '../../utils/styles'
import { useShopify } from '../../hooks/useShopify'
import GiftCard from './GiftCard'


import ProductListingItem from './ProducListingItem'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${colors.brand};
`

const Tab = styled.div`
  border: 1px solid ${colors.brand};
  border-radius: 5px 5px 0 0;
  border-bottom: none;
  padding: 5px;
  background: ${({ selected }) => selected ? colors.brand : 'transparent'};
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




const ProductGrid = () => {

  const { tShirts, longsleeves, driFits, headware, accessories, discs, featured } = useShopify()
  const [scrolled, setScrolled] = useState(false)
  const [MainCat, setMainCat] = useState('featured')
  const [SecCat, setSecCat] = useState('t-shirts')

  return (
    <>
      <Tabs>
        <Tab
          selected={MainCat === 'featured'}
          onClick={() => setMainCat('featured')}
        >Featured</Tab>
        <Margin />
        <Tab
          selected={MainCat === 'apparel'}
          onClick={() => setMainCat('apparel')}
        >Apparel</Tab>
        <Margin />
        <Tab
          selected={MainCat === 'discs'}
          onClick={() => setMainCat('discs')}
        >Discs</Tab>
        <Margin />
        <Tab
          selected={MainCat === 'giftCard'}
          onClick={() => setMainCat('giftCard')}
        >Gift Cards</Tab>
      </Tabs>
      <Margin />
      {MainCat === 'apparel' && (
        <Tabs>
          <Tab
            selected={SecCat === 't-shirts'}
            onClick={() => setSecCat('t-shirts')}
          >Shirts</Tab>
          <Margin />
          <Tab
            selected={SecCat === 'dri-fits'}
            onClick={() => setSecCat('dri-fits')}
          >Dri-Fits</Tab>
          <Margin />
          <Tab
            selected={SecCat === 'headware'}
            onClick={() => setSecCat('headware')}
          >Hats</Tab>
          <Margin />
          <Tab
            selected={SecCat === 'accessories'}
            onClick={() => setSecCat('accessories')}
          >Accessories</Tab>
        </Tabs>
      )}
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
                    // width: '60vw',
                    // maxWidth: '300px',
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
                    // width: '60vw',
                    // maxWidth: '300px',
                  }}
                />
              ))}
            </Listing>
          </>
        )}
        {SecCat === 't-shirts' && MainCat === 'apparel' && (
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
                    // width: '60vw',
                    // maxWidth: '300px',
                  }}
                />
              ))}
              {longsleeves.products.map(product => (
                <ProductListingItem
                  product={product}
                  key={product.shopifyId}
                  showThumbs={false}
                  style={{
                    // width: '60vw',
                    // maxWidth: '300px',
                  }}
                />
              ))}
            </Listing>
          </>
        )}
        {SecCat === 'dri-fits' && MainCat === 'apparel' && (
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
                    // width: '60vw',
                    // maxWidth: '300px',
                  }}
                />
              ))}
            </Listing>
          </>
        )}
        {SecCat === 'headware' && MainCat === 'apparel' && (
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
                    // width: '60vw',
                    // maxWidth: '300px',
                  }}
                />
              ))}
            </Listing>
          </>
        )}
        {SecCat === 'accessories' && MainCat === 'apparel' && (
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
                    // width: '60vw',
                    // maxWidth: '300px',
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
