import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import styled from 'styled-components'

import { StoreContext } from '../../context/StoreContextProvider'

import { breakpoints, dimensions, colors } from '../../utils/styles';

import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import { RiShoppingCartLine } from 'react-icons/ri';

import Logo from "./logo"
import BoneBasketSVG from '../shared/boneBasketSVG'






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

`


const Navbox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  //same height as spotify
  height: 120px;

  justify-content: space-around;
  position: fixed;
  z-index: 40;
  background-image: linear-gradient(to bottom left, ${colors.brand} 0%, ${colors.background} 28%, ${colors.background} 60%, ${colors.brand} 100%);
  transition: all .25s ease-in;
  top: ${dimensions.headerHeight};
  right: ${props => (props.closed ? "-100%" : "0")};

  a :focus {
    outline: 0 !important;
  }

  p {
    margin: 0;
  }

  @media (min-width: ${breakpoints.desktop}) {

  }
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

const Toggle = styled.button``

const StyledBoneBasketSVG = styled(BoneBasketSVG)`
  height: 85%;
  fill: white;
  transition: all .25s ease-in;

  transform: ${props => (props.closed ? "" : "rotate(.25turn)")};
`



const Header = ({ navbarClosed, setNavbarClosed }) => {

  const {
    store: { checkout: { lineItems } },
  } = useContext(StoreContext)
  
  const totalQuantity = lineItems.reduce((acc, cv) => acc + cv.quantity, 0)
  

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

        <Toggle
          onClick={() => setNavbarClosed(!navbarClosed)}
        >
          <IconWrapper>
            <StyledBoneBasketSVG closed={navbarClosed}/>
          </IconWrapper>
        </Toggle>

        <Navbox closed={navbarClosed}>

          <Link 
            to='/'
            // onClick={() => setNavbarClosed(true)}  
          >
            <IconWrapper>
              <AiOutlineHome />
            </IconWrapper>
          </Link>

          <Link 
            to='/contact'
            onClick={() => setNavbarClosed(true)}
          >
            <IconWrapper>
              <FiMail />
            </IconWrapper>
          </Link>

          <a 
            href='https://www.instagram.com/darkaceapparel/' 
            target='_blank' 
            rel="noreferrer"
          >
            <IconWrapper>
              <FaInstagram />
            </IconWrapper>
          </a>

          <a
            href='https://www.facebook.com/Dark-Ace-Disc-Golf-Apparel-100462504774316/' 
            target='_blank' 
            rel="noreferrer"
            >
            <IconWrapper>
              <FaFacebookF />
            </IconWrapper>
          </a>

        </Navbox>
      </Nav>
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
