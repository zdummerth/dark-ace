import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { GiMusicSpell } from 'react-icons/gi';

import { breakpoints, dimensions, colors } from '../../utils/styles';

import Logo from "./logo"

import CartLink from '../cart/cart-link'


const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: ${props => (props.closed ? "" : "hidden")};
    height: ${props => (props.closed ? "" : "100vh")};
  }
`

const HeaderWrapper = styled.header`
  margin-bottom: 2px;
  width: 100%;
  font-weight: bold;
  position: fixed;
  top: 0;
  z-index: 50;
  box-shadow: 0 0 .25px .25px ${colors.brand};

  @media (min-width: ${breakpoints.desktop}) {
    font-size: 1rem;
  }
`

const Nav = styled.nav`
  height: ${dimensions.headerHeight};
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;

  display: flex;
  // position: fixed;
  background: ${colors.background};
  // border-bottom: 1px solid ${colors.gray};
  // box-shadow: 0 0 1px 1px ${colors.brand};


  // top: 0;
  justify-content: space-between;
  text-transform: uppercase;
  // z-index: 50;
  align-items: center;
`

const Toggle = styled.div`
  display: none;
  height: 100%;
  cursor: pointer;

  @media (max-width: ${breakpoints.desktop}) {
    display: flex;
    margin-right: 10px;
    margin-left: 25px;
  }
`

const Navbox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

  @media (max-width: ${breakpoints.desktop}) {
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    width: 100%;
    background: ${colors.darkGradient};
    transition: all 0.3s ease-in;
    top: ${dimensions.headerHeight};
    right: ${props => (props.closed ? "-100%" : "0")};
  }

  a[aria-current="page"] {
    // border-bottom: 1px solid ${colors.brand};
  }
`

const Hamburger = styled.div`
  background-color: ${colors.brand};
  width: 30px;
  height: 3px;
  transition: all .3s linear;
  align-self: center;
  position: relative;
  transform: ${props => (props.closed ? "inherit" : "rotate(-45deg)")};

  ::before,
  ::after {
    width: 30px;
    height: 3px;
    background-color: ${colors.brand};
    content: "";
    position: absolute;
    transition: all 0.3s linear;
  }

  ::before {
    transform: ${props =>
    props.closed ? "rotate(0deg)" : "rotate(-90deg) translate(-10px, 0px)"};
    top: -10px;
  }

  ::after {
    opacity: ${props => (props.closed ? "1" : "0")};
    transform: ${props => (props.closed ? "rotate(0deg) " : "rotate(90deg)")};
    top: 10px;
  }
`
const LogoLink = styled(Link)`
  height: 60px;
  margin-left: 10px;

  @media (min-width: ${breakpoints.desktop}) {
    margin-left: 0;
    height: 70px;
  }
`
const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  white-space: nowrap;
  margin: 1rem;
  outline: 0;
  transition: all 200ms ease-in;
  position: relative;

  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0%;
    content: ".";
    color: transparent;
    background: ${colors.brand};
    height: 1px;
    transition: all 0.4s ease-in;
  }

  :hover {
    color: ${colors.brand};
    ::after {
      width: 100%;
    }
  }

  @media (max-width: ${breakpoints.desktop}) {
    // padding: 20px 0;
    font-size: 1.5rem;
    // z-index: 6;
  }
`


const ListenToMetalText = styled.div`
  display: none;



  :hover {
    color: ${colors.brand};
    cursor: pointer;
  }

  @media (min-width: ${breakpoints.desktop}) {
    display: block;
    margin: 1rem;
  }
`

const ListenToMetalLogo = styled.div`
  // display: none;

  @media (min-width: ${breakpoints.desktop}) {
    display: none;
  }
`

const Header = ({ cartCount, setSpotifyMinimized, spotifyMinimized }) => {

  const MenuItems = [
    // {
    //   path: '/',
    //   title: 'Home'
    // },
    {
      path: '/shop/collection/featured',
      title: 'Shop'
    },
    {
      path: '/media',
      title: 'Media'
    },
    {
      path: '/contact',
      title: 'Contact'
    },
    {
      path: '/cart',
      title: `Cart (${cartCount})`
    }
  ]

  const [navbarClosed, setNavbarClosed] = useState(true);

  const links = MenuItems.map((menuItem, index) => (
    <StyledLink
      key={index}
      to={menuItem.path}
      name={menuItem.title}
      onClick={() => setNavbarClosed(true)}
    >
      {menuItem.title}
    </StyledLink>
  ))


  return (
    <HeaderWrapper>
      <Nav>

        <LogoLink to='/' name='home'>
          <Logo />
        </LogoLink>
        <div
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ListenToMetalLogo>
            <GiMusicSpell
              style={{
                fontSize: '1.75rem',
                color: colors.brand,
                marginRight: '20px'
              }}
              onClick={() => setSpotifyMinimized(prev => !prev)}
            />
          </ListenToMetalLogo>
          <CartLink useIcon={true} />

          <Toggle
            navbarClosed={navbarClosed}
            onClick={() => setNavbarClosed(!navbarClosed)}
          >
            <Hamburger closed={navbarClosed} />
          </Toggle>
        </div>
        <Navbox closed={navbarClosed}>
          <GlobalStyle closed={navbarClosed} />
          <StyledLink
            to='/tournaments'
            name='Play Disc Golf'
            onClick={() => setNavbarClosed(true)}
          >
            Play Disc Golf
          </StyledLink>
          <ListenToMetalText
            onClick={() => setSpotifyMinimized(prev => !prev)}
          >
            Listen To Metal
          </ListenToMetalText>
          {links}
        </Navbox>
      </Nav>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
