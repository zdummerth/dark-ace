import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import SEO from '../components/seo'
import BasicForm from '../components/form'


const BgWrapper = styled.div`
  position: relative;
  color: white;
  width: 100%;
  max-width: 600px;
  margin-right: auto;
  margin-left: auto;
`
const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,.7);
  text-align: center;
`

const Banner = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1500px;
`

const ContactPage = ({data}) => {
    return (
      <>
        <SEO title='Contact' />
        {/* <Banner>
          <Img fluid={data.mvp.childImageSharp.fluid} />
        </Banner> */}
        <BgWrapper>
            <Img 
                fluid={data.boneBasket.childImageSharp.fluid} 
                alt={'bone basket background'}
                style={{
                    //Not exactly sure how this works, but this makes the image appear bigger and more center on smaller screens
                    // paddingTop: '100px',
                    // height: '66vh'
                }}
                imgStyle={{
                  objectFit: 'contain'
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
  boneBasket: file(relativePath: { eq: "bone-basket.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  mvp: file(relativePath: { eq: "mvp.png" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  skullHill: file(relativePath: { eq: "skull-hill.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`

export default ContactPage
