import React from 'react'
import styled from "styled-components"
// import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';


import { colors } from '../utils/styles';


const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: ${colors.background};
`
const IframeWrapper = styled.div`
  max-height: ${({ minimized }) => minimized ? '80px' : '380px'};
  transition: all 0.3s linear;
  overflow: hidden;
`
const Toggle = styled.div`
  width: 100%;
  text-align: center;
  background: ${colors.darkGradient};
  padding-top: 5px;
  padding-bottom: 5px;
  border-top: 1px solid ${colors.lightest};
  // border-bottom: 1px solid ${colors.lightest};
`

const Spotify = ({ minimized, setMinimized }) => {

  const icon = minimized ? <BsCaretDown /> : <BsCaretUp />;
  const title = minimized ? 'Show Playlist' : 'Hide Playlist'



  return (
    <Container>
      <IframeWrapper minimized={minimized}>
        <iframe
          src="https://open.spotify.com/embed/playlist/7zcIKw7G0LJixjMKnASf9s?si=B66XDLQ-Q-W3lsPX1_ZLig"
          width="100%"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          title='Dark Ace Spotify Playlist'>
        </iframe>
      </IframeWrapper>
      <Toggle onClick={() => setMinimized(!minimized)}>
        <div>{title}</div>
        <div>{icon}</div>
      </Toggle>
    </Container>
  )
}

export default Spotify
