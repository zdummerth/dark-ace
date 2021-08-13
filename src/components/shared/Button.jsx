import React from 'react'
import styled from 'styled-components'

const getColor = ({ cancel, remove }) => {
    if(cancel) return 'transparent'
    if(remove) return '#C00A0A'
    return 'linear-gradient(to bottom right, #C00A0A 45%, #020202)'
}

const StyledButton = styled.button`
    position: relative;
    background: ${getColor};
    color: white;
    border: ${({ cancel }) => cancel ? `2px solid gray` : 'none'};
    min-width: 70px;
    height: 40px;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    // font-size: 16px;
    font-weight: bold;
    // border: none;

    &:hover {
        cursor: pointer;
    }
`

const DisabledOverlay = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    // background: ${({ theme }) => theme.colors.button.disabled};
    background: rgba(0,0,0,.6);

`

const Button = ({ children, disabled, onClick, ...rest }) => {
    return (
        <StyledButton disabled={disabled} onClick={onClick} {...rest} >
            {children}
            {disabled && <DisabledOverlay />}
        </StyledButton>
    )
}

export default Button