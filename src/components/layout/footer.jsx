import React from 'react';
import styled from 'styled-components'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import EmailForm from '../forms/NewEmailSubscriberForm'
import Flex from '../Flexbox'
import useSiteMetaData from '../../hooks/useSiteMetaData'



import { breakpoints, colors } from '../../utils/styles';


const StyledFooter = styled(Flex)`
  color: ${colors.lightest};
  width: 100%;
  padding: 0 2vh;
  margin-top: 100px;
  background-color: ${colors.grayBackground};

  @media (min-width: ${breakpoints.desktop}) {
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

const Title = styled.h3`
  margin-top: 30px;
`


const Footer = ({ resetForm }) => {
  const { title } = useSiteMetaData()
  return (
    <StyledFooter dir='column' ai='center'>
      {/* <EmailForm reset={resetForm} /> */}
      <Title>{title}</Title>
      <IconWrapper>
        <StyledLink href='https://www.facebook.com/Dark-Ace-Disc-Golf-Apparel-100462504774316/' target='_blank' rel="noopener"><FbIcon /></StyledLink>
        <StyledLink href='https://www.instagram.com/darkaceapparel/' target='_blank' rel="noopener"><IgIcon /></StyledLink>
      </IconWrapper>
    </StyledFooter>
  )
}

export default Footer
