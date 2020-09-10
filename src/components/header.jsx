import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState, useContext } from "react"
import styled, { createGlobalStyle } from "styled-components"
import { FaFacebookF, FaInstagram, FaExternalLinkAlt } from 'react-icons/fa';
import { GlobalStateContext } from '../context/GlobalContextProvider'

import Logo from "./logo"

import CartLink from './cart-link'


const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: ${props => (props.closed ? "" : "hidden")};
    height: ${props => (props.closed ? "" : "100vh")};
  }
`

const HeaderWrapper = styled.header`
  background: #020202;
  margin-bottom: 2px;
  width: 100%;
  border-bottom: 1px solid #C00A0A;
  // padding: 0 1rem;
  @media (min-width: 900px) {
    font-size: .9rem;
  }
  @media (min-width: 1000px) {
    font-size: 1rem;
  }
`

const Nav = styled.nav`
  height: 70px;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-around;
  text-transform: uppercase;
  z-index: 50;
  // align-self: center;
  align-items: center;

  @media (max-width: 768px) {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
  }
`

const Toggle = styled.div`
  display: none;
  height: 100%;
  cursor: pointer;
  // margin: 0 10vw;

  @media (max-width: 900px) {
    display: flex;
  }
`

const Navbox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;

  @media (max-width: 900px) {
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    width: 100%;
    background-color: #020202;
    // opacity: .95;
    border-top: 1px solid #C00A0A;
    transition: all 0.3s ease-in;
    top: 70px;
    left: ${props => (props.closed ? "-100%" : "0")};
  }
  a[aria-current="page"] {
    // color: #C00A0A;
    border-bottom: 1px solid #C00A0A;
  }
`

const Hamburger = styled.div`
  background-color: #C00A0A;
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
    background-color: #C00A0A;
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
  margin-left: 5%;
`
const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  white-space: nowrap;
  color: white;
  margin: 1rem;
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
    background: #C00A0A;
    height: 1px;
    transition: all 0.4s ease-in;
  }

  :hover {
    color: #C00A0A;
    ::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 0;
    font-size: 1.5rem;
    z-index: 6;
  }
`
const IconWrapper = styled.div`
  display: flex;

  // @media (max-width: 900px) {
  //   margin-top: 2rem;
  // }
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
const ExtIcon = styled(FaExternalLinkAlt)`
  font-size: 15px;
  // margin-left: 5px;
`
const Header = ({ siteTitle }) => {
  const {
    store: { checkout: { lineItems } },
  } = useContext(GlobalStateContext)
  
  const totalQuantity = lineItems.reduce((acc, cv) => acc + cv.quantity, 0)

  const MenuItems = [
    {
      path: "/",
      title: "Home"
    },
    {
      path: "/contact",
      title: "Contact"
    },
    {
      path: "/products",
      title: "Products"
    },
    {
      path: '/cart',
      title: `Cart (${totalQuantity})`
    }
  ]

  const [navbarClosed, setNavbarClosed] = useState(true);
  
  const links = MenuItems.map((menuItem, index) => (
  <StyledLink
   key={index} 
   to={menuItem.path}
   onClick={() => setNavbarClosed(true)}
   >
     {menuItem.title}
  </StyledLink>
  ))
  const extLinks = 
    <>
      <StyledLink as='a' href='https://www.byjack.com/collections/dark-ace' target='_blank' rel="noopener">Shop <ExtIcon /></StyledLink>
      <IconWrapper>
        <StyledLink as='a' href='https://www.facebook.com/Dark-Ace-Disc-Golf-Apparel-100462504774316/' target='_blank' rel="noopener"><FbIcon /></StyledLink>
        <StyledLink as='a' href='https://www.instagram.com/darkaceapparel/' target='_blank' rel="noopener"><IgIcon /></StyledLink>
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
        <LogoLink to='/'>
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
