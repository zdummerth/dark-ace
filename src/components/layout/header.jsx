import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

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


  @media (min-width: ${breakpoints.desktop}) {
    font-size: 1rem;
  }
`

const Nav = styled.nav`
  height: ${dimensions.headerHeight};
  width: 100%;
  display: flex;
  position: fixed;
  background: ${colors.background};
  border-bottom: 1px solid ${colors.brand};
  top: 0;
  justify-content: space-evenly;
  text-transform: uppercase;
  z-index: 50;
  align-items: center;
`

const Toggle = styled.div`
  display: none;
  height: 100%;
  cursor: pointer;

  @media (max-width: ${breakpoints.desktop}) {
    display: flex;
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
    background-color: #020202;
    border-top: 1px solid ${colors.brand};
    transition: all 0.3s ease-in;
    top: ${dimensions.headerHeight};
    left: ${props => (props.closed ? "-100%" : "0")};
  }

  a[aria-current="page"] {
    border-bottom: 1px solid ${colors.brand};
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
  // margin-left: 5%;
`
const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  white-space: nowrap;
  color: white;
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
    padding: 20px 0;
    font-size: 1.5rem;
    z-index: 6;
  }
`
const IconWrapper = styled.div`
  display: flex;

  .icon {

  }
`
const FbIcon = styled(FaFacebookF)`
  font-size: 22px;

  @media (max-width: 900px) {
    font-size: 28px;
  }
`
const IgIcon = styled(FaInstagram)`
  font-size: 22px;

  @media (max-width: 900px) {
    font-size: 28px;
  }
`

const Header = ({ cartCount }) => {
  
  const MenuItems = [
    {
      path: '/',
      title: 'Home'
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

  const extLinks = 
    <>
      <IconWrapper>
        <StyledLink as='a' name='facebook' href='https://www.facebook.com/Dark-Ace-Disc-Golf-Apparel-100462504774316/' target='_blank' rel="noopener"><FbIcon /></StyledLink>
        <StyledLink as='a' name='instagram' href='https://www.instagram.com/darkaceapparel/' target='_blank' rel="noopener"><IgIcon /></StyledLink>
      </IconWrapper>
    </>

  return (
    <HeaderWrapper>
      <Nav>
        <Toggle
            navbarClosed={navbarClosed}
            onClick={() => setNavbarClosed(!navbarClosed)}
          >
          <Hamburger closed={navbarClosed} />
        </Toggle>
        <LogoLink to='/' name='home'>
            <Logo />
        </LogoLink>
        <CartLink useIcon={true}/>
        <Navbox closed={navbarClosed}>
          <GlobalStyle closed={navbarClosed}/>
          {links}
          {extLinks}
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
