import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useState, useContext } from 'react'


import styled from 'styled-components'
import { FaFacebookF, FaInstagram, FaEllipsisV } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

import { StoreContext } from '../../context/StoreContextProvider'
import { RiShoppingCartLine } from 'react-icons/ri';


import { breakpoints, dimensions, colors } from '../../utils/styles';

import Logo from "./logo"

import BoneBasketSVG from '../shared/boneBasket'






const Nav = styled.nav`
  height: ${dimensions.headerHeight};
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;

  position: fixed;
  top: 0;
  z-index: 50;

  background-image: linear-gradient(to bottom right, ${colors.brand} 0%, ${colors.background} 28%, ${colors.background} 60%, ${colors.brand} 100%);

  button {
    background: none;
    outline: 0;
    border: 0;
  }
`


const Navbox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  //same height as spotify
  height: 120px;

  @media (max-width: ${breakpoints.desktop}) {
    // flex-direction: column;
    justify-content: space-around;
    position: fixed;
    z-index: 40;
    background-image: linear-gradient(to bottom left, ${colors.brand} 0%, ${colors.background} 28%, ${colors.background} 60%, ${colors.brand} 100%);
    transition: all .4s ease-in;
    top: ${dimensions.headerHeight};
    right: ${props => (props.closed ? "-100%" : "0")};
  }

  a {
    display: block;
    margin-top; 5px;
  }
`


const SocialsWrapper = styled.div`
  display: flex;
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom right, ${colors.brand}, ${colors.background} 50%);
  box-shadow: 0px 0px 5px ${colors.lightest};

  width: 60px;
  height: 60px;

  border-radius: 50%;
  font-size: 1.5rem;
  span {
    font-size: 1rem;
  }

`

const StyledBoneBasketSVG = styled(BoneBasketSVG)`
  height: 85%;
  fill: white;
  transition: all .4s ease-in;

  transform: ${props => (props.closed ? "" : "rotate(.25turn)")};
`



const Header = () => {

  const {
    store: { checkout: { lineItems } },
  } = useContext(StoreContext)
  
  const totalQuantity = lineItems.reduce((acc, cv) => acc + cv.quantity, 0)


  const [navbarClosed, setNavbarClosed] = useState(true);
  

  const socials = 
    <>
      <SocialsWrapper>
        <Link
         as='a' 
         href='https://www.facebook.com/Dark-Ace-Disc-Golf-Apparel-100462504774316/' 
         target='_blank' 
         rel="noopener"
        >
          <FaFacebookF />
        </Link>
        <Link 
          as='a' 
          href='https://www.instagram.com/darkaceapparel/' 
          target='_blank' 
          rel="noopener"
        >
          <FaInstagram />
      </Link>
      </SocialsWrapper>
    </>

  return (
      <>
      <Nav>

        <Link to='/'>
            <Logo />
        </Link>

        {totalQuantity > 0 && 
          <Link to='/cart'>
            <IconWrapper>
              <RiShoppingCartLine />
                <span>{totalQuantity}</span>
            </IconWrapper>
          </Link>
        }

        <button
          onClick={() => setNavbarClosed(!navbarClosed)}
        >
          <IconWrapper>
            <StyledBoneBasketSVG closed={navbarClosed}/>
          </IconWrapper>
        </button>

      </Nav>
      <Navbox closed={navbarClosed}>
          <Link to='/cart'>
            <IconWrapper>
              <RiShoppingCartLine />
                <span>{totalQuantity}</span>
            </IconWrapper>
          </Link>
          <Link to='/cart'>
            <IconWrapper>
              <RiShoppingCartLine />
            </IconWrapper>
          </Link>
          <Link to='/cart'>
            <IconWrapper>
              <FiMail />
            </IconWrapper>
          </Link>
        </Navbox>
      </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
