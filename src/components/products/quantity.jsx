import React from 'react'
import styled from 'styled-components'
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineMinus } from 'react-icons/ai';


import { colors } from 'src/styles';

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
    // border: 1px solid white;
    border: none;
    background: ${colors.gradient};
    // background: none;
    // box-shadow: 0 0 8px ${colors.brand};
    border-radius: 50%;
    color: ${colors.lightest};
    font-size: 20px;
    padding: 0;
    height: 20px;
    width: 20px;
  }

  div {
      font-size: 18px;
      margin-right: 10px;
      margin-left: 10px;
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
          <div>{quantity}</div> 
          <button onClick={increase}>
              <IoMdAdd />
          </button>
        </ControllWrapper>
    </QuantityWrapper>
  )
}


export default Quantity

