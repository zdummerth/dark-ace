import React, { useContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"
import { dimensions, colors, breakpoints } from '../../utils/styles';



const GlobalStyle = createGlobalStyle`
  body {
    background: ${colors.background};
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
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


  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </Wrapper>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
