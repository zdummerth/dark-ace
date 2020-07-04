import React, { useState, useEffect} from "react"
import Img from "gatsby-image"
import { RiArrowRightLine } from "react-icons/ri"
import { RiArrowLeftLine } from "react-icons/ri"
//import PropTypes from 'prop-types'

const SlideShow = ({images}) => {
  const [index, setIndex] = useState(0);

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

  const { fluid } = images[index].childImageSharp

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
    <div className='slideshow-container'>
        <h1>Featured Projects</h1>
        <div className="main-container">
          <Img
              fluid={fluid}
              alt={'slideshow for feature images'}
              fadeIn={true}
          />
          <div className="slideshow-controls">
            <button className='slideshow-button' onClick={handlePrevious}><RiArrowLeftLine/></button>
            <div className='featured-thumbs-container'>
              {thumbs}
            </div>
            <button className='slideshow-button' onClick={handleNext}><RiArrowRightLine/></button>
          </div>
        </div>
    </div>
  )
}

export default SlideShow