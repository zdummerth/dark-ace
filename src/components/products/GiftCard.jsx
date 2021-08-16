import React, { useState } from 'react'
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';

import styled from 'styled-components'
import { GatsbyImage } from 'gatsby-plugin-image'

import { useShopify } from 'src/hooks/useShopify'
import { useCheckout } from 'src/hooks/useCheckout'
import Button from 'src/components/shared/Button'



import { colors, spacing, DarkBrandButton } from 'src/styles';



const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  // align-items: center;
  align-self: center;
  border: 1px solid ${colors.gray};

  margin-top: ${spacing.lg};

`

const ImgContainer = styled.div`
  width: 100%;
  position: relative;
`

const OverLay = styled.div`
  display: ${({ open }) => open ? 'block' : 'none'};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  background: ${colors.brandTransparent};
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  background: ${colors.grayGradient};
  padding: ${spacing.sm};
`


const ListControls = styled.div`
  display: flex;
  align-items: center;
  
  div {
    margin-right: 7px;
  }
`

const CurrentPrice = styled(Button)`
  display: flex;
`


const List = styled.div`
  position: absolute;
  top: 0;

  display: ${({ open }) => open ? 'flex' : 'none'};
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;


  .list-child {
    background: ${colors.darkGradient};
    flex: 1 1 25%;

    border: 1px solid ${colors.lightest};
    color: ${colors.lightest};

    padding: 10px;
    margin: 5px;

    &:hover {
      background-color: red
    }
  }
}
`



const GiftCard = () => {

  const { giftCard } = useShopify()
  const { images, variants } = giftCard

  const {
    variant,
    status,
    addToCart,
    setVariant
  } = useCheckout(giftCard)

  const [listOpen, setListOpen] = useState(false);

  const handleAddToCart = () => {
    if (status !== 'Adding') {
      addToCart(variant.storefrontId, 1)
    }
  }

  const toggleListOpen = () => setListOpen(!listOpen)

  const price = <div>{variant.price}</div>
  const icon = listOpen ? <BsCaretDown size={16} /> : <BsCaretUp />;


  return (
    <ProductContainer>
      <ImgContainer onClick={toggleListOpen}>
        <GatsbyImage
          image={images[0].gatsbyImageData}
          alt={'Gift Card'}
        />
        <OverLay open={listOpen} />
        <List open={listOpen}>
          {variants.map(v => {
            const price = v.price
            return (
              <DarkBrandButton
                className='list-child'
                key={v.shopifyId}
                onClick={() => setVariant(v)}
              >
                {price}
              </DarkBrandButton>
            )
          })}
        </List>
      </ImgContainer>
      <ButtonContainer>
        <Button onClick={handleAddToCart}>Add To Cart</Button>
        <ListControls>
          <CurrentPrice onClick={toggleListOpen}>
            {price}{icon}
          </CurrentPrice>
        </ListControls>
      </ButtonContainer>
    </ProductContainer>
  )
}


export default GiftCard

