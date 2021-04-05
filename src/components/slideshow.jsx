import React, { useState, useEffect } from 'react'
import Img from 'gatsby-image'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { RiArrowRightLine, RiArrowLeftLine } from 'react-icons/ri'
import { colors, breakpoints } from '../utils/styles'


const SlideshowContainer = styled.div`
  width: 100%;
  height: 150px;

  @media (min-width: ${breakpoints.tablet}) {
    height: 250px;
  }

  @media (min-width: ${breakpoints.desktop}) {
    height: 350px;
  }

  @media (min-width: ${breakpoints.hd}) {
    height: 427px;
  }

  // background: gray;
  // border: 1px solid red;

`
const ImagesContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
`

const SlideshowControls = styled.div`
  display: flex;
  height: 10%;
  justify-content: center;
  align-items: center;
  margin: 1px auto;
  max-width: 60%;
`
const SlideshowButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  font-size: 40px;
  color: ${colors.lightest};
  :hover {
      cursor: pointer;
  }
`

const DotContainer = styled.div`
  display: flex;
`
const Dot = styled.div`
  border: 2px solid ${colors.lightest};
  border-radius: 50%;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background: ${props => (props.active ? colors.lightest : '')};
  :hover {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    height: 10px;
    width: 10px;
  }
  `

const Slide = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    opacity: ${props => props.active ? '1' : '0'};
    transition: opacity .7s ease-in;

    .gatsby-image-wrapper {
        height: 100%;
    }
  `


const SlideShow = ({ setIsSlideshowOpen, startingIndex }) => {


  const data = useStaticQuery(graphql`
  query {
    giveBack: file(relativePath: { eq: "da-giveback-banner.png" }) {
      childImageSharp {
        fluid(maxWidth: 1280) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    motto: file(relativePath: { eq: "motto.png" }) {
      childImageSharp {
        fluid(maxWidth: 1280) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  `)


  const images = [data.giveBack, data.motto]
  const [index, setIndex] = useState(0);


  console.log(images)

  const slides = images.map((img, ind) => {
    return (
      <Slide active={ind === index}>
        <Img
          fluid={img.childImageSharp.fluid}
          className='slide-img'
          imgStyle={{
            objectFit: 'contain',
            // objectPosition: 'center center',
            // width: '100%',
            // height: '100%',
          }}
        />
      </Slide>
    )
  })

  const dots = images.map((el, ind) => <Dot active={index === ind} onClick={() => setIndex(ind)} />)

  const handleNext = () =>
    index === images.length - 1 ? setIndex(0) : setIndex(index + 1)
  const handlePrevious = () =>
    index === 0 ? setIndex(images.length - 1) : setIndex(index - 1)



    useEffect(
      () => {
        const interval = setInterval(handleNext, 4000);
  
        return () => {
          clearInterval(interval);
        };
      },
      [handleNext]
    );

  return (
    <SlideshowContainer >
      <ImagesContainer>
        {slides}
      </ImagesContainer>
      <SlideshowControls>
        {/* <SlideshowButton onClick={handlePrevious}><RiArrowLeftLine /></SlideshowButton> */}

        {/* <DotContainer>
          {dots}
        </DotContainer> */}

        {/* <SlideshowButton onClick={handleNext}><RiArrowRightLine /></SlideshowButton> */}
      </SlideshowControls>
    </SlideshowContainer>
  )
}

export default SlideShow