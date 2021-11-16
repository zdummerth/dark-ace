import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link } from "gatsby"
import styled from 'styled-components'
import { ShoppingBag, Trophy, Message, Home, X, CaretDownCircle, Pencil, UserPin } from '@styled-icons/boxicons-regular'
import Flex from 'src/components/shared/Flexbox'
import Logo from 'src/components/layout/logo'
import { dimensions, colors, breakpoints } from 'src/styles';
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
  z-index: 5;
`

const Nav = styled(Flex)`
  height: ${dimensions.headerHeight};
  background: ${colors.darkGradient}; 
  width: 100%;
  max-width: 800px;
  position: absolute;
  top: 0;
  z-index: 5;

  .hide-mobile {
    display: none;
    @media (min-width: ${breakpoints.tablet}) {
      display: block;
    }
  }

  .menuButton {
    @media (min-width: ${breakpoints.tablet}) {
      display: none;
    }
  }

  @media (min-width: ${breakpoints.tablet}) {
    position: static;
    background: transparent;
  }
`

const I = styled.i`
  position: relative;
  font-size: 12px;
`

const MobileNavbox = styled.div`
  position: fixed;
  width: 100%;
  z-index: 4;
  height: ${dimensions.headerHeight};
  top: ${({ open }) => open ? dimensions.headerHeight : '0'};
  // top: ${dimensions.headerHeight};

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  transition: all 0.3s ease-in;
  background: ${colors.darkGradient};


  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`

const StyledCaretUp = styled(CaretDownCircle)`
  transform: ${({ open }) => open ? 'rotate(180deg)' : 'rotate(0)'};
  transition: all 0.3s ease-in;
`

const Header = ({ cartCount, setSpotifyMinimized, spotifyMinimized }) => {


  const [navbarClosed, setNavbarClosed] = useState(true);



  return (
    <FullWidth>
      <Nav jc='space-around'>
        {/* <Link to='/' name='home'>
            <Logo />
        </Link> */}
        {/* <div
        style={{ display: 'flex', alignItems: 'center' }}
      > */}
        <StyledLink
          to='/'
        >
          <Flex dir='column'>
            <Home size='22' />
            <I>Home</I>
          </Flex>
        </StyledLink>
        <StyledLink
          to='/shop/collection/featured'
          name='Play Disc Golf'
          onClick={() => setNavbarClosed(true)}
        >
          <Flex dir='column'>
            <ShoppingBag size='22' />
            <I>Shop</I>
          </Flex>
        </StyledLink>
        <Flex dir='column'>
          <CartLink />
          <I>Cart</I>
        </Flex>
        <Flex
          ai='center'
          dir='column'
          className='menuButton'
          onClick={() => setNavbarClosed(!navbarClosed)}
        >
          <StyledCaretUp
            open={!navbarClosed}
            size='28'
          />
          <I>Menu</I>
        </Flex>
        <StyledLink
          to='/about-us'
          name='Play Disc Golf'
          className='hide-mobile'
          onClick={() => setNavbarClosed(true)}
        >
          <Flex dir='column'>
            <UserPin size='22' />
            <I>About Us</I>
          </Flex>
        </StyledLink>
        <StyledLink
          to='/about-us'
          name='Play Disc Golf'
          className='hide-mobile'
          onClick={() => setNavbarClosed(true)}
        >
          <Flex dir='column'>
            <Pencil size='22' />
            <I>Blog</I>
          </Flex>
        </StyledLink>
        <StyledLink
          to='/contact'
          name='Play Disc Golf'
          className='hide-mobile'
          onClick={() => setNavbarClosed(true)}
        >
          <Flex dir='column'>
            <Message size='22' />
            <I>Contact</I>
          </Flex>
        </StyledLink>
      </Nav>
      <MobileNavbox open={!navbarClosed}>
        <StyledLink
          to='/about-us'
          name='Play Disc Golf'
          onClick={() => setNavbarClosed(true)}
        >
          <Flex dir='column'>
            <UserPin size='22' />
            <I>About Us</I>
          </Flex>
        </StyledLink>
        <StyledLink
          to='/about-us'
          name='Play Disc Golf'
          onClick={() => setNavbarClosed(true)}
        >
          <Flex dir='column'>
            <Pencil size='22' />
            <I>Blog</I>
          </Flex>
        </StyledLink>
        <StyledLink
          to='/contact'
          name='Play Disc Golf'
          onClick={() => setNavbarClosed(true)}
        >
          <Flex dir='column'>
            <Message size='22' />
            <I>Contact</I>
          </Flex>
        </StyledLink>
      </MobileNavbox>
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
