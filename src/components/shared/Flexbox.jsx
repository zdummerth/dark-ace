import React from 'react'
import styled from 'styled-components'

const Flex = styled.div`
    display: flex;
    flex-direction: ${({ dir }) => dir ? dir : 'row'};
    flex-wrap: ${({ wrap }) => wrap ? 'wrap' : 'no-wrap'};
    justify-content: ${({ jc }) => jc ? jc : 'center'};
    align-items: ${({ ai }) => ai ? ai : 'center'};
`

const Flexbox = ({ children, ...otherProps }) => {
    return (
        <Flex {...otherProps}>
            {children}
        </Flex>
    )
}

export default Flexbox