import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import SEO from '../components/seo'
import BasicForm from '../components/form'


const BgWrapper = styled.div`
    position: relative;
    color: white;
`
const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.8);
  text-align: center;
`

const ContactPage = ({data}) => {
    return (
        <>
            <SEO title='Contact' />
            <BgWrapper>
                <Img 
                    fluid={data.file.childImageSharp.fluid} 
                    alt={'bone basket background'}
                    style={{
                        //Not exactly sure how this works, but this makes the image appear bigger and more center on smaller screens
                        // paddingTop: '100px',
                    }}
                />
                <Overlay>
                  <h1>Contact Us</h1>
                  <BasicForm />
                </Overlay>
            </BgWrapper>
        </>
    )
}

export const query = graphql`
query {
  file(relativePath: { eq: "bg.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default ContactPage
