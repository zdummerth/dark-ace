import React from 'react';
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import EmailForm from 'src/components/forms/NewEmailSubscriberForm'
import Flex from 'src/components/shared/Flexbox'



import { breakpoints, colors } from 'src/styles';


const StyledFooter = styled(Flex)`
  position: relative;
  color: ${colors.lightest};
  width: 100%;
  // height: 600px;
  padding: 20px;
  margin-top: 100px;
  // background: ${colors.darkGradient};
  border-top: 1px solid ${colors.gray};

  & > * {
    z-index: 2;
  }

  @media (min-width: ${breakpoints.tablet}) {
    height: inherit;
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
  }
`

const Title = styled.h3`
  margin-top: 30px;
`

const ImageContainer = styled.div`
  margin: 40px;
  position: relative;
  // top: 0;
  // right: 0;
`

const TextContainer = styled(Flex)`
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @media (min-width: ${breakpoints.tablet}) {
    position: static;
  }
`

const BackgroundImage = styled.div`
  @media (min-width: ${breakpoints.tablet}) {
    display: none;
  }
`


const Footer = ({ resetForm }) => {
  return (
    <StyledFooter
      dir='column'
      ai='center'
    >
      <BackgroundImage>
        <StaticImage
          src='../../images/skull-hill-dark.jpg'
          alt='logo'
        />
      </BackgroundImage>
      {/* <ImageContainer>
        <StaticImage
          src='../../images/da-logo-white.png'
          alt='logo'
          width={150}
          height={150}
        />
        <Overlay />

      </ImageContainer> */}
      <TextContainer>
        {/* <Title>Dark Ace Apparel</Title> */}
        <EmailForm reset={resetForm} />

        <IconWrapper>
          <StyledLink href='https://www.facebook.com/Dark-Ace-Disc-Golf-Apparel-100462504774316/' target='_blank' rel="noopener"><FbIcon /></StyledLink>
          <StyledLink href='https://www.instagram.com/darkaceapparel/' target='_blank' rel="noopener"><IgIcon /></StyledLink>
        </IconWrapper>
      </TextContainer>
    </StyledFooter>
  )
}

export default Footer
