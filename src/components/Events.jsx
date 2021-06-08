import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { FaExternalLinkAlt } from 'react-icons/fa'


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
    // max-height: ${({ minimized }) => minimized ? '0' : '312px'};
    // transition: all 0.3s linear;
    // overflow: hidden;
   }
`

const EventWrapper = styled.div`
   padding-top: 10px;
   padding-bottom: 10px;
  //  padding-right: 5px;
  //  border-bottom: 1px solid ${colors.grayBackground};
  margin-bottom: 25px;


   #no-btm-border {
      border-bottom: none;
   }
`


const StyledButton = styled(BrandButton)`
  display: flex;
  justify-content: space-around;
  width: 100px;
  margin-bottom: 10px;
  text-align: center;
`

const Details = styled.div`
padding: 10px;
   p {
     margin-bottom: 10px;
   }
`

const Event = ({ event }) => {

  return (
    <>
      <EventWrapper
        ai='center'
        jc='center'
      >
        <Img
          fluid={event.image}
        />
      </EventWrapper>
      <Details>
        <h2>
          NADGT Exclusive @ Barracks and The Bunker Presented by Dark Ace
        </h2>
        <p>
          PDGA B-Tier consisting of two rounds: One at Jefferson Barracks OG and one at The Bunker.
        </p>
        <p>
          Check in will be from 7:30-8:30
          Player meeting will be at 8:45
          Tee off for round 1 will be at 9:05
          We will break 1 hour for lunch (not provided)
          Round 2 will start 1 hour after the final card's come in
        </p>
        <p>
          Single Event Divisions offered:
        </p>
        <p>
          -MA1/MA2/MA3
        </p>
        <p>
          -FA1/FA2
        </p>
        <p>
          Age Protected Divisions offered:
        </p>
        <p>
          -MA40/MA50+
        </p>
        <p>
          -FA40+
        </p>
        <p>
          -MJ18
        </p>
        <p>
          -FJ18
        </p>
        <StyledButton
          as='a'
          href={event.link}
          id='no-btm-border'
        >
          <div>Register</div>
          <FaExternalLinkAlt />
        </StyledButton>
      </Details>

    </>
  )
}



const Events = ({ events }) => {

  return (
    <Wrapper>
      <div className='content'>
        {events.map(event => <Event event={event} key={event.link} />)}
      </div>
    </Wrapper>
  )
}

export default Events