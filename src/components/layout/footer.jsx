import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby'
import { FaFacebookF, FaInstagram } from 'react-icons/fa';



import { breakpoints, colors } from '../../utils/styles';


const StyledFooter = styled('footer')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${colors.lightest};
  width: 100%;
  padding: 0 2vh;
  margin-top: 3vh;
  background-color: ${colors.grayBackground};

  @media (max-width: ${breakpoints.desktop}px) {
    flex-direction: column;
    p {
      margin-bottom: 0;
    }
  }
`

const IconWrapper = styled.div`
  // display: flex;

  @media (max-width: 900px) {
    // margin-top: 2rem;
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

const StyledLink = styled.a`
  display: inline-block;
  text-decoration: none;
  white-space: nowrap;
  margin: 2vw;
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
    // font-size: 1.5rem;
    // z-index: 6;
  }
`


const Footer = () => {
  return (
    <StyledFooter>
        <div>DARK ACE APPAREL</div>
        <IconWrapper>
        <StyledLink href='https://www.facebook.com/Dark-Ace-Disc-Golf-Apparel-100462504774316/' target='_blank' rel="noopener"><FbIcon /></StyledLink>
        <StyledLink href='https://www.instagram.com/darkaceapparel/' target='_blank' rel="noopener"><IgIcon /></StyledLink>
        </IconWrapper>
    </StyledFooter>
  )
}

export default Footer
