import React from 'react'
import styled from "styled-components"
// import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';


import { colors, dimensions } from '../utils/styles';


const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: ${colors.background};
  position: fixed;
  top: ${dimensions.headerHeight};
  z-index: 30;

  // max-height: ${({ minimized }) => minimized ? '0px' : '380px'};

`
const IframeWrapper = styled.div`
  // max-height: ${({ minimized }) => minimized ? '80px' : '380px'};
  max-height: ${({ minimized }) => minimized ? '0px' : '450px'};
  transition: all 0.3s linear;
  overflow: hidden;
`
const Toggle = styled.div`
  width: 100%;
  text-align: center;
  background: ${colors.gradient};
  padding-top: 5px;
  padding-bottom: 5px;
  height: 50px;
  // border-top: 1px solid ${colors.grayBackground};
`

const Spotify = ({ minimized, setMinimized }) => {

  const icon = minimized ? <BsCaretDown /> : <BsCaretUp />;
  // const title = minimized ? 'Show Playlist' : 'Hide Playlist'
  const title = 'Listen To Metal'



  return (
    <Container>
      <IframeWrapper minimized={minimized}>
        <iframe
          src="https://open.spotify.com/embed/playlist/7zcIKw7G0LJixjMKnASf9s?si=B66XDLQ-Q-W3lsPX1_ZLig"
          width="100%"
          height="400"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          title='Dark Ace Spotify Playlist'>
        </iframe>
        <Toggle onClick={() => setMinimized(true)}>
          <div>Hide Playlist</div>
          <div>{icon}</div>
        </Toggle>
      </IframeWrapper>
    </Container>
  )
}

export default Spotify
