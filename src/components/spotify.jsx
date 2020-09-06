import React, { useState } from 'react'
import styled from "styled-components"
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';

const Container = styled.div`
  width: 100%;
  max-width: 500px;
`
const Toggle = styled.div`
  width: 100%;
  text-align: center;
  background-color: #262626;
  font-size: 2rem;
  margin: 0;
`

const Spotify = () => {

  const [minimized, setMinimized] = useState(true)

  return (
    <Container>
      <iframe 
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWOaP4H0w5b0" 
          width="100%"
          height={minimized ? '80' : '380'} 
          frameborder="0" 
          allowtransparency="true" 
          allow="encrypted-media">    
      </iframe>
      <Toggle onClick={() => setMinimized(!minimized)}>{minimized ? <FiArrowDown/> : <FiArrowUp/>}</Toggle>
    </Container>
  )
}

export default Spotify