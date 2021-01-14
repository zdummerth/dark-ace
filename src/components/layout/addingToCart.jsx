import React, { useContext, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components'
// import { Link } from 'gatsby';
import { usePrevious } from '../../hooks/use-previous'


import { colors, dimensions } from '../../utils/styles';

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.gradient};
  box-shadow: 0 0 5px ${colors.lightest};
  border: none;
  border-radius: 5px;
  padding: 15px 50px;
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

export const AddingToCart = ({ className, adding, lineItems }) => {

    const [cartIndicator, setCartIndicator] = useState({
      visible: false,
      message: ''
    })
  
    const totalQuantity = lineItems.reduce((acc, cv) => acc + cv.quantity, 0)
    const prevTotalQuantity = usePrevious(totalQuantity);
    const prevAdding = usePrevious(adding)
  
    useEffect(() => {
      if (prevAdding !== adding) {
          if (adding) {
            setCartIndicator({
              visible: true,
              message: (
                <>
                  <LoadingSpinner />
                  <div>Adding</div>
                </>
              )
            });
          } else {
            if (totalQuantity > prevTotalQuantity) {
              const num = totalQuantity - prevTotalQuantity;
              const message =
                num > 1
                  ? `${num} NEW ITEMS ADDED`
                  : `${num} NEW ITEM ADDED`;
    
              setCartIndicator({ ...cartIndicator, message });
    
              setTimeout(
                () => setCartIndicator({ visible: false, message: '' }),
                2000
              );
            }
          }
        }
  
    }, [prevAdding, adding, totalQuantity, prevTotalQuantity, cartIndicator])

  
    return (
        <>
            {cartIndicator.visible ? (
                <Container className={className}>
                    {cartIndicator.message}
                </Container>
            ): null}
        </>
    )
  }