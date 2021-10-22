import styled from 'styled-components'
import { colors } from 'src/styles'
import Flex from 'src/components/shared/Flexbox'
import Button from 'src/components/shared/Button'



export const Container = styled(Flex)`
    position: fixed;
    z-index: ${({ isOpen }) => isOpen ? '3' : '-2'};
    flex-direction: column;
    background: ${({ theme }) => theme.colors.background};

    width: 100%;
    height: 100%;
    
    opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
    transition: opacity .3s ease-in;
`
export const ProductContainer = styled(Flex)`
    justify-content: space-around;
    height: 150px;
    width: 100%;
    padding: 5px;
    border: 1px solid white;
`
export const ProductImageContainer = styled(Flex)`
    width: 150px;
    height: 100%;
`
export const ProductInfoContainer = styled(Flex)`
    height: 100%;
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
