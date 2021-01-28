import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"

import Header from './header'
import Footer from './footer'
import Spotify from '../spotify'
import { CartStatus } from './cartStatus'
import Event from '../event'



import { StoreContext } from '../../context/StoreContextProvider'


import { dimensions } from '../../utils/styles';



// import 'normalize.css';

const GlobalStyle = createGlobalStyle`
  body {
    background: #020202;
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


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      winterWizards: file(relativePath: { eq: "winter-wizards.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1280) {
            ...GatsbyImageSharpFluid
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

  const jbRegLink = 'https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.discgolfscene.com%2Ftournaments%2FDark_Ace_Presents_Winter_Wizards_at_Jefferson_Barracks_powered_by_4Hands_Brewery_2021%3Ffbclid%3DIwAR2A61x1OJt-QwLzKVa9Nq53T8LXcPr_Ngqgq10pE2eB914f7hg9i9WL4pY&h=AT1RStQ7tmvf35WTQD-WC7LYazxJxKFivb7psXf9HrtdB2k55jSZh0dFjUeouD5jYbKW1oRMAMQVps_xe358pMFvR1hH8-aNzqJbXR8r-dpA39VtRw3NdGCGbg&__tn__=-UK*F&c[0]=AT3TPyu-r_kp7MuqQVf6txbhoqrX3_oyVsc12UPxyaGyqWcqCf3NVlN1nSOnDnANescRC-zuM3m4iNrqW37v3RW6Cj3rHkq8YWzav5r0FyJTyBT_jG1i1lOmqJK_1snruYfkBCmd22ZC5LUufw9YwbBxmm0oRYNvjc8r3de1GqJKW_MgxDAmUwOljDuTzPeYDR0i8tudsLcUbNVJoRywVQ7G4TAH89nF1zT-N9Y2vw'
  const endiRegLink = 'https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.discgolfscene.com%2Ftournaments%2FDark_Ace_Presents_Winter_Wizards_at_Endicott_Park_powered_by_4Hands_Brewery_2021%3Ffbclid%3DIwAR2A61x1OJt-QwLzKVa9Nq53T8LXcPr_Ngqgq10pE2eB914f7hg9i9WL4pY&h=AT1i0XbriN5FQaW7CNsXCyIxK85qVUU54Q0Cc2dsZGPDKYSyVgcsVtpPAeuDeC6d8qPKaKwDX3bY2QxLTabhoTJx2XSiA0T6eTXp0ir_Fs8kiEOVCJ-2Vs0XDQ&__tn__=-UK*F&c[0]=AT3TPyu-r_kp7MuqQVf6txbhoqrX3_oyVsc12UPxyaGyqWcqCf3NVlN1nSOnDnANescRC-zuM3m4iNrqW37v3RW6Cj3rHkq8YWzav5r0FyJTyBT_jG1i1lOmqJK_1snruYfkBCmd22ZC5LUufw9YwbBxmm0oRYNvjc8r3de1GqJKW_MgxDAmUwOljDuTzPeYDR0i8tudsLcUbNVJoRywVQ7G4TAH89nF1zT-N9Y2vw'
  
  const winterWizards = [
    {
      date: 'February 27th',
      location: 'Jefferson Barracks',
      link: jbRegLink
    },
    {
      date: 'March 6th',
      location: 'Endicott',
      link: endiRegLink
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
          />
        <HeaderMargin />
        <Spotify />
        <Event
          imageFluid={data.winterWizards.childImageSharp.fluid}
          events={winterWizards}
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
