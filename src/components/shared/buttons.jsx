import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components'


import { colors } from '../../utils/styles';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.gradient};
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


export const StyledButton = ({ className, children, onClick }) => {
  return (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  )
}