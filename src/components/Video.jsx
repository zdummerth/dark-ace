import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { BlankButton } from 'src/components/shared/Button'
import { Link } from 'gatsby'
import { colors, breakpoints } from 'src/styles'
import { VolumeFull, VolumeMute } from '@styled-icons/boxicons-regular'


const Container = styled.div`
  .video-wrap {
    position: relative;
    height: calc(100vw/1.77);
    width: 100vw;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  a {
      margin-bottom: 8px;
      @media (min-width: ${breakpoints.tablet}) {
        font-size: 30px;
      }
  }

  h2 {
    @media (min-width: ${breakpoints.tablet}) {
      font-size: 50px;
    }
  }
  
  video {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    overflow: hidden;
    z-index: -1;
  }
  
  .text-overlay {
    z-index: 3;
    position: relative;
    // bottom: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    color: white;
    font-weight: 600;
    text-transform: uppercase;
  }
  
  .background-overlay {
    background: #000000;
    opacity: 0.3;
    z-index: 2;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .fallback {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    z-index: 1;
  }

  .mute {
    position: absolute;
    z-index: 2;
    bottom: 8px;
    right: 8px;
    color: white;
  }
  
  .show {
    z-index: 1;
  }
  
  .hide {
    z-index: -1;
  }
`

const StyledLink = styled(Link)`
  border: 1px solid ${colors.brand};
  border-radius: 50px;
  padding: 10px;
  margin: 20px 0 50px 0;
  background: ${colors.darkGradient};
`
export default function Video({ src, ...rest }) {
    const [allowVideo, setAllowVideo] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    useEffect(() => {
        setAllowVideo(true);
    }, []);

    const videoLoaded = () => {
        setIsVideoLoaded(true);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <Container>
            <div className="video-wrap">
                {allowVideo && (
                    <video
                        {...rest}
                        muted={isMuted}
                        autoPlay
                        loop
                        playsInline
                        onCanPlayThrough={videoLoaded}
                        className={`${isVideoLoaded ? "show" : "hide"}`}
                    >
                        <source
                            src={src}
                            type="video/mp4"
                        />
                    </video>
                )}
                <div
                    style={{
                        backgroundImage:
                            'url("images/DarkAcePromofinals_005.jpg")'
                    }}
                    className={`fallback ${isVideoLoaded ? "hide" : "show"}`}
                />
                <div className="text-overlay">
                    <BlankButton className='mute' onClick={toggleMute}>
                        {!isMuted ? (
                            <VolumeFull size='24' />
                        ) : (
                            <VolumeMute size='24' />
                        )}
                    </BlankButton>
                    <h2>New Arrivals</h2>
                    <StyledLink
                        to={`/shop/collection/featured`}
                    >
                        Shop Now
                    </StyledLink></div>
                <div className="background-overlay" />
            </div>
        </Container>
    );
}