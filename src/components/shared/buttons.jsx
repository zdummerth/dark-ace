import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components'


import { colors } from '../../utils/styles';

const PlainButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.darkGradient};
  box-shadow: 0 0 5px ${colors.lightest};
  border: none;
  border-radius: 5px;
  padding: 7px;
  color: white;

  :hover {
    cursor: pointer;
    background: red;
  }
`
const CoolButton = styled(PlainButton)`
  background: ${colors.gradient};
  box-shadow: 0 0 5px ${colors.lightest};

  :hover {
    background: red;
  }
`

export const StyledButton = ({ className, children, onClick, as }) => {
  return (
    <CoolButton as={as} className={className} onClick={onClick}>
      {children}
    </CoolButton>
  )
}

export const BasicButton = ({ className, children, onClick, as }) => {
  return (
    <PlainButton as={as} className={className} onClick={onClick}>
      {children}
    </PlainButton>
  )
}