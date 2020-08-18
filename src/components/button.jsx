import React from "react"
import styled from 'styled-components'
const StyledButton = styled.button`
    background: #C00A0A;
    border: none;
    border-radius: 5%;
    padding: 10px;
    color: white;
`


const Button = ({children, onClick}) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}

export default Button

