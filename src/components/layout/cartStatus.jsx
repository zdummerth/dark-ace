import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components'
import { StyledButton } from '../shared/buttons'



import { colors } from '../../utils/styles';

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${colors.brand};
  box-shadow: 0 0 5px ${colors.lightest};
  border: none;
  border-radius: 5px;
  padding: 15px 25px;
  color: white;

  :hover {
    cursor: pointer;
    background: red;
  }
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
const LoadingSpinner = styled.div`
    background: ${colors.specialGradient};
    border-radius: 50%;
    height: 20px;
    width: 20px;
    margin-right: 8px;

    animation: ${rotate} 1s linear infinite;

`

const Button = styled(StyledButton)`
  background: ${colors.background};
  margin-left: 8px;
`

export const CartStatus = ({ 
  className, 
  status, 
  setStatus, 
  error, 
  resetError
 }) => {

  const display = (msg, loading, err ) => (
    <Container className={className} err>
        { loading && <LoadingSpinner /> }
        <div>{msg}</div>
        { err && <Button onClick={resetError}>Close</Button> }
    </Container>
  )
    const loading = status === 'Adding' || status === 'Updating' || status === 'Removing'

    const loaded = status === 'Added' || status === 'Updated' || status === 'Removed'

    useEffect(() => {
      if(loaded) {
        setTimeout(
          () => setStatus('idle'),
          1000
        );
      }
    }, [loaded, setStatus])

    if (error) {
      return display('There was an error. Please close and try again ', false, true)
    }

    if(loading) {
      return display(status, true)
    }

    if(loaded) {
      return display(status)
    }

    return null
  }