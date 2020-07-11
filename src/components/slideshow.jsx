import React, { useState, useEffect} from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { RiArrowRightLine } from "react-icons/ri"
import { RiArrowLeftLine } from "react-icons/ri"
//import PropTypes from 'prop-types'

const SlideshowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #C00A0A;
  margin: 30px auto;
  max-width: 800px;
  height: 80vh;
  overflow: hidden;
`
const ImgContainer = styled.div`
  // height: 50%;
`
const SlideshowControls = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  margin: 5px auto;
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
const SlideShow = () => {
  const data = useStaticQuery(graphql`
  query {
    allFile(filter: {relativeDirectory: {eq: "slideshow"}}) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`)

  const images = data.allFile.edges.map(({ node }) => node)
  const [index, setIndex] = useState(0);
  // const { fluid } = images[index].childImageSharp

  const handleNext = () =>
    index === images.length - 1 ? setIndex(0) : setIndex(index + 1)
  const handlePrevious = () =>
    index === 0 ? setIndex(images.length - 1) : setIndex(index - 1)

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     handleNext()
  //   }, 3000); //duration
  //   return () => clearInterval(timer); //cleanup
  // }, [index, images, handleNext]); //compare

  const thumbs = images.map((img, ind) => {
    const overlay = index === ind ? 'overlay hidden' : 'overlay'
    return (
      <div 
        className="featured-thumb-container"
        onClick={() => setIndex(ind)}
        key={ind}
        >
          <Img
            fluid={img.childImageSharp.fluid}
            alt={'thumbnail for featured images slideshow'}
          />
          <div className={overlay}></div>
      </div>
    )
  })

  return(
    <>
      <h1>SlideShow</h1>
      <SlideshowContainer >
            {/* <ImgContainer> */}
              <Img
                  fluid={images[index].childImageSharp.fluid}
                  alt={'slideshow for feature images'}
                  fadeIn={true}
              />
            {/* </ImgContainer> */}
            <SlideshowControls>
              <SlideshowButton className='slideshow-button' onClick={handlePrevious}><RiArrowLeftLine/></SlideshowButton>
              <div className='featured-thumbs-container'>
                {thumbs}
              </div>
              <SlideshowButton className='slideshow-button' onClick={handleNext}><RiArrowRightLine/></SlideshowButton>
            </SlideshowControls>
      </SlideshowContainer>
    </>
  )
}

export default SlideShow