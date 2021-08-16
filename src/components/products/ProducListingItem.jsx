import React, { useState } from "react"
import { Link } from "gatsby"
import { GatsbyImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { breakpoints, colors, spacing, Subtitle, H3 } from 'src/styles';
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
  position: relative;
  overflow: hidden;
`
const ThumbnailContainer = styled.div`  
  margin-top: ${spacing.xs};
`
const Thumbnail = styled.button`
  margin-right: 8px;
  width: 45px;
  height: 60px;
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
  // height: 100%;
  flex-direction: column;
  align-items: center;
  // justify-content: space-between;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  // flex: 1;
`

const Text = styled.div`
  width: 80%;
  max-width: 400px;
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



const ProductListingItem = ({ product, className, showThumbs, style, hideBorder, hideTitle, containImage }) => {
  const [index, setIndex] = useState(0);
  // console.log(product.availableForSale)

  return (
    <ProductContainer
      className={className}
      style={style}
      hideBorder={hideBorder}
    >
      <InfoContainer>
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
        <TextWrapper
          to={`/shop/${product.handle}`}
        >
          {!hideTitle && (
            <H3>{product.title}</H3>
          )}
          {!product.totalInventory > 0 &&
            <p>Sold Out!</p>
          }
        </TextWrapper>
      </InfoContainer>
      <ImgContainer>
        <ImgLink to={`/shop/${product.handle}`}>
          <GatsbyImage
            image={product.images[index].gatsbyImageData}
            alt={'Product Image'}
          />
        </ImgLink>
      </ImgContainer>
    </ProductContainer >
  )
}


export default ProductListingItem

