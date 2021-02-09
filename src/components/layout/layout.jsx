import React, { useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { StoreContext } from '../../context/StoreContextProvider'
import styled, { createGlobalStyle } from "styled-components"
import { dimensions, colors } from '../../utils/styles';

import Header from './header'
import Footer from './footer'
import Spotify from '../spotify'
import { CartStatus } from './cartStatus'
import Events from '../Events'



// import 'normalize.css';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${colors.background};
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0;

  }

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

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
  padding: 0 10px;

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
      winterWizards: file(relativePath: { eq: "winter-wizards.jpg" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      doubles: file(relativePath: { eq: "da-doubles.jpg" }) {
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
  const [eventsMinimized, setEventsMinimized] = useState(true);

  useEffect(() => {
    //This makes sure the menus close when the user clicks on a page link
    setSpotifyMinimized(true)
    setEventsMinimized(true)
  }, [location])

  const jbRegLink = 'https://www.discgolfscene.com/tournaments/Dark_Ace_Presents_Winter_Wizards_at_Jefferson_Barracks_powered_by_4Hands_Brewery_2021'
  const endiRegLink = 'https://www.discgolfscene.com/tournaments/Dark_Ace_Presents_Winter_Wizards_at_Endicott_Park_powered_by_4Hands_Brewery_2021'
  const doublesLink = 'https://www.discgolfscene.com/tournaments/Dark_Ace_Doubles_2021'

  const eventData = [
    {
      date: new Date(2021, 1, 27),
      location: 'Jefferson Barracks',
      title: 'Winter Wizards',
      link: jbRegLink,
      image: data.winterWizards.childImageSharp.fixed
    },
    {
      date: new Date(2021, 2, 6),
      location: 'Endicott',
      title: 'Winter Wizards',
      link: endiRegLink,
      image: data.winterWizards.childImageSharp.fixed
    },
    {
      date: new Date(2021, 2, 20),
      title: 'Dark Ace Doubles',
      location: 'Willmore/Graveyard',
      link: doublesLink,
      image: data.doubles.childImageSharp.fixed
    }
  ]

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
          // setSpotifyMinimized={setSpotifyMinimized}
          // setEventsMinimized={setEventsMinimized}
        />
        <HeaderMargin />
        <Spotify
          minimized={spotifyMinimized}
          setMinimized={setSpotifyMinimized}
        />
        <Events
          minimized={eventsMinimized}
          setMinimized={setEventsMinimized}
          events={eventData}
        />
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
