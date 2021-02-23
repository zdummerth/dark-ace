import React, { useState } from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { BrandButton } from '../utils/styles'


const SlideshowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  background: rgba(0,0,0,.90);
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 500;
`
const ImagesContainer = styled.div`
  position: relative;
  overflow: hidden;
  // height: 70%;
  flex: 1;
  width: 100%;
`

const Slide = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    opacity: ${props => props.active ? '1' : '0'};
    transition: opacity .5s ease-in;

    .gatsby-image-wrapper {
        height: 100%;
        width: 100%;
        max-width: 800px;
        margin: 10px auto;
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


const SlideShow = ({
  close,
  startingIndex,
  thumbs,
  fulls
}) => {

  console.log(fulls)

  const [index, setIndex] = useState(startingIndex);

  const fullImages = fulls.map((t, ind) => {
    return (
      <Slide active={ind === index}>
        <Img
          fluid={t.localFile.childImageSharp.fluid}
          className='slide-img'
          imgStyle={{
            objectFit: 'contain',
            width: '100%',
            // height: '100%',
          }}
        />
      </Slide>
    )
  })


  // const handleNext = () =>
  //   index === fullImages.length - 1 ? setIndex(0) : setIndex(index + 1)
  // const handlePrevious = () =>
  //   index === 0 ? setIndex(fullImages.length - 1) : setIndex(index - 1)

  return (
    <SlideshowContainer >
      <ImagesContainer>
        {fullImages}
      </ImagesContainer>
      <ThumbnailContainer>
        {thumbs.map((thumb, ind) => (
          <Thumbnail key={thumb.id} onClick={() => setIndex(ind)}>
            <Img
              fixed={thumb.localFile.childImageSharp.fixed}
              alt={'Product Image'}
            />
          </Thumbnail>
        ))}
      </ThumbnailContainer>
      <BrandButton
        onClick={() => close()}
        style={{ fontSize: '20px', marginTop: '10px', marginBottom: '30px' }}
      >
        Close
      </BrandButton>
    </SlideshowContainer>
  )
}

export default SlideShow