import React from 'react'
import styled from "styled-components"

const Container = styled.div`
  position: relative; 
  padding-bottom: 56.25%; 
  // height: 0; 
  // overflow: hidden; 
  width: 90%;
  // height: auto !important;

  iframe {
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
  }
`

const Youtube = () => {

  return (
    <Container>
      <iframe 
          // width='560'
          // height='315'
          src="https://www.youtube.com/embed/SixIQVA4qDg" 
          frameborder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen='true'
      ></iframe>
    </Container>
  )
}

export default Youtube