import React from 'react'
import styled from 'styled-components'
import Flex from 'src/components/shared/Flexbox'

const Container = styled(Flex)`
  height: ${({ height }) => height};
  max-height: ${({ height, open }) => open ? height : '0'};
  overflow: hidden;
  width: ${({ width }) => width ? width : '100%'};
  background: ${({ theme }) => theme.colors.darkGradient};
  transition: max-height .3s ease-in;
`


const Collapsable = ({ children, ...props }) => {

  return (
    <>
      <Container {...props}>
        {children}
      </Container>
    </>
  )
}


export default Collapsable
