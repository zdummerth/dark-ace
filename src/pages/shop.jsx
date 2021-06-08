import React, { useState } from 'react'
import styled from 'styled-components'
import SEO from '../components/seo'
import { useShopify } from '../hooks/useShopify'
import ProductListingItem from '../components/products/ProducListingItem'

import { Listing, Subtitle, Spacer, colors } from '../utils/styles'


const Container = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
`

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid gray;
`

const Tab = styled.div`
  border: 1px solid gray;
  border-radius: 5px 0;
  border-bottom: none;
  padding: 5px;
  background: ${({ selected }) => selected ? colors.brand : 'transparent'};
  cursor: pointer;
`

const Margin = styled.div`
  margin: 5px;
`


const Shop = () => {
  const { tShirts, longsleeves, driFits, headware, accessories, discs } = useShopify()
  console.log({discs})

  const [MainCat, setMainCat] = useState('apparel')
  const [SecCat, setSecCat] = useState('t-shirts')


  return (
    <>
      <SEO title="Shop" />
      <Margin />
      <Tabs>
        <Tab
          selected={MainCat === 'apparel'}
          onClick={() => setMainCat('apparel')}
        >Apparel</Tab>
        <Margin />
        <Tab
          selected={MainCat === 'discs'}
          onClick={() => setMainCat('discs')}
        >Discs</Tab>
      </Tabs>
      <Margin />
      { MainCat === 'apparel' && (
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


      </Container>
    </>
  )
}

// export const query = graphql`
// query {

// }
// `

export default Shop
