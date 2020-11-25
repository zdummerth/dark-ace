import React from 'react';
import styled from '@emotion/styled';
// import { Link } from 'gatsby'
import { FaFacebookF, FaInstagram } from 'react-icons/fa';



import { breakpoints, colors } from '../../utils/styles';


const StyledFooter = styled('footer')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${colors.brand};
  width: 100%;
  padding: 0 2vh;
  // margin-top: 3vh;
  background-color: ${colors.background};

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


const Footer = () => {
  return (
    <StyledFooter>
        {/* <StyledLink as='a' href='mailto:darkaceapparel@gamil.com'>DARKACEAPPAREL@GMAIL.COM</StyledLink> */}
        <IconWrapper>
        <a 
          href='https://www.facebook.com/Dark-Ace-Disc-Golf-Apparel-100462504774316/' 
          target='_blank' 
          rel="noreferrer"
          
          >
            <FbIcon />
        </a>
        <a 
          href='https://www.instagram.com/darkaceapparel/' 
          target='_blank' 
          rel="noreferrer"
          >
            <IgIcon />
          </a>
        </IconWrapper>
    </StyledFooter>
  )
}

export default Footer
