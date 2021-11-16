import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from 'gatsby-plugin-image'
import { RightArrowAlt } from '@styled-icons/boxicons-regular'
import styled from 'styled-components'
import { breakpoints, colors, spacing, H3 } from 'src/styles';
import Flex from 'src/components/shared/Flexbox'


const Wrapper = styled.div`
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
  overflow: hidden;
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
  // flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;

  // background: ${colors.gradient};
  width: 100%;

`

const InfoContainer = styled.div`
  display: flex;
  // flex-direction: column;
  background: ${colors.downGradient};
  width: 100%;
`

const ProductListingItem = ({ collection, className, style, hideBorder, hideTitle, containImage }) => {

  return (
    <Wrapper
      className={className}
      style={style}
      hideBorder={hideBorder}
    >
      <InfoContainer>
        <TextWrapper
          to={`/shop/collection/${collection.handle}`}
        >
          <H3 style={{ margin: '10px' }}>{collection.title}</H3>
          <RightArrowAlt size={24} />
        </TextWrapper>
      </InfoContainer>
      <ImgContainer>
        <ImgLink to={`/shop/collection/${collection.handle}`}>
          <GatsbyImage
            image={collection.image}
            alt={'Product Image'}
          // objectFit='contain'
          // objectFit={'cover'}
          />
        </ImgLink>
      </ImgContainer>
    </Wrapper >
  )
}


export default ProductListingItem

