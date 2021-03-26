import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';
import FlexBox from './Flexbox'

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
    max-height: ${({ minimized }) => minimized ? '0' : '312px'};
    transition: all 0.3s linear;
    overflow: hidden;
   }
`

const EventWrapper = styled(FlexBox)`
   padding-top: 10px;
   padding-bottom: 10px;
   padding-right: 5px;
   border-bottom: 1px solid ${colors.grayBackground};


   #no-btm-border {
      border-bottom: none;
   }
`

const DateWrapper = styled.div`
  font-size: 16px;
  text-align: center;
  margin-bottom: 10px; 
  border-bottom: 1px solid ${colors.lightest};
`

const InfoWrapper = styled(FlexBox)`
  align-self: stretch;
`

const Toggle = styled.div`
  width: 100%;
  text-align: center;
  background: ${colors.darkGradient};
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 5px;
  border-bottom: 1px solid ${colors.grayBackground};
`

const StyledButton = styled(BrandButton)`
  display: block;
  width: 75px;
  margin-bottom: 10px;
  text-align: center;
`

const Event = ({ event }) => {

  const dateParser = (date) => {
    const options = {
      month: 'short',
      day: 'numeric'
    }
    const partArray = new Intl.DateTimeFormat('en-US', options).formatToParts(date)
    const month = partArray.find(el => el.type === 'month').value
    const day = partArray.find(el => el.type === 'day').value

    return { month, day }
  }

  const { day, month } = dateParser(event.date)


  return (
    <EventWrapper
      ai='center'
      jc='space-between'
    >
      <Img
        fixed={event.image}
      />
      <InfoWrapper
        dir='column'
        ai='center'
      >
        <DateWrapper>{`${month} ${day}`}</DateWrapper>
        <div>{event.title}</div>
        <div>at</div>
        <div>{event.location}</div>
      </InfoWrapper>
      <StyledButton
        as='a'
        href={event.link}
        id='no-btm-border'
      >
        Register
      </StyledButton>
    </EventWrapper>
  )
}



const Events = ({ events, minimized, setMinimized }) => {
  
  // console.log(events[0].date.getDate())

  const icon = minimized ? <BsCaretDown /> : <BsCaretUp />;
  const title = 'Play Disc Golf'
  // const title = minimized ? 'Show Upcoming Events' : 'Hide Upcoming Events'


  return (
    <Wrapper minimized={minimized}>
      <div className='content'>
        {events.map(event => <Event event={event} key={event.link} />)}
      </div>
      <Toggle onClick={() => setMinimized(!minimized)}>
        <div>{title}</div>
        <div>{icon}</div>
      </Toggle>
    </Wrapper>
  )
}

export default Events