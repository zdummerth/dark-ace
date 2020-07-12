import React, { useState, useEffect} from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { RiArrowRightLine } from "react-icons/ri"
import { RiArrowLeftLine } from "react-icons/ri"

const SlideshowContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  // border: 1px solid #C00A0A;
  position: relative;
  margin: 15px auto;
  max-width: 800px;
  height: 50vh;
  max-height: 500px;
  img {
    // border: 3px solid blue;
  }
`


const SlideshowControls = styled.div`
  display: flex;
  justify-content: space-between;
  // align-items: center;
  width: 100%;
  height: 100%;
  // margin: 5px auto;
  position: absolute;
  z-index: 2;
  button {

  }
`
const SlideshowButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  font-size: 50px;
  color: #C00A0A;
  :hover {
      cursor: pointer;
  }
  svg {
    // border: 1px solid #C00A0A;
  }
`
const ThumbsContainer = styled.div`
  display: flex;
`
const ThumbWrapper = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
  overflow: hidden;
  margin-left: 1.5px;
  margin-right: 1.5px;
  :hover {
      cursor: pointer;
  }
  @media (max-width: 786px) {
      height: 30px;
      width: 30px;
  }
`

const SlideShow = () => {
  const data = useStaticQuery(graphql`
  query {
    allFile(filter: {relativeDirectory: {eq: "slideshow"}}) {
      edges {
        node {
          full: childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`)

  const fullImages = data.allFile.edges.map(({ node }) => node.full.fluid)
  const [index, setIndex] = useState(0);

  const handleNext = () =>
    index === fullImages.length - 1 ? setIndex(0) : setIndex(index + 1)
  const handlePrevious = () =>
    index === 0 ? setIndex(fullImages.length - 1) : setIndex(index - 1)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     handleNext()
  //   }, 3000); //duration
  //   return () => clearInterval(timer); //cleanup
  // }, [handleNext]);


  return(
      <SlideshowContainer >
            <Img
                fluid={fullImages[index]}
                alt={'slideshow for feature images'}
                fadeIn={true}
                style={{height: '100%'}}
                imgStyle={{ objectFit: 'contain' }}
            />
            <SlideshowControls>
              <SlideshowButton onClick={handlePrevious}><RiArrowLeftLine/></SlideshowButton>
              {/* <ThumbsContainer>
                {thumbs}
              </ThumbsContainer> */}
              <SlideshowButton className='slideshow-button' onClick={handleNext}><RiArrowRightLine/></SlideshowButton>
            </SlideshowControls>
      </SlideshowContainer>
  )
}

export default SlideShow