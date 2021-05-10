import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'

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
  display: block;
  width: 75px;
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
        <p>
          Dark Ace and The St.Louis Disc Golf Club Present: 2021 USDGC Amateur Doubles Qualifer
        </p>
        <p>
          ***This is a Amateur only tournament. Make sure your PDGA certification states AM and not PRO. If it has Pro, contact the PDGA to inquire how to get it changed to Amateur.***
        </p>
        <p>
          FORMAT:
        </p>
        <p>
          BYOP doubles (Bring Your Own Partner)
        </p>
        <p>
          Captain's Choice (Best Shot)
        </p>
        <p>
          $50 a team
        </p>
        <p>
          Each player get a premium INNOVA disc with the US Doubles hotstamp, a mini, and a Dark Ace hat.
        </p>
        <p>
          The winning team/s qualify to play in the US Doubles Championships in Rock Hill at Winthrop Gold the weekend before USDGC. October 1st-3rd
        </p>
        <p>
          0-14 Teams = 1 Team qualifies
        </p>
        <p>
          15-24 Teams = 2 Teams qualifies
        </p>
        <p>
          25+ Teams = 3 Teams qualifies
        </p>
        <p>
          This will be 2 rounds, 1 round at Endicott and 1 round at Carrollton.
        </p>
        <StyledButton
          as='a'
          href={event.link}
          id='no-btm-border'
        >
          Register
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