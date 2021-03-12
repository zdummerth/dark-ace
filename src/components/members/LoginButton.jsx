import React from "react";
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

const Button = styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
`

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <Button
        onClick={() => loginWithRedirect()}
    >
        LOGIN
        </Button>;
};

export default LoginButton