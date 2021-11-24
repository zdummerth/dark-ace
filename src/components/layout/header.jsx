import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link } from "gatsby"
import styled from 'styled-components'
import { ShoppingBag, Trophy, Message, Home, X, CaretDownCircle, Pencil, UserPin, Menu, NetworkChart } from '@styled-icons/boxicons-regular'
import Flex from 'src/components/shared/Flexbox'
import Logo from 'src/components/layout/logo'
import { dimensions, colors, breakpoints } from 'src/styles';
import CartIcon from 'src/components/cart/cart-icon'

const FullWidth = styled(Flex)`
  background: ${colors.darkGradient}; 
  width: 100vw;
  position: fixed;
  top: 0;
  z-index: 5;
`
const I = styled.i`
  position: relative;
  font-size: 12px;
`

const Nav = styled(Flex)`
  height: ${dimensions.headerHeight};
  background: ${colors.radialGradient}; 
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

  .menuButton:hover {
    cursor: pointer;
  }

  @media (min-width: ${breakpoints.tablet}) {
    position: static;
    background: transparent;
  }
`

const MobileNavbox = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  z-index: 6;
  height: 100%;
  width: 100%;
  left: ${({ open }) => open ? '0' : '-100%'};
  top: 0;

  transition: all 0.2s ease-in;

  ${I} {
    font-size: 18px;
    padding-left: 30px;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    background: ${colors.darkGradient};

    #close-button {
      align-self: flex-end;
      padding: 8px; 

      ${I} {
        padding: 0;
      }
    }
  }

  .filler {
    flex: 1;
    background: rgba(0,0,0,.8);
    display: ${({ open }) => open ? 'block' : 'none'};
  }

  .menu-item {
    display: flex;
    align-items: center;
    // flex-direction: row;
    width: 100%;
    padding: 15px 0 15px 20px;
    border-bottom: 1px solid gray;
  }

  #close-button:hover {
    cursor: pointer;
  }

  #first {
    border-top: 1px solid gray;
  }

  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`

const StyledCaretUp = styled(CaretDownCircle)`
  transform: ${({ open }) => open ? 'rotate(180deg)' : 'rotate(0)'};
  transition: all 0.3s ease-in;
`

const Header = ({ open, setOpen }) => {

  return (
    <FullWidth>
      <Nav jc='space-around'>
        {/* <Link to='/' name='home'>
            <Logo />
        </Link> */}
        {/* <div
        style={{ display: 'flex', alignItems: 'center' }}
      > */}
        <Flex
          ai='center'
          dir='column'
          className='menuButton'
          onClick={() => setOpen(!open)}
        >
          <Menu
            open={!open}
            size='28'
          />
          {/* <I>Menu</I> */}
        </Flex>
        {/* <Link
          to='/shop/collection/featured'
          name='Play Disc Golf'
          onClick={() => setOpen(false)}
        >
          <Flex dir='column'>
            <ShoppingBag size='22' />
            <I>Shop</I>
          </Flex>
        </Link> */}
        <Link to='/' name='home'>
          <Logo />
        </Link>
        <Link
          to='/shop/collection/featured'
          name='Play Disc Golf'
          className='hide-mobile'
          onClick={() => setOpen(false)}
        >
          {/* <ShoppingBag size='22' /> */}
          <I>Shop</I>
        </Link>

        <Link
          to='/contact'
          name='Play Disc Golf'
          className='hide-mobile'
          onClick={() => setOpen(false)}
        >
          <Flex dir='column'>
            {/* <Message size='22' /> */}
            <I>Contact</I>
          </Flex>
        </Link>
        <Link
          to='/about-us'
          name='Play Disc Golf'
          className='hide-mobile'
          onClick={() => setOpen(false)}
        >
          {/* <UserPin size='22' /> */}
          <I>About Us</I>
        </Link>
        <Link
          to='/partners'
          name='Play Disc Golf'
          className='hide-mobile'
          onClick={() => setOpen(false)}
        >
          {/* <NetworkChart size='22' /> */}
          <I>Our Partners</I>
        </Link>

        <Link
          to='/cart'
          name='Play Disc Golf'
          onClick={() => setOpen(false)}
        >
          <Flex>
            <I className='hide-mobile'>Cart</I>
            <div className='hide-mobile' style={{ width: '15px' }} />
            <CartIcon />
          </Flex>
        </Link>
      </Nav>
      <MobileNavbox open={open}>
        <div className="content">
          <Flex
            ai='center'
            dir='column'
            id='close-button'
            onClick={() => setOpen(false)}
          >
            <X size='28' />
            <I>Close</I>
          </Flex>
          <Link
            to='/'
            name='Play Disc Golf'
            id='first'
            className='menu-item'
            onClick={() => setOpen(false)}
          >
            <Home size='22' />
            <I>Home</I>
          </Link>
          <Link
            to='/shop/collection/featured'
            name='Play Disc Golf'
            className='menu-item'
            onClick={() => setOpen(false)}
          >
            <ShoppingBag size='22' />
            <I>Shop</I>
          </Link>
          <Link
            to='/cart'
            name='Play Disc Golf'
            className='menu-item'
            onClick={() => setOpen(false)}
          >
            <CartIcon />
            <I>Cart</I>
          </Link>
          <Link
            to='/about-us'
            name='Play Disc Golf'
            className='menu-item'
            onClick={() => setOpen(false)}
          >
            <UserPin size='22' />
            <I>About Us</I>
          </Link>
          <Link
            to='/partners'
            name='Play Disc Golf'
            className='menu-item'
            onClick={() => setOpen(false)}
          >
            <NetworkChart size='22' />
            <I>Our Partners</I>
          </Link>
          <Link
            to='/contact'
            name='Play Disc Golf'
            className='menu-item'
            onClick={() => setOpen(false)}
          >
            <Message size='22' />
            <I>Contact</I>
          </Link>
        </div>
        <div className="filler" />
      </MobileNavbox>
    </FullWidth >
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
