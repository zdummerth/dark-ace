import React, { useState } from "react"
import { Link } from "gatsby"
import styled from 'styled-components'
import Img from 'gatsby-image'


import { breakpoints, colors } from '../../utils/styles';
import { formatPrice } from '../../utils/helpers';



const ProductContainer = styled.div`
  margin: ${props => props.isFeature ? '0' : '15px'};
  text-align: center; 
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${colors.brand};


  @media (max-width: ${breakpoints.tablet}) {
    &:last-child {
        // padding-right: ${props => props.isSingleItem ? '0' : '15px'};
      }
  }
`

const ImgContainer = styled.div`
  width: ${({ isFeature }) => isFeature ? '70vw' : '60vw'};
  max-width: ${({ isFeature }) => isFeature ? '400px' : '350px'};
  height: ${({ isFeature }) => isFeature ? '400px' : '35vh'};
  max-height: ${({ isFeature }) => isFeature ? '400px' : '400px'};

  position: relative;
  overflow: hidden;
  @media (max-width: ${breakpoints.tablet}) {

  }
`

const ThumbnailContainer = styled.div`  
  margin-top: 5px;

`

const Thumbnail = styled.button`
    margin-right: 8px;
    width: 48px;
    height: 60px;
    border: 0;
    outline: 0;
    background: none;
    :focus {outline:none;}
    ::-moz-focus-inner {border:0;}
`

const ImgLink = styled(Link)`
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

const TextWrapper = styled.div`
  // margin-top: 20px;
  // margin-bottom: 20px;

  & > * {
    margin-top: 10px;
    margin-bottom: 5px;
  }
`

// const CompareAtPriceWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `
// const CompareAtPrice = styled.div`
//   position: relative;
//   // font-size: 1.75rem;
//   margin-right: 20px;

//   .line-through {
//     position: absolute;
//     border-top: 2px solid ${colors.brand};
//     width: 100%;
//     transform: rotate(-10deg);
//     top: 50%;
//   }
// `

// const NewPrice = styled.div`
//   -webkit-text-stroke: 1px ${colors.brand};
//   font-size: 2.5rem;
//   font-weight: bold;
//   color: ${colors.lightest};
//   text-shadow:
//   -1px -1px 0 ${colors.brand},  
//   1px -1px 0 ${colors.brand},
//   -1px 1px 0 ${colors.brand},
//     1px 1px 6px ${colors.lightest};
// `

const ProductListingItem = ({ product, isSingleItem, className, isFeature, showThumbs, isGiftCard }) => {
  const [index, setIndex] = useState(0);

  // const [variant, setVariant] = useState(product.variants[0]);


  const minPrice = formatPrice(product.priceRange.minVariantPrice)
  const maxPrice = formatPrice(product.priceRange.maxVariantPrice)

  // const compareAtPrice = product.variants[0].compareAtPriceV2 ? (
  //   formatPrice(product.variants[0].compareAtPriceV2)
  // ) : (
  //   null
  // )

  const price = isGiftCard ? `${minPrice} - ${maxPrice}` : minPrice;

  // const priceDisplay = compareAtPrice ? (
  //   <>
  //     <CompareAtPriceWrapper>
  //       <CompareAtPrice>
  //         <div>{compareAtPrice}</div>
  //         <div className="line-through"></div>
  //       </CompareAtPrice>
  //       <NewPrice>{price}</NewPrice>
  //     </CompareAtPriceWrapper>
  //   </>
  // ) : (
  //   <div className="price">{price}</div>
  // )

  const priceDisplay = <div className="price">{price}</div>
    

  const images = product.images.map((image, ind) => (
        <ImgLink
            to={`/shop/${product.handle}`}
            hidden={index !== ind}
            key={image.id}
        >
            <Img 
                fluid={image.localFile.childImageSharp.fluid} 
                alt={product.title}
                style={{
                  position: 'absolute',
                  top: '0',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  opacity: `${index === ind ? '1' : '0'}`,
                  transition: 'opacity .8s ease-in', 
                }}
                imgStyle={{ 
                  objectFit: 'contain', 
                }}
            />
        </ImgLink>
  ))

  return (
      <ProductContainer 
        className={className} 
        key={product.shopifyId} 
        isSingleItem={isSingleItem}
        isFeature={isFeature}
      >
        <ImgContainer isFeature={isFeature}>
            {images}
        </ImgContainer>

        {showThumbs ?
          <ThumbnailContainer>
            {product.thumbs.map((thumb, ind) => (
              <Thumbnail key={thumb.id} onClick={() => setIndex(ind)}>
                <Img 
                    fixed={thumb.localFile.childImageSharp.fixed} 
                    alt={product.title}
                />
              </Thumbnail>
            ))}
          </ThumbnailContainer>
        : null }
        <Link to={`/shop/${product.handle}`}>
          <TextWrapper>
            <h3>{product.title}</h3>
            <h3>{priceDisplay}</h3>
          </TextWrapper>
        </Link>
      </ProductContainer>
  )
}


export default ProductListingItem

