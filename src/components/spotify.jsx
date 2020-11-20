import React, { useState } from 'react'
import styled from "styled-components"
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';

import { colors } from '../utils/styles';

const Toggle = styled.div`
  width: 100%;
  text-align: center;
  background: ${colors.grayBackground};
  font-size: 2rem;
  margin: 0;
`

const Container = styled.div`
  width: 100%;
  background-image: linear-gradient(to right, ${colors.background} 0%, ${colors.background} 20%, ${colors.brand} 50%, ${colors.brand} 50%, ${colors.background} 80%, ${colors.background} 100%);
  .widget {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    display: block;
    transition: all 0.3s linear;
    background: ${colors.grayBackground};

  }

  .toggle {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    // background: ${colors.background};
  }

`


const Spotify = () => {

  const [minimized, setMinimized] = useState(true)

  return (
    <Container>
      <iframe 
          src="https://open.spotify.com/embed/playlist/7zcIKw7G0LJixjMKnASf9s?si=B66XDLQ-Q-W3lsPX1_ZLig" 
          width="100%"
          height={minimized ? '80' : '380'} 
          className='widget'
          frameborder="0" 
          allowtransparency="true" 
          allow="encrypted-media"
          title='Dark Ace Spotify Playlist'>    
      </iframe>
      <Toggle className='toggle' onClick={() => setMinimized(!minimized)}>{minimized ? <FiArrowDown/> : <FiArrowUp/>}</Toggle>
    </Container>
  )
}

export default Spotify
