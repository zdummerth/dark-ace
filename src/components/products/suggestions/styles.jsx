import styled from 'styled-components'
import { colors } from 'src/styles'
import Flex from 'src/components/shared/Flexbox'
import Button from 'src/components/shared/Button'

import { dimensions } from 'src/styles'



export const Container = styled(Flex)`
    position: fixed;
    // z-index: ${({ isOpen }) => isOpen ? '3' : '-2'};
    z-index: 3;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.background};

    width: 100%;
    height: calc(100% - ${dimensions.headerHeight});
    overflow-y: scroll;
    
    // opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
    display: ${({ isOpen }) => isOpen ? 'inherit' : 'none'};
    transition: all .3s ease-in;


    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background: #000;
    }

    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.gradient};
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`
export const ProductContainer = styled(Flex)`
    justify-content: center;
    height: 150px;
    width: 100%;
    max-width: 500px;
    padding: 5px;
    margin-bottom: 15px;
    border: 1px solid gray;
`
export const ProductImageContainer = styled(Flex)`
    width: 40%;
    max-width: 150px;
    height: 100%;
`
export const ProductInfoContainer = styled(Flex)`
    height: 100%;
    width: 60%;
    max-width: 250px;
    flex-direction: column;
    justify-content: space-around;
`

export const CheckoutLink = styled.a`
  display: block;
  background: ${colors.gradient};
  box-shadow: 0 0 5px ${colors.brand};
  padding: 10px;
  margin-bottom: 2rem;
  text-align: center;
  border-radius: 5px;
  max-width: 300px;
  margin: 20px 0;
`
