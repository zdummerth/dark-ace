import React, { useMemo } from 'react'
import styled from 'styled-components'

const CamoWrapper = styled.div`
    // position: relative;
    display: flex;
    flex-wrap: wrap;
    // align-items: center;
    // justify-content: center;
    width: 100%;
    height: 100%;
`

const Square = styled.div`
    width: 3px;
    height: 3px;
    background-color: ${({ bg }) => bg};
`


const Camo = ({ limit }) => {

    const colors = [
        '#78866b',
        '#5D7631',
        '#766D31',
        '#764B31',
        // 'gray',
        '#161616',
        // 'brown'
    ]

    const squaresArray = useMemo(() => {
        function randomIntFromInterval(min, max) { // min and max included 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        const pattern = [0, 1, 4, 3, 2, 0, 1, 2, 0, 4, 3, 2, 4, 3, 1]
        const repeated = []
        for (let i = 0; i < limit; i++) {
            repeated.push(...pattern)
        }
        const squares = repeated.map((i, index) => (
            <Square key={index} bg={colors[i]} />
        ))
        return squares
    }, [limit]);
    return (
        <CamoWrapper>
            {squaresArray}
        </CamoWrapper>
    )
}

export default Camo