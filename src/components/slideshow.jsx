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
  margin: 30px auto;
  max-width: 800px;
  height: 80vh;
  img {
    // border: 3px solid blue;
  }
`


const SlideshowControls = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  margin: 5px auto;
  // height: 20%;
`
const SlideshowButton = styled.button`
  display: flex;
  background: none;
  border: none;
  outline: none;
  font-size: 40px;
  color: #C00A0A;
  :hover {
      cursor: pointer;
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
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 2;
`

const SlideShow = () => {
  const data = useStaticQuery(graphql`
  query {
    allFile(filter: {relativeDirectory: {eq: "slideshow"}}) {
      edges {
        node {
          full: childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
          thumb: childImageSharp {
            fixed(width: 50, height: 50) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`)

  const fullImages = data.allFile.edges.map(({ node }) => node.full.fluid)
  const thumbImages = data.allFile.edges.map(({ node }) => node.thumb.fixed)
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

  const thumbs = thumbImages.map((img, ind) => {
    return (
      <ThumbWrapper 
        onClick={() => setIndex(ind)}
        key={ind}
        >
          <Img
            fixed={img}
            alt={'thumbnail for featured images slideshow'}
          />
          {index === ind ? null : <Overlay />}
      </ThumbWrapper>
    )
  })

  return(
    <>
      <h1>SlideShow</h1>
      <SlideshowContainer >
            <Img
                fluid={fullImages[index]}
                alt={'slideshow for feature images'}
                fadeIn={true}
                style={{maxHeight: '80%'}}
            />
            <SlideshowControls>
              <SlideshowButton onClick={handlePrevious}><RiArrowLeftLine/></SlideshowButton>
              <ThumbsContainer>
                {thumbs}
              </ThumbsContainer>
              <SlideshowButton className='slideshow-button' onClick={handleNext}><RiArrowRightLine/></SlideshowButton>
            </SlideshowControls>
      </SlideshowContainer>
    </>
  )
}

export default SlideShow