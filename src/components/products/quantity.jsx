import React from 'react'
import styled from 'styled-components'
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineMinus } from 'react-icons/ai';


import { colors } from '../../utils/styles';

const QuantityWrapper = styled.div`
    display: flex;
    // justify-content: space-between;

    h3 {
      margin-right: 20px;
    }
`

const ControllWrapper = styled.div`
  display: flex;
  margin-left: 15px;

  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: ${colors.gradient};
    box-shadow: 0 0 8px ${colors.brand};
    border-radius: 50%;
    color: ${colors.lightest};
    font-size: 22px;
    padding: 0;
    height: 22px;
    width: 22px;
  }

  p {
      font-size: 22px;
      margin-right: 15px;
      margin-left: 15px;
  }
`

const Quantity = ({ quantity, increase, decrease, className }) => {

  return (
    <QuantityWrapper className={className}>
        <div>Qty:</div>
        <ControllWrapper>
          <button onClick={decrease}>
              <AiOutlineMinus /> 
          </button>
          <p>{quantity}</p> 
          <button onClick={increase}>
              <IoMdAdd />
          </button>
        </ControllWrapper>
    </QuantityWrapper>
  )
}


export default Quantity

