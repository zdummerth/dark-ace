import React, { useState } from "react"
import { Link } from "gatsby"
import { GatsbyImage } from 'gatsby-plugin-image'
import { useCheckout } from 'src/hooks/useCheckout'
import styled from 'styled-components'
import { breakpoints, colors, spacing, H3 } from 'src/styles';
import Flex from 'src/components/shared/Flexbox'


const ProductContainer = styled.div`
  text-align: center; 
  border: ${({ hideBorder }) => hideBorder ? 'none' : `1px solid ${colors.brand}`};
  padding: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
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

const ProductListingItem = ({ product, className, showThumbs, style, hideBorder, hideTitle, containImage }) => {
  const [index, setIndex] = useState(0);

  const {
    available,
  } = useCheckout(product)
  // console.log('availbitlit', available)

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
            <H3>{product.title}</H3>
          )}
          {!available &&
            <p>Sold Out!</p>
          }
          {
            product.title === 'Anarchy Dad Hat' && available && (
              <div style={{ padding: '5px' }}>
                <div>Available in: </div>
                <div>Turquoise, Green, Red, Black, Purple</div>
                {/* <div>Green</div>
            <div>Red</div>
            <div>Black</div>
            <div>Purple</div> */}
              </div>
            )
          }
        </TextWrapper>
      </InfoContainer>
      <ImgContainer>
        <ImgLink to={`/shop/${product.handle}`}>
          <GatsbyImage
            image={product.images[index].gatsbyImageData}
            alt={'Product Image'}
            // objectFit='contain'
            objectFit={product.title === 'Anarchy Dad Hat' ? 'contain' : 'cover'}

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

