import React, { useState, useEffect} from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { RiArrowRightLine } from "react-icons/ri"
import { RiArrowLeftLine } from "react-icons/ri"

const SlideshowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // border: 1px solid #C00A0A;
  position: relative;
  margin: 15px auto;
  max-width: 1000px;
  max-height: 600px;
  @media (max-width: 768px) {
    height: 50vh;
  }
`


const SlideshowControls = styled.div`
  display: flex;
  // justify-content: center;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  max-width: 60%;
`
const SlideshowButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  font-size: 40px;
  color: #C00A0A;
  :hover {
      cursor: pointer;
  }
`

const DotContainer = styled.div`
  display: flex;
`
const Dot = styled.div`
  border: 2px solid #C00A0A;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background: ${props => (props.active ? '#C00A0A' : '')};
  :hover {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    height: 10px;
    width: 10px;
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

  const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     handleNext()
  //   }, 3000); //duration
  //   return () => clearInterval(timer); //cleanup
  // });

  const fluid = data.allFile.edges.map(({ node }) => node.full.fluid)
  const images = data.allFile.edges.map(({ node }) => (
    <Img 
      fluid={node.full.fluid} 
      alt={'slideshow for feature images'}
      fadeIn={true}
      style={{height: '100%'}}
      imgStyle={{ objectFit: 'contain', opacity: '0' }}
    />
  ))
  const dots = fluid.map((el, ind) => <Dot active={index === ind} onClick={() => setIndex(ind)} />)

  const handleNext = () =>
    index === fluid.length - 1 ? setIndex(0) : setIndex(index + 1)
  const handlePrevious = () =>
    index === 0 ? setIndex(fluid.length - 1) : setIndex(index - 1)

  return(
      <SlideshowContainer >
            {/* <Img
                fluid={fluid[index]}
                alt={'slideshow for feature images'}
                fadeIn={true}
                style={{height: '100%'}}
                imgStyle={{ objectFit: 'contain' }}
            /> */}
            {images[index]}
            <SlideshowControls>
              <SlideshowButton onClick={handlePrevious}><RiArrowLeftLine/></SlideshowButton>
                <DotContainer>
                  {dots}  
                </DotContainer>
              <SlideshowButton className='slideshow-button' onClick={handleNext}><RiArrowRightLine/></SlideshowButton>
            </SlideshowControls>
      </SlideshowContainer>
  )
}

export default SlideShow