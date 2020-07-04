import React from "react"
// import { graphql } from "gatsby"
// import Img from "gatsby-image"
// import styled from "styled-components"

import Layout from "../components/layout"
import BackgroundSection from '../components/background-section'
import SEO from "../components/seo"

// const ImgWrapper = styled.div`
//   border: 1px solid #C00A0A;
// `

const ContactPage = ({data}) => {
    return (
        <Layout>
            <SEO title="Contact" />
            <BackgroundSection />
        </Layout>
    )
}

export default ContactPage
