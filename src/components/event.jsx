import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';

import { colors, BrandButton } from '../utils/styles'

const Wrapper = styled.div`
    width: 100%;
    max-width: 500px;

   .button-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
   }

   .content {
    max-height: ${({ minimized }) => minimized ? '0' : '626px'};
    transition: all 0.5s linear;
    overflow: hidden;

    @media(min-width: 411px) {
      max-height: ${({ minimized }) => minimized ? '0' : '741px'};
    }
   }
`

const Toggle = styled.div`
  width: 100%;
  text-align: center;
  background: ${colors.darkGradient};
  padding-top: 5px;
  padding-bottom: 5px;
  border-top: 1px solid ${colors.lightest};
`

const StyledButton = styled(BrandButton)`
  width: 250px;
  display: block;
  margin-bottom: 10px;
  text-align: center;
`



const Event = ({ 
  events,
  minimized, 
  setMinimized 
}) => {

  const icon = minimized ? <BsCaretDown /> : <BsCaretUp />;
  const title = minimized ? 'Show Upcoming Events' : 'Hide Upcoming Events'


  return (
    <Wrapper minimized={minimized}>
      <div className='content'>
        <Img
          fixed={image}
        />
        <div className='button-wrapper'>
          {events.map(event => {
            return (
              <StyledButton as='a' href={event.link} key={event.link}>
                {`Register for ${event.location}`}
              </StyledButton>
            )
          })}
        </div>
      </div>
      <Toggle onClick={() => setMinimized(!minimized)}>
        <div>{title}</div>
        <div>{icon}</div>
      </Toggle>
    </Wrapper>
  )
}

export default Event