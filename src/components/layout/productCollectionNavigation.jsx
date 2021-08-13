import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

import { colors } from '../../utils/styles'

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  margin: 10px 0;
`

const StyledLink = styled(Link)`
  border: 1px solid ${colors.brand};
  border-radius: 50px;
  padding: 5px 10px;
  margin: 5px;
  background: ${({ selected }) => selected ? colors.gradient : 'transparent'};
`




const ProductNav = ({ collections, className }) => {

  const featured = collections.filter(c => c.handle === 'featured')
  const rest = collections.filter(c => (c.handle !== 'featured') && (c.handle !== 'pre-order'))

  console.log('de arrya', featured)
  return (
    <Nav className={className}>
      {[...featured, ...rest].map((c, index) => (
        <StyledLink
          key={c.handle + index}
          to={`/shop/collection/${c.handle}`}
          activeStyle={{
            background: colors.gradient,
            border: 'none'
          }}
        >
          {c.title}
        </StyledLink>
      ))}
    </Nav>
  )
}

export default ProductNav
