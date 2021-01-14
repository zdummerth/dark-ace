import React, { useState } from 'react'
import styled from "styled-components"

import { colors } from '../utils/styles';


const Values = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: ${colors.background};

`
const Span = styled.span`
border: ${props => (props.selected ? `none` : '1px solid rgba(232, 232, 232, .3)')};
background: ${props => (props.selected ? `${colors.gradient}` : 'black')};
box-shadow: ${props => (props.selected ? ` 0 0 5px ${colors.lightest}` : '')};

padding: .65rem;
border-radius: 5px;
// font-weight: bold;
:hover {
    cursor: pointer;
  }
`

const OptionDisplay = ({
  name,
  values,
  checkDisabled,
  checkSelected,
  handleOptionClick
}) => {


  return (
    <Values>
      <p>Select {name}:</p>
        {values.map((value, index) => {
          return (
            <Span
                value={value}
                key={`${name}-${value}`}
                disabled={checkDisabled(name, value)}
                selected={checkSelected(name, value)}
                onClick={() => handleOptionClick(name, value, index)}
            >
                {value.toUpperCase()}
            </Span>
          )})}
    </Values>
  )
}

export default OptionDisplay
