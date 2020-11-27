import React from 'react';
import styled from '@emotion/styled';
// import { Link } from 'gatsby'
import { FaFacebookF, FaInstagram } from 'react-icons/fa';



import { breakpoints, colors, dimensions } from '../../utils/styles';


const StyledFooter = styled('footer')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${colors.brand};
  width: 100%;
  background-color: ${colors.grayBackground};
  color: ${colors.lightest};
  height: ${dimensions.headerHeight};


  @media (max-width: ${breakpoints.desktop}px) {
    flex-direction: column;
    p {
      margin-bottom: 0;
    }
  }
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // background-image: linear-gradient(to bottom right, ${colors.brand}, ${colors.background} 60%);
  // box-shadow: 0px 0px 10px ${colors.lightest};

  width: 60px;
  height: 60px;

  position: relative;

  // border-radius: 50%;
  font-size: 1.5rem;
  span {
    font-size: 1rem;
  }

`
const FbIcon = styled(FaFacebookF)`

`
const IgIcon = styled(FaInstagram)`
`


const Footer = () => {
  return (
    <StyledFooter>
        {/* <StyledLink as='a' href='mailto:darkaceapparel@gamil.com'>DARKACEAPPAREL@GMAIL.COM</StyledLink> */}
        <a 
          href='https://www.facebook.com/Dark-Ace-Disc-Golf-Apparel-100462504774316/' 
          target='_blank' 
          rel="noreferrer"
          
          >
          <IconWrapper>
              <FbIcon />
          </IconWrapper>

        </a>
        <p>Dark Ace Apparel</p>
        <a 
          href='https://www.instagram.com/darkaceapparel/' 
          target='_blank' 
          rel="noreferrer"
          >
          <IconWrapper>
            <IgIcon />
          </IconWrapper>
          </a>
    </StyledFooter>
  )
}

export default Footer
