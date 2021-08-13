import React from 'react'
import styled from 'styled-components'


const StyledInput = styled.input`
  background: #202020;
  color: white;
//   outline: 1px solid ${({ theme, error }) => error ? 'red' : 'inherit'};
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme, error }) => error ? 'red' : 'gray'};
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 20px;

  &:focus {
    outline: none;
    border: 1px solid white;
  }
`

const Error = styled.div`
    color: red;
    margin-bottom: 10px;
`


export default function Input({ error, ...props }) {
    return (
        <>
            {error && (
                <Error>{error}</Error>
            )}
            <StyledInput error={error} {...props} />
        </>
    )
}