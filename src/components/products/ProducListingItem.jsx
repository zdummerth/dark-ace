import React, { useState } from "react"
import { Link } from "gatsby"
import { GatsbyImage } from 'gatsby-plugin-image'
import { useCheckout } from 'src/hooks/useCheckout'
import styled from 'styled-components'
import { breakpoints, colors, spacing, H3 } from 'src/styles';
import Flex from 'src/components/shared/Flexbox'
import Price from 'src/components/shared/Price'
import CamouflageBG from 'src/components/shared/CamouflageBG'



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
  width: 20px;
  height: 20px;
  transform: rotate(0.125turn);
  border: 1px solid white;
  border-radius: 50%;
  // background: transparent;
  overflow: hidden;
`

const baseballTeeColorData = [
  {
    imageId: '1d144520-0aff-5cd4-bf07-f1d7e1d9c18a',
    color1: '#ffffff',
    color2: '#000000'
  },
  {
    imageId: '9e2b3f60-ebf2-5c60-a79a-8d99249ab81d',
    color1: colors.brand,
    color2: '#000000'
  },
  {
    imageId: 'bf8723b3-74df-5584-bd4e-150c1e9545db',
    color1: '#000000',
    color2: 'gray'
  },
]

const hoodieColorData = [
  {
    imageId: 'b4de29d3-4bf8-5809-913f-c86d146c7138',
    component: true
  },
  {
    imageId: 'a81e5b09-32dd-598f-b3e6-46267b56233c',
    color1: '#CDA1DE',
  },
  {
    imageId: '23956480-7ae0-596d-a3d9-9748aac0e883',
    color1: '#FFC0CB',
  },
  {
    imageId: '542d7efc-4ad0-5331-a1b0-97cd75399202',
    color1: '#315E4A',
  },
  {
    imageId: '7020c384-fcd9-5269-843d-0b096b3bff2b',
    color1: '#A5C3EC',
  }
]

const ProductListingItem = ({ product, className, showThumbs, style, hideBorder, hideTitle, containImage }) => {
  const [index, setIndex] = useState(0);

  const {
    available,
    productAvailable
  } = useCheckout(product)


  if (product.handle === 'black-flag-baseball-tee') {
    // console.log('product', product)
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
            {baseballTeeColorData.map(d => {
              const handleClick = () => {
                const image = product.images.findIndex(i => i.id === d.imageId)
                // console.log('images', product.images)
                // console.log('imageIndex', image)
                setIndex(image)
              }
              return (
                <ColorButton key={d.imageId} onClick={handleClick}>
                  <div className='left' style={{ backgroundColor: d.color1 }} />
                  <div className='right' style={{ backgroundColor: d.color2 }} />
                </ColorButton>
              )
            })}
          </ColorButtonContainer>
        )}
        {product.handle === 'forest-green-blood-font-hoodie' && (
          <ColorButtonContainer>
            {hoodieColorData.map(d => {
              const handleClick = () => {
                const image = product.images.findIndex(i => i.id === d.imageId)
                // console.log('imageIndex', image)
                setIndex(image)
              }
              return (
                <ColorButton key={d.imageId} onClick={handleClick}>
                  {d.component ? (
                    <CamouflageBG limit={5} />
                  ) : (
                    <div style={{ backgroundColor: d.color1 }} />
                  )}
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

