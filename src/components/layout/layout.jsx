import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"

import Header from './header'
import Footer from './footer'
import Spotify from '../spotify'

import { dimensions } from '../../utils/styles';



import 'normalize.css';

const GlobalStyle = createGlobalStyle`
  body {
    background: #020202;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
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
  flex: 1;
  position: relative;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
`

// When header is fixed, it's removed from doc flow
// This offsets that
const HeaderMargin = styled.div`
  margin-top: ${dimensions.headerHeight};
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
        <HeaderMargin />
        <Spotify />
        <ContentWrapper>
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