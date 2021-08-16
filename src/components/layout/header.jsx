import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { ShoppingBag, Trophy, Message } from '@styled-icons/boxicons-regular'

import Flex from 'components/shared/Flexbox'

import { breakpoints, dimensions, colors } from 'src/styles';

import Logo from "./logo"
import StyledLink from 'src/components/shared/Link'
import CartLink from 'src/components/cart/cart-link'


const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: ${props => (props.closed ? "" : "hidden")};
    height: ${props => (props.closed ? "" : "100vh")};
  }
`


const Nav = styled(Flex)`
  position: fixed;
  top: 0;
  z-index: 2;
  height: ${dimensions.headerHeight};
  width: 100%;
  // background: rgba(0,0,0,.7);
  background: black;
  // text-transform: uppercase;
  padding-right: 20px;
`



const LogoLink = styled(Link)`
  height: 60px;
  margin-left: 10px;

  @media (min-width: ${breakpoints.desktop}) {
    margin-left: 0;
    height: 70px;
  }
`

const I = styled.i`
  position: relative;
  font-size: 14px;
`

const Header = ({ cartCount, setSpotifyMinimized, spotifyMinimized }) => {


  const [navbarClosed, setNavbarClosed] = useState(true);


  return (
    <Nav jc='space-between'>
      <LogoLink to='/' name='home'>
        <Logo />
      </LogoLink>
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
        to='/cart'
        name='Play Disc Golf'
        onClick={() => setNavbarClosed(true)}
      >
        <Flex dir='column'>
          <CartLink />
          <I>Cart</I>
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
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
