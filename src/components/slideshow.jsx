import React, { useState, useEffect} from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"
import { FaExternalLinkAlt } from 'react-icons/fa';

const SlideshowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // border: 1px solid #C00A0A;
  position: relative;
  margin: 15px auto;
  max-width: 1200px;
  height: 70vh;
  max-height: 900px;
  @media (max-width: 768px) {
    height: 50vh;
  }
`
const ImagesContainer = styled.div`
  position: relative;
  height: 100%;
`

const SlideshowControls = styled.div`
  display: flex;
  // justify-content: center;
  justify-content: space-between;
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

  const ExtIcon = styled(FaExternalLinkAlt)`
  font-size: 15px;
  margin-left: 5px;
  color: #C00A0A;
`

const SlideShow = () => {
//   const data = useStaticQuery(graphql`
//   query {
//     allFile(filter: {relativeDirectory: {eq: "slideshow"}}) {
//       edges {
//         node {
//           full: childImageSharp {
//             fluid(maxWidth: 800, quality: 100, fit: CONTAIN) {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//     }
//   }
// `)

const data = useStaticQuery(graphql`
query {
  markdownRemark(frontmatter: {title: {eq: "slideshow"}}) {
    frontmatter {
      slides {
        link
        image {
          full: childImageSharp {
            fluid(maxWidth: 800, quality: 100, fit: CONTAIN) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
}
`)

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext()
    }, 3700); //duration
    return () => clearInterval(timer); //cleanup
  });

  // const fluid = data.allFile.edges.map(({ node }) => node.full.fluid)
  // const images = data.allFile.edges.map(({ node }, ind) => (

  const currentLink = data.markdownRemark.frontmatter.slides[index].link
  const images = data.markdownRemark.frontmatter.slides.map((slide, ind) => (
    <a href={slide.link} target='_blank'>
      <Img 
        fluid={slide.image.full.fluid} 
        alt={'slideshow for feature images'}
        fadeIn={false}
        style={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          zIndex: `${index === ind ? '1' : '-10'}`,
          opacity: `${index === ind ? '1' : '0'}`,
          // height: `${index === ind ? '100%' : '0'}`,
          transition: 'opacity .8s ease-in', 
        }}
        imgStyle={{ 
          objectFit: 'contain', 
        }}
      />
    </a>
  ))
  const dots = images.map((el, ind) => <Dot active={index === ind} onClick={() => setIndex(ind)} />)

  const handleNext = () =>
    index === images.length - 1 ? setIndex(0) : setIndex(index + 1)
  const handlePrevious = () =>
    index === 0 ? setIndex(images.length - 1) : setIndex(index - 1)

  return(
      <SlideshowContainer >
        <ImagesContainer>
          {images}
        </ImagesContainer>
        <a href={currentLink} target='_blank' style={{marginBottom: '0', marginTop: '3px', color: '#C00A0A', textAlign: 'center', verticalAlign: 'center', textDecoration: 'none'}}>Click to view in shop<ExtIcon /></a>
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