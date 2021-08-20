import React from 'react'
import styled from 'styled-components'
import Flex from 'src/components/shared/Flexbox'

const InputContainer = styled(Flex)`
  width: 100%;
`

const StyledInput = styled.input`
  background: ${({ theme }) => theme.colors.input.background};
  color: ${({ theme }) => theme.colors.text};
  // border: 1px solid ${({ theme, error }) => error ? theme.colors.error : 'gray'};
  border: 2px solid ${({ error }) => error ? 'red' : 'gray'};
  outline: none;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  // margin-bottom: 20px;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.brand};
  }
`

export const Label = styled.label`
  display: block;
  margin: 15px 0 10px 0;
  font-style: italic;
`


const Error = styled(Label)`
  color: red;
`


export default function Input({ error, label, id, ...props }) {
  return (
    <InputContainer dir='column'>
      <Flex>
        {error ? (
          <Error>{error}</Error>
        ) : (
          <Label htmlFor={id}>{label}</Label>
        )}
      </Flex>
      <StyledInput id={id} error={error} {...props} />
    </InputContainer>
  )
}