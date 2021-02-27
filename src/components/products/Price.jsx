import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../../utils/helpers'
import { colors } from '../../utils/styles';

const BasicPrice = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
  margin-top: 0;
`
const CompareAtPriceWrapper = styled.div`
  display: flex;
  align-items: center;
`
const CompareAtPrice = styled.div`
  position: relative;
  font-size: 1.75rem;
  margin-right: 20px;

  .line-through {
    position: absolute;
    border-top: 3.5px solid ${colors.brand};
    width: 100%;
    transform: rotate(-10deg);
    top: 50%;
  }
`
const NewPrice = styled.div`
  -webkit-text-stroke: 1px ${colors.brand};
  font-size: 2rem;
  font-weight: bold;
  color: ${colors.lightest};
  text-shadow:
  -1px -1px 0 ${colors.brand},  
  1px -1px 0 ${colors.brand},
  -1px 1px 0 ${colors.brand},
    1px 1px 6px ${colors.lightest};
`

const Price = ({ price, compareAtPrice, className }) => {


  return compareAtPrice ? (
    <>
      <CompareAtPriceWrapper className={className}>
        <CompareAtPrice>
          <div>{formatPrice(compareAtPrice)}</div>
          <div className="line-through"></div>
        </CompareAtPrice>
        <NewPrice>{formatPrice(price)}</NewPrice>
      </CompareAtPriceWrapper>
    </>
  ) : (
      <BasicPrice className={className}>{formatPrice(price)}</BasicPrice>
    )
}


export default Price

