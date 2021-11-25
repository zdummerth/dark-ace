import React, { useState } from "react"
import { Link } from "gatsby"
import { GatsbyImage } from 'gatsby-plugin-image'
import { useCheckout } from 'src/hooks/useCheckout'
import styled from 'styled-components'
import { breakpoints, colors, spacing, H3 } from 'src/styles';
import Flex from 'src/components/shared/Flexbox'
import Price from 'src/components/shared/Price'


const ProductContainer = styled.div`
  text-align: center; 
  border: ${({ hideBorder }) => hideBorder ? 'none' : `1px solid ${colors.brand}`};
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin-bottom: 8px;
  }
  @media (max-width: ${breakpoints.tablet}) {
    
  }
`
const ImgContainer = styled(Flex)`
  width: 100%;
  flex: 1;
  // position: relative;
  overflow: hidden;
`
const ThumbnailContainer = styled.div`  
  margin-top: ${spacing.xs};
`
const Thumbnail = styled.button`
  margin-right: 8px;
  // width: 45px;
  // height: 60px;
  border: 0;
  outline: 0;
  background: none;
  :focus {outline:none;}
  ::-moz-focus-inner {border:0;}
`
const ImgLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  .gatsby-image-wrapper {
    transition: all 250ms;
  }

  @media (hover: hover) {
    ${ImgContainer}:hover & {
      .gatsby-image-wrapper {
        transform: scale(1.1);
      }
    }
  }
`
const TextWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ColorButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 8px;
`

const ColorButton = styled.button`
  display: flex;

  & > * {
    flex: 1;
    height: 100%;
  }

  padding: 0;
  width: 22px;
  height: 22px;
  transform: rotate(0.125turn);
  border: 1px solid red;
  border-radius: 50%;
  // background: blue;
  background: transparent;
  overflow: hidden;
`

const colorData = [
  {
    imageId: 'bf8723b3-74df-5584-bd4e-150c1e9545db',
    color1: '#000000',
    color2: 'gray'
  },
  {
    imageId: '6057812a-7597-57d4-a55e-9bc83e4f5bdc',
    color1: colors.brand,
    color2: '#000000'
  },
  {
    imageId: 'e097e48c-e9d5-5411-ade3-128d43c86df7',
    color1: '#ffffff',
    color2: '#000000'
  }
]

const ProductListingItem = ({ product, className, showThumbs, style, hideBorder, hideTitle, containImage }) => {
  const [index, setIndex] = useState(0);

  const {
    available,
    productAvailable
  } = useCheckout(product)


  if (product.handle === 'black-flag-baseball-tee') {
    console.log('product', product)
  }

  return (
    <ProductContainer
      className={className}
      style={style}
      hideBorder={hideBorder}
    >
      <InfoContainer>
        <TextWrapper
          to={`/shop/${product.handle}`}
        >
          {!hideTitle && (
            <div>
              <H3>{product.title}</H3>
            </div>
          )}
          {!productAvailable &&
            <p>Sold Out!</p>
          }
        </TextWrapper>
        {product.handle === 'black-flag-baseball-tee' && (
          <ColorButtonContainer>
            {colorData.map(d => {
              const handleClick = () => {
                const image = product.images.findIndex(i => i.id === d.imageId)
                // console.log('imageIndex', image)
                setIndex(image)
              }
              return (
                <ColorButton key={d.imageId} onClick={handleClick}>
                  <div className='left' style={{ backgroundColor: d.color1 }} />
                  {/* <div className='left' style={{ background: d.color1 }} /> */}
                  {/* <div className='right' /> */}
                  <div className='right' style={{ backgroundColor: d.color2 }} />

                </ColorButton>
              )
            })}
          </ColorButtonContainer>
        )}
        <Price
          price={product.priceRangeV2.minVariantPrice.amount}
          compareAtPrice={product.variants[0].compareAtPrice}
        />
      </InfoContainer>
      <ImgContainer>
        <ImgLink to={`/shop/${product.handle}`}>
          <GatsbyImage
            image={product.images[index].gatsbyImageData}
            alt={'Product Image'}
          // objectFit='contain'
          // objectFit={'cover'}

          />
        </ImgLink>
      </ImgContainer>

      {showThumbs ?
        <ThumbnailContainer>
          {product.thumbs.map((thumb, ind) => (
            <Thumbnail key={thumb.id} onClick={() => setIndex(ind)}>
              <GatsbyImage
                image={thumb.gatsbyImageData}
                alt={product.title}
              />
            </Thumbnail>
          ))}
        </ThumbnailContainer>
        : null}
    </ProductContainer >
  )
}


export default ProductListingItem

