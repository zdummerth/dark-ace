import React, { useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { StoreContext } from 'src/context/StoreContextProvider'
import "@fontsource/covered-by-your-grace"; // Defaults to weight 400.
import styled, { createGlobalStyle } from "styled-components"
import { dimensions, colors, breakpoints } from 'src/styles';
import Header from './header'
import Footer from './footer'
// import Spotify from '../spotify'
import { CartStatus } from './cartStatus'


const GlobalStyle = createGlobalStyle`
  body {
    background: ${colors.background};
    color: white;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
  }

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1, h2, h3 {
    font-family: 'Covered By Your Grace', Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  h1 {
    @media (min-width: ${breakpoints.desktop}) {
      font-size: 40px;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  &.hide-lt-tablet {
    margin-bottom: 25px;
    @media (max-width: ${breakpoints.tablet}) {
      display: none;
    }
  }
  &.hide-gt-tablet {
    @media (min-width: ${breakpoints.tablet}) {
      display: none;
    }
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
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: calc(100vh - ${dimensions.headerHeight});
  max-width: 1300px;
  margin: 0 auto;
`

// When header is fixed, it's removed from doc flow
// This offsets that
const HeaderMargin = styled.div`
  margin-top: ${dimensions.headerHeight};
`

const StyledAddingToCart = styled(CartStatus)`
  position: fixed;
  top: ${dimensions.headerHeight};
  z-index: 50;
  width: ${({ error }) => error ? '100%' : 'auto'}
`


const Layout = ({ children, location }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)


  const {
    resetError,
    setStatus,
    store: { status, error, checkout: { lineItems } },
  } = useContext(StoreContext)

  const [spotifyMinimized, setSpotifyMinimized] = useState(true)
  const [resetEmailForm, setResetEmailForm] = useState(false)

  useEffect(() => {
    //This makes sure the menus close when the user clicks on a page link
    setSpotifyMinimized(true)
    setResetEmailForm(true)
  }, [location])

  // if(window) console.log("window width", window.innerWidth)


  const cartCount = lineItems.reduce((acc, cv) => acc + cv.quantity, 0)

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <StyledAddingToCart
          status={status}
          setStatus={setStatus}
          error={error}
          resetError={resetError}
        />

        <Header
          // siteTitle={data.site.siteMetadata.title}
          cartCount={cartCount}
          setSpotifyMinimized={setSpotifyMinimized}
          spotifyMinimized={spotifyMinimized}
        />
        {/* <Spotify
          minimized={spotifyMinimized}
          setMinimized={setSpotifyMinimized}
        /> */}
        <HeaderMargin />

        <ContentWrapper
          onClick={() => setSpotifyMinimized(true)}
        >
          {children}
        </ContentWrapper>
        <Footer resetForm={resetEmailForm} />
      </Wrapper>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
