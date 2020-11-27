import React from 'react'
import styled from "styled-components"

const Container = styled.div`
  align-self: center;
  position: relative; 
  padding-bottom: 56.25%; 
  width: 90%;
  background: transparent;

  iframe {
    position: absolute; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
    background: transparent;

  }
`


const Youtube = () => {

  return (
    <Container>
      <iframe 
          src="https://www.youtube.com/embed/SixIQVA4qDg" 
          frameBorder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen={true}
          title='2020 ledgestone commercial'
      ></iframe>
    </Container>
  )
}

export default Youtube