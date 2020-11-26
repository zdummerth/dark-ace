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
  position: fixed;
  top: ${dimensions.headerHeight};
  right: ${props => (props.closed ? "-100%" : "0")};
  z-index: 40;

  width: 100%;
  text-align: center;
  background-image: linear-gradient(to bottom left, ${colors.brand} 0%, ${colors.background} 28%, ${colors.background} 60%, ${colors.brand} 100%);
  
  transition: all .25s ease-in;
`


const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom right, ${colors.brand}, ${colors.background} 60%);
  // background: ${colors.lightest};
  box-shadow: 0px 0px 20px ${colors.lightest};

  width: 60px;
  height: 60px;

  position: relative;

  border-radius: 50%;
  font-size: 1.5rem;
  span {
    font-size: 1rem;
  }

`

const Toggle = styled.div`
  transform: ${props => (props.closed ? "" : "rotate(.5turn)")};
  transition: all .3s ease-in;

`

const StyledBoneBasketSVG = styled(BoneBasketSVG)`
  height: 85%;
  fill: ${colors.lightest};
  transition: all .3s ease-in;

  position: absolute;

  opacity: ${props => (props.closed ? "1" : "0")};

  // transform: ${props => (props.closed ? "" : "rotate(1turn)")};
`

const Hamburger = styled.div`
  background-color: ${colors.lightest};
  width: 30px;
  height: 3px;
  transition: all .3s linear;
  align-self: center;
  position: relative;
  transform: ${props => (props.closed ? "inherit" : "rotate(-45deg)")};

  opacity: ${props => (props.closed ? "0" : "1")};


  ::before,
  ::after {
    width: 30px;
    height: 3px;
    background-color: ${colors.lightest};
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

const SocialsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  padding-bottom: 10px;

  & > * {
    margin: 10px;
  }
`

const InternalLinks = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px 0;

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
          closed={navbarClosed}
        >
          <IconWrapper>
            <Hamburger closed={navbarClosed} />
            <StyledBoneBasketSVG closed={navbarClosed}/>
          </IconWrapper>
        </Toggle>

        <Navbox closed={navbarClosed}>
          <InternalLinks>
          <Link 
            to='/'
            onClick={() => setNavbarClosed(true)}  
          >
            <p>Home</p>

            <IconWrapper>
              <AiOutlineHome />
            </IconWrapper>
          </Link>

          <Link 
            to='/contact'
            onClick={() => setNavbarClosed(true)}
          >
            <p>Contact</p>
            <IconWrapper>
              <FiMail />
            </IconWrapper>
          </Link>
          </InternalLinks>
          <SocialsContainer>
          <a 
            href='https://www.instagram.com/darkaceapparel/' 
            target='_blank' 
            rel="noreferrer"
          >
              <FaInstagram />
          </a>

          <a
            href='https://www.facebook.com/Dark-Ace-Disc-Golf-Apparel-100462504774316/' 
            target='_blank' 
            rel="noreferrer"
            >
              <FaFacebookF />
          </a>
          </SocialsContainer>
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
