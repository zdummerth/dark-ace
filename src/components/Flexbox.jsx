import React from 'react'
import styled from 'styled-components'

const Flex = styled.div`
    display: flex;
    flex-direction: ${({ dir }) => dir ? dir : 'row'};
    flex-wrap: ${({ wrap }) => wrap ? 'wrap' : 'no-wrap'};
    justify-content: ${({ jc }) => jc ? jc : 'flex-start'};
    align-items: ${({ ai }) => ai ? ai : 'flex-start'};
`

const Flexbox = ({ children, className, dir, wrap, jc, ai }) => {
    return (
        <Flex className={className} dir={dir} wrap={wrap} jc={jc} ai={ai} >{children}</Flex>
    )
}

export default Flexbox