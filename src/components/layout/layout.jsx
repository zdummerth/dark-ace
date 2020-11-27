import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"

import Header from './header'
import Footer from './footer'
import Spotify from '../spotify'

import { dimensions, colors } from '../../utils/styles';



import 'normalize.css';

const GlobalStyle = createGlobalStyle`
  body {
    background: #020202;
    color: white;
    font-family: Electrolize, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;

    //removes blue background when clicking
    -webkit-tap-highlight-color: transparent;


  }
  button {
    background: none;
    outline: 0;
    border: 0;
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;

`

const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  width: 100%;
  // max-width: 1500px;
  // margin-bottom: 2rem;
`

// When header is fixed, it's removed from doc flow
// This offsets that
const HeaderMargin = styled.div`
  margin-top: ${dimensions.headerHeight};
`


const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [navbarClosed, setNavbarClosed] = useState(true);


  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Header 
          siteTitle={data.site.siteMetadata.title} 
          navbarClosed={navbarClosed}
          setNavbarClosed={setNavbarClosed}
        />
        <HeaderMargin />
        <Spotify />
        <ContentWrapper 
          onClick={() => setNavbarClosed(true)}
        >
          {children}
        </ContentWrapper>
        <Footer />
      </Wrapper>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
