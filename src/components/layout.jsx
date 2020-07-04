/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

import Header from "./header"
import "./layout.css"

const GlobalStyle = createGlobalStyle`
  body {
    background: #020202;
    // background: white;
    color: white;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const ContentWrapper = styled.main`
  flex: 1;
  width: 88vw;
  max-width: 1200px;
  margin: 0 auto;
  color: white;
`

const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #C00A0A;
  padding: 0 2vh;
  margin-top: 3vh;
  background-color: #262626;
  @media (max-width: 900px) {
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

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  white-space: nowrap;
  color: white;
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

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header siteTitle={data.site.siteMetadata.title} />
        <ContentWrapper>{children}</ContentWrapper>
        <Footer>
          <StyledLink as='a' href='mailto:darkaceapparel@gamil.com'>DARKACEAPPAREL@GMAIL.COM</StyledLink>
          <IconWrapper>
            <StyledLink as='a' href='https://www.facebook.com/Dark-Ace-Disc-Golf-Apparel-100462504774316/' target='_blank' rel="noopener"><FbIcon /></StyledLink>
            <StyledLink as='a' href='https://www.instagram.com/darkaceapparel/' target='_blank' rel="noopener"><IgIcon /></StyledLink>
          </IconWrapper>
        </Footer>
      </Wrapper>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
