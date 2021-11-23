import React from 'react'
import styled from 'styled-components'
import Flex from 'src/components/shared/Flexbox'


const StyledPrice = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    min-width: 70px;
    height: 40px;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    // font-weight: bold;

    &:hover {
        cursor: pointer;
    }

    .price {
        font-weight: bold;
    }
`

const CompareAtPrice = styled.div`
    position: relative;
    margin-right: 8px;

    #strikethrough {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        width: 100%;
        height: 2px;
        background-color: red;
        // background-color: rgba(0,0,0, 1);
    }
    // background: ${({ theme }) => theme.colors.button.disabled};

`

const Price = ({ price, compareAtPrice, ...rest }) => {
    const p = parseFloat(price).toFixed(2)
    const c = compareAtPrice ? parseFloat(compareAtPrice).toFixed(2) : null

    return (
        <StyledPrice {...rest} >
            <Flex>
                {c &&
                    <>
                        <CompareAtPrice>
                            ${c}
                            <div id="strikethrough" />
                        </CompareAtPrice>
                    </>
                }
                <span className="price">${p}</span>
            </Flex>
        </StyledPrice>
    )
}

export default Price