import React, { useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { StoreContext } from '../../context/StoreContextProvider'
import "@fontsource/covered-by-your-grace"; // Defaults to weight 400.
import styled, { createGlobalStyle } from "styled-components"
import { dimensions, colors, breakpoints } from '../../utils/styles';

import Header from './header'
import Footer from './footer'
import Spotify from '../spotify'
import { CartStatus } from './cartStatus'


const GlobalStyle = createGlobalStyle`
  body {
    background: ${colors.background};
    color: white;
    font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;
  }

  // html {
  //   box-sizing: border-box;
  // }
  // *, *:before, *:after {
  //   box-sizing: inherit;
  // }

  a {
    text-decoration: none;
    color: inherit;
  }

  p, h3 {
    margin: 0;
  }

  .flex {
    display: flex;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }

  .center-center {
    justify-content: center;
    align-items: center;
  }

  .align-center {
    align-items: center;
  }

  .align-end {
    align-items: flex-end;
  }

  .justify-end {
    justify-content: flex-end;
  }

  .justify-around {
    justify-content: space-around;
  }

  .justify-between {
    justify-content: space-between;
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
  // align-items: center;
  position: relative;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  // padding: 0 10px;

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


const Layout = ({ children, location, history }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      doubles: file(relativePath: { eq: "usdgc.jpg" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)


  const {
    resetError,
    setStatus,
    store: { status, error, checkout: { lineItems } },
  } = useContext(StoreContext)

  const [spotifyMinimized, setSpotifyMinimized] = useState(true);

  useEffect(() => {
    //This makes sure the menus close when the user clicks on a page link
    setSpotifyMinimized(true)
  }, [location])


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
          siteTitle={data.site.siteMetadata.title}
          cartCount={cartCount}
          setSpotifyMinimized={setSpotifyMinimized}
          spotifyMinimized={spotifyMinimized}
          // setEventsMinimized={setEventsMinimized}
        />
        <HeaderMargin />
        {/* <Events
          minimized={eventsMinimized}
          setMinimized={setEventsMinimized}
          events={eventData}
        /> */}
        <Spotify
          minimized={spotifyMinimized}
          setMinimized={setSpotifyMinimized}
        />
        <ContentWrapper
          onClick={() => setSpotifyMinimized(true)}
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
