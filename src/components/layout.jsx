/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"

import Header from "./header"
import "./layout.css"

const GlobalStyle = createGlobalStyle`
  body {
    background: #020202;
    color: white;
  }
`
// const SiteWrapper = styled.div`

// `

const Wrapper = styled.main`
  width: 90vw;
  max-width: 1200px;
  margin: 0 auto;
  color: white;
`

const Footer = styled.footer`

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
      <div>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Wrapper>{children}</Wrapper>
        <Footer>
          <p>Footer Info</p>
        </Footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
