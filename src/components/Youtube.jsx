import React from 'react'
import styled from "styled-components"
import { Subtitle, Spacer } from '../utils/styles'


const Container = styled.div`
  align-self: center;
  position: relative; 
  padding-bottom: 56.25%; 
  width: 90%;
  max-width: 1000px;
  // background: grey;

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
    <>
      <Spacer />
      <Subtitle>Frolfcenter Interview</Subtitle>
      <Container>
        <iframe
          src="https://www.youtube.com/embed/9LCm3OVtfRo"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
          title='frolfcenter'
        ></iframe>
      </Container>
      <Spacer />
      <Subtitle>Zen Disc Golf Interview</Subtitle>
      <Container>
        <iframe
          src="https://www.youtube.com/embed/of3Yqi3SfcM"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
          title='2020 ledgestone commercial'
        ></iframe>
      </Container>
      <Spacer />
      <Subtitle>Ledgestone Commercial</Subtitle>
      <Container>
        <iframe
          src="https://www.youtube.com/embed/SixIQVA4qDg"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
          title='2020 ledgestone commercial'
        ></iframe>
      </Container>
    </>
  )
}

export default Youtube