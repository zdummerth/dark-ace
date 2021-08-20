import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from 'styled-components'
import { ShoppingBag, Trophy, Message } from '@styled-icons/boxicons-regular'
import Flex from 'components/shared/Flexbox'
import { dimensions, colors } from 'src/styles';
import StyledLink from 'src/components/shared/Link'
import CartLink from 'src/components/cart/cart-link'


// const GlobalStyle = createGlobalStyle`
//   body {
//     overflow-y: ${props => (props.closed ? "" : "hidden")};
//     height: ${props => (props.closed ? "" : "100vh")};
//   }
// `

const FullWidth = styled(Flex)`
  background: ${colors.darkGradient}; 
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 2;
`

const Nav = styled(Flex)`
  height: ${dimensions.headerHeight};
  width: 100%;
  max-width: 800px;
`

const I = styled.i`
  position: relative;
  font-size: 14px;
`

const Header = ({ cartCount, setSpotifyMinimized, spotifyMinimized }) => {


  const [navbarClosed, setNavbarClosed] = useState(true);


  return (
    <FullWidth>
      <Nav jc='space-around'>
        {/* <LogoLink to='/' name='home'>
        <Logo />
      </LogoLink> */}
        {/* <div
        style={{ display: 'flex', alignItems: 'center' }}
      > */}
        <StyledLink
          to='/shop/collection/featured'
          name='Play Disc Golf'
          onClick={() => setNavbarClosed(true)}
        >
          <Flex dir='column'>
            <ShoppingBag size='28' />
            <I>Shop</I>
          </Flex>
        </StyledLink>
        <Flex dir='column'>
          <CartLink />
          <I>Cart</I>
        </Flex>
        <StyledLink
          to='/tournaments'
          name='Play Disc Golf'
          onClick={() => setNavbarClosed(true)}
        >
          <Flex dir='column'>
            <Trophy size='28' />
            <I>Events</I>
          </Flex>
        </StyledLink>
        <StyledLink
          to='/contact'
          name='Play Disc Golf'
          onClick={() => setNavbarClosed(true)}
        >
          <Flex dir='column'>
            <Message size='28' />
            <I>Contact</I>
          </Flex>
        </StyledLink>
      </Nav>
    </FullWidth>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
